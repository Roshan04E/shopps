import { FeatureCard } from "@/components/ui/feature-card";
import { FadeInSection } from "@/components/ui/fade-in-section";
import { FeatureProps} from "@/types";
import { CheckCircle, Clock, Leaf, ShieldCheck, Truck } from "lucide-react";


export default function FeaturesSection() {
  const features: FeatureProps[] = [
  {
    icon: Leaf,
    title: "Farm → Table",
    desc: "Harvested at dawn, delivered the same day from farms within 5 km.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Truck,
    title: "Right on Time",
    desc: "Smart delivery slots with eco-friendly vehicles that respect your schedule.",
    color: "bg-sky-100 text-sky-600",
  },
  {
    icon: ShieldCheck,
    title: "Pure & Safe",
    desc: "Zero chemicals, strict quality checks, and freshness you can trust.",
    color: "bg-amber-100 text-amber-600",
  },
];


  return (
    <FadeInSection className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center max-w-2xl mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Shopps?</h2>
        <p className="text-slate-600">We don&apos;t just deliver groceries; we deliver time, health, and community connection.</p>
      </div>
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        {features.map((feature, idx) => <FeatureCard key={idx} {...feature} />)}
      </div>
    </FadeInSection>
  );
}
