import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
    const searchParams = new URLSearchParams(window.location.search);


export const fetchProducts=createAsyncThunk('filterProducts/fetchProducts',async(filter,{rejectWithValue})=>{

    try {
        console.log(filter)
        console.log('inside thunk')
           const result = await axios.get(`/api/product/get-products-by-filter`,{params:filter});

           if(!result.data.success){
            throw new Error(result.data.message || 'Failed to fetch products by filter ')
        }
        return result.data
    } catch (error) {
        return rejectWithValue(error.response.data.message || error.message || 'Failed to fetch products by filter')
        
    }

})


const initialState =  {
  items: [],
  loading: false,
  error: null,
  totalPages: 1,
  totalProducts: '',
  page: Number(searchParams.get("page")) || 1,
  filters: {
    search: searchParams.get("search") || '',
    categories: searchParams.get("category")?.split(",") || [],
    subCatId: searchParams.get("subCatId") ? [searchParams.get("subCatId")] : [],
    thirdSubCatId: searchParams.get("thirdSubCatId") ? [searchParams.get("thirdSubCatId")] : [],
    rating: searchParams.get("rating") || '',
    discount:searchParams.get('discount') || '',
    sort: searchParams.get("sort") || '',
    minPrice: searchParams.get("minPrice") || '',
    maxPrice: searchParams.get("maxPrice") || '',
    perPage: Number(searchParams.get("perPage")) || 10,
  }
}


const filterProductsSlice = createSlice({
    name:"filterProducts",
    // initialState:{
    //     items:[],
    //     loading:false,
    //     error:null,
    //     totalPages:1,
    //     totalProducts:'',
    //     page:1,
    //     filters:{
    //         search:'',
    //         categories:[],
    //         subCatId:[],
    //         thirdSubCatId:[],
    //         rating:'',
    //         sort:'',
    //         minPrice:'',
    //         maxPrice:'',
    //         perPage:10
    //     }
    // },



    initialState,
    
    reducers:{
      setCategories: (state, action) => {
        state.filters.subCatId=[]
        state.filters.thirdSubCatId=[]
        state.filters.rating=0
        state.filters.search=''
        state.filters.sort=''
        state.filters.minPrice=''
        state.filters.maxPrice=''
        state.filters.discount=''
    state.filters.categories = action.payload; 
    state.page = 1;
  },
  setSubCategories: (state, action) => {
    state.filters.categories=[]
    state.filters.thirdSubCatId=[]
           state.filters.rating=0
        state.filters.search=''
        state.filters.sort=''
        state.filters.minPrice=''
        state.filters.maxPrice=''
        state.filters.discount=''
    state.filters.subCatId = action.payload; 
    state.page = 1;
  },
  setThirdSubCategories: (state, action) => {
    state.filters.categories=[]
    state.filters.subCatId=[]
           state.filters.rating=0
        state.filters.search=''
        state.filters.sort=''
        state.filters.minPrice=''
        state.filters.maxPrice=''
        state.filters.discount=''
    state.filters.thirdSubCatId = action.payload; 
    state.page = 1;
  },
    setSort: (state, action) => {
      state.filters.sort = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
 setRating: (state, action) => {
  state.filters.rating = Number(action.payload) || '';
},
 setDiscount: (state, action) => {
    if(state.filters.discount===action.payload){
        state.filters.discount=''
    }else{

        state.filters.discount = Number(action.payload) || '';
    }
},
    setPriceFilter:(state,action)=>{
        state.filters.minPrice = action.payload.min
        state.filters.maxPrice = action.payload.max
    },
    setSearch:(state,action)=>{
        state.filters.search = action.payload
    },
   resetFilters: () => {
      return {
        ...initialState,
        page: 1,
        filters: {
          search: "",
          categories: [],
          subCatId: [],
          thirdSubCatId: [],
          rating: "",
          discount: "",
          sort: "",
          minPrice: "",
          maxPrice: "",
          perPage: 10,
        },
      };
    },
  },
   extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.loading = false;
        state.items = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.currentPage;
        state.totalProducts = action.payload.totalProducts
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to fetch products by filter ';
        });
    },
})

export const { setCategories,setSubCategories,setThirdSubCategories, setSort, setPage,setRating,setPriceFilter,setSearch,setDiscount ,resetFilters} = filterProductsSlice.actions;
export default filterProductsSlice.reducer