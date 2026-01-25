import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import FooterSection from "@/components/home/FooterSection";
import { cart } from "@/types";

export default function HomePage({ children, cart }: { children?: React.ReactNode; cart: cart }) {
  return (
    <div className="min-h-screen bg-orange-50/30 font-sans text-slate-800 selection:bg-orange-200">
      <HeroSection />
      {children} {/* Latest Products */}
      <FeaturesSection />
      <ReviewsSection />
      <FooterSection />
    </div>
  );
}
