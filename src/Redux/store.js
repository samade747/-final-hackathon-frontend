import { configureStore } from "@reduxjs/toolkit";

import UserReducer from "./Slices/UserSlice.jsx";
import SignupUserSliceReducer from "./Slices/SignupUserSlice.jsx";

const store = configureStore(
  {
    reducer: {
      user: UserReducer,
      SignupUserSlice: SignupUserSliceReducer
    },
  },
  +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
