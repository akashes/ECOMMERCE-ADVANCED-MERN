import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const AdsBannerSkeletonSlider = ({ itemsCount = 4 }) => {
  const alignPattern = ["right", "left", "left", "right"];

  return (
    <div className="py-5 w-full ads-banner">
      <Swiper
        slidesPerView={itemsCount}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="ads-banner-slider"
      >
        {alignPattern.map((align, idx) => (
          <SwiperSlide key={idx}>
            <div className="bannerBoxV2 w-full overflow-hidden rounded-md relative">
              {/* Image skeleton */}
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height={200}
              />

              {/* Info overlay */}
              <div
                className={`absolute w-[50%] top-0 h-full p-5 flex items-center justify-center flex-col gap-2 ${
                  align === "left" ? "left-0" : "right-0"
                }`}
              >
                <Skeleton variant="text" width="80%" height={24} />
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton
                  variant="rectangular"
                  width="70%"
                  height={36}
                  style={{ borderRadius: 6 }}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdsBannerSkeletonSlider;
