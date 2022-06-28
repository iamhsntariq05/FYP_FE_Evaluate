import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
// import { latestNotification } from "../store/Settings/notifications/selectors";

export function Notification() {
  console.log("Notification Rendered");
  // const notify = useSelector(latestNotification);
  const { enqueueSnackbar } = useSnackbar();

  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   if (notify) enqueueSnackbar(notify.message, notify.options);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [notify]);
  return <></>;
}
