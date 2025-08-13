// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../features/user/userSlice.js'
import categoryReducer from '../../features/category/categoryMenuSlice.js'
export const store = configureStore({
  reducer: {
    user:userReducer,
    category:categoryReducer
  },
});
