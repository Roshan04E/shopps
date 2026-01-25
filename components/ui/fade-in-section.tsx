import { FadeInSectionProps } from "@/types";
// import { useScrollReveal } from "../../hooks/use-scroll-reveal";



export const FadeInSection: React.FC<FadeInSectionProps> = ({ children, className = "" }) => {
  // const [ref, isVisible] = useScrollReveal();
  return (
    <div 
      // ref={ref} 
      className={`transition-all duration-1000 transform opacity-100 translate-y-0 ${className}`}
    >
      {children}
    </div>
  );
};