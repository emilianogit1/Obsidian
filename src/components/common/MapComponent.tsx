"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { formatPrice } from "@/utils/formatters";
import type { Station } from "@/types";

// --- Icon factory -----------------------------------------------------------
function createCircleIcon(color: string, size: number, glow = false) {
  const shadow = glow ? `filter: drop-shadow(0 0 5px ${color}99);` : "";
  return L.divIcon({
    className: "",
    html: `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"
               style="${shadow}" xmlns="http://www.w3.org/2000/svg">
             <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 1.5}"
               fill="${color}" stroke="white" stroke-width="2"/>
           </svg>`,
    iconSize:    [size, size],
    iconAnchor:  [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  });
}

// Module-scope icons — created once, not on every render
const featuredIcon = createCircleIcon("#1F78B4", 20, true);  // blue + glow
const otherIcon    = createCircleIcon("#E31A1C", 12, false); // red, minimal

// --- Popup style ------------------------------------------------------------
const popupStyle: CSSProperties = {
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
};

// --- Props ------------------------------------------------------------------
// NOTE: props must match what MapModal passes: { featured, stations }
interface MapComponentProps {
  featured: Station;
  stations: Station[];
}

// --- Component --------------------------------------------------------------
export default function MapComponent({ featured, stations }: MapComponentProps) {
  // Mount guard: prevents Leaflet from running during SSR/hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full rounded-[34px] bg-slate-100 dark:bg-slate-800 animate-pulse" />
    );
  }

  return (
    <div className="relative h-full w-full rounded-[34px] overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg">
      <MapContainer
        key="map-container"
        center={[19.43, -99.13]}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Featured station — blue circle with glow */}
        <Marker position={[featured.lat, featured.lng]} icon={featuredIcon}>
          <Popup>
            <div style={popupStyle} className="text-xs space-y-1 min-w-[160px]">
              <p className="font-bold text-sm text-slate-800">{featured.name}</p>
              <p className="text-slate-500 text-[11px]">{featured.address}</p>
              {featured.prices.magna && (
                <p className="text-slate-700">🟢 Magna <strong>{formatPrice(featured.prices.magna.price)}</strong></p>
              )}
              {featured.prices.premium && (
                <p className="text-slate-700">🌹 Premium <strong>{formatPrice(featured.prices.premium.price)}</strong></p>
              )}
              {featured.prices.diesel && (
                <p className="text-slate-700">⚫ Diésel <strong>{formatPrice(featured.prices.diesel.price)}</strong></p>
              )}
            </div>
          </Popup>
        </Marker>

        {/* All other stations — red circles */}
        {stations
          .filter((s) => s.id !== featured.id)
          .map((s) => (
            <Marker key={s.id} position={[s.lat, s.lng]} icon={otherIcon}>
              <Popup>
                <div style={popupStyle} className="text-xs space-y-1 min-w-[140px]">
                  <p className="font-semibold text-slate-800">{s.name}</p>
                  <p className="text-slate-500 text-[11px]">{s.municipioName}</p>
                  {s.prices.magna && (
                    <p className="text-slate-700">🟢 {formatPrice(s.prices.magna.price)}</p>
                  )}
                  {s.prices.premium && (
                    <p className="text-slate-700">🌹 {formatPrice(s.prices.premium.price)}</p>
                  )}
                  {s.prices.diesel && (
                    <p className="text-slate-700">⚫ {formatPrice(s.prices.diesel.price)}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* Frosted-glass legend */}
      <div className="absolute bottom-3 right-3 z-[1000] rounded-xl border border-white/30 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-3 py-2.5 shadow-lg pointer-events-none">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Leyenda
        </p>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-3 h-3 rounded-full bg-[#1F78B4] border border-white shrink-0" />
          <span className="text-xs text-slate-700 dark:text-slate-200 whitespace-nowrap">Estación Destacada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#E31A1C] border border-white shrink-0" />
          <span className="text-xs text-slate-700 dark:text-slate-200 whitespace-nowrap">Otras</span>
        </div>
      </div>
    </div>
  );
}
