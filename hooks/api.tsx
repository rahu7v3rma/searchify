import { useState } from "react";
import axios from "axios";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

const useApi = <T,>({ url, method }: { url: string; method: "GET" | "POST" }) => {
  const [loading, setLoading] = useState(false);

  const request = async (data: any): Promise<ApiResponse<T>> => {
    setLoading(true);
    try {
      const response = await axios.request({
        url,
        method,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "Something went wrong",
        data: null,
      };
    } finally {
      setLoading(false);
    }
  };

  return { loading, request };
};

export default useApi;
