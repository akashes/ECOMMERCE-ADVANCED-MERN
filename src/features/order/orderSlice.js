
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
export const cancelOrder = createAsyncThunk('order/cancelOrder',async(id,{rejectWithValue})=>{
       try {
        const result = await axios.delete(`/api/order/cancel-order/${id}`)
        console.log(result)
            if(!result.data.success){
            throw new Error(result.data.message || 'Failed to Cancel order  ')
        }
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
        error:null,
        cancelOrderLoading:false,
        cancelledOrders:[]
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
                builder.addCase(cancelOrder.pending,(state)=>{
                    state.cancelOrderLoading=true
                    state.error=null
                })
                builder.addCase(cancelOrder.fulfilled,(state,action)=>{
                    state.cancelOrderLoading=false
                    state.error=null
                    state.cancelledOrders.push(action.payload.id)
let cancelledOrderIndex = state.orders.findIndex(o => o._id === action.payload.order._id)
if (cancelledOrderIndex !== -1) {
  state.orders[cancelledOrderIndex] = action.payload.order
}
                 

                })
                builder.addCase(cancelOrder.rejected,(state,action)=>{
                    state.cancelOrderLoading=false
                    state.error=action.payload || 'Failed to cancel Order'
                })
    }


})

export default orderSlice.reducer