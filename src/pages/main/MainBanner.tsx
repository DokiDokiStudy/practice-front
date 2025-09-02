import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

function MainBanner() {
  const bannerImages = [
    "/images/개발자농담1.png",
    "/images/just_joke.jpg",
    "/images/running_curve.jpg",
  ];

  return (
    <div className="w-full h-[35vh] ">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {bannerImages.map((src, idx) => (
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
}

export default MainBanner;
