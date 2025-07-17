import React, { useState } from 'react'
import { Button, Rating } from '@mui/material'
import QtyBox from '../QtyBox'
import { BsCart3 } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa6'
import { IoGitCompareOutline } from 'react-icons/io5'
const ProductInfo = () => {

    //    product size state
        const[productActionIndex,setProductActionIndex]=useState(null)
    
  return (
    <>
                  <h1 className="text-[24px] font-[600] mb-2">Chikarani Women Kurta</h1>
            <div className="flex items-center gap-3">
                <span className="text-gray-400 text-[13px]">Brands : 
                    <span className="font-[500] text-black opacity-75 ">House of Chikarani</span>
                    </span>

            <Rating name="size-small" defaultValue={2} size="small" readOnly />
            <span className="text-[13px] cursor-pointer ">Review (5)</span>

            </div>
            {/* price and availablity */}
         <div className="flex items-center gap-4 mt-4">
                <span className='oldPrice line-through text-gray-500 text-[20px] font-[500]'>₹ 1,999</span>
                <span className="price text-primary font-[600] text-[20px]">1444</span>
                <span className="text-[14px]">Available In Stock :             <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
  123 available
</span>

                    </span>
                
            </div>
            {/* product description */}
            <p className="mt-3 pr-[10px] mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing 
                elit. Earum voluptate laborum accusamus in soluta ullam tempora voluptatum cupiditate necessitatibus, recusandae aliquam, alias
                 iusto dolores dolorem!
            </p>

            {/* select size */}
            <div className="flex items-center gap-3">
                <span className="text-[16px]">Size : </span>
                <div className="flex items-center gap-1">
                    <Button onClick={()=>setProductActionIndex(0)} className={` ${productActionIndex===0 ?'!bg-primary !text-white ':'!text-[rgba(0,0,0,0.7)]'} min-w-[40px] !border  !border-[#d4c9c9]`}>S</Button>
                    <Button onClick={()=>setProductActionIndex(1)} className={` ${productActionIndex===1 ?'!bg-primary !text-white ':'!text-[rgba(0,0,0,0.7)]'} min-w-[40px] !border  !border-[#d4c9c9]`} >M</Button>
                    <Button onClick={()=>setProductActionIndex(2)} className={` ${productActionIndex===2 ?'!bg-primary !text-white ':'!text-[rgba(0,0,0,0.7)]'} min-w-[40px] !border  !border-[#d4c9c9]`} >L</Button>
                    <Button onClick={()=>setProductActionIndex(3)} className={` ${productActionIndex===3 ?'!bg-primary !text-white ':'!text-[rgba(0,0,0,0.7)]'} min-w-[40px] !border  !border-[#d4c9c9]`} >XL</Button>
                </div>

            </div>
            <p className="text-[14px] mt-5 mb-2 text-black">Free Shipping (Est. Delivery Time 2-3 Days)</p>

            {/* qty update and addToCart  */}
            <div className="flex items-center  gap-4 py-4">
                <div className="qtyBoxWrapper w-[70px]">

                <QtyBox/>
                </div>
                <Button className="btn-org flex gap-2 items-center">
                    <BsCart3 className="text-[22px]"/>
                    Add to Cart
                </Button>

            </div>
              {/* add to Wishlist,compare  */}
            <div className="flex items-center gap-4 mt-4">
        <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]"> <FaRegHeart className="text-[18px]" /> Add to Wishlist</span>
        <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]"> <IoGitCompareOutline className="text-[18px]"  /> Add to Compare</span>
    </div>
    
    </>
  )
}

export default ProductInfo
