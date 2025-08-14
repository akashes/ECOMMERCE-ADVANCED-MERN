import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const fetchPopularProductsByCategory=createAsyncThunk('popularProducts/fetchPopularProductsByCategory',async(categoryId,{rejectWithValue})=>{
    try {
        const result = await axios.get(`/api/product/get-popular-products-by-category/${categoryId}`)
        console.log(result)
        if(!result.data.success){
            throw new Error(result.data.message || 'Failed to fetch Popular Products ')
        }
        return result.data
        
    } catch (error) {
        console.log(error)

        return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch Popular products')
    }
})


const popularProductsSlice=createSlice({
    name:'popularProducts',
    initialState:{
        productsByCategory:{}, //id:product
        loading:false,
        error:null
    },
    reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularProductsByCategory.fulfilled, (state, action) => {
        const { categoryId, products } = action.payload;
        console.log(categoryId,products)
        state.productsByCategory[categoryId] = products;
        state.loading = false;
      })
      .addCase(fetchPopularProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to Fetch Popular Products ';
      });
    }
})


export default popularProductsSlice.reducer