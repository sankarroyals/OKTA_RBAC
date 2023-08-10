import {createSlice} from '@reduxjs/toolkit';

export const buttonStatusSlice = createSlice({
  name: 'btnStatus',
  initialState: {
    value: '',
    status: '',
    page: '',
  },
  reducers: {
    changeButtonStatusValue: (state, action) => {
      state.value = action.payload;
    },
    changeBuyplanStatus: (state, action) => {
      state.status = action.payload;
    },
    changePageStatus: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const {changeButtonStatusValue, changeBuyplanStatus, changePageStatus} = buttonStatusSlice.actions;

export default buttonStatusSlice.reducer;
