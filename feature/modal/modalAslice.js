import { createSlice } from "@reduxjs/toolkit";


const modalAslice = createSlice({
    name: 'modalA',
    initialState: false,
    reducers: {
      modalAOpen: state => true,
      modalAClose: state => false,
    },
  });
  
  export const { modalAOpen, modalAClose } = modalAslice.actions;
  export default modalAslice.reducer;