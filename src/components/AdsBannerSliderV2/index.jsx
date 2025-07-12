import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';
import BannerBoxV2 from '../BannerBoxV2';

const AdsBannerSliderV2 = ({itemsCount}) => {
  return (
   <div className='py-5 w-full ads-banner'>
   <Swiper
     
           slidesPerView={itemsCount}
           spaceBetween={10}
           navigation={true}
           modules={[Navigation]}
           className="ads-banner-slider"
   >

<SwiperSlide>
        <BannerBoxV2 info="right" src={"https://res.cloudinary.com/dllelmzim/image/upload/v1752322864/1751598649861_1737020916820_New_Project_52_jxawpu.jpg"}  />

</SwiperSlide>
<SwiperSlide>
        <BannerBoxV2 info="right" src={"https://res.cloudinary.com/dllelmzim/image/upload/v1752300372/1741664665391_1741497254110_New_Project_50_fwovj5.jpg"}  />
</SwiperSlide>
<SwiperSlide>
        <BannerBoxV2 info="left" src={"https://res.cloudinary.com/dllelmzim/image/upload/v1752322865/1741663408792_1737020756772_New_Project_1_ny2mzs.png"}  />
  
</SwiperSlide>
<SwiperSlide>
        <BannerBoxV2 info="left" src={"https://res.cloudinary.com/dllelmzim/image/upload/v1752300372/1741664496923_1737020250515_New_Project_47_rsj6yc.jpg"}  />
</SwiperSlide>


   </Swiper>
   
   </div>
  )
}

export default AdsBannerSliderV2
