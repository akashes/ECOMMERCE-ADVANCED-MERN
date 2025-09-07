import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/free-mode"



// import required modules
import { FreeMode, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import ProductItem from '../ProductsItem';


const ProductsSlider = ({items,itemsCount}) => {
  return (
    <div className='productsSlider py-1 lg:py-3 '>
          <Swiper
               
               slidesPerView={6}
               spaceBetween={10}
               navigation={true}
               freeMode={true}
               modules={[Navigation,FreeMode]}
                          breakpoints={{
    250: { slidesPerView: 1,spaceBetween:10 },  
           330:{slidesPerView:2,spaceBetween:10},
           500:{slidesPerView:3,spaceBetween:10},
    1024: { slidesPerView: 4,spaceBetween:10 },
    1280: { slidesPerView: 6,spaceBetween:10 },

        }}
               className="mySwiper"
             >
               {
                  items?.length>0 && items.map((item)=>
                    (
                       <SwiperSlide key={item._id}>         
             <ProductItem item={item} />
                </SwiperSlide>
                    )

                  )
               }
               


           
             </Swiper>
    </div>
  )
}

export default ProductsSlider
