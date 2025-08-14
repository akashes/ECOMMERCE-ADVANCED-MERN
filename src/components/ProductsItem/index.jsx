import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';

import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";

import Tooltip from '@mui/material/Tooltip';


import { useContext } from 'react';
import { MyContext } from '../../App';


const ProductItem = ({item}) => {
  const {setOpenProductDetailsModal} = useContext(MyContext)
  const discount = item.oldPrice && item.price ? Math.round(((item.oldPrice - item.price)/item.oldPrice)*100):0;

  return (
    <div className='  productItem rounded-md overflow-hidden shadow-lg border-1 border-[rgba(0,0,0,0.1)]  '>
      <div className='imaWrapper w-[100%]  rounded-t-md overflow-hidden relative group'>
        <Link to={`/product/${item._id}`}>

        <div className="img h-[220px] overflow-hidden">
        <img src={item.images[0]?.url} 
        alt=""
        className='w-full ' />
        <img src={item.images[1]?.url} 
        alt=""
        className='w-full absolute left-0 top-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out ' />

        </div>
        </Link>
        {
          discount && discount>=3 && (

            <span className='discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-md p-1 tex-[12px] font-[500]'>{discount}%</span>
          ) 
        }
         <div className="actions absolute top-[-50px] group-hover:top-[15px] right-[5px]
          z-50 flex items-center gap-2 flex-col w-[50px] transition-all ease-in-out duration-300
          opacity-0 group-hover:opacity-100
           ">
                <Tooltip title="Quick View" placement="left">
            <Button className='  !w-[35px] !h-[35px] !min-w-[35px] group !rounded-full !bg-white
             
              hover:!bg-primary hover:!text-white '
              onClick={()=>setOpenProductDetailsModal({
                open:true,
                product:item
              })}
              >
                <MdZoomOutMap className='action-icon w-full h-full text-[18px] text-black hover:text-white  transition-colors'/>
            </Button>
            </Tooltip>

                <Tooltip title="Compare" placement="left">

            <Button className='!w-[35px] !h-[35px] !min-w-[35px] group !rounded-full !bg-white  hover:!bg-primary hover:!text-white'>
                <IoGitCompareOutline className=' action-icon text-[18px] text-black hover:text-white transition-colors'/>
            </Button>
                </Tooltip>

                <Tooltip title="Add To Wishlist" placement="left">

            <Button className='!w-[35px] !h-[35px] !min-w-[35px] group !rounded-full !bg-white hover:!bg-primary
             hover:!text-white
             '>
                <FaRegHeart className=' action-icon text-[18px] text-black hover:text-white transition-colors'/>
            </Button>
                </Tooltip>
            
         </div>

      </div>
      <div className="info p-3 py-5  ">
        <h6 className='text-[13px] !font-[400]'>
        <span className='link'>
            {item.brand}
            </span>
        </h6>
        <h3 className='text-[13px] title mt-1 font-[500] text-[#000] mb-1'>
            <Link to={`/product/${item._id}`} className='link'>
            {item.name}
            </Link>
            </h3>
            <Rating name="size-small" defaultValue={item.rating} size="small" readOnly />

            <div className="flex items-center gap-4">
                <span className='oldPrice line-through text-gray-500 text-[15px] font-[500]'>&#x20b9; {item.oldPrice}</span>
                <span className="price text-primary font-[600]">&#x20b9; {item.price}</span>
                
            </div>

      </div>
    </div>
  )
}

export default ProductItem
