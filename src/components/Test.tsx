/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import {
  closeSnackbar,
  enqueueSnackbar,
  removeSnackbar,
} from "src/features/notifications/notificationActions";
import { notificationsSelector } from "src/features/notifications/notificationSlice";
import useNotifier from "src/features/notifications/useNotifier";

export const Test = () => {
  const notifications = useSelector(notificationsSelector);
  console.log("test", notifications);
  useNotifier();
  const dispatch = useDispatch();
  // @ts-ignore
  const enqueue = (...args) => dispatch(enqueueSnackbar(...args));
  // @ts-ignore
  const close = (...args) => dispatch(removeSnackbar(...args));

  const handleClick = () => {
    console.log("test", notifications);

    // NOTE:
    // if you want to be able to dispatch a `closeSnackbar` action later on,
    // you SHOULD pass your own `key` in the options. `key` can be any sequence
    // of number or characters, but it has to be unique for a given snackbar.
    enqueue({
      message: "Failed fetching data.",
      options: {
        key: new Date().getTime() + Math.random(),
        variant: "warning",
        // @ts-ignore
        action: (key) => <Button onClick={() => close(key)}>dismiss me</Button>,
      },
    });
    // dispatch(
    //   enqueueSnackbar({
    //     message: "Failed fetching data.",
    //     options: {
    //       key: new Date().getTime() + Math.random(),
    //       variant: "warning",
    //       // @ts-ignore
    //       action: (key) => <Button onClick={() => close(key)}>dismiss me</Button>,
    //     },
    //   })
    // );
  };

  const handleDimissAll = () => {
    // @ts-ignore
    close();
  };
  return (
    <div>
      {" "}
      <Fragment>
        <Typography variant="h4" gutterBottom>
          Notistack redux example
        </Typography>
        <Button variant="outlined" onClick={handleClick}>
          Display snackbar
        </Button>
        <Button variant="outlined" onClick={handleDimissAll}>
          Dismiss all snackbars
        </Button>
      </Fragment>
    </div>
  );
};
