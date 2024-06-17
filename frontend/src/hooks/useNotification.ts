import { useSelector, useDispatch } from "react-redux";
import { notificationActions } from "../app/store/slices/notifications-slice.ts";
import { Store } from "react-notifications-component";
import { useEffect } from "react";
import { RootState } from "../types.ts";
import {iNotification} from "react-notifications-component/dist/src/typings";



// simplify to something similar, it's ok to wrap something but don't duplicate data you lose the one source of truth and
// it's too complex without good reason
export function MyStore() {
  const defaultValues = {};
  const notificationMap = new Map<string, string>();

  return {
    addNotification(notification: iNotification) {
      Store.addNotification({
        ...defaultValues,
        ...notification
      });
    }
  }
}

const useNotification = () => {
  const { notification } = useSelector(
    (state: RootState) => state.notifications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!notification.isInit) {
      const notificationClone = JSON.parse(JSON.stringify(notification));
      Store.addNotification(notificationClone);
      dispatch(notificationActions.endNotification());
    }
  }, [notification, dispatch]);
  return {};
};

export default useNotification;
