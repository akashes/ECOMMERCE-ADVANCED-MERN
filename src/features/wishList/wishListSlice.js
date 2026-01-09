import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";


export const addToWishlist=createAsyncThunk('wishlist/addToWishlist',async({productId,user},{rejectWithValue})=>{
    console.log('inside add to wishlist')
            if(!user){
            //guest
              let localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (!localWishlist.includes(productId)) {
        localWishlist.push(productId);
        localStorage.setItem("wishlist", JSON.stringify(localWishlist));

    }
    return {local:true,productId}
    }
    try {



        const result = await axios.post(`/api/myList/add-to-mylist/${productId}`)
        console.log(result.data)
        if(!result.data.success){
            throw new Error(result.data.message || 'Failed to add item to Wishlist')
        }
        return result.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data?.message || error.message)
        
    }
})

export const getWishlistItems = createAsyncThunk('cart/getWishlistItems',async(user,{rejectWithValue,dispatch})=>{
    console.log(user)
        if (!user) {
      const localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      console.log(localWishlist)
      if(localWishlist.length>0){
          const { data } = await axios.post("/api/myList/by-ids", { ids: localWishlist });
          console.log(data)
              const formatted = data.products.map(p => ({
    _id: p._id,
    productId: p // so it matches the server response shape
  }));

  console.log(formatted)

  

          return {local:true,items:formatted}
//    dispatch(setWishlistReducer(formatted))
      }
    }



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

export const removeWishlistItem = createAsyncThunk('cart/removeWishlistItem',async({wishlistItemId,user},{rejectWithValue})=>{
       if (!user) { 
        console.log(wishlistItemId)
      // Guest user 
      let localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      console.log(localWishlist)
      localWishlist = localWishlist.filter(id => id !== wishlistItemId);
      console.log(localWishlist)
      localStorage.setItem("wishlist", JSON.stringify(localWishlist));

      // Update redux directly
    //   dispatch(removeFromWishlistReducer(wishlistItemId));

      return { local: true, itemId: wishlistItemId };
    }
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
            setWishlistReducer: (state, action) => {
                console.log('inside setWishlistReducer')
                console.log(action.payload)
      state.wishlist = action.payload;
    },
    addToWishlistReducer: (state, action) => {
      state.wishlist.push(action.payload);
    },
    removeFromWishlistReducer: (state, action) => {
      state.wishlist = state.wishlist.filter(
        item => item._id !== action.payload
      );

    },
    clearWishlistReducer:(state)=>{
        state.wishlist=[],
        state.loading=false,
        state.error=null
    }
},
    extraReducers:(builder)=>{
        builder.addCase(addToWishlist.pending,(state)=>{
            state.loading=true,
            state.error=null

        }),
        builder.addCase(addToWishlist.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
            if(action.payload.local){
                state.wishlist.push({_id:action.payload.productId,guest:true})
            }else{

                state.wishlist.push(action.payload.item)
            }


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
        
           state.wishlist=action.payload?.items


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

          state.wishlist= state.wishlist.filter(i=>i._id!==action.payload.itemId)


        }),
        builder.addCase(removeWishlistItem.rejected,(state,action)=>{
            state.loading=false
            state.error = action.payload || 'Failed to remove Wishlist Item '

        })

    }
})

export const{setWishlistReducer,addToWishlistReducer,removeFromWishlistReducer,clearWishlistReducer}= wishList.actions
export default wishList.reducer
