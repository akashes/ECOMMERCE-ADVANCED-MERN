import React, { useRef, useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from "swiper/modules";



const ProductZoom = ({images}) => {
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
        className={`zoomProductSliderThumbs !h-[500px] overflow-hidden ${images?.length>5 && 'space'}`}
        ref={zoomSliderSmall}
      >
        {
           images?.length>0 && images.map((image,index)=>(
                   <SwiperSlide key={image._id}>
            <div  className={`item rounded-md overflow-hidden cursor-pointer group  ${slideIndex===index ? 'opacity-100':'opacity-30'}`}>
                <img src={image.url} alt=""
                className='w-full transition-all group-hover:scale-105 duration-300 ease-in-out'
                loading="lazy"
                onClick={()=>goto(index)}
                />
            </div>
        </SwiperSlide>

            ))
        }
  
     

  

  
     

      </Swiper>
        </div>
        <div className='zoomContainer w-[85%] !h-[500px] rounded-md overflow-hidden'>
             <Swiper        
        slidesPerView={1}
        spaceBetween={0}
        navigation={false}
        ref={zoomSliderBig}
        
      >
        {
          images?.length>0 &&  images.map((image,index)=>(
                        <SwiperSlide key={image._id}>

        <InnerImageZoom zoomType="click" zoomScale={1} src={image.url} />
        </SwiperSlide>

            ))
        }

     
      </Swiper>

</div>

    </div>
    
    </>

  )
}

export default ProductZoom
