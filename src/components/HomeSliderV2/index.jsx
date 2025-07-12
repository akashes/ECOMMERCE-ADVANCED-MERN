import React, { useEffect, useRef, useState } from 'react'
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


const HomeSliderV2 = (
) => {
    const swiperRef = useRef(null);



  return (


    <Swiper
        // slidesPerView={1}
        spaceBetween={30}
        effect={'fade'}
        loop={true}
        autoplay={{
          delay:2500,
          disableOnInteraction:false
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation,EffectFade,Autoplay]}
        className="mySwiper homeSliderV2"
      >
        <SwiperSlide>
          <div
            className='item w-full !rounded-md !overflow-hidden relative ' >

          <img className='w-full' src="https://res.cloudinary.com/dllelmzim/image/upload/v1752264741/1742439896581_1737036773579_sample-1_a49wys.jpg" alt="" />
          <div className="info absolute top-0  w-[50%] h-[100%] opacity-0 flex items-center justify-center flex-col
           z-50 p-8 mb-3 
           transition-all duration-700 ease-in-out  ">
            <h4 className='text-[18px] font-[500] w-full text-left relative    '>Big Saving Days Sale</h4>
            <h2 className='text-[35px] font-[700] w-full relative'>Women Solid Round Green T-Shirt</h2>
            <h3 className='text-[18px] font-[500] w-full text-left my-3 flex items-baseline gap-2 relative'>Starting At Only<span className='text-primary text-[30px] font-[700] '>₹ 499</span></h3>
            <div className='w-full relative  opacity-0 btn_' >
              <Button className='btn-org  '>
              SHOP NOW
            </Button>
            </div>
          </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='item w-full  !rounded-md !overflow-hidden relative ' >

          <img className='w-full ' src="https://res.cloudinary.com/dllelmzim/image/upload/v1752264741/1742441193376_1737037654953_New_Project_45_rho7uq.jpg" alt="" />
          <div className="info absolute top-0  w-[50%] h-[100%] opacity-0 flex items-center justify-center flex-col
           z-50 p-8 mb-3 
           transition-all duration-700 ease-in-out  ">
            <h4 className='text-[18px] font-[500] w-full text-left relative    '>Big Saving Days Sale</h4>
            <h2 className='text-[35px] font-[700] w-full relative'>Apple iPhone 13 128GB,Purple</h2>
            <h3 className='text-[18px] font-[500] w-full text-left my-3 flex items-baseline gap-2 relative'>Starting At Only<span className='text-primary text-[30px] font-[700] '>₹ 1,25,000</span></h3>
            <div className='w-full relative  opacity-0 btn_' >
              <Button className='btn-org  '>
              SHOP NOW
            </Button>
            </div>
          </div>
          </div>
        </SwiperSlide>
        
      </Swiper>

  )
}

export default HomeSliderV2
