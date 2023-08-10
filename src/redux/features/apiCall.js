/* eslint-disable camelcase */
/* eslint-disable max-len */
import {createSlice} from '@reduxjs/toolkit';
// import axios from 'axios';
import axiosInstance from '../../apis/axiosInstance';

export const apiCallSlice = createSlice(
    {
      name: 'apiCall',
      initialState: {
        apiValueDropdownData: [],
      },
      reducers: {

        callDropdownDataAPI: (state, action) => {
          state.apiValueDropdownData = action.payload;
        },
      }
    });



export const getDropDownData_API = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/home/getDropDownData').then((resp) => resp);
    dispatch(callDropdownDataAPI(response.data));
  } catch (err) {
    throw new Error(err);
  }
};


export const {callDropdownDataAPI} = apiCallSlice.actions;

// this is for configureStore
export default apiCallSlice.reducer;
