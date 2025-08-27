
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const getOrders = createAsyncThunk('order/getOrders',async(_,{rejectWithValue})=>{
       try {
        const result = await axios.get(`/api/payment/get-orders`)
            if(!result.data.success){
            throw new Error(result.data.message || 'Failed to get orders  ')
        }
        console.log(result)
        return result.data
    } catch (error) {
      return  rejectWithValue(error.response?.data?.message || error.message)
        
    }

})



const orderSlice = createSlice({
    name:"order",
    initialState:{
        loading:false,
        orders:[],
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
                builder.addCase(getOrders.pending,(state)=>{
                    state.loading=true
                    state.error=null
                })
                builder.addCase(getOrders.fulfilled,(state,action)=>{
                    state.loading=false
                    state.orders=action.payload.orders
                    state.error=null
                })
                builder.addCase(getOrders.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.payload || 'Failed to get Orders'
                })
    }


})

export default orderSlice.reducer