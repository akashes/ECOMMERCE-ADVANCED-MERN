import React from 'react'
import ProductItemSkeleton from '../Skeltons/ProductItemSkelton'


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Navigation } from 'swiper/modules';
import { FreeMode } from 'swiper/modules';


const ProductsSkelton = () => {
  return (
     <div className='productsSlider py-3 '>
          <Swiper
               
     




                slidesPerView={6}
               spaceBetween={10}
               navigation={true}
               freeMode={true}
               modules={[Navigation,FreeMode]}
                          breakpoints={{
           250: { slidesPerView: 2,spaceBetween:10 },  
           450:{slidesPerView:2,spaceBetween:10},
    640: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
    1280: { slidesPerView: 6,spaceBetween:10 },

        }}
               className="mySwiper"
             >
               {
                  Array.from(new Array(6)).map((_,index)=>
                    (
                       <SwiperSlide key={index}>         
             <ProductItemSkeleton/>
                </SwiperSlide>
                    )

                  )
               }
               


           
             </Swiper>
    </div>
  )
}

export default ProductsSkelton
