import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { HeroSection } from "./components/HeroSection";
import { StationsGrid } from "./components/StationsGrid";
import {
  getAllStations,
  getFeaturedStation,
  getUniqueMunicipios,
} from "@/lib/stationsData";

export const metadata = {
  title: "Radar Petrolero — Precios de gasolina CDMX",
  description:
    "Consulta los precios vigentes de Magna, Premium y Diésel en las gasolineras de la Ciudad de México.",
};

export default function RadarPetróleroPage() {
  const allStations = getAllStations();
  const featured = getFeaturedStation();
  const municipios = getUniqueMunicipios();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection featured={featured} allStations={allStations} />
        <StationsGrid stations={allStations} municipios={municipios} />
      </main>
      <Footer />
    </div>
  );
}
