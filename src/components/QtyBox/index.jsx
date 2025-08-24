import React, { useEffect, useState } from 'react'
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { showError, showWarning } from '../../utils/toastUtils';
import { useDispatch } from 'react-redux';
import { setCartQuantity, updateCart } from '../../features/cart/cartSlice';



const QtyBox = ({handleUpdateQty,quantity,stock,cartItemId}) => {

  const dispatch = useDispatch()
 let isStockLess = stock<quantity

 const updateFn=async()=>{
   const resultAction = await dispatch(updateCart({cartItemId,quantity:stock}))
   if(updateCart.fulfilled.match(resultAction)){
     
     showWarning(`Cart count adjusted to available stock limit of ${stock} `)
 }
 }

    
    const increaseQty=(qtyVal)=>{
      if(qtyVal>=15){
        showError('Maximum product purchase count reached!')
        return
      }
      
      handleUpdateQty( qtyVal+1)
       
    }
    const decreaseQty=(qtyVal)=>{
        //  if(qtyVal===1){
        handleUpdateQty(qtyVal-1)
        



    }

    useEffect(()=>{
      if(isStockLess){
        updateFn()

      }

    },[])
  return (
  <>
    <div className='qtyBox flex items-center relative  '>
<input value={isStockLess?stock:quantity}  defaultValue={1} type="number" class="pl-5 w-full h-[40px] p-2 text-[15px] focus:outline-none  border border-gray-300  rounded-md" />
<div className="flex items-center flex-col 
justify-between h-[40px] absolute top-0 right-0 z-50 ">

      <Button className='!min-w-[25px] !h-[20px] !text-[#000] hover:!bg-[var(--primary)] hover:!text-white group '
      onClick={()=>increaseQty(quantity)}
      >
        <FaAngleUp className='text-[12px] opacity-55 group-hover:!opacity-100'/>
      </Button>
      <Button className='!min-w-[25px]  !h-[20px] !text-[#000] hover:!bg-[var(--primary)] hover:!text-white group'
      onClick={()=>decreaseQty(quantity)}
      >
        <FaAngleDown className='text-[12px] opacity-55  group-hover:!opacity-100' />
      </Button>
    </div>
</div>


    
  </>
  )
}

export default QtyBox
