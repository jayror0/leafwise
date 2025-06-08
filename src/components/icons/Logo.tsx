import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <div {...props} className={cn("relative flex items-center", className)}>
      <img
        src="/leafwiselogopng.png"
        alt="Leafwise Logo"
        className={cn("object-contain w-full h-full")}
      />
    </div>
  );
}
