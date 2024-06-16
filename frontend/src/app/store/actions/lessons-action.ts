import DEMO_DATA from "../../../assets/data/DEMO_DATA.json";
import { lessonActions } from "../slices/lessons-slice";
import { notificationActions } from "../slices/notifications-slice";
import { AppDispatch } from "../store";
import { Lesson } from "@/types";
import { Store } from "react-notifications-component";
import { axiosService } from "../../../services/axios-service";
import { SaveLessonArgs } from "../../../types";

import {
  updateSuccess,
  sendingRequest,
  updateError,
  createSuccess,
  deleteSuccess,
} from "../../../utils/noticationContent";

const END_POINT_URL = "/api/exercises";

export const fetchLessons = () => {
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      try {
        const response = await axiosService.get(END_POINT_URL);
        const data: Lesson[] = response.data || [];
        return data;
      } catch (err) {
        console.log("err:", err);
        return [];
      }
    };

    const response = await fetchData();
    dispatch(lessonActions.addLessons(response));
  };
};

export const fetchLesson = (id: string) => {
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      try {
        const response = await axiosService.get(END_POINT_URL + "/" + id);
        const data = response.data;
        return data;
      } catch (err) {
        console.log("err:", err);
        return null;
      }
    };
    const response = await fetchData();
    dispatch(lessonActions.updateLesson(response));
  };
};

export const saveLesson = ({ lessonToEdit }: SaveLessonArgs) => {
  return async (dispatch: AppDispatch) => {
    try {
      // PUT request
      if (lessonToEdit._id) {
        dispatch(notificationActions.updateNotification(sendingRequest));

        const response = await axiosService.put(
          `${END_POINT_URL}/${lessonToEdit._id}`,
          lessonToEdit
        );

        if (response.status === 200) {
          dispatch(lessonActions.updateLesson(response.data));
          dispatch(notificationActions.updateNotification(updateSuccess));
        } else {
          dispatch(notificationActions.updateNotification(updateError));
        }

        // POST request
      } else {
        const response = await axiosService.post(END_POINT_URL, lessonToEdit);
        const { ex } = response.data;
        dispatch(lessonActions.createLesson(ex));
        dispatch(notificationActions.updateNotification(createSuccess));
        return ex;
      }
    } catch (error) {
      console.log("error:", error);
      dispatch(notificationActions.updateNotification(updateError));
    }
  };
};

export const removeLesson = ({ id }: { id: string }) => {
  return async (dispatch: AppDispatch) => {
    const response = await axiosService.delete(`${END_POINT_URL}/${id}`);

    if (response.status === 200) {
      const { _id } = response.data;
      dispatch(notificationActions.updateNotification(deleteSuccess));
      dispatch(lessonActions.deleteLesson(_id));
    }
  };
};
