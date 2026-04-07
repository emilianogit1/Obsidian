"use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Función para crear los iconos de círculo (Azul para destacada, Rojo para otras)
function createCircleIcon(color: string, size: number, glow = false) {
  const shadow = glow ? "filter: drop-shadow(0 0 5px rgba(31, 120, 180, 0.8));" : "";
  return L.divIcon({
    className: "",
    html: `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="${shadow}">
             <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 1}" fill="${color}" stroke="white" stroke-width="1.5"/>
           </svg>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

const featuredIcon = createCircleIcon("#1F78B4", 20, true); // Azul con brillo
const otherIcon    = createCircleIcon("#E31A1C", 12, false); // Rojo pequeño

export default function MapComponent({ stations, featuredStation }: any) {
  const [mounted, setMounted] = useState(false);
  const mapKey = useMemo(() => `map-${Math.random()}`, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-full w-full bg-slate-100 animate-pulse rounded-[34px]" />;

  return (
    <div className="relative h-full w-full rounded-[34px] overflow-hidden border border-slate-200">
      <MapContainer key={mapKey} center={[19.43, -99.13]} zoom={11} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {stations?.map((s: any) => (
          <Marker 
            key={s.id} 
            position={[s.lat, s.lng]} 
            icon={featuredStation && s.id === featuredStation.id ? featuredIcon : otherIcon}
          >
            <Popup>{s.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* LEYENDA */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-lg text-xs border border-white/20">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-[#1F78B4] border border-white" />
          <span className="font-bold">Estación Destacada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#E31A1C] border border-white" />
          <span>Otras estaciones</span>
        </div>
      </div>
    </div>
  );
}