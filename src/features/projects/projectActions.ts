import axios from "axios";
import {
  createProjectError,
  createProjectStart,
  createProjectSuccess,
  projectsError,
  projectsStart,
  projectsSuccess,
  applyProjectStart,
  applyProjectSuccess,
  applyProjectError,
  rejectProjectReqStart,
  rejectProjectReqSuccess,
  rejectProjectReqError,
  acceptProjectReqStart,
  acceptProjectReqError,
  acceptProjectReqSuccess,
  projectStart,
  projectSuccess,
  projectError,
} from "./projectSlice";

const API_URL = "http://localhost:8000/api";
const token = localStorage.getItem("token");

// http://localhost:8000/api/project
// Asynchronous thunk action
// getting all projects
export function getAllProjects() {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(projectsStart());
    try {
      const { data }: any = await axios.get(`${API_URL}/project`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      // return;
      const { projects } = data;
      // console.log(data);

      dispatch(projectsSuccess(projects));
    } catch (error) {
      console.log(error);
      dispatch(projectsError());
    }
  };
}
// Asynchronous thunk action
// getting all projects
export function getOneProject(id: any) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(projectStart());
    try {
      const { data }: any = await axios.get(`${API_URL}/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // return;
      const { project } = data;
      // console.log(data);

      dispatch(projectSuccess(project));
      return data.project;
    } catch (error) {
      console.log(error);
      dispatch(projectError());
    }
  };
}
// Asynchronous thunk action
// create a project
export function createProject(obj: any) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(createProjectStart());
    try {
      const { data }: any = await axios.post(`${API_URL}/project`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      // return;
      // const { project } = data;
      dispatch(createProjectSuccess());
    } catch (error) {
      console.log(error);
      dispatch(createProjectError());
    }
  };
}
// Asynchronous thunk action
// apply a project
export function applyStudentProject(id: string, groupId: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(applyProjectStart());
    try {
      const { data }: any = await axios.patch(
        `${API_URL}/project/apply/${id}`,
        {
          groupId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(data);
      // return;
      // const { project } = data;
      dispatch(applyProjectSuccess());
    } catch (error) {
      console.log("error", error);
      dispatch(applyProjectError());
    }
  };
}
// Asynchronous thunk action
export function acceptRequestStudentProject(id: string, groupId: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(acceptProjectReqStart());
    try {
      const { data }: any = await axios.patch(
        `${API_URL}/project/projectRequest/accept/${id}`,
        {
          groupId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === "error") {
        dispatch(acceptProjectReqError());
        return;
      }
      dispatch(acceptProjectReqSuccess());
    } catch (error) {
      console.log("error", error);
    }
  };
}
// Asynchronous thunk action
export function rejectRequestStudentProject(id: string, groupId: string) {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(rejectProjectReqStart());
    try {
      const { data }: any = await axios.patch(
        `${API_URL}/project/projectRequest/reject/${id}`,
        {
          groupId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === "error") {
        dispatch(rejectProjectReqError());
        return;
      }
      dispatch(rejectProjectReqSuccess());
    } catch (error) {
      console.log("error", error);
      dispatch(rejectProjectReqError());
    }
  };
}
