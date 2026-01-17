import React, { useContext, useEffect, useState } from 'react'

import Sidebar from '../../components/Sidebar'

import ProductItem from '../../components/ProductsItem';
import  Button  from '@mui/material/Button';

import { IoCloseCircle, IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ProductsItemListView from '../../components/ProductsItemListView';

import Pagination from '@mui/material/Pagination';


import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setCategories, setPage, setPriceFilter, setRating, setSort, setSubCategories, setThirdSubCategories } from '../../features/productsFilter/productsFilterSlice';
import ProductItemSkeleton from '../../components/Skeltons/ProductItemSkelton';
import ProductsItemListViewSkeleton from '../../components/Skeltons/ProductsItemListViewSkelton';
import { useSearchParams } from 'react-router-dom';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { MyContext } from '../../contexts/MyContext';
const sortLabels = {
  relevance: "Relevance",
  sales_desc: "Sales, Highest To Lowest",
  name_asc: "Name, A To Z",
  name_desc: "Name, Z To A",
  price_asc: "Price, Low To High",
  price_desc: "Price, High To Low",
  newest : "Newest Products",
  rating_desc : 'Rating, High to Low',
  discount_desc:"Discount, High to Low"
};

const ProductListing = () => {

  const dispatch = useDispatch()
  const[searchParams,setSearchParams]=useSearchParams()
  console.log(searchParams)
  const context = useContext(MyContext)
  const [initialSyncDone, setInitialSyncDone] = useState(false);



  const{items,loading:filterProductsLoading,totalPages,page,filters,totalProducts}=useSelector(state=>state.filterProducts)
  console.log(filters)



    const[itemView,setItemView]=useState('grid');

      const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  useEffect(()=>{
    dispatch(fetchProducts({
      category:filters.categories.join(','),
      subCatId:filters.subCatId,
      thirdSubCatId:filters.thirdSubCatId,
      sort:filters.sort,
      rating:filters.rating,
      page,
      perPage:filters.perPage,
      minPrice:filters.minPrice,
      maxPrice:filters.maxPrice,
      search:filters.search,
      discount:filters.discount,
      availability:filters.availability
    }))

  },[dispatch,filters,page])

  useEffect(() => {
  console.log("Current Filters:", filters);
  console.log("Current Page:", page);
}, [filters, page]);



  //state handler functions
 const handleCategorySelect = (catId) => {
  let updatedCategories = [...filters.categories];

  if (updatedCategories.includes(catId)) {
    updatedCategories = updatedCategories.filter(id => id !== catId);
  } else {
    updatedCategories.push(catId);
  }

  dispatch(setCategories(updatedCategories));
};

const handleSelectRating=(e)=>{
  dispatch(setRating(e.target.value))

}
   const handleSort = (type) => {
    dispatch(setSort(type));
    setAnchorEl(null);
  };

  useEffect(() => {
      if (!initialSyncDone) {
    setInitialSyncDone(true);
    return;
  }
    const params = {
      category: filters.categories.join(','),
      subCatId: filters.subCatId,
      thirdSubCatId: filters.thirdSubCatId,
      sort: filters.sort,
      rating: filters.rating,
      page,
      perPage: filters.perPage,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      search: filters.search,
      discount:filters.discount
    };

    // Remove empty keys
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key];
    });

    setSearchParams(params);
  }, [filters, page]);




const currentSortLabel = sortLabels[filters.sort] || "Relevance";

useEffect(()=>{
                  window.scrollTo({ top: 0, behavior: "smooth" });



},[])

// useEffect(() => {
//   return () => {
//     // cleanup -reset filters when leaving page
//     dispatch(setCategories([]));
//     dispatch(setSubCategories(null));
//     dispatch(setThirdSubCategories(null));
//     dispatch(setSort(''));
//     dispatch(setRating(''));
//     dispatch(setPage(1));
//     dispatch(setPriceFilter({ minPrice: '', maxPrice: '' }));
//   };
// }, [dispatch]);
  return (
  <section className='py-2  lg:py-5 pb-0'>
    <div className="container">
        
      <BreadCrumbs/>

    </div>
 
   <div className="bg-white p-2 mt-2 lg:mt-4">
     <div className="container flex gap-3">
          {/* sidebar section for filtering  */}

{
  context.windowWidth<992 &&
          <div
          onClick={()=>context.setOpenFilter(false)}
          className=
{          `filter_overlay w-full h-full bg-[rgba(0,0,0,0.5)] top-0 left-0   ${context.openFilter ? 'fixed':'hidden'}  z-[101]   `
}          
          ></div>
}
        <div className={`sidebarWrapper  opacity-0 lg:opacity-100  -bottom-[100%] left-0 w-full h-[60vh] lg:h-full lg:static  lg:w-[20%] bg-white z-[102] lg:z-[50] p-3 lg:p-0  transition-transform fixed ${context.openFilter && ' open'}   `}
        >
            <Sidebar onChange={handleCategorySelect} handleSelectRating={handleSelectRating}  />
        </div>

        {/* products listing section */}
        <div className=' w-full lg:w-[80%] py-3 min-h-[80vh] '>
            <div className='bg-[var(--tertiary)] p-2 w-full mb-4 rounded-md flex items-center justify-between
            sticky top-[141px] z-90
            '>
                <div className="col1 flex items-center gap-1 itemViewActions">
                    {/* vertical listing button */}
                    <Button className={`!w-[40px] !h-[40px] !min-w-[40px] rounded-full !text-[#000] ${itemView==='list'&&'active'}`}
                    onClick={()=>setItemView('list')}
                    
                    
                    
                    >
                        <FaThList className='w-full h-full text-[rgba(0,0,0,0.6)]'  />
                        </Button>

                        {/* grid listing button */}
                    <Button className={`!w-[40px] !h-[40px] !min-w-[40px] rounded-full !text-[#000] ${itemView==='grid'&&'active'}`}
                    onClick={()=>setItemView('grid')}
                    >
                        <IoGrid className='w-full h-full text-[rgba(0,0,0,0.6)]'/>
                        </Button>

                        <span className='text-[14px] hidden sm:block font-[500] pl-3 text-[rgba(0,0,0,0.7)]'>There are {totalProducts} products</span>
                </div>
                <div className="col2 ml-auto flex items-center justify-end gap-3 pr-2">
                <span className='text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]'>Sort By</span>
                  <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className=  'relative !bg-[#f6f6f6] !text-[#000] !text-[14px] !capitalize  !border !border-[rgba(119,119,116,0.6)] '
      >
           {currentSortLabel}
           {
            filters.sort!=='' &&(
               <button onClick={(e)=>{
            e.stopPropagation()
            dispatch(setSort(''))
           }} className=' cursor-pointer absolute top-[-10px] right-[-12px] rounded-full text-[18px] text-primary p-1 '>
            <IoCloseCircle/>
           </button>

            )
           }
          
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={()=>{handleSort('sales_desc')}}
        className='!text-[13px]  '
        >SALES, Highest To Lowest</MenuItem>
        <MenuItem onClick={()=>{handleSort('name_asc')}}
        className='!text-[13px] '
        >Name, A To Z</MenuItem>
        <MenuItem onClick={()=>{handleSort('name_desc')}}
        className='!text-[13px] '
        >Name, Z To A</MenuItem>
        <MenuItem onClick={()=>{handleSort('price_asc')}}
        className='!text-[13px] '
        >Price, Low To High</MenuItem>
        <MenuItem onClick={()=>{handleSort('price_desc')}}
        className='!text-[13px] '
        >Price, High To Low</MenuItem>
        <MenuItem onClick={()=>{handleSort('rating_desc')}}
        className='!text-[13px] '
        >Rating, High to Low</MenuItem>
        <MenuItem onClick={()=>{handleSort('discount_desc')}}
        className='!text-[13px] '
        >Discount, High to Low</MenuItem>
        <MenuItem onClick={()=>{handleSort('newest')}}
        className='!text-[13px] '
        >Newest Products</MenuItem>
      </Menu>



                </div>


            </div>
              <div className={`grid
                 ${itemView==='grid'?'grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5':'grid-cols-1 md:grid-cols-1'}  gap-4  `}>
                {
                    itemView === 'grid'?
                 <>
                 {
  filterProductsLoading ? (
    Array.from({ length: itemView === 'grid' ? 10 : 4 }).map((_, index) => (
      <ProductItemSkeleton key={index} />
    ))
  ) : (
    items?.length > 0 &&
    items.map((item) => <ProductItem key={item._id} item={item} />)
  )
}
                 </>
                    
                    : 
                    <>
                   {
  filterProductsLoading ? (
    Array.from({ length: 4 }).map((_, index) => (
      <ProductsItemListViewSkeleton key={index} />
    ))
  ) : (
    items?.length > 0 &&
    items.map((item) => <ProductsItemListView key={item._id} item={item} />)
  )
}
               
                    </>
                }
                
              </div>
           {
            totalPages>1 &&
               <div className="flex items-center justify-center mt-10">

        <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) =>{

                dispatch(setPage(value))
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              } 
                showFirstButton
                showLastButton
                />
              </div>
           }

        </div>

    </div>
   </div>
  </section>
  )
}

export default ProductListing
