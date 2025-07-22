import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
  fullHeight?: boolean;
  noPadding?: boolean;
}

export const PageLayout = ({ 
  children, 
  className = "", 
  maxWidth = "7xl",
  fullHeight = true,
  noPadding = false
}: PageLayoutProps) => {
  const maxWidthClass = maxWidth === "none" ? "w-full" : `max-w-${maxWidth}`;
  const paddingClass = noPadding ? "" : "p-4 sm:p-6 lg:p-8";
  
  return (
    <div className={`w-full ${fullHeight ? 'h-full min-h-[calc(100vh-4rem)]' : ''} ${className}`}>
      <div className={`w-full h-full ${paddingClass}`}>
        <div className={`${maxWidthClass} mx-auto h-full`}>
          {children}
        </div>
      </div>
    </div>
  );
};