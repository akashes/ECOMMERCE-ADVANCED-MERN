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


const ProductsSlider = ({items,itemsCount}) => {
  return (
    <div className='productsSlider py-3 '>
          <Swiper
               
               slidesPerView={6}
               spaceBetween={10}
               navigation={true}
               modules={[Navigation]}
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
