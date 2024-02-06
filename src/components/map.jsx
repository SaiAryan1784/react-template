// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import "./map.css"

// import {
//     ComposableMap,
//     Geographies,
//     Geography,
//     Marker,
//     Annotation,
//     ZoomableGroup
// } from "react-simple-maps";

// import ReactTooltip from "react-tooltip";


// function App(){
//     <div className="App" style {{
//         width: "100%",
//         height: "100%",
//         display:"flex",
//         flexDirection:"coloumn",
//         justifyContent:"center",
//         alignItems: "center",
//     }}
//     ></div>
// }

// // export default App;
// import React from 'react';
// import ReactMapGL, { Marker, Popup } from 'react-map-gl';

// import 'mapbox-gl/dist/mapbox-gl.css';

// const Map = () => {
//   const [viewport, setViewport] = React.useState({
//     latitude: 37.7749,
//     longitude: -122.4194,
//     zoom: 10,
//   });

//   const locations = [
//     { id: 1, latitude: 37.7749, longitude: -122.4194, name: 'Marker 1' },
//     { id: 2, latitude: 37.7833, longitude: -122.4167, name: 'Marker 2' },
//     // Add more markers if needed
//   ];

//   return (
//     <ReactMapGL
//       {...viewport}
//       width="100%"
//       height="500px"
//       mapStyle="mapbox://styles/mapbox/streets-v11"
//       mapboxApiAccessToken={YOUR_MAPBOX_ACCESS_TOKEN}
//       onViewportChange={(newViewport) => setViewport(newViewport)}
//     >
//       {locations.map12((location) => (
//         <Marker
//           key={location.id}
//           latitude={location.latitude}
//           longitude={location.longitude}
//         >
//           <div>
//             <svg
//               height="20"
//               viewBox="0 0 24 24"
//               fill="#1978c8"
//               stroke="#1978c8"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="12" cy="12" r="10" />
//             </svg>
//           </div>
//         </Marker>
//       ))}
//     </ReactMapGL>
//   );
// };

// const App = () => {
//   return (
//     <div className="App">
//       <h1>React Mapbox Map</h1>
//       <Map />
//     </div>
//   );
// };

// export default App;
