import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { BANNER_IMAGES, SWIPER_CONFIG } from "../config/config";
import "swiper/css";
import "swiper/css/pagination";

export const BannerCarousel = () => {
  return (
    <div className="w-full h-[35vh]">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: SWIPER_CONFIG.autoplayDelay,
          disableOnInteraction: false,
        }}
        loop={SWIPER_CONFIG.loop}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {BANNER_IMAGES.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`배너 ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
