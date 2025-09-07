import React, { useContext } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { MyContext } from '../../App'

const BannerBoxV2 = ({banner}) => {
  const context = useContext(MyContext)
  console.log(banner)
  return (
    <div className='bannerBoxV2 w-full overflow-hidden rounded-md group relative h-[150px] md:h-[250px] lg:h-[300px] ' >
        <img src={banner.bannerImage.url}
         alt="" className='w-full transition-all duration-150 ease-in-out group-hover:scale-105 ' />
         <div className={`info absolute w-[50%] top-0 h-[full%]  z-50  p-1 md:p-3 lg:p-5 flex items-start  justify-center lg:justify-center flex-col gap-1 lg:gap-2 ${banner?.alignInfo==='left'?'left-0':'right-0'}`}>
            <h2 className='text-[13px] sm:text-[14px]  md:text-[18px] font-[600]'>
  {banner.title?.length > (context.windowWidth > 992 ? 70 : 30) 
    ? banner.title.substr(0, context.windowWidth > 992 ? 70 : 30) + "..." 
    : banner.title}              </h2>
            <span className='text-[13px] md:text-[18px] lg:text-[20px] text-primary font-[600] w-full'>₹{banner?.price}</span>
            <div className='w-full '>
               <Link to='/' className='text-[12px] lg:text-[16px] font-[600] link'>
            SHOP NOW
            </Link>
            </div>
            
         </div>
      
    </div>
  )
}

export default BannerBoxV2
