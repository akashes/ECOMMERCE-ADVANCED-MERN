import React, { useContext, useRef, useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from "swiper/modules";
import { MyContext } from '../../App';



const ProductZoom = ({images}) => {
  const context = useContext(MyContext)
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
    <div className="flex flex-col-reverse  lg:flex-row gap-2 lg:gap-3 px-2  lg:px-0">

        <div className="slider w-full   lg:w-[15%] px-2 lg:px-0   ">
              <Swiper
              
              direction={context.windowWidth>992?'vertical':'horizontal'}
        
        slidesPerView={5}
        spaceBetween={10}
        autoHeight={true}
        
        navigation={context.windowWidth>992?true:false}
        modules={[Navigation]}
        className={`zoomProductSliderThumbs !h-auto lg:!h-[500px] overflow-hidden ${images?.length>5 && 'space'}`}
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
        <div className='zoomContainer w-full h-auto   rounded-md overflow-hidden px-2 '>
             <Swiper        
        slidesPerView={1}
        spaceBetween={0}
        navigation={false}
        ref={zoomSliderBig}
        autoHeight={true}
        
      >
        {
          images?.length>0 &&  images.map((image,index)=>(
                        <SwiperSlide key={image._id}>

        <InnerImageZoom zoomType="click" zoomScale={1} src={image.url}    
                // className="max-h-[500px] object-contain" 
 />
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
