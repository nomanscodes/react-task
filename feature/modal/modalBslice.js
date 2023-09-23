import { createSlice } from "@reduxjs/toolkit";


const modalBslice = createSlice({
    name: 'modalB',
    initialState: false,
    reducers: {
      modalBOpen: state => true,
      modalBClose: state => false,
    },
  });
  
  export const { modalBOpen, modalBClose } = modalBslice.actions;
  export default modalBslice.reducer;