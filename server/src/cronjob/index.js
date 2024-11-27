import fetchCrimeDataTask from "./fetchCrimeDataFromExternalAPI.js";
import fetchBoundaryDataTask from "./fetchBoundaryDataFromExternalAPI.js";

fetchCrimeDataTask.start();
fetchBoundaryDataTask.start();

export {fetchBoundaryDataTask, fetchCrimeDataTask};