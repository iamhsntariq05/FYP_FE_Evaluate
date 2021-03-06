import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IProject } from "./projectTypes";

export interface IProjectSate {
  isProcessingRequest: boolean;
  gettingProjects?: boolean;
  projectsFailed?: boolean;
  projectsSuccessful?: boolean;
  projects?: IProject[];
  // get one project
  projectFailed?: boolean;
  projectSuccessful?: boolean;
  project?: IProject;
  // create project
  creatingProject?: boolean;
  projectCreateFailed?: boolean;
  projectCreateSuccessful?: boolean;
  // apply project
  applyingProject?: boolean;
  projectApplyFailed?: boolean;
  projectApplySuccessful?: boolean;
  // accept project req
  acceptingProjectReq?: boolean;
  projectReqAcceptFailed?: boolean;
  projectReqAcceptSuccessful?: boolean;
  // reject project req
  rejectingProjectReq?: boolean;
  projectReqRejectFailed?: boolean;
  projectReqRejectSuccessful?: boolean;
}
const initialState: IProjectSate = {
  isProcessingRequest: false,
  gettingProjects: false,
  projectsFailed: false,
  projectsSuccessful: false,
  projects: [],
  // get one project
  projectFailed: false,
  projectSuccessful: false,
  project: undefined,
  creatingProject: false,
  projectCreateFailed: false,
  projectCreateSuccessful: false,
  // apply project
  applyingProject: false,
  projectApplyFailed: false,
  projectApplySuccessful: false,
  // accept project req
  acceptingProjectReq: false,
  projectReqAcceptFailed: false,
  projectReqAcceptSuccessful: false,
  // reject project req
  rejectingProjectReq: false,
  projectReqRejectFailed: false,
  projectReqRejectSuccessful: false,
};
// name
// reducer
// actions
// caseReducers
export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    projectsStart: (state) => {
      return {
        ...state,
        gettingProjects: true,
      };
    },
    projectsSuccess: (state, { payload }) => {
      return {
        ...state,
        gettingProjects: false,
        projectsSuccessful: true,
        projects: payload,
      };
    },
    projectsError: (state) => {
      return {
        ...state,
        gettingProjects: false,
        projectsFailed: true,
      };
    },

    //getoneProject

    projectStart: (state) => {
      return {
        ...state,
        gettingProject: true,
      };
    },
    projectSuccess: (state, { payload }) => {
      return {
        ...state,
        gettingProject: false,
        projectSuccessful: true,
        project: payload,
      };
    },
    projectError: (state) => {
      return {
        ...state,
        gettingProject: false,
        projectFailed: true,
      };
    },

    // create project
    createProjectStart: (state) => {
      return {
        ...state,
        creatingProject: true,
      };
    },
    createProjectSuccess: (state) => {
      return {
        ...state,
        creatingProject: false,
        projectCreateSuccessful: true,
      };
    },
    createProjectError: (state) => {
      return {
        ...state,
        creatingProject: false,
        projectCreateFailed: true,
      };
    },
    // apply project
    applyProjectStart: (state) => {
      return {
        ...state,
        applyingProject: true,
      };
    },
    applyProjectSuccess: (state) => {
      return {
        ...state,
        applyingProject: false,
        projectApplySuccessful: true,
      };
    },
    applyProjectError: (state) => {
      return {
        ...state,
        applyingProject: false,
        projectApplyFailed: true,
      };
    },
    // accept project req
    acceptProjectReqStart: (state) => {
      return {
        ...state,
        acceptingProjectReq: true,
      };
    },
    acceptProjectReqSuccess: (state) => {
      return {
        ...state,
        acceptingProjectReq: false,
        projectReqAcceptSuccessful: true,
      };
    },
    acceptProjectReqError: (state) => {
      return {
        ...state,
        acceptingProjectReq: false,
        projectReqAcceptFailed: true,
      };
    },
    // reject project req
    rejectProjectReqStart: (state) => {
      return {
        ...state,
        rejectingProjectReq: true,
      };
    },
    rejectProjectReqSuccess: (state) => {
      return {
        ...state,
        rejectingProjectReq: false,
        projectReqRejectSuccessful: true,
      };
    },
    rejectProjectReqError: (state) => {
      return {
        ...state,
        rejectingProjectReq: false,
        projectReqRejectFailed: true,
      };
    },
  },
});
// student actions
export const {
  projectStart,
  projectSuccess,
  projectError,

  projectsStart,
  projectsSuccess,
  projectsError,
  createProjectStart,
  createProjectSuccess,
  createProjectError,
  // apply project
  applyProjectStart,
  applyProjectSuccess,
  applyProjectError,
  //  project req
  acceptProjectReqStart,
  acceptProjectReqSuccess,
  acceptProjectReqError,

  rejectProjectReqStart,
  rejectProjectReqSuccess,
  rejectProjectReqError,
} = projectSlice.actions;
// student state
export const projectSelector = (state: RootState) => state.project;
// student reducer
export const projectReducer = projectSlice.reducer;
