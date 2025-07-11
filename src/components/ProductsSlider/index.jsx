import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import ProductItem from '../ProductsItem';


const ProductsSlider = ({itemsCount}) => {
  return (
    <div className='productsSlider py-3'>
          <Swiper
               
               slidesPerView={itemsCount}
               spaceBetween={10}
               navigation={true}
               modules={[Navigation]}
               className="mySwiper"
             >
                <SwiperSlide>         
             <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>         
             <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>         
             <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>         
             <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>         
             <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>         
             <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>         
             <ProductItem/>
                </SwiperSlide>
                <SwiperSlide>         
             <ProductItem/>
                </SwiperSlide>

           
             </Swiper>
    </div>
  )
}

export default ProductsSlider
