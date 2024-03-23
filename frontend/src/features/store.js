
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice'

import docReducer from './docs/docSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    docs:docReducer
  },
});
export default store;
