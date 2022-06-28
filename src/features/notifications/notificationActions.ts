import { CLOSE_SNACKBAR, ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from "./notificationSlice";

export const enqueueSnackbar = (notification: { message: string; options: any }) => {
  return async (dispatch: (arg0: any) => void) => {
    const key = notification.options && notification.options.key;
    dispatch(
      ENQUEUE_SNACKBAR({
        ...notification,
        key: key || new Date().getTime() + Math.random(),
      })
    );
  };
};

export const closeSnackbar = () => {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(CLOSE_SNACKBAR());
  };
};

export const removeSnackbar = (notification: { message: string; options: any }, key: string) => {
  return async (dispatch: (arg0: any) => void) => {
    // const key = notification.options && notification.options.key;
    // const key = notification.options && notification.options.key;
    console.log(notification);

    dispatch(
      REMOVE_SNACKBAR({
        notification,
      })
    );
  };
};
