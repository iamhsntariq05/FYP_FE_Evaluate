import axios from "axios";
import {
  createMeetingError,
  createMeetingStart,
  createMeetingSuccess,
  deleteMeetingError,
  deleteMeetingStart,
  deleteMeetingSuccess,
  meetingError,
  meetingStart,
  meetingSuccess,
  updateMeetingError,
  updateMeetingStart,
  updateMeetingSuccess,
  verifyingMeetingStart,
  verifyingMeetingSuccess,
  verifyingMeetingError,
  changeMeetingState,
} from "./meetingSlice";

const API_URL = "http://localhost:8000/api";
const token = localStorage.getItem("token");

// http://localhost:8000/api/meeting
// Asynchronous thunk action
// getting all Meetings
export function getAllMeetings() {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(meetingStart());
    try {
      const { data }: any = await axios.get(`${API_URL}/meeting`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      // return;
      const { meetings } = data;
      // console.log(data);

      dispatch(meetingSuccess(meetings));
    } catch (error) {
      console.log("error", error);
      dispatch(meetingError());
    }
  };
}
// Asynchronous thunk action
// create a Meeting
export function createMeeting(obj: any) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(createMeetingStart());
    try {
      const { data }: any = await axios.post(`${API_URL}/meeting`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      // return;
      // const { Meeting } = data;
      dispatch(createMeetingSuccess());
    } catch (error) {
      console.log("error", error);
      dispatch(createMeetingError());
    }
  };
}
// Asynchronous thunk action
// update a meeting
export function updateMeeting(obj: any, id: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(updateMeetingStart());
    try {
      // send form data to the backend
      // const formData = new FormData();
      // formData.append("file", obj.file);
      // formData.append("meeting", obj.meeting);
      // formData.append("title", obj.title);
      const { data }: any = await axios.patch(`${API_URL}/meeting/${id}`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // const { meeting } = data;
      dispatch(updateMeetingSuccess());
    } catch (error) {
      console.log("error", error);
      dispatch(updateMeetingError());
    }
  };
}
// Asynchronous thunk action
// delete a meeting
export function deleteMeeting(id: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(deleteMeetingStart());
    try {
      const { data }: any = await axios.delete(`${API_URL}/meeting/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // const { meeting } = data;
      dispatch(deleteMeetingSuccess());
    } catch (error) {
      console.log("error", error);
      dispatch(deleteMeetingError());
    }
  };
}

//verify a meeting
export function verifyMeeting(id: any) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(verifyingMeetingStart());
    try {
      //  console.log("the id in FE", id);
      const { data }: any = await axios.patch(`${API_URL}/meeting/verify/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // const { meeting } = data;
      // console.log(data);
      dispatch(changeMeetingState(data.meeting));
    } catch (error) {
      console.log("error", error);
      dispatch(verifyingMeetingError());
    }
  };
}
