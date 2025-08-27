import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productId,{rejectWithValue})=>{
    try {
      const result = await axios.post(`/api/cart/add-to-cart/${productId}`);
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getCartItems = createAsyncThunk('cart/getCartItems',async(_,{rejectWithValue})=>{
    try {
        const result = await axios.get(`/api/cart`)
        return result.data
    } catch (error) {
        rejectWithValue(error.response?.data?.message || error.message)
        
    }
})
export const updateCart = createAsyncThunk('cart/updateCart',async({cartItemId,quantity},{rejectWithValue})=>{
    try {
        const result = await axios.put(`/api/cart/update-cart`,{cartItemId,quantity})
        console.log(result)
            if(!result.data.success){
            throw new Error(result.data.message || 'Failed to update cartItem quantity ')
        }
        console.log(result)
        return result.data
    } catch (error) {
       return rejectWithValue(error.response?.data?.message || error.message)
        
    }
})
export const removeCartItem = createAsyncThunk('cart/removeCartItem',async(cartItemId,{rejectWithValue})=>{
    try {
        const result = await axios.delete(`/api/cart/remove-cart-item/${cartItemId}`)
            if(!result.data.success){
            throw new Error(result.data.message || 'Failed to remove cartItem  ')
        }
        console.log(result)
        return result.data
    } catch (error) {
      return  rejectWithValue(error.response?.data?.message || error.message)
        
    }
})
export const deleteCart = createAsyncThunk('cart/deleteCart',async(_,{rejectWithValue})=>{
    try {
        const result = await axios.delete(`/api/cart/clear-cart`)
            if(!result.data.success){
            throw new Error(result.data.message || 'Failed to remove cart  ')
        }
        console.log(result)
        return result.data
    } catch (error) {
      return  rejectWithValue(error.response?.data?.message || error.message)
        
    }
})


  


const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:[],
        loading:false,
        error:null,
        cartUpdationLoading:false,
        cartUpdatingItem:null

    },
    reducers:{
        setCartQuantity:(state,action)=>{
            state.cart.find((item)=>item._id ===action.payload.cartItemId).quantity=action.payload.quantity
        },
        clearCart:(state)=>{
            state.cart=[],
            state.loading=false,
            state.error=null,
            state.cartUpdatingItem=null,
            state.cartUpdationLoading=false
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(addToCart.pending,(state,action)=>{
            state.cartUpdationLoading=true
            state.error=null
                  state.cartUpdatingItem = action.meta.arg; 

        })
        builder.addCase(addToCart.fulfilled,(state,action)=>{
            state.cartUpdatingItem=null
            state.cartUpdationLoading=false
            console.log(action.payload)
            if(action.payload.cartItem){

                state.cart.push(action.payload.cartItem)
            }
            state.error=null
        })
        builder.addCase(addToCart.rejected,(state,action)=>{
            state.cartUpdatingItem=null
            state.cartUpdationLoading=false
            console.log(action.payload)
            state.error=action.payload || "Product already in Cart"
        })
        builder.addCase(getCartItems.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(getCartItems.fulfilled,(state,action)=>{
            state.loading=false
            state.cart=action.payload.cartItems
            state.error=null
        })
        builder.addCase(getCartItems.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload || 'Failed to get Cart Items'
        })
        builder.addCase(updateCart.pending,(state,action)=>{
            state.cartUpdatingItem=action.meta.arg.cartItemId
            state.cartUpdationLoading=true
            state.error=null
        })
        builder.addCase(updateCart.fulfilled,(state,action)=>{
                  state.cartUpdatingItem = null;

            state.cartUpdationLoading=false
            const {cartItemId}=action.meta.arg
            console.log(cartItemId)
            state.cart.find((item)=>item._id ===cartItemId).quantity=action.payload.quantity
            state.error=null
        })
        builder.addCase(updateCart.rejected,(state,action)=>{
                  state.cartUpdatingItem = null;

            state.cartUpdationLoading=false
            
            state.error=action.payload || 'Failed to update cart item'
        })
        builder.addCase(removeCartItem.pending,(state,action)=>{
                        state.cartUpdatingItem=action.meta.arg.cartItemId

            state.cartUpdationLoading=true
            state.error=null
        })
        builder.addCase(removeCartItem.fulfilled,(state,action)=>{
                              state.cartUpdatingItem = null;

            state.cartUpdationLoading=false
            console.log(action.payload.id)
  state.cart = state.cart.filter((item) => item._id !== action.payload.id);
            state.error=null
        })
        builder.addCase(removeCartItem.rejected,(state,action)=>{
                              state.cartUpdatingItem = null;

            state.cartUpdationLoading=false
            
            state.error=action.payload || 'Failed to remove cart item'
        })
        builder.addCase(deleteCart.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(deleteCart.fulfilled,(state,action)=>{
            state.loading=false
            state.cart=[]
            state.error=null
        })
        builder.addCase(deleteCart.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload || 'Failed to clear cart'
        })
    }
})

export const {setCartQuantity,clearCart}=cartSlice.actions
export default cartSlice.reducer
