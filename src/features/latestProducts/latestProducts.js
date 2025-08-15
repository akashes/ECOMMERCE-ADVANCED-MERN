
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLatestProducts = createAsyncThunk(
  'latestProducts/fetchLatestProducts',
  async (_,{rejectWithValue}) => {
    try {
           const result = await axios.get(`/api/product/latest`);

           if(!result.data.success){
            throw new Error(result.data.message || 'Failed to fetch latest Products ')
        }
        return result.data
    } catch (error) {
        return rejectWithValue(error.response.data.message || error.message || 'Failed to fetch latest products')
        
    }

  }
);

const latestProductsSlice = createSlice({
  name: 'latestProducts',
  initialState: {
    latestProducts: [],
    loading: false,
    error: null
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLatestProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchLatestProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.latestProducts = action.payload.products
      })
      .addCase(fetchLatestProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default latestProductsSlice.reducer;
