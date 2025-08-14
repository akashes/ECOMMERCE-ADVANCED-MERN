// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../features/user/userSlice.js'
import categoryReducer from '../../features/category/categoryMenuSlice.js'
import homeSlidesReducer from '../../features/homeSlides.js'
import popularProductsByCategoryReducer from '../../features/popularProducts/popularProducts.js'
export const store = configureStore({
  reducer: {
    user:userReducer,
    category:categoryReducer,
    homeSlides:homeSlidesReducer,
    popularProducts:popularProductsByCategoryReducer
  },
});
