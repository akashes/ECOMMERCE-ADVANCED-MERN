import { Button } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const OrderSuccess = () => {
    const navigate = useNavigate()
  return (
    <section className='w-full p-10 py-10 lg:py-20 flex items-center justify-center flex-col  gap-1 lg:gap-2 '>
        <img className=' w-[80px] lg:w-[120px]' src="https://res.cloudinary.com/dllelmzim/image/upload/v1756389374/shopping-bag_xglm21.png" alt="" />
        <h3 className='mb-0 text-[20px] lg:text-[25px]'>Your Order is Placed!! </h3>
        <p className='mt-0'>Thank you for your payment</p>
        <p onClick={()=>{
            navigate('/my-orders',{replace:true})
        }} className='font-bold  underline cursor-pointer'>
        View all Orders
        </p>
        <Button onClick={()=>{
            navigate('/',{replace:true})
        }} className='btn-org'>Back to home</Button>

    </section>
  )
}

export default OrderSuccess
