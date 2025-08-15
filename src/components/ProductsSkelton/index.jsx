import React from 'react'
import ProductItemSkeleton from '../Skeltons/ProductItemSkelton'


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
const ProductsSkelton = ({count,space=10}) => {
  return (
     <div className='productsSlider py-3 '>
          <Swiper
               
               slidesPerView={count}
               spaceBetween={space}
               navigation={true}
               modules={[Navigation]}
               className="mySwiper"
             >
               {
                  Array.from(new Array(count)).map((_,index)=>
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
