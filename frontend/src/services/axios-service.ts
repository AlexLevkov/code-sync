import Axios from "axios";
import { Lesson } from "../types";

const BASE_URL = "http://localhost:2000";
// const BASE_URL = "https://central-server.alexlevkov.com";

const axios = Axios.create({
  // withCredentials: true,
});

export const axiosService = {
  get(endpoint: string) {
    return ajax(endpoint, "GET");
  },
  post(endpoint: string, data: Lesson) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint: string, data: Lesson) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint: string) {
    return ajax(endpoint, "DELETE");
  },
};

async function ajax(endpoint: string, method = "GET", data?: Lesson) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === "GET" ? data : null,
    });
    return res;
  } catch (err) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`,
      data
    );
    console.dir(err);
    throw err;
  }
}
