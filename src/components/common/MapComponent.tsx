"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { formatPrice } from "@/utils/formatters";
import type { Station } from "@/types";

// Fix Leaflet icon via CDN to avoid webpack asset issue
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapComponentProps {
  featured: Station;
  stations: Station[];
}

export default function MapComponent({ featured, stations }: MapComponentProps) {
  useEffect(() => {
    // Import leaflet CSS dynamically (client only)
  }, []);

  return (
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

      {/* Featured station — red marker */}
      <Marker position={[featured.lat, featured.lng]} icon={redIcon}>
        <Popup>
          <div className="text-xs space-y-1">
            <p className="font-bold text-sm">{featured.name}</p>
            <p className="text-gray-600">{featured.address}</p>
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

      {/* All other stations — blue markers */}
      {stations
        .filter((s) => s.id !== featured.id)
        .map((station) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={blueIcon}
          >
            <Popup>
              <div className="text-xs space-y-1">
                <p className="font-bold">{station.name}</p>
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
  );
}
