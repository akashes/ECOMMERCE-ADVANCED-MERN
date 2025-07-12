import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

const BannerBoxV2 = ({info,src}) => {
  return (
    <div className='bannerBoxV2 w-full overflow-hidden rounded-md group relative  ' >
        <img src={src}
         alt="" className='w-full transition-all duration-150 ease-in-out group-hover:scale-105 ' />
         <div className={`info absolute w-[50%] top-0 h-[100%]  z-50 p-5 flex items-center justify-center flex-col gap-2 ${info==='left'?'left-0':'right-0'}`}>
            <h2 className='text-[18px] font-[600]'>Buy Men's Footwear with low Price</h2>
            <span className='text-[20px] text-primary font-[600] w-full'>₹1500</span>
            <div className='w-full '>
               <Link to='/' className='text-[16px] font-[600] link'>
            SHOP NOW
            </Link>
            </div>
            
         </div>
      
    </div>
  )
}

export default BannerBoxV2
