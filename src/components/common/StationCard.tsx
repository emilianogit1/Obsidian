"use client";

import { useState } from "react";
import { MapPin, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PriceDisplay } from "./PriceDisplay";
import { StationModal } from "./StationModal";
import type { Station } from "@/types";

interface StationCardProps {
  station: Station;
}

export function StationCard({ station }: StationCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const fuelTypes = (["magna", "premium", "diesel"] as const).filter(
    (f) => station.prices[f]
  );

  return (
    <>
      <Card
        className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 group"
        onClick={() => setModalOpen(true)}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-sm font-semibold leading-snug line-clamp-2 flex-1">
              {station.name}
            </CardTitle>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" />
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="line-clamp-1">{station.address}</span>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <Badge variant="secondary" className="mb-3 text-xs">
            {station.municipioName}
          </Badge>

          {fuelTypes.length > 0 ? (
            <div className="grid grid-cols-3 gap-1.5">
              {fuelTypes.map((type) => (
                <PriceDisplay
                  key={type}
                  type={type}
                  info={station.prices[type]}
                  size="sm"
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Sin precios</p>
          )}
        </CardContent>
      </Card>

      <StationModal
        station={station}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
