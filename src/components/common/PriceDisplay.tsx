import { cn } from "@/lib/utils";
import { formatPrice, getFuelLabel, getFuelColor, getFuelBg } from "@/utils/formatters";
import type { FuelType, PriceInfo } from "@/types";

interface PriceDisplayProps {
  type: FuelType;
  info: PriceInfo | undefined;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceDisplay({ type, info, size = "md", className }: PriceDisplayProps) {
  if (!info) return null;

  const color = getFuelColor(type);
  const bg = getFuelBg(type);

  return (
    <div
      className={cn(
        "rounded-lg border flex flex-col items-center",
        bg,
        size === "sm" && "px-2 py-1.5",
        size === "md" && "px-3 py-2",
        size === "lg" && "px-4 py-3",
        className
      )}
    >
      <span
        className={cn(
          "font-medium uppercase tracking-wide",
          color,
          size === "sm" && "text-[10px]",
          size === "md" && "text-xs",
          size === "lg" && "text-sm"
        )}
      >
        {getFuelLabel(type)}
      </span>
      <span
        className={cn(
          "font-bold tabular-nums",
          color,
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          size === "lg" && "text-2xl"
        )}
      >
        {formatPrice(info.price)}
      </span>
      {size !== "sm" && (
        <span className="text-[10px] text-muted-foreground mt-0.5">
          {info.subproduct}
        </span>
      )}
    </div>
  );
}
