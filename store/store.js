import { configureStore } from "@reduxjs/toolkit";
import modalAslice from "../feature/modal/modalASlice";
import modalBslice from "../feature/modal/modalBslice";
import modalCslice from "../feature/modal/modalCslice";
import dataSlice from "../feature/apiCall/dataSlice";


const store = configureStore({
  reducer: {
    modalAslice: modalAslice,
    modalBslice: modalBslice,
    modalCslice: modalCslice,
    dataSlice: dataSlice,
  },
});

export default store;
