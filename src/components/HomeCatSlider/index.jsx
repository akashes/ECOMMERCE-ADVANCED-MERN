// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/free-mode"



import { FreeMode, Navigation } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../features/productsFilter/productsFilterSlice';
import {m,LazyMotion,domAnimation} from 'framer-motion'



const HomeCatSlider = () => {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  
  const { categories, loading } = useSelector((state) => state.category);
const rootCategories = categories.map((cat) => ({
    _id: cat._id,
    name: cat.name,
    image: cat.images[0]?.url,
  }));



  return (
  <div className="homeCatSlider py-4 lg:py-8 pt-2 lg:pt-4">
      <div className="w-[95%] mx-auto">
        <LazyMotion features={domAnimation}>
          <Swiper
            slidesPerView={8}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation, FreeMode]}
            breakpoints={{
              0: { slidesPerView: 4 },
              640: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 7 },
            }}
            className="mySwiper"
          >
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
<div className="animate-pulse flex flex-col items-center justify-center py-4 lg:py-7 px-3 bg-gray-100 rounded-md">
    <div className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] bg-gray-200 rounded-full"></div>
    <div className="h-3 w-16 bg-gray-200 mt-3 rounded"></div>
  </div>                </SwiperSlide>
              ))
            ) : (
              rootCategories.map((item) => (
                <SwiperSlide key={item._id}>
                  <div
                    className="cursor-pointer !text-[rgba(0,0,0,0.7)]"
                    onClick={() => {
                      dispatch(setCategories([item._id]));
                      navigate(`/products?category=${item._id}`);
                    }}
                  >
                    <m.div
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                      className="item py-4 lg:py-7 px-3 bg-white rounded-md lg:rounded-sm text-center flex items-center justify-center flex-col"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-[40px] lg:w-[60px] transition-all"
                      />
                      <h3 className="text-[12px] lg:text-[15px] font-[500] mt-3">
                        {item.name}
                      </h3>
                    </m.div>
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </LazyMotion>
      </div>
    </div>
  )
} 

export default HomeCatSlider
