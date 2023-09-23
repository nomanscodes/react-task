import { createSlice } from "@reduxjs/toolkit";

const modalCslice = createSlice({
  name: "modalC",
  initialState: false,
  reducers:{
    modalCOpen: state => true,
    modalCClose: state => false,
  }
});

  
export const { modalCClose, modalCOpen } = modalCslice.actions;
export default modalCslice.reducer;