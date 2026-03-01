import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const axiosInstance = ({ baseUrl }: { baseUrl?: string }) => {
  console.log("BASE_URL", baseUrl, BASE_URL);
  return axios.create({
    baseURL: baseUrl ?? BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
