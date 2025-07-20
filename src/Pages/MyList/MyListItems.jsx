

import React,{useState} from 'react'
import { IoIosClose } from 'react-icons/io';
import { VscTriangleDown } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import  Rating  from '@mui/material/Rating';
import { Button } from '@mui/material';


const MyListItems = () => {


  return (
     <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
              {/* product image */}
              <div className="img w-[15%] rounded-md overflow-hidden">
                <Link className="group">
                  <img
                    src="https://serviceapi.spicezgold.com/download/1742462729829_zoom_1-1673275594.webp"
                    alt=""
                    className="w-full group-hover:scale-105 transition-transform "
                  />
                </Link>
              </div>
              {/* product info */}
              <div className="info w-[85%] relative">
                <IoIosClose className="text-[25px] bg-gray-100 rounded-full text-gray-500 cursor-pointer absolute top-[0px] right-[0px] link transition-colors" />
                <span className="text-[13px]">Allen Solly</span>
                <h3 className="text-[15px]">
                  <Link to="/sdf" className="link">
                    Men Pure Cotton Striped Casual Shirt
                  </Link>
                </h3>
                <Rating
                  readOnly
                  name="size-small"
                  defaultValue={4}
                  size="small"
                />
               
                <div className="flex items-center gap-4 mt-2 mb-2">
                  <span className="price  font-[600] text-[14px]">1444</span>

                  <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                    ₹ 1,999
                  </span>
                  <span className="price text-primary font-[600] text-[14px]">
                    55% OFF
                  </span>
                </div>
                <Button className='btn-org btn-sm'>Add to Cart</Button>

       
              </div>
            </div>
  )
}

export default MyListItems
