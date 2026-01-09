import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch single product details
export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/product/get-product/${id}`);
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);
export const addReview = createAsyncThunk(
  "product/addReview",
  async ({productId,rating,comment,userId}, { rejectWithValue }) => {
    console.log(productId,rating,comment,userId)
    try {
      const response = await axios.post(`/api/product/add-review/${productId}`,{rating,comment});
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to Add Review"
      );
    }
  }
);

export const getRelatedProducts=createAsyncThunk("product/getRelatedProducts",async(productId,{rejectWithValue})=>{
    try {
        const result = await axios.get(`/api/product/related-products/${productId}`)
        return result.data
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || "Failed to fetch Related Products"
        )
        
    }
})

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    loading: false,
    error: null,
    reviewLoading:false,
    relatedProducts:[],
    relatedProductsLoading:false
  },
  reducers: {
    clearProduct: (state) => {
      state.product = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product; 
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addReview.pending, (state) => {
        state.reviewLoading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.error=null
        state.product = action.payload.product

    //     if(state.product){
    //         const{productId,rating,comment,userId}=action.meta.arg

    //         const existingUser = state.product.reviews.find(r=>r.user._id === userId)

    //         if(existingUser){
    //             existingUser.rating=rating,
    //             existingUser.comment=comment
    //         }else{
    //             state.product.reviews.push({
    //                 userId,
    //                 rating,
    //                 comment,
    //                 createdAt:new Date().toISOString()
    //             })
    //             state.product.numReviews+=1
    //         }
    //         const total = state.product.reviews.reduce((acc, r) => acc + r.rating, 0);
    // state.product.rating = total / state.product.reviews.length;

    //     }
      })
      .addCase(addReview.rejected, (state, action) => {
        state.reviewLoading = false;
        state.error = action.payload;
      })
      .addCase(getRelatedProducts.pending,(state)=>{
        state.relatedProductsLoading=true
        state.relatedProducts=[]
        state.error=null
      })
      .addCase(getRelatedProducts.fulfilled,(state,action)=>{
        state.relatedProductsLoading=false
        state.relatedProducts = action.payload.products
      })
      .addCase(getRelatedProducts.rejected,(state,action)=>{
        state.relatedProductsLoading=false
        state.error=action.payload
      })
  },
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
