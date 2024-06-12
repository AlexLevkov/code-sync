import { useSelector, useDispatch } from "react-redux";
import { notificationActions } from "../app/store/slices/notifications-slice.ts";
import { Store } from "react-notifications-component";
import { useEffect } from "react";
import { RootState } from "../types.ts";

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
