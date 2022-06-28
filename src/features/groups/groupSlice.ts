import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IGroups } from "./groupTypes";

export interface IGroupSate {
  isProcessingRequest: boolean;
  gettingGroups?: boolean;
  groupsFailed?: boolean;
  groupsSuccessful?: boolean;
  groups?: IGroups[];
  // my group
  gettingGroup?: boolean;
  groupFailed?: boolean;
  groupSuccessful?: boolean;
  group?: any;
  // create group
  creatingGroup?: boolean;
  groupCreateFailed?: boolean;
  groupCreateSuccessful?: boolean;
  // apply group
  applyingGroup?: boolean;
  groupApplyFailed?: boolean;
  groupApplyFailedMessage?: string;
  groupApplySuccessful?: boolean;
  // withdraw group
  withdrawingGroup?: boolean;
  groupReqWithdrawFailed?: boolean;
  groupReqWithdrawSuccessful?: boolean;
  // accept group request
  acceptingGroupRequest?: boolean;
  groupReqAcceptFailed?: boolean;
  groupReqAcceptSuccessful?: boolean;
  // cancel group request
  cancellingGroupRequest?: boolean;
  groupReqCancelFailed?: boolean;
  groupReqCancelSuccessful?: boolean;
}

const initialState: IGroupSate = {
  isProcessingRequest: false,
  gettingGroups: false,
  groupsFailed: false,
  groupsSuccessful: false,
  groups: [],
  gettingGroup: false,
  groupFailed: false,
  groupSuccessful: false,

  group: null,
  // create group
  creatingGroup: false,
  groupCreateFailed: false,
  groupCreateSuccessful: false,
  applyingGroup: false,
  groupApplyFailed: false,
  groupApplySuccessful: false,
  groupApplyFailedMessage: "",
  // withdraw group
  withdrawingGroup: false,
  groupReqWithdrawFailed: false,
  groupReqWithdrawSuccessful: false,
  // accept group request
  acceptingGroupRequest: false,
  groupReqAcceptFailed: false,
  groupReqAcceptSuccessful: false,
  // cancel group request
  cancellingGroupRequest: false,
  groupReqCancelFailed: false,
  groupReqCancelSuccessful: false,
};
export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    groupStart: (state) => {
      return {
        ...state,
        gettingGroups: true,
      };
    },
    groupSuccess: (state, { payload }) => {
      return {
        ...state,
        gettingGroups: false,
        groupsSuccessful: true,
        groups: payload,
      };
    },
    groupError: (state) => {
      return {
        ...state,
        gettingGroups: false,
        groupsFailed: true,
      };
    },
    // my group
    mygroupStart: (state) => {
      return {
        ...state,
        gettingGroup: true,
      };
    },
    mygroupSuccess: (state, { payload }) => {
      return {
        ...state,
        gettingGroup: false,
        groupSuccessful: true,
        group: payload,
      };
    },
    mygroupError: (state) => {
      return {
        ...state,
        gettingGroup: false,
        groupFailed: true,
      };
    },
    // create group
    createGroupStart: (state) => {
      return {
        ...state,
        creatingGroup: true,
      };
    },
    createGroupSuccess: (state) => {
      return {
        ...state,
        creatingGroup: false,
        groupCreateSuccessful: true,
      };
    },
    createGroupError: (state) => {
      return {
        ...state,
        creatingGroup: false,
        groupCreateFailed: true,
      };
    },
    // apply for group
    applyGroupStart: (state) => {
      return {
        ...state,
        applyingGroup: true,
      };
    },
    applyGroupSuccess: (state) => {
      return {
        ...state,
        applyingGroup: false,
        groupApplySuccessful: true,
      };
    },
    applyGroupError: (state, { payload }) => {
      return {
        ...state,
        applyingGroup: false,
        groupApplyFailed: true,
        groupApplyFailedMessage: payload,
      };
    },
    // withdraw group request
    withdrawGroupReqStart: (state) => {
      return {
        ...state,
        withdrawingGroup: true,
      };
    },
    withdrawGroupReqSuccess: (state) => {
      return {
        ...state,
        withdrawingGroup: false,
        groupReqWithdrawSuccessful: true,
      };
    },
    withdrawGroupReqError: (state) => {
      return {
        ...state,
        withdrawingGroup: false,
        groupReqWithdrawFailed: true,
      };
    },
    // accept group request
    acceptGroupReqStart: (state) => {
      return {
        ...state,
        acceptingGroupRequest: true,
      };
    },
    acceptGroupReqSuccess: (state) => {
      return {
        ...state,
        acceptingGroupRequest: false,
        groupReqAcceptSuccessful: true,
      };
    },
    acceptGroupReqError: (state) => {
      return {
        ...state,
        acceptingGroupRequest: false,
        groupReqAcceptFailed: true,
      };
    },
    // cancel group request
    cancelGroupReqStart: (state) => {
      return {
        ...state,
        cancellingGroupRequest: true,
      };
    },
    cancelGroupReqSuccess: (state) => {
      return {
        ...state,
        cancellingGroupRequest: false,
        groupReqCancelSuccessful: true,
      };
    },
    cancelGroupReqError: (state) => {
      return {
        ...state,
        cancellingGroupRequest: false,
        groupReqCancelFailed: true,
      };
    },
  },
});
// group actions
export const {
  groupStart,
  groupSuccess,
  groupError,
  mygroupStart,
  mygroupSuccess,
  mygroupError,
  createGroupStart,
  createGroupSuccess,
  createGroupError,

  applyGroupStart,
  applyGroupSuccess,
  applyGroupError,

  withdrawGroupReqStart,
  withdrawGroupReqSuccess,
  withdrawGroupReqError,

  acceptGroupReqStart,
  acceptGroupReqSuccess,
  acceptGroupReqError,

  cancelGroupReqStart,
  cancelGroupReqSuccess,
  cancelGroupReqError,
} = groupSlice.actions;
// group state
export const groupSelector = (state: RootState) => state.group;
// group reducer
export const groupReducer = groupSlice.reducer;
