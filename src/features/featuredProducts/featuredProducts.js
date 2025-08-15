import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching featured products
export const fetchFeaturedProducts = createAsyncThunk(
  "featuredProducts/fetchFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/product/get-all-featured-products`);
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const featuredProductsSlice = createSlice({
  name: "featuredProducts",
  initialState: {
    featuredProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload.featuredProducts
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default featuredProductsSlice.reducer;
