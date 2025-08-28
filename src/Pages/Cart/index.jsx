import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { VscTriangleDown } from "react-icons/vsc";
import { Button, Rating, Skeleton } from "@mui/material";
import { BsFillBagCheckFill } from "react-icons/bs";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";
import CartItemSkeleton from "../../components/Skeltons/CartItemsSkelton";


const CartPage = () => {
  const{cart,loading}=useSelector(state=>state.cart)
  
const navigate  = useNavigate()

const subTotal = cart?.reduce((acc, item) => {
  if (!item.productId) return acc; 
  return acc + (item.quantity * (item.productId.price || 0));
}, 0);  
const isshippingCharge = subTotal<249?true:false
  let total 
  if(isshippingCharge){
   total = subTotal+50
  }else{
    total=subTotal
  }

  
    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: "smooth" });
  
  
    },[])

  return (
    <section className="section py-10 ">
      <div className="container w-[80%] max-w-[80%] flex gap-5 ">
        <div className="leftSection w-[70%]">
         
          <div className="shadow-md rounded-md bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                 <h2>Your Cart</h2>
          <p className="mt-0">
            There are <span className="font-bold text-primary">{cart?.length}</span> products
            in your Cart
          </p>

            </div>
            {/* cart Item  */}
            {
              loading?(
                <>
                <CartItemSkeleton/>
                <CartItemSkeleton/>
                <CartItemSkeleton/>
                </>
              ):(
                 !loading &&  cart?.length>0 && cart.map((item)=>(

                  item.productId?(
                                    <CartItems key={item._id} item={item} size="S"  />

                  ):null
              ))

              )
            
            }
           
          <>
          {
          !loading  && cart?.length===0 &&     <div className="flex items-center justify-center flex-col pt-[100px] pb-[100px] gap-5">
                    
                    <img className="w-[150px]" src="https://res.cloudinary.com/dllelmzim/image/upload/v1755950175/delete_o3nlss.png" alt="" />
                    <h4>Your Cart is currently empty</h4>
                    <Button onClick={()=>{ navigate('/products')}} className="btn-org btn-sm">Continue Shopping</Button>
                </div> 
          }
          </>
           
          </div>
        </div>
        <div className="rightSection w-[30%] p-5">
            <div className="shadow-md rounded-md bg-white p-5  sticky top-[160px] z-[90]">
                   <h3 className="pb-3 ">Cart Total</h3>
                   <hr />
                   {
                    loading?(
                        <>
                <Skeleton width="80%" height={25} />
                <Skeleton width="60%" height={25} />
                <Skeleton width="90%" height={25} />
                <Skeleton width="70%" height={25} />
                <Skeleton variant="rounded" width="100%" height={40} />
              </>

                    ):
                    (
                      <>
                        <p className="flex items-center justify-between">
                  <span className="text-[14px] font-[500]">Subtotal</span>
                  <span className="text-primary font-bold"> {subTotal.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })} </span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-[14px] font-[500]">Shipping</span>
                  <span className="font-bold text-primary">{isshippingCharge?'50':"Free"}</span>
                </p>
             
                <p className="flex items-center justify-between">
                  <span className="text-[17px] font-[500]">Total</span>
                  <span className="font-bold text-primary text-[18px]"> {total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
                </p>
                <br />
                <Link to='/checkout'>
                <Button className="w-full btn-org btn-lg flex gap-2">
                  <BsFillBagCheckFill className="text-[20px]" />
                  Checkout
                </Button>
                </Link>
                      </>

                    )
                   }


            </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
