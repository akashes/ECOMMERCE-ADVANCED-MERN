import { Button } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const OrderSuccess = () => {
    const navigate = useNavigate()
  return (
    <section className='w-full p-10 py-20 flex items-center justify-center flex-col gap-2 '>
        <img width={120} src="https://res.cloudinary.com/dllelmzim/image/upload/v1756389374/shopping-bag_xglm21.png" alt="" />
        <h3 className='mb-0 text-[25px]'>Your Order is Placed </h3>
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
