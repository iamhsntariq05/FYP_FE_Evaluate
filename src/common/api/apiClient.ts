// import axios from "axios";

// export const ax = axios.create({ baseURL: process.env.REACT_APP_API_URL || "no/api" });
export const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

export const checkApiBaseURl = () => {
  // if (window.location.href.includes("localhost")) {
  return apiBaseURL;
  // } else {
  // return apiBaseURL;
  // }
};
export {};
