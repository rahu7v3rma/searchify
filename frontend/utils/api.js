import axios from "axios";
import { useLoader } from "../app/layout";
import { addToast } from "@heroui/react";
import { getAuthToken } from "./localStorage";

export const useApi = (url, method) => {
  const { setIsLoading } = useLoader();

  const callApi = async (data) => {
    setIsLoading(true);
    try {
      const response = (
        await axios.request({
          baseURL: process.env.NEXT_PUBLIC_API_URL,
          url,
          method,
          data,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
          },
        })
      ).data;
      addToast({
        title: response.message,
      });
      return response;
    } catch {
      addToast({
        title: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  return callApi;
};
