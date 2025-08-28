import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const OrderFail = () => {
    const navigate = useNavigate()
  return (
     <section className='w-full p-10 py-20 flex items-center justify-center flex-col gap-2 '>
        <img width={120} src="https://res.cloudinary.com/dllelmzim/image/upload/v1756390838/failed_fvxhpv.png" alt="" />
        <h3 className='mb-0 text-[25px]'>Failed to Place Your Order </h3>
        <p className='mt-0'>Thank you for your payment</p>
  
        <Button
         onClick={()=>{
            navigate('/',{replace:true})
        }} className='btn-org'>Back to home</Button>

    </section>
  )
}

export default OrderFail
