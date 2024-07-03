import Axios from "axios";
import { Lesson } from "../types";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://central-server.alexlevkov.com"
    : "http://localhost:2000";

const axios = Axios.create();

export const axiosService = {
  get(endpoint: string) {
    return makeRequest(endpoint, "GET");
  },
  post(endpoint: string, data: Lesson) {
    return makeRequest(endpoint, "POST", data);
  },
  put(endpoint: string, data: Lesson) {
    return makeRequest(endpoint, "PUT", data);
  },
  delete(endpoint: string) {
    return makeRequest(endpoint, "DELETE");
  },
};

async function makeRequest(endpoint: string, method = "GET", data?: Lesson) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === "GET" ? data : {},
    });
    return res;
  } catch (err) {
    console.log(
      `Had Issues with ${method} method to the backend, endpoint: ${endpoint}, with data:`,
      data
    );
    console.dir(err);
    throw err;
  }
}
