import { FuelType } from "@/types";

// ─── Municipality name lookup ─────────────────────────────────────────────────

export const MUNICIPIO_NAMES: Record<number, string> = {
  2: "Azcapotzalco",
  3: "Coyoacán",
  4: "Cuajimalpa de Morelos",
  5: "Gustavo A. Madero",
  6: "Iztacalco",
  7: "Iztapalapa",
  8: "La Magdalena Contreras",
  9: "Milpa Alta",
  10: "Álvaro Obregón",
  11: "Tláhuac",
  12: "Tlalpan",
  13: "Xochimilco",
  14: "Benito Juárez",
  15: "Cuauhtémoc",
  16: "Miguel Hidalgo",
  17: "Venustiano Carranza",
};

// ─── Base coordinates per municipality (CDMX) ────────────────────────────────

export const MUNICIPIO_COORDS: Record<number, [number, number]> = {
  2:  [19.487, -99.185], // Azcapotzalco
  3:  [19.350, -99.161], // Coyoacán
  4:  [19.370, -99.295], // Cuajimalpa
  5:  [19.493, -99.117], // Gustavo A. Madero
  6:  [19.395, -99.095], // Iztacalco
  7:  [19.360, -99.070], // Iztapalapa
  8:  [19.330, -99.238], // Magdalena Contreras
  9:  [19.190, -99.020], // Milpa Alta
  10: [19.368, -99.210], // Álvaro Obregón
  11: [19.278, -99.009], // Tláhuac
  12: [19.290, -99.168], // Tlalpan
  13: [19.256, -99.103], // Xochimilco
  14: [19.396, -99.148], // Benito Juárez
  15: [19.432, -99.143], // Cuauhtémoc
  16: [19.430, -99.193], // Miguel Hidalgo
  17: [19.422, -99.099], // Venustiano Carranza
};

// ─── Formatters ───────────────────────────────────────────────────────────────

export function formatPrice(price: number): string {
  return price.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function getMunicipioName(id: number): string {
  return MUNICIPIO_NAMES[id] ?? "Ciudad de México";
}

export function getFuelLabel(type: FuelType): string {
  const labels: Record<FuelType, string> = {
    magna: "Magna",
    premium: "Premium",
    diesel: "Diésel",
  };
  return labels[type];
}

export function getFuelColor(type: FuelType): string {
  const colors: Record<FuelType, string> = {
    magna: "text-green-700 dark:text-green-400",
    premium: "text-amber-700 dark:text-amber-400",
    diesel: "text-blue-700 dark:text-blue-400",
  };
  return colors[type];
}

export function getFuelBg(type: FuelType): string {
  const bgs: Record<FuelType, string> = {
    magna: "bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800",
    premium: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800",
    diesel: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800",
  };
  return bgs[type];
}

/**
 * Add deterministic coordinate jitter so markers don't stack on top of each other.
 * Uses a simple hash based on the station ID.
 */
export function addJitter(
  base: [number, number],
  stationId: string,
  index: number
): [number, number] {
  const seed = stationId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) + index;
  const latJitter = ((seed * 9301 + 49297) % 233280) / 233280 * 0.06 - 0.03;
  const lngJitter = ((seed * 6571 + 37729) % 233280) / 233280 * 0.06 - 0.03;
  return [base[0] + latJitter, base[1] + lngJitter];
}

export function formatDate(date: Date): string {
  return date.toLocaleString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function buildGoogleMapsUrl(address: string): string {
  const query = encodeURIComponent(`${address}, Ciudad de México`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
