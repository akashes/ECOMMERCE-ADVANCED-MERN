import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Navigation,Autoplay } from 'swiper/modules';
const HomeSkelton = () => {
  return (
    <div>
          <div className='homeSlider pb-2 pt-2 lg:pt-4 lg:pb-4  '>
              <div className="container">
                
                    <Swiper  spaceBetween={10} 
           speed={500}
           navigation={true} 
           loop={true}
           modules={[Navigation,Autoplay]}  
             autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
         className="sliderHome">
        
        {
          Array.from({ length: 4 }).map((_, index) => (
            <SwiperSlide key={index}>
              <HomeSliderSkelton />
            </SwiperSlide>
          ))
        }
         </Swiper>
                  
                  
                
                
        
        
              </div>
        
            </div>
      
    </div>
  )
}

export default HomeSkelton
