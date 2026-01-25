import { ReviewProps } from "@/types";
import { Star } from "lucide-react";

export const ReviewCard: React.FC<ReviewProps> = ({ name, role, text }) => (
  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
    <div className="flex gap-1 text-yellow-300 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={18} />)}
    </div>
    <p className="text-lg italic mb-6 leading-relaxed">"{text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-orange-300 rounded-full flex items-center justify-center font-bold text-orange-800">
        {name[0]}
      </div>
      <div>
        <h4 className="font-bold text-white">{name}</h4>
        <p className="text-xs text-orange-100">{role}</p>
      </div>
    </div>
  </div>
);
