"use client";

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// Iconos con colores invertidos según tu petición
function createCircleIcon(color: string, size = 14) {
  return L.divIcon({
    className: "", 
    html: `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
             <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 1}" fill="${color}" stroke="white" stroke-width="2"/>
           </svg>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

const blueIcon = createCircleIcon("#1F78B4", 18); // Destacada ahora en Azul y más grande
const redIcon = createCircleIcon("#E31A1C", 12);  // Demás estaciones en Rojo

export default function MapComponent({ stations = [], featuredStation = null }: any) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-full w-full bg-slate-100 animate-pulse" />;

  return (
    <div className="relative h-full w-full">
      <MapContainer 
        center={[19.4326, -99.1332]} 
        zoom={12} 
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg overflow-hidden"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Estación Destacada - AHORA EN AZUL */}
        {featuredStation && (
          <Marker position={[featuredStation.lat, featuredStation.lng]} icon={blueIcon}>
            <Tooltip permanent direction="top" offset={[0, -10]}>
              <span className="font-bold text-blue-700">⭐ {featuredStation.name}</span>
            </Tooltip>
            <Popup>
              <div className="text-sm">
                <p className="font-bold">{featuredStation.name}</p>
                <p>{featuredStation.address}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Todas las demás estaciones - AHORA EN ROJO */}
        {stations.map((station: any) => (
          <Marker key={station.id} position={[station.lat, station.lng]} icon={redIcon}>
            <Tooltip direction="top" offset={[0, -5]}>
              <span className="text-xs font-medium">{station.name}</span>
            </Tooltip>
            <Popup>
              <div className="text-xs">
                <p className="font-bold">{station.name}</p>
                <p className="text-green-600">Magna: ${station.prices.magna?.price}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* LEYENDA ACTUALIZADA */}
      <div className="absolute bottom-5 left-5 z-[1000] rounded-xl border border-white/20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-4 py-3 text-xs shadow-xl space-y-2">
        <p className="font-bold text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-1 mb-2">Gasolineras CDMX</p>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-[#1F78B4] border-2 border-white shadow-sm" />
          <span className="text-gray-700 dark:text-gray-300 font-medium">Estación Destacada</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#E31A1C] border-2 border-white shadow-sm" />
          <span className="text-gray-600 dark:text-gray-400">Otras Estaciones</span>
        </div>
      </div>
    </div>
  );
}