// ./src/App.js
// import axios from "axios";

import React, { useState } from "react";
import "./App.css";
import {
  computerVision,
  isConfigured as ComputerVisionIsConfigured,
} from "./azure-cognitiveservices-computervision";
// import Cars from "../../backend/Cars";

function App() {
  const [fileSelected, setFileSelected] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [changeToArray, setChangeToArray] = useState();

  const handleChange = (e) => {
    setFileSelected(e.target.value);
  };
  const onFileUrlEntered = (e) => {
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

  // Display JSON data in readable format
  const PrettyPrintJson = (data) => {
    console.log(data.brands[0].name);
    console.log(data);
    setChangeToArray(data);
    console.log(data);
    //
    const Cars = [
      {
        URL: "https://www.carkhabri.com/Gallery/audi/audi-a4/exterior/large/47.jpg",
        brands: "Audi",
        version: "A4",
        price: "$39,999",
      },
      {
        URL: "https://www.aucklandcars.nz/Motorcentral/VehicleData/AUC-44db3dd7-0828-4834-a5e1-3918a8180388-1.jpg?r=638051896795911564",
        brands: "BMW",
        version: "i8",
        price: "$39,999",
      },
      {
        URL: "https://motorvault.co.uk/assets/image-cache/galleries/213/2207_Audi_RS6_Avant_side_view.f631f0f7.jpg",
        brands: "Audi",
        version: "RS6",
        price: "$39,999",
      },
      {
        URL: "https://cdn.carbuzz.com/gallery-images/2021-audi-q5-side-view-carbuzz-919747-1600.jpg",
        brands: "Audi",
        version: "Q5",
        price: "$39,999",
      },
      {
        URL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5I8QtRGvNxOgCAEcnONyOKshat5Qhl3IYEg&usqp=CAU",
        brands: "Audi",
        version: "A1",
        price: "$39,999",
      },
      {
        URL: "https://cdn.carbuzz.com/gallery-images/2023-audi-a5-coupe-side-view-driving-carbuzz-676384-1600.jpg",
        brands: "Audi",
        version: "A5",
        price: "$39,999",
      },
    ];
    return (
      <div class="stockContainer">
        {/* <h1> This car is a {data.brands[0].name}</h1>
        <h2> Similar cars in our stock:</h2> */}
        {Cars.filter((el) => el.brands === data.brands[0].name).map((el) => (
          <div class="processedImgs">
            <div class="card">
              <img class="stockImgs" src={el.URL} />
              <h2 class="titles">
                {el.brands}
                <br></br>
                {el.version}
              </h2>
              {/* <h2 class="subTitles">{el.version}</h2> */}
              <h3 class="price">{el.price}</h3>
            </div>
          </div>
        ))}
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
              // {
              // analysis.description &&
              // analysis.description.captions &&
              // analysis.description.captions[0].text
              //   ? analysis.description.captions[0].text
              //   : "can't find caption"
              // }
            />
          </div>
        </div>
        {PrettyPrintJson(analysis)}
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
                <label>URL</label>
                <input
                  type="text"
                  placeholder="Enter URL or leave empty for random image from collection"
                  size="50"
                  onChange={handleChange}
                ></input>
              </div>
              <button onClick={onFileUrlEntered}>Analyze</button>
            </div>
          )}
          {processing && <div>Processing</div>}
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
