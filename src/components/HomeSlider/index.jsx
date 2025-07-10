import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Navigation,Autoplay } from 'swiper/modules';



const HomeSlider = () => {
   const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div className='homeSlider py-4'>
      <div className="container">

   <Swiper  spaceBetween={10} 
   speed={500}
   navigation={true} 
   modules={[Navigation,Autoplay]}  
     autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
 className="sliderHome">
        
        <SwiperSlide>
          <div className="item rounded-[20px] overflow-hidden">

          <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752129059/Banner6_f3poie.jpg" loading='lazy' alt="Banner-Deals Starting from 499 " className='w-full' />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item rounded-[20px] overflow-hidden">
          <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752129443/banner1_ssgz0l.jpg" loading='lazy' alt="Banner - Big Fab Sale Upto 50% off " className='w-full' />

          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item rounded-[20px] overflow-hidden">

          <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752129060/Banner7_jlcaub.jpg" loading='lazy' alt="Banner-Nykaa fashion styled dresses" className='w-full' />
          </div>
          
        </SwiperSlide>
        <SwiperSlide>
          <div className="item rounded-[20px] overflow-hidden">

          <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752129060/Banner2_zqtkdk.jpg" loading='lazy' alt="Banner-End of Sale , Upto 50% off" className='w-full' />
          </div>

        </SwiperSlide>
        <SwiperSlide>
          <div className="item rounded-[20px] overflow-hidden">
          
          <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752129060/Banner5_ecadru.jpg" loading='lazy' alt="Banner - Poppies on the sea - child Wears" className='w-full' />
          </div>

        </SwiperSlide>
        <SwiperSlide>
          <div className="item rounded-[20px] overflow-hidden">

          <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752129060/Banner3_mndss8.jpg" loading='lazy' alt="Banner - Grocery deals" className='w-full' />
          </div>

        </SwiperSlide>
        <SwiperSlide>
          <div className="item rounded-[20px] overflow-hidden">

          <img src="https://res.cloudinary.com/dllelmzim/image/upload/v1752129060/Banner4_yiwxwa.jpg" loading='lazy' alt="Banner - New Season specific styles " className='w-full' />
          </div>

        </SwiperSlide>
        
      </Swiper>
      </div>

    </div>

  )
}

export default HomeSlider


