import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';


const HomeCatSlider = () => {

  return (
    <div className="homeCatSlider py-8 pt-4">
      <div className="container">
        <Swiper
        
        slidesPerView={8}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
    
        <SwiperSlide >
         <Link to='/smart-tablet'>
          <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
            <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752135621/fashion_c4wz7w.png"  
            alt="Fashion"
            className='w-[60px] transition-all'
            />
            <h3 className='text-[15px] font-[500] mt-3'>Fashion</h3>
          </div>
         </Link>
        </SwiperSlide>
        <SwiperSlide >
         <Link to='/smart-tablet'>
          <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
            <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752148661/electronics_w1qixi.png"  
            alt="Electronics"
            className='w-[60px] transition-all'
            />
            <h3 className='text-[15px] font-[500] mt-3'>Electronics</h3>
          </div>
         </Link>
        </SwiperSlide>
        <SwiperSlide >
         <Link to='/smart-tablet'>
          <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
            <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752148661/beauty_zannep.png"  
            alt="Beauty"
            className='w-[60px] transition-all'
            />
            <h3 className='text-[15px] font-[500] mt-3'>Beauty</h3>
          </div>
         </Link>
        </SwiperSlide>
        <SwiperSlide >
         <Link to='/smart-tablet'>
          <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
            <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752148662/footwear_nxws3z.png"  
            alt="Footwear"
            className='w-[60px] transition-all'
            />
            <h3 className='text-[15px] font-[500] mt-3'>Footwear</h3>
          </div>
         </Link>
        </SwiperSlide>
        <SwiperSlide >
         <Link to='/smart-tablet'>
          <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
            <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752148663/groceries_rlv7cq.png"  
            alt="Groceries"
            className='w-[60px] transition-all'
            />
            <h3 className='text-[15px] font-[500] mt-3'>Groceries</h3>
          </div>
         </Link>
        </SwiperSlide>
        <SwiperSlide >
         <Link to='/smart-tablet'>
          <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
            <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752148661/bags_yl39qe.png"  
            alt="Bag"
            className='w-[60px] transition-all'
            />
            <h3 className='text-[15px] font-[500] mt-3'>Bag</h3>
          </div>
         </Link>
        </SwiperSlide>
        <SwiperSlide >
         <Link to='/smart-tablet'>
          <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
            <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752148667/wellness_u8kz7e.png"  
            alt="Wellness"
            className='w-[60px] transition-all'
            />
            <h3 className='text-[15px] font-[500] mt-3'>Wellness</h3>
          </div>
         </Link>
        </SwiperSlide>
        <SwiperSlide >
         <Link to='/smart-tablet'>
          <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
            <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752148666/jewellery_d25z5z.png"  
            alt="Jewellery"
            className='w-[60px] transition-all'
            />
            <h3 className='text-[15px] font-[500] mt-3'>Jewellery</h3>
          </div>
         </Link>
        </SwiperSlide>
        <SwiperSlide >
         <Link to='/smart-tablet'>
          <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
            <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752135621/fashion_c4wz7w.png"  
            alt=""
            className='w-[60px] transition-all'
            />
            <h3 className='text-[15px] font-[500] mt-3'>Smart Tablet</h3>
          </div>
         </Link>
        </SwiperSlide>
      
    
      </Swiper>

      </div>
      
    </div>
  )
} 

export default HomeCatSlider
