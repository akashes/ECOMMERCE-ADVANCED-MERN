import  Button from "@mui/material/Button"
import React from 'react'
import { useNavigate } from 'react-router-dom'

const OrderFail = () => {
    const navigate = useNavigate()
  return (
     <section className='w-full p-10  py-10 lg:py-20 flex items-center justify-center flex-col gap-1 lg:gap-2 '>
        <img className=' w-[80px] lg:w-[120px]' src="https://res.cloudinary.com/dllelmzim/image/upload/v1756390838/failed_fvxhpv.png" alt="" />
        <h3 className='mb-0 text-[20px] lg:text-[25px] text-center'>Failed to Place Your Order </h3>
        <p className='mt-0 text-center'>Please contact our customer care team for more details</p>
  
        <Button
         onClick={()=>{
            navigate('/',{replace:true})
        }} className='btn-org'>Back to home</Button>

    </section>
  )
}

export default OrderFail
