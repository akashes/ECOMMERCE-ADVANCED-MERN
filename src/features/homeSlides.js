// categoryMenuSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHomeSlides = createAsyncThunk(
  'categoryMenu/fetchHomeSlides',
  async () => {
    const { data } = await axios.get('/api/homeSlides');
    console.log(data)
    return data;
  }
);

const HomeSlidesSlice = createSlice({
  name: 'categoryMenu',
  initialState: { homeSlides: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeSlides.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomeSlides.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.homeSlides = action.payload.homeSlides
      })
      .addCase(fetchHomeSlides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to fetch HomeSlides ';
      });
  },
});

export default HomeSlidesSlice.reducer;
