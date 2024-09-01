// import DEMO_DATA from "../../../assets/data/DEMO_DATA.json";
import { scriptActions } from "../slices/scripts-slice";
import { notificationActions } from "../slices/notifications-slice";
import { AppDispatch } from "../store";
import { useSelector } from "react-redux";
// import { axiosService } from "../../../services/http-client";
import { Script } from "../../../types";
import Axios from "axios";

const axios = Axios.create();

import {
  updateSuccess,
  sendingRequest,
  updateError,
  createSuccess,
  deleteSuccess,
} from "../../../utils/noticationContent";

const END_POINT_URL = "https://emkc.org/api/v2/piston/execute";

export const fetchScript = (script: Script) => {
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      const body = {
        language: "javascript",
        version: "18.15.0",
        files: [
          {
            name: "main.js",
            content: script.content,
          },
        ],
      };

      try {
        dispatch(scriptActions.changeLoadingState({ isLoading: true }));
        const response = await axios.post(END_POINT_URL, body);
        const data: any = response.data || [];
        return data;
      } catch (err) {
        console.log("err:", err);
      }
    };

    const response = await fetchData();
    const data = response.run.stdout;
    const error = response.run.code;
    dispatch(scriptActions.changeLoadingState({ isLoading: false }));
    if (data) dispatch(scriptActions.addResult(data));
    if (error) dispatch(scriptActions.addResult("Error executing"));
  };
};
