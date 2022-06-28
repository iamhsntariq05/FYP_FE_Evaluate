import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface NotificationsState {
  notification: any;
}

const initialState: NotificationsState = {
  notification: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    ENQUEUE_SNACKBAR: (state, { payload }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // cons ole.log(state);

      return {
        ...state,
        notification: [
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ...state.notification,
          payload,
        ],
      };
    },
    CLOSE_SNACKBAR: (state) => {
      return {
        ...state,
        notification: [],
      };
    },
    REMOVE_SNACKBAR: (state, { payload }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log(state.notifications, payload);

      return {
        ...state,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        notifications: state.notifications.filter((noti) => noti.key !== payload),
      };
    },
  },
});

// notification actions
export const { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } = notificationsSlice.actions;
// notification state
export const notificationsSelector = (state: RootState) => state.notifications.notification;
// notification reducer
export const notificationsReducer = notificationsSlice.reducer;
