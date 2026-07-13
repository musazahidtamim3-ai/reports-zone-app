import FeaturedSection from "./components/home/Featured";
import BannerSlider from "./components/home/Slider";
import WhyChooseUs from "./components/home/why-choose";

export default function Home() {
  return (
    <div>
      <BannerSlider />
      <WhyChooseUs />
      <FeaturedSection/>
    </div>
  );
}
