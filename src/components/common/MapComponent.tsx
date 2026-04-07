"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { formatPrice } from "@/utils/formatters";
import type { Station } from "@/types";

// Custom circle markers using inline SVG — no CDN dependency
function createCircleIcon(color: string, size = 14) {
  return L.divIcon({
    className: "",
    html: `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
             <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 1}" fill="${color}" stroke="white" stroke-width="1.5"/>
           </svg>`,
    iconSize:    [size, size],
    iconAnchor:  [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  });
}

const redIcon  = createCircleIcon("#E31A1C", 16); // Featured station
const blueIcon = createCircleIcon("#1F78B4", 12); // All others

interface MapComponentProps {
  featured: Station;
  stations: Station[];
}

export default function MapComponent({ featured, stations }: MapComponentProps) {
  return (
    <div className="relative h-full w-full">
      <MapContainer
        key="map-container"
        center={[19.43, -99.13]}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Featured station — red circle */}
        <Marker position={[featured.lat, featured.lng]} icon={redIcon}>
          <Popup>
            <div className="text-xs space-y-1 min-w-[160px]">
              <p className="font-bold text-sm leading-snug">{featured.name}</p>
              <p className="text-gray-500">{featured.address}</p>
              {featured.prices.magna && (
                <p>🟢 Magna: <strong>{formatPrice(featured.prices.magna.price)}</strong></p>
              )}
              {featured.prices.premium && (
                <p>🟡 Premium: <strong>{formatPrice(featured.prices.premium.price)}</strong></p>
              )}
              {featured.prices.diesel && (
                <p>🔵 Diésel: <strong>{formatPrice(featured.prices.diesel.price)}</strong></p>
              )}
            </div>
          </Popup>
        </Marker>

        {/* All other stations — blue circles */}
        {stations
          .filter((s) => s.id !== featured.id)
          .map((station) => (
            <Marker
              key={station.id}
              position={[station.lat, station.lng]}
              icon={blueIcon}
            >
              <Popup>
                <div className="text-xs space-y-1 min-w-[140px]">
                  <p className="font-bold leading-snug">{station.name}</p>
                  <p className="text-gray-500">{station.municipioName}</p>
                  {station.prices.magna && (
                    <p>🟢 {formatPrice(station.prices.magna.price)}</p>
                  )}
                  {station.prices.premium && (
                    <p>🟡 {formatPrice(station.prices.premium.price)}</p>
                  )}
                  {station.prices.diesel && (
                    <p>🔵 {formatPrice(station.prices.diesel.price)}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* Static legend — z-[1000] sits above all Leaflet tile layers */}
      <div className="absolute bottom-3 right-3 z-[1000] rounded-md border border-gray-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm px-3 py-2 shadow-md pointer-events-none">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
          Leyenda
        </p>
        <div className="flex items-center gap-2 mb-1">
          <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="5" fill="#E31A1C" stroke="white" strokeWidth="1.5" />
          </svg>
          <span className="text-xs text-gray-700 dark:text-gray-200">Estación destacada</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="5" fill="#1F78B4" stroke="white" strokeWidth="1.5" />
          </svg>
          <span className="text-xs text-gray-700 dark:text-gray-200">Demás estaciones</span>
        </div>
      </div>
    </div>
  );
}
