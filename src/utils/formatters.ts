// Nota: Cambié "Import" por "import" (en minúscula) para evitar errores
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
  2:  [19.487, -99.185],
  3:  [19.350, -99.161],
  4:  [19.370, -99.295],
  5:  [19.493, -99.117],
  6:  [19.395, -99.095],
  7:  [19.360, -99.070],
  8:  [19.330, -99.238],
  9:  [19.190, -99.020],
  10: [19.368, -99.210],
  11: [19.278, -99.009],
  12: [19.290, -99.168],
  13: [19.256, -99.103],
  14: [19.396, -99.148],
  15: [19.432, -99.143],
  16: [19.430, -99.193],
  17: [19.422, -99.099],
};

// ─── Formatters ───────────────────────────────────────────────────────────────

export function formatPrice(price: number | undefined): string {
  if (price === undefined) return "$00.00";
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

export function getFuelLabel(type: FuelType | string): string {
  const labels: Record<string, string> = {
    magna: "Magna",
    premium: "Premium",
    diesel: "Diésel",
  };
  return labels[type.toLowerCase()] || type;
}

export function getFuelColor(_type: string): string {
  return "text-white";
}

export function getFuelBg(type: string): string {
  const bgs: Record<string, string> = {
    magna:   "bg-emerald-600 dark:bg-emerald-500 border-transparent",
    premium: "bg-rose-500    dark:bg-rose-400    border-transparent",
    diesel:  "bg-slate-800   dark:bg-slate-700   border-transparent",
  };
  return bgs[type.toLowerCase()] || "bg-slate-500";
}

export function addJitter(base: [number, number], stationId: string, index: number): [number, number] {
  const seed = stationId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) + index;
  const latJitter = ((seed * 9301 + 49297) % 233280) / 233280 * 0.06 - 0.03;
  const lngJitter = ((seed * 6571 + 37729) % 233280) / 233280 * 0.06 - 0.03;
  return [base[0] + latJitter, base[1] + lngJitter];
}

// 🛡️ AQUÍ ESTÁ EL ESCUDO PARA LA FECHA QUE FALTABA
export function formatDate(date: Date | string | undefined): string {
  if (!date) return "Cargando fecha...";
  
  // Convertimos a Date por si acaso llega como texto
  const validDate = new Date(date); 
  
  return validDate.toLocaleString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function buildGoogleMapsUrl(lat: number, lng: number): string {
  return `http://maps.google.com/maps?q=${lat},${lng}`;
}