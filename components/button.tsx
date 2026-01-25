import {ButtonProps} from '@/types/index'

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-10 px-6 py-2 cursor-pointer";
  
  const variants = {
    primary: "bg-linear-to-r from-orange-500 to-orange-600 text-white hover:bg-orange-600 shadow-md border border-transparent",
    outline: "border border-orange-200 bg-transparent hover:bg-orange-50 text-orange-700",
    ghost: "hover:bg-orange-50 text-orange-700 bg-transparent",
    glass: "bg-white/30 backdrop-blur-md border border-white/40 text-orange-900 hover:bg-white/40 shadow-lg",
    green: "bg-green-600 text-white hover:bg-green-700 shadow-md border border-transparent"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};