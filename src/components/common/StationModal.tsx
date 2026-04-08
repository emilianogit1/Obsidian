"use client";

import { MapPin, ExternalLink, Fuel, Hash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PriceDisplay } from "./PriceDisplay";
import { buildGoogleMapsUrl } from "@/utils/formatters";
import type { Station } from "@/types";

interface StationModalProps {
  station: Station | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StationModal({ station, open, onOpenChange }: StationModalProps) {
  if (!station) return null;

  const mapsUrl = buildGoogleMapsUrl(station.lat, station.lng);

  const fuelTypes = (["magna", "premium", "diesel"] as const).filter(
    (f) => station.prices[f]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-start gap-2 pr-6">
            <Fuel className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <span className="leading-snug">{station.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Address */}
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{station.address}</span>
          </div>

          {/* Municipio + ID */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{station.municipioName}</Badge>
            <Badge variant="outline" className="font-mono text-[10px]">
              <Hash className="h-3 w-3 mr-1" />
              {station.id}
            </Badge>
          </div>

          {/* Prices */}
          {fuelTypes.length > 0 ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Precios vigentes
              </p>
              <div className="grid grid-cols-3 gap-2">
                {fuelTypes.map((type) => (
                  <PriceDisplay
                    key={type}
                    type={type}
                    info={station.prices[type]}
                    size="md"
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Sin precios disponibles.
            </p>
          )}

          {/* CTA */}
          <div className="flex gap-2 pt-1">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 h-9 rounded-md bg-emerald-600 hover:bg-emerald-700 px-4 text-sm font-medium text-white shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <MapPin className="h-4 w-4" />
              Cómo llegar
              <ExternalLink className="h-3 w-3 opacity-80" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
