import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { VscTriangleDown } from "react-icons/vsc";
import { Button, Rating } from "@mui/material";
import { BsFillBagCheckFill } from "react-icons/bs";
import MyListItems from "./MyListItems";
import AccountSidebar from "../../components/AccountSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistItems } from "../../features/wishList/wishListSlice";


const MyList = () => {
 const dispatch = useDispatch()

 const {wishlist}=useSelector(state=>state.wishlist)



 useEffect(()=>{
  dispatch(getWishlistItems())

 },[])


  return (

      <section className="py-10 w-full">
    <div className="container flex  gap-5">
        <div className="col1 w-[20%]">
            <AccountSidebar/>
          
       

        </div>
        <div className="col2 w-[70%]">
             <div className="shadow-md rounded-md bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                 <h2>My List</h2>
          <p className="mt-0">
            There are <span className="font-bold text-primary">{wishlist?.length}</span> products
            in your List
          </p>

            </div>
            {/* cart Item  */}
            {
              wishlist?.length>0 && wishlist.map((item)=>(

                <MyListItems item={item}  />
              ))
            }
          
          
           
          </div>
        </div>
    </div>
  </section>



  );
};

export default MyList;
