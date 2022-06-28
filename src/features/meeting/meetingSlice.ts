import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IMeeting } from "./meetingTypes";

export interface IMeetingSate {
  isProcessingRequest: boolean;
  gettingMeetings?: boolean;
  meetingsFailed?: boolean;
  meetingsSuccessful?: boolean;
  meetings?: IMeeting[];
  // create Meeting
  creatingMeeting?: boolean;
  meetingCreateFailed?: boolean;
  meetingCreateSuccessful?: boolean;
  // update Meeting
  updatingMeeting?: boolean;
  meetingUpdateFailed?: boolean;
  meetingUpdateSuccessful?: boolean;
  // delete Meeting
  deletingMeeting?: boolean;
  meetingDeleteFailed?: boolean;
  meetingDeleteSuccessful?: boolean;
  //verify Meeting
  verifyingMeeting?: boolean;
  meetingVerifyingFailed?: boolean;
  meetingVerifyingSuccessful?: boolean;
}
const initialState: IMeetingSate = {
  isProcessingRequest: false,
  gettingMeetings: false,
  meetingsFailed: false,
  meetingsSuccessful: false,
  meetings: [],
  // create Meeting
  creatingMeeting: false,
  meetingCreateFailed: false,
  meetingCreateSuccessful: false,
  // update Meeting
  updatingMeeting: false,
  meetingUpdateFailed: false,
  meetingUpdateSuccessful: false,
  // delete Meeting
  deletingMeeting: false,
  meetingDeleteFailed: false,
  meetingDeleteSuccessful: false,
  //verify Meeting
  verifyingMeeting: false,
  meetingVerifyingFailed: false,
  meetingVerifyingSuccessful: false,
};
// name
// reducer
// actions
// caseReducers
export const meetingSlice = createSlice({
  name: "Meeting",
  initialState,
  reducers: {
    meetingStart: (state) => {
      return {
        ...state,
        gettingMeetings: true,
      };
    },
    meetingSuccess: (state, { payload }) => {
      return {
        ...state,
        gettingMeetings: false,
        meetingsSuccessful: true,
        meetings: payload,
      };
    },
    meetingError: (state) => {
      return {
        ...state,
        gettingMeetings: false,
        meetingsFailed: true,
      };
    },
    // create Meeting
    createMeetingStart: (state) => {
      return {
        ...state,
        creatingMeeting: true,
      };
    },
    createMeetingSuccess: (state) => {
      return {
        ...state,
        creatingMeeting: false,
        meetingCreateSuccessful: true,
      };
    },
    createMeetingError: (state) => {
      return {
        ...state,
        creatingMeeting: false,
        meetingCreateFailed: true,
      };
    },
    // update Meeting
    updateMeetingStart: (state) => {
      return {
        ...state,
        updatingMeeting: true,
      };
    },
    updateMeetingSuccess: (state) => {
      return {
        ...state,
        updatingMeeting: false,
        meetingDeleteSuccessful: true,
      };
    },
    updateMeetingError: (state) => {
      return {
        ...state,
        updatingMeeting: false,
        meetingUpdateFailed: true,
      };
    },
    // delete Meeting
    deleteMeetingStart: (state) => {
      return {
        ...state,
        deletingMeeting: true,
      };
    },
    deleteMeetingSuccess: (state) => {
      return {
        ...state,
        deletingMeeting: false,
        meetingDeleteSuccessful: true,
      };
    },
    deleteMeetingError: (state) => {
      return {
        ...state,
        deletingMeeting: false,
        meetingDeleteFailed: true,
      };
    },

    // verify Meeting
    verifyingMeetingStart: (state) => {
      return {
        ...state,
        verifyingMeeting: true,
      };
    },
    verifyingMeetingSuccess: (state) => {
      return {
        ...state,
        verifyingMeeting: false,
        meetingVerifyingSuccessful: true,
      };
    },
    verifyingMeetingError: (state) => {
      return {
        ...state,
        verifyingMeeting: false,
        meetingVerifyingFailed: true,
      };
    },
    changeMeetingState: (state, action) => {
      console.log("action", action);
      debugger;
      return {
        ...state,
        meetings: state.meetings?.map((it: IMeeting) => {
          if (it._id === action.payload._id) {
            return action.payload;
          }
          return it;
        }),
      };
    },
  },
});
// student actions
export const {
  meetingStart,
  meetingSuccess,
  meetingError,
  createMeetingStart,
  createMeetingSuccess,
  createMeetingError,
  // update
  updateMeetingStart,
  updateMeetingSuccess,
  updateMeetingError,
  // delete
  deleteMeetingStart,
  deleteMeetingSuccess,
  deleteMeetingError,
  // verify
  verifyingMeetingStart,
  verifyingMeetingSuccess,
  verifyingMeetingError,
  changeMeetingState,
} = meetingSlice.actions;
// student state
export const meetingSelector = (state: RootState) => state.meeting;
// student reducer
export const meetingReducer = meetingSlice.reducer;
