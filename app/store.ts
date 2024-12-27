// src/store.ts
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Initial form state
const initialState = {
  phoneNumber: "",
  otp: "",
};

// Redux slice to handle form data
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    resetForm: (state) => {
      state.phoneNumber = "";
      state.otp = "";
    },
  },
});

export const { setPhoneNumber, setOtp, resetForm } = formSlice.actions;

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
});

export default store;
