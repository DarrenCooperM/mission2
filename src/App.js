// ./src/App.js
// import axios from "axios";

import React, { useState } from "react";
import "./App.css";
import {
  computerVision,
  isConfigured as ComputerVisionIsConfigured,
} from "./components/CarsAPI/CarAPI.js";

import CarsArray from "./components/CarsArray/Cars";

function App() {
  const [fileSelected, setFileSelected] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [changeToArray, setChangeToArray] = useState();

  const handleChange = (e) => {
    setFileSelected(e.target.value);
  };
  const userInputURL = (e) => {
    // hold UI
    setProcessing(true);
    setAnalysis(null);

    computerVision(fileSelected || null).then((item) => {
      // reset state/form
      // fetch GET
      // axios
      //   .get("http://localhost:4000/imagesdb")
      //   .then((data) => {
      //     alert("successful");
      //   })
      //   .catch((err) => {
      //     alert("unsuccessful");
      //   });
      setAnalysis(item);
      setFileSelected("");
      setProcessing(false);
    });
  };

  const carData = (data) => {
    console.log(data.brands[0].name);
    console.log(data);
    setChangeToArray(data);
    console.log(data);
    return (
      <div>
        <h2>Take a look at what we have in stock</h2>
        <div class="stockContainer">
          {/* <h1> This car is a {data.brands[0].name}</h1>
        <h2> Similar cars in our stock:</h2> */}
          {CarsArray.filter((el) => el.brands === data.brands[0].name).map(
            (el) => (
              <div class="processedImgs">
                <div class="card">
                  <img class="stockImgs" src={el.URL} />
                  <h2 class="titles">
                    {el.brands}
                    <br></br>
                    {el.version}
                  </h2>
                  {/* <h2 class="subTitles">{el.version}</h2> */}
                  <p class="content">
                    <h2 class="odo">ODO: {el.ODO}</h2>
                    <h2 class="price">{el.price}</h2>
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  const DisplayResults = () => {
    return (
      <div class="resultsContainer">
        <div class="userInput">
          <h2>Computer Vision Analysis</h2>
          <div>
            <h3> your upload: </h3>
            <img
              src={analysis.URL}
              height="300"
              width="500"
              border="1"
              alt="pic"
            />
          </div>
        </div>
        {carData(analysis)}
      </div>
    );
  };

  const Analyze = () => {
    return (
      <div class="resultsContainer">
        <div class="userInput">
          <h1>FIND YOUR DREAM CAR</h1>
          {!processing && (
            <div>
              <div>
                <input
                  class="inputBox"
                  type="text"
                  placeholder="Enter URL"
                  size="50"
                  onChange={handleChange}
                ></input>
              </div>
              <button class="analyzeBtn" onClick={userInputURL}>
                Analyze
              </button>
            </div>
          )}
          {processing && <div>LOADING</div>}
          <hr />
          {analysis && DisplayResults()}
        </div>
      </div>
    );
  };

  const CantAnalyze = () => {
    return (
      <div>
        Key and/or endpoint not configured in
        ./azure-cognitiveservices-computervision.js
      </div>
    );
  };

  function Render() {
    const ready = ComputerVisionIsConfigured();
    if (ready) {
      return <Analyze />;
    }
    return <CantAnalyze />;
  }

  return <div>{Render()}</div>;
}

export default App;
