import React, { useContext, useEffect, useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './style.css'

import { EffectFade, Navigation, Pagination ,Autoplay} from 'swiper/modules';

import { Button } from '@mui/material';
import { MyContext } from '../../App';

const data = [
  {
    description:'Big Saving Days Sale',
    title:'Women Solid Round Green T-Shirt',
    price:'499',
    img:'https://res.cloudinary.com/dllelmzim/image/upload/v1752264741/1742439896581_1737036773579_sample-1_a49wys.jpg'
  },
  {
    description:'Big Saving Days Sale',
    title:'Apple iPhone 13 128GB,Purple',
    price:'1,25,000',
    img:'https://res.cloudinary.com/dllelmzim/image/upload/v1752264741/1742441193376_1737037654953_New_Project_45_rho7uq.jpg'

  }
]

const HomeSliderV2 = () => {
    const swiperRef = useRef(null);
    const context = useContext(MyContext)



  return (


    <Swiper
        // slidesPerView={1}
        spaceBetween={30}
        effect={'fade'}
        loop={true}
        // autoplay={{
        //   delay:2500,
        //   disableOnInteraction:false
        // }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation,EffectFade,Autoplay]}
        className="mySwiper homeSliderV2"
      >

{
  data.map((item)=>(

        <SwiperSlide>
          <div
            className='item w-full !rounded-md !overflow-hidden relative ' >

          <img className='w-full' src={item.img} alt="" />
          <div className="info absolute top-0  w-[50%] h-[100%] opacity-0 flex items-center justify-center flex-col
           z-50 p-1 md:p-3 lg:p-8 mb-3 
           transition-all duration-700 ease-in-out  ">
            <h4 className=' text-[12px] lg:text-[18px] font-[500] w-full text-left relative  '>{item.description}</h4>
<h2 className="text-[17px] md:text-[30px] lg:text-[35px] font-[700] w-full relative">
  {item.title?.length > (context.windowWidth > 992 ? 70 : 30) 
    ? item.title.substr(0, context.windowWidth > 992 ? 70 : 30) + "..." 
    : item.title}
</h2>
            <h3 className='text-[15px] lg:text-[18px] font-[500] w-full text-left my-0  lg:my-3 flex flex-col lg:flex-row items-baseline gap-0 lg:gap-2 relative'>

           <span className='block lg:inline w-full lg:w-max text-[12px] md:text-[14px] '>

              Starting At Only
           </span>
              
              <span className='text-primary text-[16px] lg:text-[30px] font-[700] '>₹{item.price}</span>
              </h3>
            <div className='w-full relative  opacity-0 btn_' >
              <Button className=' !bg-primary !text-white !px-2 !py-0  !text-[13px] lg:!text-[18px] lg:!py-1  '>
              SHOP NOW
            </Button>
            </div>
          </div>
          </div>
        </SwiperSlide>
  ))
}


     
        
      </Swiper>

  )
}

export default HomeSliderV2
