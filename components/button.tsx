import { ButtonProps } from "@/types/index";

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fb069] disabled:pointer-events-none disabled:opacity-50 h-10 px-6 py-2 cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#7fb069] to-[#88b04b] text-white hover:from-[#6fa059] hover:to-[#78a03b] shadow-md border border-transparent",
    outline:
      "border border-[#8b9c8f]/60 bg-transparent hover:bg-[#f0f4ee] text-[#5f7d5a]",
    ghost: "hover:bg-[#f0f4ee] text-[#5f7d5a] bg-transparent",
    glass:
      "bg-white/30 backdrop-blur-md border border-white/40 text-[#2d3e2d] hover:bg-white/40 shadow-lg",
    green:
      "bg-[#7fb069] text-white hover:bg-[#6fa059] shadow-md border border-transparent",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
