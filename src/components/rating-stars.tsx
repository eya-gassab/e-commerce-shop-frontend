import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export default function RatingStars({ rating, max = 5, size = "md", showValue = false }: RatingStarsProps) {
  const sz = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-6 w-6" : "h-4 w-4";
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} className={cn(sz, i < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300")} />
      ))}
      {showValue && <span className="ml-1 text-sm text-muted-foreground">{rating.toFixed(1)}</span>}
    </span>
  );
}
