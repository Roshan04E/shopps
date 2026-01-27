"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function RecipeTypewriter({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      // Random delay between 10ms and 40ms to make it look "live"
      const randomSpeed = Math.floor(Math.random() * 10) + 5;

      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, randomSpeed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <div
      className="prose prose-green max-w-none prose-p:text-slate-700 prose-p:text-lg
                    prose-headings:text-green-700 prose-headings:font-bold prose-strong:text-green-800
                    after:content-['|'] after:animate-pulse after:text-green-500 after:ml-1 after:font-bold"
    >
      <ReactMarkdown>{displayedText}</ReactMarkdown>
    </div>
  );
}
