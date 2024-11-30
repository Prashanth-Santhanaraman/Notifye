import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice'; // Adjust the path

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
