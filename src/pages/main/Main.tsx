import { BannerCarousel } from "@/widgets/banner-carousel";
import { ContentGrid } from "@/widgets/content-grid";

export const Main = () => {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-white via-blue-50 to-blue-100">
      <BannerCarousel />
      <ContentGrid />
    </div>
  );
};
