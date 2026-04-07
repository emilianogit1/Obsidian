"use client";

import dynamic from "next/dynamic";
import { Map } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import type { Station } from "@/types";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <Skeleton className="h-[400px] w-full rounded-lg" />
  ),
});

interface MapModalProps {
  featured: Station;
  stations: Station[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MapModal({ featured, stations, open, onOpenChange }: MapModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-4">
        <DialogHeader className="pb-2">
          <DialogTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-primary" />
            Mapa de estaciones — CDMX
          </DialogTitle>
        </DialogHeader>

        <div className="h-[400px] w-full relative">
          {open && (
            <MapComponent featured={featured} stations={stations} />
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center pt-1">
          🔵 Estación destacada &nbsp;·&nbsp; 🔴 Otras estaciones
        </p>
      </DialogContent>
    </Dialog>
  );
}
