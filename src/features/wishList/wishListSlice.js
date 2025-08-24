import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const addToWishlist=createAsyncThunk('wishlist/addToWishlist',async(productId,{rejectWithValue})=>{
    try {
        const result = await axios.post(`/api/myList/add-to-mylist/${productId}`)
        if(!result.data.success){
            throw new Error(result.data.message || 'Failed to add item to Wishlist')
        }
        return result.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data?.message || error.message)
        
    }
})

export const getWishlistItems = createAsyncThunk('cart/getWishlistItems',async(_,{rejectWithValue})=>{
    try {
        const result = await axios.get(`/api/myList`)
        console.log(result)
           if(!result.data.success){
            throw new Error(result.data.message || 'Failed to get Wishlist Items')
        }
        return result.data
    } catch (error) {
        rejectWithValue(error.response?.data?.message || error.message)
        
    }
})

export const removeWishlistItem = createAsyncThunk('cart/removeWishlistItem',async(wishlistItemId,{rejectWithValue})=>{
    try {
        const result = await axios.delete(`/api/myList/remove-wishlist-item/${wishlistItemId}`)
        console.log(result)
            if(!result.data.success){
            throw new Error(result.data.message || 'Failed to remove wishlist Item  ')
        }
        console.log(result)
        return result.data
    } catch (error) {
      return  rejectWithValue(error.response?.data?.message || error.message)
        
    }
})

const wishList = createSlice({
    name:"wishlist",
    initialState:{
        wishlist:[],
        loading:false,
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(addToWishlist.pending,(state)=>{
            state.loading=true,
            state.error=null

        }),
        builder.addCase(addToWishlist.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
           state.wishlist.push(action.payload.item)


        }),
        builder.addCase(addToWishlist.rejected,(state,action)=>{
            state.loading=false
            state.error = action.payload || 'Failed to add item to Wishlist '

        }),
        builder.addCase(getWishlistItems.pending,(state)=>{
            state.loading=true,
            state.error=null

        }),
        builder.addCase(getWishlistItems.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
           state.wishlist=action.payload.items


        }),
        builder.addCase(getWishlistItems.rejected,(state,action)=>{
            state.loading=false
            state.error = action.payload || 'Failed to get Wishlist Items '

        })
        builder.addCase(removeWishlistItem.pending,(state)=>{
            state.loading=true,
            state.error=null

        }),
        builder.addCase(removeWishlistItem.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
           console.log(action.payload)
          state.wishlist= state.wishlist.filter(i=>i._id!==action.payload.itemId)


        }),
        builder.addCase(removeWishlistItem.rejected,(state,action)=>{
            state.loading=false
            state.error = action.payload || 'Failed to remove Wishlist Item '

        })

    }
})

export default wishList.reducer
