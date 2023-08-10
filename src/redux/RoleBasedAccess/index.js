/* eslint-disable max-len */
/* user role based access control for whole application*/
import {createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../apis/axiosInstance';


export const RoleBasedAccessControl = createSlice({
  name: 'roleBasedAccessContol',
  initialState: {
    userId: null,
    // currentRole: null,
    currentRoleId: null,
    availableRoles: [],
    error: false,
    errorMsg: null,
    functionalityAccess: null,
    functionalityAccessFetchDone: false,
    fetchingRoleAccess: null,
    noAccessRoles: false,
  },
  reducers: {
    changeCurrentRole: (state, action) => {
      state.currentRoleId=action.payload;
      axiosInstance.customFnUpdateAxiosHeader(action.payload);
    },
    saveUserRoleData: (state, action) => {
      if (action.payload.roles) {
        state.availableRoles=action.payload.roles;
        state.userId=action.payload.userId;
        state.userName=action.payload.userName;
        if (action.payload.roles.length===1) {
          // console.log('roles payload ', action.payload);
          // state.currentRole=action.payload.roles[0].role;
          state.currentRoleId=action.payload.roles[0].role_id;
          axiosInstance.customFnUpdateAxiosHeader(action.payload.roles[0].role_id);
        }
      } else {
        state.fetchingRoleAccess=false;
        state.error=true;
        state.errorMsg=`You don't have any role assigned. Please contact administrator.`;
        state.noAccessRoles=true;
      }
    },
    saveFunctionalityAccess: (state, action) => {
      state.functionalityAccess=action.payload;
      state.fetchingRoleAccess=false;
      state.functionalityAccessFetchDone=true;
    },
    roleApiCallStarted: (state, action) => {
      state.fetchingRoleAccess=true;
    },
    apiFailed: (state, action) => {
      state.fetchingRoleAccess=false;
      state.error=true;
      state.errorMsg=action.payload;
    },
  },
});

export const changeRoleHandler = (role) => async (dispatch) => {
  // console.log('@RBAC changeRoleHandler', role);
  dispatch(changeCurrentRole(role));
};


export const getUserRoles = () => async (dispatch) => {
  // console.log('@pep06 getUserRoles');
  dispatch(roleApiCallStarted());
  axiosInstance.get(`/home/roles`)
      .then((resp) => {
        // console.log('@getUserRoles resp.data', resp.data);
        dispatch(saveUserRoleData(resp.data));
      })
      .catch((err) => {
        dispatch(apiFailed(err));
        console.error('getUserRoles api err : ', err);
      });
};

export const getFunctionalityAccess = (roleId) => async (dispatch) => {
  // console.log('@pep06 getFunctionalityAccess', roleId);
  axiosInstance.get(`/home/functionalities?roleId=${roleId}`)
      .then((resp) => {
        // console.log('@pep06 getFunctionalityAccess resp.data', resp.data);
        dispatch(saveFunctionalityAccess(resp.data));
      })
      .catch((err) => {
        dispatch(apiFailed(err));
        console.error('@pep06 getFunctionalityAccess api err : ', err);
      });
};

export const {
  changeCurrentRole,
  saveUserRoleData,
  saveFunctionalityAccess,
  apiFailed,
  roleApiCallStarted,
} = RoleBasedAccessControl.actions;

// this is for configureStore
export default RoleBasedAccessControl.reducer;
