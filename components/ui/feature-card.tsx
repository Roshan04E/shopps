
import { FeatureProps } from "@/types";

export const FeatureCard: React.FC<FeatureProps> = ({ icon: Icon, title, desc, color }) => (
  <div className="p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100 group">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${color} group-hover:scale-110 transition-transform`}>
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);