import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Navigation,Autoplay } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeSlides } from '../../features/homeSlides';




const HomeSlider = () => {

  const{homeSlides}=useSelector(state=>state.homeSlides)
  console.log(homeSlides)
  const dispatch = useDispatch()
   const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
useEffect(()=>{
  dispatch(fetchHomeSlides())

},[])
  return (
    <div className='homeSlider py-4'>
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
          homeSlides?.length>0 && homeSlides.map((img)=>(
               <SwiperSlide>
          <div className="item rounded-[20px] overflow-hidden">

          <img src={img.url} loading='lazy' alt="Banner-Deals Starting from 499 " className='w-full' />
          </div>
        </SwiperSlide>
          ))
        }
     

        
      </Swiper>
      </div>

    </div>

  )
}

export default HomeSlider


