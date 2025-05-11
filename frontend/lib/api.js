import axios from "axios";
import { getCookie } from "../utils/cookie";

export const callApi = async (url, method, data) => {
  try {
    const response = (
      await axios.request({
        baseURL: "http://127.0.0.1:5000",
        url,
        method,
        data,
        headers: {
          Authorization: getCookie("searchify.api.access_token"),
        },
      })
    )?.data;
    if (!response.success) throw response;
    return response;
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong, please try again later",
    };
  }
};
