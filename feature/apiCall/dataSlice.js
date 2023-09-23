import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("contact_data/fetchData", async () => {
  const res = await axios.get(`https://contact.mediusware.com/api/contacts/`);
  return res.data;
});

const dataSlice = createSlice({
  name: "contact_data",
  initialState: {
    isLoading: false,
    data: [],
    errro: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.errro = null;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.errro = action.payload;
    });
  },
});

export default dataSlice.reducer;
