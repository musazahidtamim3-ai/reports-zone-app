import FeaturedSection from "./components/home/Featured";
import EmergencyHotlines from "./components/home/Hotlines";
import PlatformImpact from "./components/home/Imapacts";
import BannerSlider from "./components/home/Slider";
import WhyChooseUs from "./components/home/why-choose";

export default function Home() {
  return (
    <div>
      <BannerSlider />
      <WhyChooseUs />
      <FeaturedSection />
      <PlatformImpact/>
      <EmergencyHotlines/>
    </div>
  );
}
