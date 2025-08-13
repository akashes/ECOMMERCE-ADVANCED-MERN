// categoryMenuSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMenuCategories = createAsyncThunk(
  'categoryMenu/fetchMenuCategories',
  async () => {
    const { data } = await axios.get('/api/category');
    return data;
  }
);

const categoryMenuSlice = createSlice({
  name: 'categoryMenu',
  initialState: { categories: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenuCategories.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.categories = action.payload.categories
      })
      .addCase(fetchMenuCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to fetch Category details';
      });
  },
});

export default categoryMenuSlice.reducer;
