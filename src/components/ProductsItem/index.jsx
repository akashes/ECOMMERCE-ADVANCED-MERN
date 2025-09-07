import React, { useMemo } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';

import { FaHeart, FaMinus, FaPlus, FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";

import Tooltip from '@mui/material/Tooltip';


import { useContext } from 'react';
import { MyContext } from '../../App';
import { BsCart3 } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeCartItem, updateCart } from '../../features/cart/cartSlice';
import { showError, showSuccess } from '../../utils/toastUtils';
import { AuthContext } from '../../contexts/AuthContext';

import throttle from 'lodash.throttle'
import { addToWishlist, removeWishlistItem } from '../../features/wishList/wishListSlice';

const ProductItem = ({item}) => {
  const context = useContext(AuthContext)
  const dispatch = useDispatch()
  const {setOpenProductDetailsModal} = useContext(MyContext)
  const discount = item?.oldPrice && item?.price ? Math.round(((item.oldPrice - item.price)/item.oldPrice)*100):0;
 const {cart,cartUpdationLoading,cartUpdatingItem}=useSelector(state=>state.cart)
 const{wishlist}=useSelector(state=>state.wishlist)


 console.log(wishlist)



   const isWishlisted = wishlist.find(i=>i.productId?._id===item._id || i._id===item._id)
 
 console.log(isWishlisted)

   const existingCartItem = cart.find(cartItem=>{
    if(!cartItem.productId) return false
   return cartItem.productId._id===item._id
   })
  




 const handleUpdateQty = useMemo(() => 
  throttle(async (newQty) => {
    if (!existingCartItem) return;

    if (newQty < 1) {
      const resultAction = await dispatch(removeCartItem(existingCartItem._id));

      if (removeCartItem.fulfilled.match(resultAction)) {
        showSuccess(resultAction.payload.message || "Item removed from Cart");
      } else {
        showError(resultAction.payload || "Failed to remove item from Cart");
      }
      return;
    }

    const resultAction = await dispatch(
      updateCart({ cartItemId: existingCartItem._id, quantity: newQty })
    );
    console.log(resultAction)

    if (updateCart.fulfilled.match(resultAction)) {
      showSuccess("Cart Updated");
    } 
    if(updateCart.rejected.match(resultAction)){
      showError(resultAction.payload || 'Failed to update cart quantity')
    }
  }, 1000, { leading: true, trailing: true }),
[dispatch, existingCartItem]
);

  const handleAddToCart=async(id)=>{
    if(!context.user){
      showError('You are not Logged in. Please Login before adding to Cart')
      return
    }
    const resultAction = await dispatch(addToCart(id))
    console.log(resultAction)
            if(addToCart.fulfilled.match(resultAction)){
              showSuccess('Item added to Cart')
            }
            if(addToCart.rejected.match(resultAction)){
              showError(resultAction.payload || 'Failed to add item to Cart')
            }
    
  }

  console.log(existingCartItem)
  console.log(cartUpdatingItem)
  const isUpdating = existingCartItem && cartUpdatingItem === existingCartItem._id;
  const isAddingNew = cartUpdatingItem ===item._id
  const isOutOfStock = item.countInStock ===0


  const handleAddToWishList=async(productId)=>{
    const resultAction = await dispatch(addToWishlist({productId,user:context.user}))
    console.log(resultAction)
    if(addToWishlist.fulfilled.match(resultAction)){
      showSuccess('Item added to WishList')
      return
    }
    if(addToWishlist.rejected.match(resultAction)){
      showError(resultAction.payload || 'Failed to add item to WishList')
      return
    }


  }
  return (
    <div className='  productItem rounded-md overflow-hidden shadow-lg border-1 border-[rgba(0,0,0,0.1)]  '>
      <div className='imgWrapper w-[100%]  rounded-t-md overflow-hidden relative group'>
        <Link to={`/product/${item?._id}`}>

        <div className={`${isUpdating && '  scale-105 duration-500 ease-in-out'} img h-[220px] overflow-hidden`}>
        <img src={item?.images[0]?.url} 
        alt=""
        className='w-full ' />
        <img src={item?.images[1]?.url} 
        alt=""
        className='w-full absolute left-0 top-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out ' />

        </div>
        </Link>
        {
          discount && discount>=5 && (

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

         <Button
  onClick={()=>{
   handleAddToWishList(item._id)
  }}
  className={`!w-[35px] !h-[35px] !min-w-[35px] group !rounded-full !bg-white 
    ${isWishlisted ? '!bg-primary !text-white' : 'hover:!bg-primary hover:!text-white'}`}>
  {isWishlisted ? (
    <FaHeart className="text-primary"/>
  ) : (
    <FaRegHeart className="action-icon text-[18px] text-black hover:text-white transition-colors"/>
  )}
</Button>
                </Tooltip>
            
         </div>

      </div>
      <div className={`${isUpdating  && ''} info p-1 lg:p-3 py-5 relative pb-[50px] h-[190px] `}>
        <h6 className='text-[13px] !font-[400]'>
          <div className='flex justify-between items-center'>

        <span className='link'>
            {item?.brand}
            </span>
            {isWishlisted && <FaHeart className='text-primary'/>}
          </div>
        </h6>
        <h3 className=' text-[12px] lg:text-[13px] title mt-1 font-[500] text-[#000] mb-1'>
            <Link to={`/product/${item._id}`} className='link'>
            {item?.name.substr(0,30)+'...'}
            </Link>
            </h3>
            {
              item?.numReviews===0 ? <span className='text-[12px]'>No Reviews Yet</span>:
                          <Rating name="size-small" value={item?.rating} size="small" readOnly />

            }

            <div className="flex items-center justify-between gap-2 lg:gap-4">
                <span className='oldPrice line-through text-gray-500 text-[12px] lg:text-[15px] font-[500]'>&#x20b9; {item?.oldPrice}</span>
                <span className="price text-primary font-[600] text-[12px]  lg:text-[15px] ">&#x20b9; {item?.price}</span>
                
            </div>
                 <div className=" absolute bottom-[15px] !w-full left-0 pl-3 pr-3  ">
               {
                isOutOfStock?
                <>
                <p className='text-center text-primary font-bold text-[14px]'>Out Of Stock</p>
                </>:
                <>
                              {
         

                

                !existingCartItem  ?(
                    <Button
                    disabled={cartUpdationLoading}
                onClick={()=>handleAddToCart(item._id)}
                className="!border-1 !border-primary !text-primary flex gap-1 lg:gap-2 !py-1 w-full items-center hover:!bg-black hover:!text-white hover:!border-black !mx-auto">
                    <BsCart3 className={`text-[17px] lg:text-[22px] ${isAddingNew && "cart-icon-loading"}` }/>
                    <span className='text-[13px] lg:text-[15px]'>

                    {
                      isAddingNew?"Adding ...":"Add to Cart"
                    }
                    </span>
                </Button>

                ):(
                  
                <div className="flex items-center justify-between overflow-hidden rounded-full border border-[rgba(0,0,0,0.1)]">

                <Button   
                className='!min-w-[30px] !w-[30px] !h-[30px] !text-white !rounded-sm !bg-gray-400'


                  // disabled={existingCartItem.quantity <= 1}
 onClick={()=>handleUpdateQty(existingCartItem.quantity-1)}>
                  <FaMinus/>
                </Button>
                <span >{existingCartItem.quantity}</span>
               <Button
                              className='  !min-w-[30px] !w-[30px] !h-[30px] !text-white !rounded-sm !bg-black'

              onClick={() => handleUpdateQty(existingCartItem.quantity + 1)}
            >
              <FaPlus />
            </Button>
                </div>

                )
              }
                </>
               }
              

            </div>

      </div>
    </div>
  )
}

export default ProductItem
