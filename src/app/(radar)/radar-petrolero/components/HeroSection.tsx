"use client";

import { useState } from "react";
import { RefreshCw, Map, Clock, Fuel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PriceDisplay } from "@/components/common/PriceDisplay";
import { MapModal } from "@/components/common/MapModal";
import { useStations } from "@/hooks/useStations";
import { formatDate } from "@/utils/formatters";
import type { Station } from "@/types";

interface HeroSectionProps {
  featured: Station;
  allStations: Station[];
}

export function HeroSection({ featured: initialFeatured, allStations }: HeroSectionProps) {
  const [mapOpen, setMapOpen] = useState(false);
  const { stations, isRefreshing, lastUpdated, refresh } = useStations([
    initialFeatured,
    ...allStations.filter((s) => s.id !== initialFeatured.id),
  ]);

  const featured = stations[0];
  const fuelTypes = (["magna", "premium", "diesel"] as const).filter(
    (f) => featured.prices[f]
  );

  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="container mx-auto px-4 py-10">
        {/* Label */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Fuel className="h-3.5 w-3.5" />
            Estación destacada
          </span>
          {isRefreshing && (
            <span className="text-xs text-muted-foreground animate-pulse">
              Actualizando precios…
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
          {featured.name}
        </h1>
        <p className="text-muted-foreground text-sm mb-6">
          {featured.address} · {featured.municipioName}
        </p>

        {/* Prices */}
        {isRefreshing ? (
          <div className="flex gap-3 mb-6">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-20 flex-1 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 mb-6">
            {fuelTypes.map((type) => (
              <PriceDisplay
                key={type}
                type={type}
                info={featured.prices[type]}
                size="lg"
                className="flex-1 min-w-[80px]"
              />
            ))}
          </div>
        )}

        {/* Last updated */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <Clock className="h-3.5 w-3.5" />
          <span>Actualizado: {formatDate(lastUpdated)}</span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={refresh}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Actualizando…" : "Actualizar precios"}
          </Button>
          <Button
            onClick={() => setMapOpen(true)}
            variant="outline"
            size="sm"
          >
            <Map className="h-4 w-4" />
            Ver en el mapa
          </Button>
        </div>
      </div>

      <MapModal
        featured={featured}
        stations={stations}
        open={mapOpen}
        onOpenChange={setMapOpen}
      />
    </section>
  );
}
