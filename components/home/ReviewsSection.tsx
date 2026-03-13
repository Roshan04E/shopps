"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

interface FadeInSectionProps {
  children: React.ReactNode;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children }) => {
  const [isVisible, setVisible] = React.useState<boolean>(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

interface ReviewCardProps {
  name: string;
  role: string;
  text: string;
  delay?: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  role,
  text,
  delay = 0,
}) => {
  return (
    <div
      className="group relative bg-white rounded-2xl p-8 shadow-lg shadow-[#8b9c8f]/10 hover:shadow-2xl hover:shadow-[#8b9c8f]/20 transition-all duration-500 transform md:hover:-translate-y-2"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Decorative sage border on hover - hidden on mobile */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7fb069]/10 to-[#88b04b]/10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>

      {/* Quote icon with sage gradient */}
      <div className="absolute -top-4 -left-4 bg-gradient-to-br from-[#7fb069] to-[#88b04b] rounded-full p-3 shadow-lg shadow-[#7fb069]/30">
        <Quote className="w-6 h-6 text-white" />
      </div>

      {/* Star rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-[#f59e0b] text-[#f59e0b] transition-transform duration-300 md:hover:scale-125"
          />
        ))}
      </div>

      {/* Review text */}
      <p className="text-[#5a6b5a] text-lg leading-relaxed mb-6 italic">
        &ldquo;{text}&rdquo;
      </p>

      {/* Reviewer info */}
      <div className="flex items-center gap-4 pt-4 border-t border-[#8b9c8f]/20">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7fb069] to-[#88b04b] flex items-center justify-center text-white font-bold text-lg shadow-md">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-[#2d3e2d]">{name}</h4>
          <p className="text-sm text-[#6d8666]">{role}</p>
        </div>
      </div>
    </div>
  );
};

interface Review {
  name: string;
  role: string;
  text: string;
}

export default function ReviewsSection() {
  const reviews: Review[] = [
    {
      name: "Anita Sharma",
      role: "Homemaker",
      text: "Subah ka order shaam 6–8 baje tak mil jata hai. Sabzi hamesha taaza hoti hai.",
    },
    {
      name: "Rohit Verma",
      role: "IT Professional",
      text: "Office ke baad market ka jhanjhat nahi. Evening 6–8 delivery perfect hai.",
    },
    {
      name: "Suman Devi",
      role: "Working Mother",
      text: "Morning slot 6–8 baje bachchon ke tiffin ke liye best rehta hai.",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden" id="reviews">
      {/* Soft sage background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4ee] via-[#e8ede6] to-[#d4e0d1]"></div>

      {/* Decorative blobs - animation only on desktop */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#8b9c8f]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 md:animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-72 h-72 bg-[#a8b5a0]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 md:animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeInSection>
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#7fb069] to-[#88b04b] text-white rounded-full text-sm font-semibold mb-4 shadow-lg shadow-[#7fb069]/30">
              ⭐ Testimonials
            </span>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-[#7fb069] via-[#88b04b] to-[#7fb069] bg-clip-text !text-transparent mb-4">
              Loved by Locals
            </h2>
            <p className="text-[#5a6b5a] text-lg max-w-2xl mx-auto">
              Trusted by the people who care most about their food
            </p>
          </div>

          {/* Reviews grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {reviews.map((review, idx) => (
              <ReviewCard key={idx} {...review} delay={idx * 200} />
            ))}
          </div>

          {/* Stats section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { label: "Happy Customers", value: "100+" },
              { label: "Local Partners", value: "10+" },
              { label: "Delivery Slots", value: "6–8 AM / PM" },
              { label: "Fresh Stock", value: "Daily" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center transform md:hover:scale-110 transition-transform duration-300"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-[#7fb069] to-[#88b04b] bg-clip-text !text-transparent">
                  {stat.value}
                </div>
                <div className="text-[#5a6b5a] mt-2 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
