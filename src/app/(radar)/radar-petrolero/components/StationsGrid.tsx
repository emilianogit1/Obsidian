"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StationCard } from "@/components/common/StationCard";
import { useSearch } from "@/hooks/useSearch";
import type { Station } from "@/types";

interface StationsGridProps {
  stations: Station[];
  municipios: string[];
}

export function StationsGrid({ stations, municipios }: StationsGridProps) {
  const { filters, setFilters, filtered } = useSearch(stations);

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Section header */}
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">Estaciones cercanas</h2>
        <span className="ml-auto text-sm text-muted-foreground">
          {filtered.length} de {stations.length}
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Buscar por nombre, dirección o alcaldía…"
            value={filters.query}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, query: e.target.value }))
            }
            className="pl-9"
          />
        </div>

        <Select
          value={filters.municipio || "all"}
          onValueChange={(val) =>
            setFilters((prev) => ({
              ...prev,
              municipio: val === "all" ? "" : val,
            }))
          }
        >
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue placeholder="Todas las alcaldías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las alcaldías</SelectItem>
            {municipios.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">Sin resultados</p>
          <p className="text-sm mt-1">Intenta con otro término o alcaldía.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {filtered.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      )}
    </section>
  );
}
