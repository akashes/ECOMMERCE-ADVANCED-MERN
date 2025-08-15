import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

const BannerBoxV2 = ({banner,src}) => {
  return (
    <div className='bannerBoxV2 w-full overflow-hidden rounded-md group relative  ' >
        <img src={src}
         alt="" className='w-full transition-all duration-150 ease-in-out group-hover:scale-105 ' />
         <div className={`info absolute w-[50%] top-0 h-[100%]  z-50 p-5 flex items-center justify-center flex-col gap-2 ${banner?.alignInfo==='left'?'left-0':'right-0'}`}>
            <h2 className='text-[18px] font-[600]'>{banner?.title}</h2>
            <span className='text-[20px] text-primary font-[600] w-full'>₹{banner?.price}</span>
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
