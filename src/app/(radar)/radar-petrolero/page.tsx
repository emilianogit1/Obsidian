"use client";

import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { HeroSection } from "./components/HeroSection";
import { StationsGrid } from "./components/StationsGrid";
import dynamic from "next/dynamic";
import {
  getAllStations,
  getFeaturedStation,
  getUniqueMunicipios,
} from "@/lib/stationsData";

const MapComponent = dynamic(
  () => import("@/components/common/MapComponent"),
  { ssr: false }
);

// 🚫 HE QUITADO EL BLOQUE DE METADATA DE AQUÍ PORQUE CAUSABA EL ERROR

export default function RadarPetróleroPage() {
  const allStations = getAllStations();
  const featured = getFeaturedStation();
  const municipios = getUniqueMunicipios();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection featured={featured} allStations={allStations} />
        
        <div id="mapa-seccion" className="container mx-auto px-4 py-8">
             <MapComponent stations={allStations} featuredStation={featured} />
        </div>

        <StationsGrid stations={allStations} municipios={municipios} />
      </main>
      <Footer />
    </div>
  );
}