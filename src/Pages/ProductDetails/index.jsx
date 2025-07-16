import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import ProductZoom from "../../components/ProductZoom";

import Rating from '@mui/material/Rating';
import  Button  from "@mui/material/Button";
import QtyBox from "../../components/QtyBox";

import {  BsCart3 } from "react-icons/bs";

import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";


import TextField from '@mui/material/TextField';
import ProductsSlider from "../../components/ProductsSlider";



const ProductDetails = () => {
    const[activeTab,setActiveTab]=useState(0)
    const[productActionIndex,setProductActionIndex]=useState(null)
  return (
 <>
    {/* breadcrumbs container */}
    <div className="py-5 ">
      <div className="container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            className="link transition !text-[14px]"
            underline="hover"
            color="inherit"
            href="/"
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
            className="link transition !text-[14px]"
          >
            Fashion
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
            className="link transition !text-[14px]"
          >
            Dress-name
          </Link>
        </Breadcrumbs>
      </div>
 
    </div>
    <section className="bg-white py-5">
             <div className="container flex gap-8 items-center ">
                {/* product image section */}
        <div className="productZoomContainer w-[40%]  ">
            <ProductZoom/>
        </div>

        {/* product information section */}
        <div className=" productContent w-[60%] pr-10 pl-10">
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
    


            

        </div>
        

      </div>


      <div className="container pt-10">
        <div className="flex items-center gap-8 mb-5">
            <span className={` text-[17px] cursor-pointer font-[500] transition-colors duration-300 ease-in-out px-3 py-1 rounded-full
                 ${activeTab===0 && 'text-white bg-primary  '} `}  onClick={()=>setActiveTab(0)}>Description</span>
            <span className={` text-[17px] cursor-pointer font-[500] transition-colors duration-300 ease-in-out px-3 py-1 rounded-full
                 ${activeTab===1 && 'text-white bg-primary  '} `}  onClick={()=>setActiveTab(1)}>Product Details</span>
            <span className={` text-[17px] cursor-pointer font-[500] transition-colors duration-300 ease-in-out px-3 py-1 rounded-full
                 ${activeTab===2 && 'text-white bg-primary  '} `}  onClick={()=>setActiveTab(2)}>Reviews (5)</span>
        </div>
      {
        activeTab===0 && (
                 <div className="shadow-md w-full py-5 px-8 rounded-md">
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum minus amet quos dicta architecto labore quod sed eveniet aliquam dignissimos!
                    </p>
           
            

        </div>
        )
      }
      {
        activeTab===1 &&(
            
                 <div className="shadow-md w-full py-5 px-8 rounded-md">

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Stand up 
                </th>
                <th scope="col" class="px-6 py-3">
                    Folded
                </th>
              
            </tr>
            <tr>
                <th scope="col" class="px-6 py-3">
                    Stand up 
                </th>
                <th scope="col" class="px-6 py-3">
                    Folded
                </th>
              
            </tr>
            <tr>
                <th scope="col" class="px-6 py-3">
                    Stand up 
                </th>
                <th scope="col" class="px-6 py-3">
                    Folded
                </th>
              
            </tr>
            <tr>
                <th scope="col" class="px-6 py-3">
                    Stand up 
                </th>
                <th scope="col" class="px-6 py-3">
                    Folded
                </th>
              
            </tr>
            <tr>
                <th scope="col" class="px-6 py-3">
                    Stand up 
                </th>
                <th scope="col" class="px-6 py-3">
                    Folded
                </th>
              
            </tr>
        </thead>
        {/* <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    $99
                </td>
            </tr>
        </tbody> */}
    </table>
</div>
</div>

                
        )
      }
      {
        activeTab===2 && (
                 <div className="shadow-md w-[80%] py-5 px-8 rounded-md">

            <div className="w-full productReviewContainer">
                <h2 className="text-[18px]">Customer Questions and Answers </h2>
                <div className="reviewsContainer w-full max-h-[300px] overflow-y-scroll  overflow-x-hidden  mt-5 ">

                    {/* review */}
                    <div className="review py-5 pr-5 border-b border-[rgba(0,0,0,0.2)] w-full flex items-center justify-between">
                        <div className="info w-[60%] flex items-center gap-3 ">
                            <div className="img">
                                <img
                                 src="https://th.bing.com/th/id/OIP.Yd0yOhKDwRsMqsERE0LiKQHaEJ?w=271&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt=""
                                 className="w-[80px] h-[80px] rounded-full overflow-hidden object-cover"
                                 />
                            </div>
                            <div className="w-[80%]">
                                <h4 className="text-[16px]">John Doe</h4>
                                <h5 className="text-[13px] mb-0">2022-12-12</h5>
                                <p className="mt-0 mb-0"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque atque commodi soluta, quod accusantium quia necessitatibus perferendis quaerat fugit vero quidem perspiciatis totam et aut. Adipisci nostrum beatae voluptates eos.</p>
                            </div>
                        </div>
            <Rating name="size-medium" defaultValue={2} size="medium" readOnly />



                    </div>
                    <div className="review py-5 pr-5 border-b border-[rgba(0,0,0,0.2)] w-full flex items-center justify-between">
                        <div className="info w-[60%] flex items-center gap-3 ">
                            <div className="img">
                                <img
                                 src="https://th.bing.com/th/id/OIP.Yd0yOhKDwRsMqsERE0LiKQHaEJ?w=271&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt=""
                                 className="w-[80px] h-[80px] rounded-full overflow-hidden object-cover"
                                 />
                            </div>
                            <div className="w-[80%]">
                                <h4 className="text-[16px]">John Doe</h4>
                                <h5 className="text-[13px] mb-0">2022-12-12</h5>
                                <p className="mt-0 mb-0"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque atque commodi soluta, quod accusantium quia necessitatibus perferendis quaerat fugit vero quidem perspiciatis totam et aut. Adipisci nostrum beatae voluptates eos.</p>
                            </div>
                        </div>
            <Rating name="size-medium" defaultValue={2} size="medium" readOnly />



                    </div>
                    <div className="review py-5 pr-5 border-b border-[rgba(0,0,0,0.2)] w-full flex items-center justify-between">
                        <div className="info w-[60%] flex items-center gap-3 ">
                            <div className="img">
                                <img
                                 src="https://th.bing.com/th/id/OIP.Yd0yOhKDwRsMqsERE0LiKQHaEJ?w=271&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt=""
                                 className="w-[80px] h-[80px] rounded-full overflow-hidden object-cover"
                                 />
                            </div>
                            <div className="w-[80%]">
                                <h4 className="text-[16px]">John Doe</h4>
                                <h5 className="text-[13px] mb-0">2022-12-12</h5>
                                <p className="mt-0 mb-0"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque atque commodi soluta, quod accusantium quia necessitatibus perferendis quaerat fugit vero quidem perspiciatis totam et aut. Adipisci nostrum beatae voluptates eos.</p>
                            </div>
                        </div>
            <Rating name="size-medium" defaultValue={2} size="medium" readOnly />



                    </div>
                
            

                </div>

                <br />
                {/* write review */}
                <div className="reviewForm bg-[#f1f1f1] p-4 rounded-md">
                    <h2 className="text-[18px]">Add a Review</h2>
                    <form className="w-full">
                       <TextField
                       className="w-full !my-5 "
          id="outlined-multiline-static"
          label="your review"
          multiline
          rows={5}
        />
        <Rating name='size-small' defaultValue={3} />
        <div className="flex items-center mt-5">
            <Button className="btn-org">
                Submit Review
            </Button>

        </div>
                    </form>


                </div>

            </div>

        </div>

        )
      }
      </div>
      <div className="container !mt-8">
          <h2 className='text-[20px] font-[600]'>Related Products</h2>
      <ProductsSlider itemsCount={6}/>

      </div>
    </section>
 </>
  );
};

export default ProductDetails;
