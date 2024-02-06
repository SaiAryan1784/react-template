import React, { useEffect, useState } from 'react';
import * as tmImage from '@teachablemachine/image';
import Spline from '@splinetool/react-spline';

const TeachableMachineComponent = () => {
  const URL = 'https://teachablemachine.withgoogle.com/models/Tc8AGqgPM/';
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState(null);
  const [labelContainer, setLabelContainer] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [incrementPoints, setIncrementPoints] = useState(0);
  const [splineUrl, setSplineUrl] = useState('https://prod.spline.design/R0RAGT2Y9eZzPf4m/scene.splinecode'); // Initial Spline URL

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
      const webcamInstance = new tmImage.Webcam(600, 300, flip); // width, height, flip
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

  useEffect(() => {
    // Update spline URL based on points
    if (incrementPoints === 0) {
      setSplineUrl('https://prod.spline.design/PAEO9zunTz1ufVw0/scene.splinecode'); // Eraser URL
    } else if (incrementPoints === 1) {
      setSplineUrl('https://prod.spline.design/R0RAGT2Y9eZzPf4m/scene.splinecode'); // Pen URL
    }
  }, [incrementPoints]);

  const predict = async () => {
    if (model && webcam) {
      // predict can take in an image, video, or canvas html element
      const prediction = await model.predict(webcam.canvas);
      setPredictions(prediction);

      for (let i = 0; i < maxPredictions; i++) {
        labelContainer.childNodes[i].innerHTML = `${prediction[i].className}: ${(
          prediction[i].probability * 100
        ).toFixed(2)}%`;

        const incrementDiv = document.getElementById('points');
        const congratsText = document.getElementById('congrats');
        incrementDiv.innerHTML = `Points: ${incrementPoints}`;
        const clasSes = document.getElementById('Classes')

        if ((prediction[i].probability * 100) > 85) {
          clasSes.innerHTML = `${prediction[i].className}`
          // Check prediction based on current spline URL
          if (splineUrl === 'https://prod.spline.design/PAEO9zunTz1ufVw0/scene.splinecode' && prediction[i].className === "Eraser") {
            setIncrementPoints(incrementPoints + 1); // Increment points if eraser is detected
            congratsText.innerHTML = "Good Job Kiddo! Now moving on to the next thing ";
            incrementDiv.innerHTML = `Points: ${incrementPoints}`;
          } else if (splineUrl === 'https://prod.spline.design/R0RAGT2Y9eZzPf4m/scene.splinecode' && prediction[i].className === "Pen") {
            setIncrementPoints(incrementPoints + 1); // Increment points if pen is detected
            congratsText.innerHTML = "Congratulations! You've completed the task!";
            incrementDiv.innerHTML = `Points: ${incrementPoints}`;
          }
        }
      }
    }
  };

  return (
    <div>
      <h1 id='congrats' className='h-auto m-[1rem] flex items-center justify-center bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text text-4xl font-bold'></h1>
      <h1 id='points' className='h-auto m-[1rem] text-right mr-[1rem]'></h1>
      <h1 id='Classes'></h1>
      
      <div className='h-auto flex items-center justify-center mt-[3rem] mb-[2rem]'>
      <Spline className='shadow-2xl' scene={splineUrl} style={{ width: '50%', height: '50vh', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }} />
        <div
          id="webcam-container"
          className='shadow-2xl'
        >
        </div>
      </div>
      <div id="label-container" className='hidden'></div>
      <p id='canvas3d'></p>
      <a href='https://team-t-b-d-code-kshetra-master-csdf.vercel.app/' className='text-center mb-[2rem]'>Home</a>
    </div>
  );
};

export default TeachableMachineComponent;
