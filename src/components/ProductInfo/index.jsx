import React, { useContext, useMemo, useState } from 'react'
import { Button, Rating } from '@mui/material'
import QtyBox from '../QtyBox'
import { BsCart3, BsCartDash } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa6'
import { IoGitCompareOutline } from 'react-icons/io5'
import { MyContext } from '../../App'
import { addToCart, removeCartItem, updateCart } from '../../features/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { showError, showSuccess } from '../../utils/toastUtils'
import { AuthContext } from '../../contexts/AuthContext'
import throttle from 'lodash.throttle'

const ProductInfo = ({product,goToReviews}) => {
    console.log(product)
    const context = useContext(AuthContext)
    const{cart}=useSelector(state=>state.cart)
    console.log(context)
    const dispatch = useDispatch()
              const isExistingCartItem = cart.find(i=>i.productId?._id===product?._id)
              const isOutOfStock = product?.countInStock===0


    //    product size state
        const[productActionIndex,setProductActionIndex]=useState(null)

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

    const handleRemoveCartItem=async(id)=>{
      const resultAction = await dispatch(removeCartItem(id))
      if(removeCartItem.fulfilled.match(resultAction)){
        showSuccess('Item removed from Cart')
      }
      if(removeCartItem.rejected.match(resultAction)){
        showError('Error removing item from Cart')
      }
      
  
    }
     const handleUpdateQty = useMemo(() => 
      throttle(async (newQty) => {
        if (!isExistingCartItem) return;
    
        if (newQty < 1) {
          const resultAction = await dispatch(removeCartItem(isExistingCartItem._id));
    
          if (removeCartItem.fulfilled.match(resultAction)) {
            showSuccess(resultAction.payload.message || "Item removed from Cart");
          } else {
            showError(resultAction.payload || "Failed to remove item from Cart");
          }
          return;
        }
    
        const resultAction = await dispatch(
          updateCart({ cartItemId: isExistingCartItem._id, quantity: newQty })
        );
        console.log(resultAction)
    
        if (updateCart.fulfilled.match(resultAction)) {
          showSuccess("Cart Updated");
        } 
        if(updateCart.rejected.match(resultAction)){
          showError(resultAction.payload || 'Failed to update cart quantity')
        }
      }, 1000, { leading: true, trailing: true }),
    [dispatch, isExistingCartItem]
    );
    
  return (
    <>
                  <h1 className="text-[24px] font-[600] mb-2">{product?.name}</h1>
            <div className="flex items-center gap-3">
                <span className="text-gray-400 text-[13px]">Brands : 
                    <span className="font-[500] text-black opacity-75 ">{product?.brand}</span>
                    </span>

            <Rating name="size-small" value={product?.rating} size="small" readOnly />
            <span onClick={goToReviews} className="text-[13px] cursor-pointer ">Review ({product?.reviews?.length})</span>

            </div>
            {/* price and availablity */}
         <div className="flex items-center gap-4 mt-4">
                <span className='oldPrice line-through text-gray-500 text-[20px] font-[500]'>₹ {product?.oldPrice}</span>
                <span className="price text-primary font-[600] text-[20px]">₹ {product?.price}</span>
                <span className="text-[14px]">Available In Stock : <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
  {product?.countInStock} available
</span>

                    </span>
                
            </div>
            {/* product description */}
            <p className="mt-3 pr-[10px] mb-5">
                {product?.description}
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
                {/* {
                    isExistingCartItem && 
                <div className="qtyBoxWrapper w-[70px]">

                <QtyBox handleUpdateQty={handleUpdateQty} quantity={isExistingCartItem.quantity} stock={product?.countInStock} cartItemId={isExistingCartItem._id} />
                </div>
                }
                {
                    !isExistingCartItem ? <>
                     <Button disabled={isOutOfStock} onClick={()=>handleAddToCart(product._id)} className={`${isOutOfStock && 'opacity-50'} btn-org flex gap-2 items-center`}>
                    <BsCart3 className="text-[22px]"/>
                    Add to Cart
                </Button>
                {isOutOfStock &&                 <span className='text-primary'>Product Out Of Stock</span>
}
                    </>
                :
                <Button onClick={()=>handleRemoveCartItem(isExistingCartItem._id)} className="btn-org flex gap-2 items-center">
                    <BsCartDash  className="text-[22px]"/>
                    Remove from Cart
                </Button>
                } */}
               

               <div className="flex items-center  gap-4 py-4">
  {isExistingCartItem && (
    <div className="qtyBoxWrapper w-[70px]">
      <QtyBox
        handleUpdateQty={handleUpdateQty}
        quantity={isExistingCartItem.quantity}
        stock={product?.countInStock}
        cartItemId={isExistingCartItem._id}
      />
    </div>
  )}

  {!isExistingCartItem ? (
    <Button
      disabled={isOutOfStock}
      onClick={() => handleAddToCart(product._id)}
      className={`${isOutOfStock && "opacity-50"} btn-org flex gap-2 items-center`}
    >
      <BsCart3 className="text-[22px]" />
      Add to Cart
    </Button>
  ) : (
    <Button
      onClick={() => handleRemoveCartItem(isExistingCartItem._id)}
      className="btn-org flex gap-2 items-center"
    >
      <BsCartDash className="text-[22px]" />
      Remove from Cart
    </Button>
  )}
</div>

{/* Always show warning if out of stock */}
{isOutOfStock && (
  <span className="text-primary block mt-2">Product Out Of Stock</span>
)}


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
