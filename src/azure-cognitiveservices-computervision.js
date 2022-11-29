// ./src/azure-cognitiveservices-computervision.js

// Azure SDK client libraries
import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";

// import Cars from "../../backend/Cars.js";

// List of sample images to use in demo
// import RandomImageUrl from "./DefaultImages";

// Authentication requirements
const key = process.env.REACT_APP_AZURE_COMPUTER_VISION_KEY;
const endpoint = process.env.REACT_APP_AZURE_COMPUTER_VISION_ENDPOINT;

console.log(`key = ${key}`);
console.log(`endpoint = ${endpoint}`);

// Cognitive service features
const visualFeatures = [
  "Categories",
  "Color",
  "Tags",
  "Description",
  "Objects",
  "Brands",
];

export const isConfigured = () => {
  const result =
    key && endpoint && key.length > 0 && endpoint.length > 0 ? true : false;
  console.log(`key = ${key}`);
  console.log(`endpoint = ${endpoint}`);
  console.log(`ComputerVision isConfigured = ${result}`);
  return result;
};

// Analyze Image from URL
export const computerVision = async (url) => {
  // authenticate to Azure service
  const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
    endpoint
  );

  // get image URL - entered in form
  const urlToAnalyze = url;

  // analyze image
  const analysis = await computerVisionClient.analyzeImage(urlToAnalyze, {
    visualFeatures,
  });

  // all information about image
  return { URL: urlToAnalyze, ...analysis };
};
