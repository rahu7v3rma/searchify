import axios from "axios";
import { getCookie } from "../utils/cookie";
import { paths } from "../constants/paths";

const request = async (path: string, method: string, data: any) => {
  const response = await axios.request({
    url: path,
    method,
    data,
    headers: {
      authorization: getCookie(process.env.NEXT_PUBLIC_USER_ACCESS_TOKEN_KEY!),
    },
  });
  return response.data;
};

export const getKeywordToolSearch = async (
  keyword: string,
  criteriaId: string
) => {
  try {
    const response = await request(paths.googleKeywordToolApi, "POST", {
      keyword,
      criteriaId,
    });
    return response;
  } catch (error) {
    return {
      error:
        error?.response?.data?.error || "Failed to get keyword tool search",
    };
  }
};
