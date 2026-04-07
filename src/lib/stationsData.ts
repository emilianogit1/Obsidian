import type { RawRecord, Station, PriceInfo, FuelType } from "@/types";
import {
  getMunicipioName,
  MUNICIPIO_COORDS,
  addJitter,
} from "@/utils/formatters";
import rawData from "@/data/stations.json";

const records = rawData as RawRecord[];

// ─── Fuel type detection ──────────────────────────────────────────────────────

function detectFuelType(subproducto: string, producto: string): FuelType | null {
  const s = subproducto.toLowerCase();
  const p = producto.toLowerCase();

  if (s.includes("diésel") || s.includes("diesel") || p.includes("diésel") || p.includes("diesel")) {
    return "diesel";
  }
  if (s.includes("premium")) {
    return "premium";
  }
  if (s.includes("regular")) {
    return "magna";
  }
  return null;
}

// ─── Normalise records ────────────────────────────────────────────────────────

type StationMap = Map<
  string,
  {
    name: string;
    address: string;
    municipioId: number;
    prices: Record<FuelType, PriceInfo | undefined>;
  }
>;

function buildStationMap(): StationMap {
  const map: StationMap = new Map();

  for (const record of records) {
    const existing = map.get(record.Numero);

    const fuelType = detectFuelType(record.SubProducto, record.Producto);
    if (!fuelType) continue;

    if (!existing) {
      map.set(record.Numero, {
        name: record.Nombre.trim(),
        address: record.Direccion.trim(),
        municipioId: record.MunicipioId,
        prices: {
          magna: undefined,
          premium: undefined,
          diesel: undefined,
        },
      });
    }

    const entry = map.get(record.Numero)!;
    // Only set if not already set (first occurrence wins)
    if (!entry.prices[fuelType]) {
      entry.prices[fuelType] = {
        price: record.PrecioVigente,
        subproduct: record.SubProducto,
      };
    }
  }

  return map;
}

// ─── Exported data functions ──────────────────────────────────────────────────

let _cached: Station[] | null = null;

export function getAllStations(): Station[] {
  if (_cached) return _cached;

  const map = buildStationMap();
  const stations: Station[] = [];
  let index = 0;

  for (const [id, data] of map.entries()) {
    const baseCoords = MUNICIPIO_COORDS[data.municipioId] ?? [19.43, -99.13];
    const [lat, lng] = addJitter(baseCoords, id, index);

    stations.push({
      id,
      name: data.name,
      address: data.address,
      municipioId: data.municipioId,
      municipioName: getMunicipioName(data.municipioId),
      prices: {
        magna: data.prices.magna,
        premium: data.prices.premium,
        diesel: data.prices.diesel,
      },
      lat,
      lng,
    });
    index++;
  }

  _cached = stations;
  return stations;
}

export function getFeaturedStation(): Station {
  const stations = getAllStations();
  // Prefer the Paseo de la Reforma / Villalongín station in Cuauhtémoc
  const featured =
    stations.find((s) => s.id === "PL/24409/EXP/ES/2022") ??
    stations.find((s) => s.municipioId === 15) ??
    stations[0];

  // Ensure featured station has exact Reforma coordinates
  return {
    ...featured,
    lat: 19.4319,
    lng: -99.1607,
  };
}

export function getStationsByMunicipio(municipioName?: string): Station[] {
  const stations = getAllStations();
  if (!municipioName) return stations;
  return stations.filter((s) => s.municipioName === municipioName);
}

export function getUniqueMunicipios(): string[] {
  const stations = getAllStations();
  const set = new Set(stations.map((s) => s.municipioName));
  return Array.from(set).sort();
}
