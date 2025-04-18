import axios from "axios";
import { getAuthToken } from "../utils/localStorage";

const request = async (url, method, data) => {
  return await axios.request({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    url,
    method,
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
};
