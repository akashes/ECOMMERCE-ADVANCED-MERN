// categoryMenuSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBannerV1 = createAsyncThunk(
  'bannerV1/fetchBannerV1',
  async (_, { rejectWithValue }) => {
    try {
      console.log('INSIDE FETCH BANNER')
      const { data } = await axios.get(import.meta.env.VITE_API_URL);
      return data;
    } catch (err) {
        console.log(err)
      return rejectWithValue(err.response?.data || { message: 'Network error' });
    }
  }
);


const BannerV1Slice = createSlice({
  name: 'bannerV1',
  initialState: { banners: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBannerV1.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBannerV1.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.banners = action.payload.banners
      })
      .addCase(fetchBannerV1.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to fetch Banners ';
      });
  },
});

export default BannerV1Slice.reducer;
