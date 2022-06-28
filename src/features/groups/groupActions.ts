import axios from "axios";
import {
  groupStart,
  groupSuccess,
  groupError,
  createGroupStart,
  createGroupSuccess,
  createGroupError,
  mygroupSuccess,
  mygroupError,
  mygroupStart,
  applyGroupStart,
  applyGroupSuccess,
  applyGroupError,
  withdrawGroupReqSuccess,
  withdrawGroupReqError,
  withdrawGroupReqStart,
  acceptGroupReqStart,
  acceptGroupReqSuccess,
  acceptGroupReqError,
  cancelGroupReqStart,
  cancelGroupReqSuccess,
  cancelGroupReqError,
} from "./groupSlice";

const API_URL = "http://localhost:8000/api";
const token = localStorage.getItem("token");

//create a Group
export function createGroup(obj: any) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(createGroupStart());
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data }: any = await axios.post(`${API_URL}/group`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(createGroupSuccess());
    } catch (error) {
      console.log(error);
      dispatch(createGroupError());
    }
  };
}

//getting all Groups
export function getAllGroups() {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(groupStart());
    try {
      const { data }: any = await axios.get(`${API_URL}/group`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      // return;
      const { groups } = data;
      // console.log(data);

      dispatch(groupSuccess(groups));
    } catch (error) {
      console.log(error);
      dispatch(groupError());
    }
  };
}
//getting my Group student.group
export function getMyGroup(id: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(mygroupStart());
    try {
      const { data }: any = await axios.get(`${API_URL}/group/my/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // return;
      const { group } = data;
      console.log("hereeee", data);
      if (!group) return;
      dispatch(mygroupSuccess(group));
      return group;
    } catch (error) {
      console.log(error);
      dispatch(mygroupError());
    }
  };
}
// Asynchronous thunk action
// apply for a project
export function joinRequestGroup(id: string, studentId: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(applyGroupStart());
    try {
      const { data }: any = await axios.patch(
        `${API_URL}/group/sendRequest/${id}`,
        {
          studentId: studentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      // return;
      // const { project } = data;
      dispatch(applyGroupSuccess());
    } catch (error: any) {
      // console.log("error", error);
      dispatch(applyGroupError(error.message));
    }
  };
}

// Asynchronous thunk action
// withdraw for a project
export function withdrawGroupRequest(id: string, studentId: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(withdrawGroupReqStart());
    try {
      const { data }: any = await axios.patch(
        `${API_URL}/group/withdrawRequest/${id}`,
        {
          studentId: studentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === "error") {
        dispatch(withdrawGroupReqError());
        return;
      }
      dispatch(withdrawGroupReqSuccess());
    } catch (error: any) {
      dispatch(withdrawGroupReqError());
    }
  };
}

// Asynchronous thunk action
// accept for a project
export function acceptGroupRequest(id: string, studentId: string, reqId: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(acceptGroupReqStart());
    try {
      const { data }: any = await axios.patch(
        `${API_URL}/group/acceptRequest/${id}`,
        {
          studentId: studentId,
          reqId: reqId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === "error") {
        dispatch(acceptGroupReqError());
        return;
      }
      dispatch(acceptGroupReqSuccess());
    } catch (error: any) {
      dispatch(acceptGroupReqError());
    }
  };
}
// Asynchronous thunk action
// reject for a project
export function rejectGroupRequest(id: string, studentId: string, reqId: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(cancelGroupReqStart());
    try {
      const { data }: any = await axios.patch(
        `${API_URL}/group/rejectRequest/${id}`,
        {
          studentId: studentId,
          reqId: reqId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === "error") {
        dispatch(cancelGroupReqError());
        return;
      }
      dispatch(cancelGroupReqSuccess());
    } catch (error: any) {
      dispatch(cancelGroupReqError());
    }
  };
}
