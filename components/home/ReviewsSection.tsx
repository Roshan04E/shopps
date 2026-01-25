'use client'

import React from 'react';
import { Star, Quote } from 'lucide-react';

interface FadeInSectionProps {
  children: React.ReactNode;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children }) => {
  const [isVisible, setVisible] = React.useState<boolean>(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
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
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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

const ReviewCard: React.FC<ReviewCardProps> = ({ name, role, text, delay = 0 }) => {
  return (
    <div
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Decorative gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>

      {/* Quote icon */}
      <div className="absolute -top-4 -left-4 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full p-3 shadow-lg">
        <Quote className="w-6 h-6 text-white" />
      </div>

      {/* Star rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-yellow-400 text-yellow-400 transition-transform duration-300 hover:scale-125"
          />
        ))}
      </div>

      {/* Review text */}
      <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
        &ldquo;{text}&rdquo;
      </p>

      {/* Reviewer info */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
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
      text: "Subah ka order shaam 6–8 baje tak mil jata hai. Sabzi hamesha taaza hoti hai."
    },
    {
      name: "Rohit Verma",
      role: "IT Professional",
      text: "Office ke baad market ka jhanjhat nahi. Evening 6–8 delivery perfect hai."
    },
    {
      name: "Suman Devi",
      role: "Working Mother",
      text: "Morning slot 6–8 baje bachchon ke tiffin ke liye best rehta hai."
    }
  ];


  return (
    <section className="relative py-24 overflow-hidden" id="reviews">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50"></div>

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeInSection>
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-sm font-semibold mb-4 shadow-lg">
              ⭐ Testimonials
            </span>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-orange-400 bg-clip-text !text-transparent mb-4">
              Loved by Locals
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
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
              { label: "Fresh Stock", value: "Daily" }
            ]
              .map((stat, i) => (
                <div key={i} className="text-center transform hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text !text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 mt-2 text-sm">{stat.label}</div>
                </div>
              ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}