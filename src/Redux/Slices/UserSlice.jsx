import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: "",
};

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = "";
    },
  },
});

const actions = userSlice.actions;

export const { loginStart, loginSuccess, loginFailure, logout,  } =
  actions;

export default userSlice.reducer;
