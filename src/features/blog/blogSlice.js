import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";





export const getAllBlogs=createAsyncThunk('blog/getAllBlogs',async(_,{rejectWithValue})=>{
    try {
         const result=await axios.get('/api/blog/get-all-blogs')
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to get Blogs ')
        }
        return result.data

        
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Category image add failed')

    }
})
export const fetchBlogById=createAsyncThunk('blog/fetchBlogById',async(id,{rejectWithValue})=>{
    try {
         const result=await axios.get(`/api/blog/${id}`)
        if(!result.data.success){
            
            throw new Error(result.data.message || 'Failed to get Blogs ')
        }
        return result.data

        
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Category image add failed')

    }
})





const blogSlice = createSlice({
    name:'blog',
    initialState:{
        loading:false,
        error:null,
        blogs:[],
        blog:null
    },
    reducers:{},
    extraReducers:(builder)=>{

            builder.addCase(getAllBlogs.pending,(state)=>{
                   state.loading = true
                   state.error = null
               })
            builder.addCase(getAllBlogs.fulfilled,(state,action)=>{
                   state.loading = false
                   state.error = null
                   state.blogs = action.payload.blogs.slice(0,4)
               })
            builder.addCase(getAllBlogs.rejected,(state)=>{
                   state.loading = true
                   state.error = null
               })
            builder.addCase(fetchBlogById.pending,(state)=>{
                   state.loading = true
                   state.error = null
               })
            builder.addCase(fetchBlogById.fulfilled,(state,action)=>{
                   state.loading = false
                   state.error = null
                   state.blog = action.payload.blog
               })
            builder.addCase(fetchBlogById.rejected,(state)=>{
                   state.loading = true
                   state.error = null
               })
         
    }
})



export default blogSlice.reducer