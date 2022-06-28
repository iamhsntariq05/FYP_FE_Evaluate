import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SnackbarKey, useSnackbar } from "notistack";
import { closeSnackbar, enqueueSnackbar, removeSnackbar } from "./notificationActions";
import { notificationsSelector } from "./notificationSlice";

let displayed: any[] = [];

const useNotifier = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const notifications = useSelector(notificationsSelector);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: any) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
      if (dismissed) {
        console.log("here");

        // dismiss snackbar using notistack
        dispatch(removeSnackbar(message, key));
        return;
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(key)) return;

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, myKey) => {
          console.log("kkk");

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (options.onClose) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (_event, myKey) => {
          // remove this snackbar from redux store
          // dispatch(removeSnackbar(message, key));
          removeDisplayed(myKey);
        },
      });

      // keep track of snackbars that we've displayed
      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, removeSnackbar, dispatch]);
};

export default useNotifier;
