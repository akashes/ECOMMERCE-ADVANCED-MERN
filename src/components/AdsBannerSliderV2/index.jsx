import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/free-mode"



// import required modules
import { FreeMode, Navigation } from 'swiper/modules';
import BannerBoxV2 from '../BannerBoxV2';

const AdsBannerSliderV2 = ({banners,itemsCount}) => {
        
  return (
   <div className='py-5 w-full ads-banner '>
   <Swiper
     
           slidesPerView={itemsCount}
           spaceBetween={10}
           navigation={true}
 modules={[Navigation,FreeMode]}
           breakpoints={{
           0: { slidesPerView: 1 },
           300:{slidesPerView:2},  
    640: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
    1280: { slidesPerView: 4 },

        }}
                   className="ads-banner-slider"
   >
        {
                banners?.length>0 && banners.map((banner)=>(
                        <SwiperSlide key={banner._id}>
        <BannerBoxV2 info="right" banner={banner} src={banner.bannerImage.url}  />

</SwiperSlide>

                ))
        }





   </Swiper>
   
   </div>
  )
}

export default AdsBannerSliderV2
