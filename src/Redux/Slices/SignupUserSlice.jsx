import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: "",
};

const signupUserSlice = createSlice({
  name: "signupUserSlice",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const actions = signupUserSlice.actions;

export const { signupStart, signupSuccess, signupFailure } = actions;

export default signupUserSlice.reducer;
