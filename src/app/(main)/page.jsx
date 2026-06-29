import AdvertiseCard from "@/Components/Main/Home/AdvertiseCard/AdvertiseCard";
import GlobalConnect from "@/Components/Main/Home/GlobalConnect";
import HeroSlider from "@/Components/Main/Home/Hero/HeroSlider";
import LatestTickets from "@/Components/Main/Home/LatestTickets/LatestTickets";
import { Newsletter } from "@/Components/Main/Home/Newsletter";
import { StatsCounter } from "@/Components/Main/Home/StatsCounter";
import { Testimonials } from "@/Components/Main/Home/Testimonials";
import { WhyChooseUs } from "@/Components/Main/Home/WhyChooseUs";

export const metadata = {
  title: "TicketCore",
  description: "Online ticket booking platform",
};
export default function Home() {
  return (
    <div className="bg-white dark:bg-black">
      <HeroSlider />
      <AdvertiseCard/>
      <LatestTickets/>
      <WhyChooseUs/>
      <StatsCounter/>
      <GlobalConnect/>
      <Testimonials/>
      <Newsletter/>

    </div>
  );
}
