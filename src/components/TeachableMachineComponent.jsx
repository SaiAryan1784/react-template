import React, { useEffect, useState } from 'react';
import * as tmImage from '@teachablemachine/image';

const TeachableMachineComponent = () => {
  const URL = 'https://teachablemachine.withgoogle.com/models/8zzJVsdHl/';
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState(null);
  const [labelContainer, setLabelContainer] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(null);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const init = async () => {
      const modelURL = URL + 'model.json';
      const metadataURL = URL + 'metadata.json';

      // load the model and metadata
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
      setMaxPredictions(loadedModel.getTotalClasses());

      // Convenience function to set up a webcam
      const flip = true; // whether to flip the webcam
      const webcamInstance = new tmImage.Webcam(500, 300, flip); // width, height, flip
      await webcamInstance.setup(); // request access to the webcam
      await webcamInstance.play();
      setWebcam(webcamInstance);

      // Append the webcam canvas to the DOM
      const webcamContainer = document.getElementById('webcam-container');

      // Remove previous children
      while (webcamContainer.firstChild) {
        webcamContainer.removeChild(webcamContainer.firstChild);
      }

      var newchild = webcamInstance.canvas;
      webcamContainer.appendChild(newchild);

      const labelContainerElement = document.getElementById('label-container');
      setLabelContainer(labelContainerElement);

      for (let i = 0; i < maxPredictions; i++) {
        // and className labels
        labelContainerElement.appendChild(document.createElement('div'));
      }
    };

    init();

    return () => {
      // Cleanup webcam and other resources if needed
      if (webcam) {
        webcam.stop();
      }
    };
  }, [maxPredictions]);

  useEffect(() => {
    const loop = async () => {
      if (webcam) {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
      }
    };

    window.requestAnimationFrame(loop);
  }, [webcam]);

  const predict = async () => {
    if (model && webcam) {
      // predict can take in an image, video, or canvas html element
      const prediction = await model.predict(webcam.canvas);
      setPredictions(prediction);

      for (let i = 0; i < maxPredictions; i++) {
        labelContainer.childNodes[i].innerHTML = `${prediction[i].className}: ${(
          prediction[i].probability * 100
        ).toFixed(2)}%`;
      }
    }
  };

  return (
    <div>
      <div
        id="webcam-container"
        className="h-screen flex items-center justify-center"
      >
      </div>
      <div id="label-container"></div>

      {predictions.map((prediction, index) => (
        <div key={index} className="flex justify-between mb-1">
          <span className="text-base font-medium text-blue-700 ">
            {prediction.className}
          </span>
          <span className="text-sm font-medium text-blue-700">
            {(prediction.probability * 100).toFixed(2)}%
          </span>
        </div>
      ))}

      {predictions.length > 0 && (
        <div className="w-[40rem] rounded-full h-[2rem] m-[2rem]">
          {predictions.map((prediction, index) => (
            <div
              key={index}
              className="bg-blue-600 h-[2rem] rounded-full"
              style={{
                width: `calc(${(prediction.probability * 100).toFixed(2)}%)`,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeachableMachineComponent;
