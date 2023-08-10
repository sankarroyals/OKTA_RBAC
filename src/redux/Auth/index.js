/* eslint-disable max-len */
/* for target screen api call and managing the global store data using redux store*/
import {createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../apis/axiosInstance';

export const Authorizations = createSlice({
  name: 'authorization',
  initialState: {
    isAuthenticated: false,
    accessToken: null,
    idToken: null,
    authState: null,
  },
  reducers: {

    setAuthState: (state, action) => {
      if (action.payload && action.payload.isAuthenticated && action.payload.accessToken) {
        axiosInstance.customFnAddTokenInHeader(action.payload.accessToken.accessToken);
        state.authState=action.payload;
        state.isAuthenticated=action.payload.isAuthenticated;
        state.idToken=action.payload.idToken.idToken;
        state.accessToken=action.payload.accessToken.accessToken;
        // now update the axois instance header

        // axiosInstance.customFnUpdateAxiosHeader(3);
      }
    },
    setAccessToken: (state, action)=>{
      if (action.payload && action.payload.accessToken) {
        // console.log('setAccessToken ----- action.payload', action.payload);
        axiosInstance.customFnAddTokenInHeader(action.payload.accessToken);
        state.accessToken=action.payload.accessToken;
      }
    },
  },
});

// called on getting new accessToken
export const updateAccessToken = (accessToken) => async (dispatch) => {
  // console.log('@pep13 updateaccessToken', accessToken);
  if (accessToken) {
    dispatch(setAccessToken(accessToken));
  }
};

export const updateAuthState = (authState) => async (dispatch) => {
//   console.log('@pep13 updateAuthState', authState);
  if (authState) {
    dispatch(setAuthState(authState));
  }
};

export const {
  setAuthState,
  setAccessToken,
} = Authorizations.actions;

// this is for configureStore
export default Authorizations.reducer;
