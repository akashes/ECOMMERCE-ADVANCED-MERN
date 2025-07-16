import React, { useState } from 'react'

import Sidebar from '../../components/Sidebar'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ProductItem from '../../components/ProductsItem';
import { Button } from '@mui/material';

import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ProductsItemListView from '../../components/ProductsItemListView';

import Pagination from '@mui/material/Pagination';


import './style.css'


const ProductListing = () => {


    const[itemView,setItemView]=useState('grid');

      const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
  <section className='py-5 pb-0'>
    <div className="container">
           <Breadcrumbs aria-label="breadcrumb">
        <Link 
          className='link transition'
        underline="hover" color="inherit"  href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
          className='link transition'
        >
          Fashion
        </Link>
        {/* <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography> */}
      </Breadcrumbs>

    </div>
 
   <div className="bg-white p-2 mt-4">
     <div className="container flex gap-3">
          {/* sidebar section for filtering  */}
        <div className="sidebarWrapper  w-[20%] h-full bg-white ">
            <Sidebar/>
        </div>

        {/* products listing section */}
        <div className='w-[80%] py-3'>
            <div className='bg-[var(--tertiary)] p-2 w-full mb-4 rounded-md flex items-center justify-between '>
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

                        <span className='text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]'>There are 27 products</span>
                </div>
                <div className="col2 ml-auto flex items-center justify-end gap-3 pr-2">
                <span className='text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]'>Sort By</span>
                  <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className=  '!bg-[#f6f6f6] !text-[#000] !text-[14px] !capitalize  !border !border-[rgba(119,119,116,0.6)] '
      >
        Relevance
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
        <MenuItem onClick={handleClose}
        className='!text-[13px]  '
        >Sales, Highest To Lowest</MenuItem>
        <MenuItem onClick={handleClose}
        className='!text-[13px] '
        >Name, A To Z</MenuItem>
        <MenuItem onClick={handleClose}
        className='!text-[13px] '
        >Name, Z To A</MenuItem>
        <MenuItem onClick={handleClose}
        className='!text-[13px] '
        >Price, Low To High</MenuItem>
        <MenuItem onClick={handleClose}
        className='!text-[13px] '
        >Price, High To Low</MenuItem>
      </Menu>



                </div>


            </div>
              <div className={`grid ${itemView==='grid'?'grid-cols-4 md:gird-cols-4':'grid-cols-1 md:grid-cols-1'}  gap-4  `}>
                {
                    itemView === 'grid'?
                    <> 
                    <ProductItem />
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                <ProductItem/>
                    
                    </> : 
                    <>
                    <ProductsItemListView/>
                    <ProductsItemListView/>
                    <ProductsItemListView/>
                    <ProductsItemListView/>
                    </>
                }
                
              </div>
              <div className="flex items-center justify-center mt-10">

      <Pagination count={10} showFirstButton showLastButton />
              </div>

        </div>

    </div>
   </div>
  </section>
  )
}

export default ProductListing
