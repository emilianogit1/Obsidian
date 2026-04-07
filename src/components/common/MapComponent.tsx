"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { formatPrice } from "@/utils/formatters";
import type { Station } from "@/types";

// --- Icon factory -----------------------------------------------------------
// Creates a circle SVG marker. Featured markers include a soft glow filter.
function createCircleIcon(color: string, size: number, glow = false) {
  const id = `glow-${color.replace("#", "")}`;
  const defs = glow
    ? `<defs>
        <filter id="${id}" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>`
    : "";
  const filterAttr = glow ? `filter="url(#${id})"` : "";
  const r = size / 2 - 1.5;
  const c = size / 2;

  return L.divIcon({
    className: "",
    html: `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"
               xmlns="http://www.w3.org/2000/svg">
             ${defs}
             <circle cx="${c}" cy="${c}" r="${r}" fill="${color}"
               stroke="white" stroke-width="2" ${filterAttr}/>
           </svg>`,
    iconSize:    [size, size],
    iconAnchor:  [c, c],
    popupAnchor: [0, -(c + 6)],
  });
}

// Declared at module scope so they are not recreated on every render
const featuredIcon = createCircleIcon("#1F78B4", 20, true);  // blue + glow
const otherIcon    = createCircleIcon("#E31A1C", 12, false); // red, minimal

// --- MapController (FlyTo) --------------------------------------------------
interface MapControllerProps {
  centroCoordenadas?: [number, number];
}

function MapController({ centroCoordenadas }: MapControllerProps) {
  const map = useMap();
  useEffect(() => {
    if (centroCoordenadas) {
      map.flyTo(centroCoordenadas, 14, { animate: true, duration: 1.5 });
    }
  }, [centroCoordenadas, map]);
  return null;
}

// --- Popup content style ----------------------------------------------------
const popupStyle: React.CSSProperties = {
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
};

// --- Main component ---------------------------------------------------------
interface MapComponentProps {
  featured: Station;
  stations: Station[];
  /** Optional: triggers an animated flyTo when the value changes */
  centroCoordenadas?: [number, number];
}

export default function MapComponent({
  featured,
  stations,
  centroCoordenadas,
}: MapComponentProps) {
  return (
    <div className="relative h-full w-full rounded-[34px] shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <MapContainer
        key="map-container"
        center={[19.43, -99.13]}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
        // No className="rounded-lg" — the outer div handles clipping
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Reactive FlyTo controller */}
        <MapController centroCoordenadas={centroCoordenadas} />

        {/* Featured station — blue circle with glow */}
        <Marker position={[featured.lat, featured.lng]} icon={featuredIcon}>
          <Popup>
            <div style={popupStyle} className="text-xs space-y-1.5 min-w-[170px]">
              <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ background: "#1F78B4" }}
                />
                <p className="font-bold text-sm leading-snug text-slate-800">
                  {featured.name}
                </p>
              </div>
              <p className="text-slate-500 text-[11px]">{featured.address}</p>
              {featured.prices.magna && (
                <p className="text-slate-700">
                  🟢 Magna{" "}
                  <strong>{formatPrice(featured.prices.magna.price)}</strong>
                </p>
              )}
              {featured.prices.premium && (
                <p className="text-slate-700">
                  🟡 Premium{" "}
                  <strong>{formatPrice(featured.prices.premium.price)}</strong>
                </p>
              )}
              {featured.prices.diesel && (
                <p className="text-slate-700">
                  🔵 Diésel{" "}
                  <strong>{formatPrice(featured.prices.diesel.price)}</strong>
                </p>
              )}
            </div>
          </Popup>
        </Marker>

        {/* All other stations — red circles */}
        {stations
          .filter((s) => s.id !== featured.id)
          .map((station) => (
            <Marker
              key={station.id}
              position={[station.lat, station.lng]}
              icon={otherIcon}
            >
              <Popup>
                <div style={popupStyle} className="text-xs space-y-1 min-w-[150px]">
                  <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100">
                    <span
                      className="inline-block h-2 w-2 rounded-full shrink-0"
                      style={{ background: "#E31A1C" }}
                    />
                    <p className="font-semibold leading-snug text-slate-800">
                      {station.name}
                    </p>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    {station.municipioName}
                  </p>
                  {station.prices.magna && (
                    <p className="text-slate-700">
                      🟢 {formatPrice(station.prices.magna.price)}
                    </p>
                  )}
                  {station.prices.premium && (
                    <p className="text-slate-700">
                      🟡 {formatPrice(station.prices.premium.price)}
                    </p>
                  )}
                  {station.prices.diesel && (
                    <p className="text-slate-700">
                      🔵 {formatPrice(station.prices.diesel.price)}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* Frosted-glass legend */}
      <div
        className="absolute bottom-3 right-3 z-[1000]
          rounded-xl border border-white/30 dark:border-white/10
          bg-white/70 dark:bg-zinc-900/70
          backdrop-blur-md
          px-3 py-2.5 shadow-lg pointer-events-none"
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Leyenda
        </p>
        <div className="flex items-center gap-2 mb-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="4.5" fill="#1F78B4" stroke="white" strokeWidth="1.5" />
          </svg>
          <span className="text-xs text-slate-700 dark:text-slate-200 whitespace-nowrap">
            Estación Destacada
          </span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="4.5" fill="#E31A1C" stroke="white" strokeWidth="1.5" />
          </svg>
          <span className="text-xs text-slate-700 dark:text-slate-200 whitespace-nowrap">
            Otras
          </span>
        </div>
      </div>
    </div>
  );
}
