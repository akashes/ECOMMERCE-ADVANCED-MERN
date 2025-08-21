import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeSlides } from '../../features/homeSlides';
import { setCategories } from '../../features/productsFilter/productsFilterSlice';
import { Button } from '@mui/material';


const HomeCatSlider = () => {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()

const rootCategories = useSelector(
  state => state.category.categories.map(cat => ({
    _id:cat._id,
    name: cat.name,
    image: cat.images[0].url
  }))
);

console.log(rootCategories)


  return (
    <div className="homeCatSlider py-8 pt-4">
      <div className="w-[95%] mx-auto">
        <Swiper
        
        slidesPerView={8}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
    
    {
      rootCategories?.length>0 && rootCategories.map((item)=>(

        <SwiperSlide >
         <div
         className='!text-[rgba(0,0,0,0.7)]'
                                 onClick={()=>{
                                     // dispatch(resetFilters())
                                     
                                     dispatch(setCategories([item._id]))
                                     navigate(`/products?category=${item._id}`)
         
                                 }}
         >
          <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
            <img src={item.image}  
            alt="Fashion"
            className='w-[60px] transition-all'
            />
            <h3 className='text-[15px] font-[500] mt-3'>{item.name}</h3>
          </div>
         </div>
        </SwiperSlide>
      ))
    }

      
    
      </Swiper>

      </div>
      
    </div>
  )
} 

export default HomeCatSlider
