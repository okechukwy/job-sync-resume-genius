import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FullWidthLayoutProps {
  children: ReactNode;
  className?: string;
  innerPadding?: boolean;
}

export const FullWidthLayout = ({ 
  children, 
  className = "",
  innerPadding = true
}: FullWidthLayoutProps) => {
  return (
    <div className={cn(
      "w-full h-full min-h-[calc(100vh-4rem)]",
      className
    )}>
      <div className={cn(
        "w-full h-full",
        innerPadding && "p-4 sm:p-6 lg:p-8"
      )}>
        {children}
      </div>
    </div>
  );
};