import React, { useRef, useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from "swiper/modules";



const ProductZoom = () => {
    const[slideIndex,setSlideIndex]=useState(0)
const zoomSliderBig = useRef(null)
const zoomSliderSmall = useRef(null)

    const goto=(index)=>{
        setSlideIndex(index);
        zoomSliderBig.current.swiper.slideTo(index)
        zoomSliderSmall.current.swiper.slideTo(index)
    }
  return (
    <>
    <div className="flex gap-3 ">

        <div className="slider w-[15%]    ">
              <Swiper
              
              direction={'vertical'}
        
        slidesPerView={5}
        spaceBetween={10}
        
        navigation={true}
        modules={[Navigation]}
        className="zoomProductSliderThumbs !h-[500px] overflow-hidden"
        ref={zoomSliderSmall}
      >
  
        <SwiperSlide>
            <div className={`item rounded-md overflow-hidden cursor-pointer group  ${slideIndex===0 ? 'opacity-100':'opacity-30'}`}>
                <img src="https://serviceapi.spicezgold.com/download/1742462909156_gdgd1.jpg" alt=""
                className='w-full transition-all group-hover:scale-105 duration-300 ease-in-out'
                loading="lazy"
                onClick={()=>goto(0)}
                />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className={`item rounded-md overflow-hidden cursor-pointer group  ${slideIndex===1 ? 'opacity-100':'opacity-30'}`}>
                <img src="https://serviceapi.spicezgold.com/download/1742462909158_gdgd2.jpg" alt=""
                className='w-full transition-all group-hover:scale-105 duration-300 ease-in-out'
                loading="lazy"
                onClick={()=>goto(1)}
                />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className={`item rounded-md overflow-hidden cursor-pointer group  ${slideIndex===2 ? 'opacity-100':'opacity-30'}`}>
                <img src="https://serviceapi.spicezgold.com/download/1742462909161_gdgd3.jpg" alt=""
                className='w-full transition-all group-hover:scale-105 duration-300 ease-in-out'
                loading="lazy"
                onClick={()=>goto(2)}

                />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className={`item rounded-md overflow-hidden cursor-pointer group  ${slideIndex===3 ? 'opacity-100':'opacity-30'}`}>
                <img src="https://serviceapi.spicezgold.com/download/1742462909162_gdgd4.jpg" alt=""
                className='w-full transition-all group-hover:scale-105 duration-300 ease-in-out'
                loading="lazy"
                onClick={()=>goto(3)}

                />
            </div>
        </SwiperSlide>

        <SwiperSlide>
            
        </SwiperSlide>
  

  
     

      </Swiper>
        </div>
        <div className='zoomContainer w-[85%] !h-[500px] rounded-md overflow-hidden'>
             <Swiper        
        slidesPerView={1}
        spaceBetween={0}
        navigation={false}
        ref={zoomSliderBig}
        
      >
        <SwiperSlide>

        <InnerImageZoom zoomType="click" zoomScale={1} src="https://serviceapi.spicezgold.com/download/1742462909156_gdgd1.jpg" />
        </SwiperSlide>
        <SwiperSlide>

        <InnerImageZoom zoomType="click" zoomScale={1} src="https://serviceapi.spicezgold.com/download/1742462909158_gdgd2.jpg"/>
        </SwiperSlide>
        <SwiperSlide>

        <InnerImageZoom zoomType="click" zoomScale={1} src="https://serviceapi.spicezgold.com/download/1742462909161_gdgd3.jpg" />
        </SwiperSlide>
        <SwiperSlide>

        <InnerImageZoom zoomType="click" zoomScale={1} src="https://serviceapi.spicezgold.com/download/1742462909162_gdgd4.jpg" />
        </SwiperSlide>

      </Swiper>

</div>

    </div>
    
    </>

  )
}

export default ProductZoom
