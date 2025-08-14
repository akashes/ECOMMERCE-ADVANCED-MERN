import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name:"product",
    initialState:{
        loading:false,
        error:null,
        products:[],

    }
})

export default productSlice.reducer