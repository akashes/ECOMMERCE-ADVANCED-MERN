import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';
import BannerBoxV2 from '../BannerBoxV2';

const AdsBannerSliderV2 = ({banners,itemsCount}) => {
  return (
   <div className='py-5 w-full ads-banner'>
   <Swiper
     
           slidesPerView={itemsCount}
           spaceBetween={10}
           navigation={true}
           modules={[Navigation]}
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
