import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';




// import required modules
import { FreeMode, Navigation } from 'swiper/modules';
import BannerBox from '../BannerBox';


const AdsBannerSlider = ({itemsCount}) => {
  return (
   <div className='py-5 w-full ads-banner'>
   <Swiper
     
           slidesPerView={itemsCount}
           spaceBetween={10}
           navigation={true}
           modules={[Navigation,FreeMode]}
           freeMode={true}
             breakpoints={{
           0: { slidesPerView: 1 },
           300:{slidesPerView:2},  
    640: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
    1280: { slidesPerView: 4 },

        }}
           className="ads-banner-slider"
   >

<SwiperSlide>
    <BannerBox img={"https://res.cloudinary.com/dllelmzim/image/upload/v1752154615/1741669012402_banner1_h24d4s.webp"} link={"/test"}/>

</SwiperSlide>
<SwiperSlide>
    <BannerBox img={"https://res.cloudinary.com/dllelmzim/image/upload/v1752154616/1741669037986_banner2_oypvok.webp"} link={"/"}/>
  
</SwiperSlide>
<SwiperSlide>
   <BannerBox img={"https://res.cloudinary.com/dllelmzim/image/upload/v1752154616/1741669057847_banner5_r91znf.webp"} link={"/"}/>
</SwiperSlide>
<SwiperSlide>
   <BannerBox img={"https://res.cloudinary.com/dllelmzim/image/upload/v1752154616/1742453755529_1741669087880_banner6_qcivst.webp"} link={"/"} />
</SwiperSlide>
<SwiperSlide>
   <BannerBox img={"https://res.cloudinary.com/dllelmzim/image/upload/v1752155833/1739876036_Personal_Audio_Sale_qgy7zu.webp"} link={"/"} />
</SwiperSlide>

   </Swiper>
   
   </div>
  )
}

export default AdsBannerSlider
