import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export const ResponsiveContainer = ({ 
  children, 
  className = "",
  size = "xl" 
}: ResponsiveContainerProps) => {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-4xl", 
    lg: "max-w-5xl",
    xl: "max-w-6xl",
    "2xl": "max-w-7xl",
    full: "w-full"
  };

  return (
    <div className={cn(
      "w-full mx-auto px-4 sm:px-6 lg:px-8",
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  );
};