"use client";

import { cn } from "@/lib/utils";
import { formatPrice, getFuelLabel, getFuelBg } from "@/utils/formatters";

export function PriceDisplay({ type, info, size = "md", className }: any) {
  // 1. Definimos los colores fijos para que no dependan de otros archivos
  const bgs: any = {
    magna: "bg-emerald-600",
    premium: "bg-rose-500",
    diesel: "bg-slate-800",
  };

  const fuelBg = bgs[type.toLowerCase()] || "bg-slate-500";

  return (
    <div
      className={cn(
        "rounded-2xl flex flex-col items-center justify-center text-white shadow-lg transition-transform hover:scale-105",
        fuelBg,
        size === "sm" && "px-3 py-2 min-w-[80px]",
        size === "md" && "px-4 py-3 min-w-[100px]",
        size === "lg" && "px-8 py-6 min-w-[140px]",
        className
      )}
    >
      {/* Etiqueta (Magna, Premium, etc) */}
      <span className={cn(
        "font-black uppercase tracking-tighter opacity-90",
        size === "sm" && "text-[10px]",
        size === "md" && "text-xs",
        size === "lg" && "text-sm"
      )}>
        {type}
      </span>

      {/* El Precio (Lo más importante) */}
      <span className={cn(
        "font-bold tabular-nums leading-none",
        size === "sm" && "text-lg",
        size === "md" && "text-2xl",
        size === "lg" && "text-4xl mt-1"
      )}>
        {info?.price ? `$${info.price}` : "$00.00"}
      </span>

      {/* Nombre del subproducto (si existe) */}
      {size === "lg" && info?.subproduct && (
        <span className="text-[10px] text-white/70 mt-2 font-medium uppercase">
          {info.subproduct}
        </span>
      )}
    </div>
  );
}