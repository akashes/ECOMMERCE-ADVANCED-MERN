import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { VscTriangleDown } from "react-icons/vsc";
import { Button, Rating } from "@mui/material";
import { BsFillBagCheckFill } from "react-icons/bs";
import CartItems from "./CartItems";


const CartPage = () => {



  return (
    <section className="section py-10 ">
      <div className="container w-[80%] max-w-[80%] flex gap-5 ">
        <div className="leftSection w-[70%]">
         
          <div className="shadow-md rounded-md bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                 <h2>Your Cart</h2>
          <p className="mt-0">
            There are <span className="font-bold text-primary">3</span> products
            in your Cart
          </p>

            </div>
            {/* cart Item  */}
            <CartItems size="S" qty={2} />
            <CartItems size="S" qty={2} />
            <CartItems size="S" qty={2} />
            <CartItems size="S" qty={2} />
          
           
          </div>
        </div>
        <div className="rightSection w-[30%]">
            <div className="shadow-md rounded-md bg-white p-5">
                   <h3 className="pb-3 ">Cart Total</h3>
                   <hr />
          <p className="flex items-center justify-between">
            <span className="text-[14px] font-[500]">Subtotal</span>
            <span className="text-primary  font-bold">₹ 1,999</span>
          </p>
          <p className="flex items-center justify-between">
            <span className="text-[14px] font-[500]">Shipping</span>
            <span className="  font-bold">Free</span>
          </p>
          <p className="flex items-center justify-between">
            <span className="text-[14px] font-[500]">Estimate for </span>
            <span className="  font-bold">United Kingdom</span>
          </p>
          <p className="flex items-center justify-between">
            <span className="text-[14px] font-[500]">Total </span>
            <span className="  font-bold text-primary">₹ 1,999 </span>
          </p>
          <br />
          <Button className="w-full btn-org btn-lg flex  gap-2">
            <BsFillBagCheckFill className="text-[20px]"/>
            Checkout  
            </Button>

            </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
