// ─── Raw JSON types ──────────────────────────────────────────────────────────

export interface RawRecord {
  Numero: string;
  Direccion: string;
  Producto: string;
  SubProducto: string;
  PrecioVigente: number;
  EntidadFederativaId: number;
  MunicipioId: number;
  Nombre: string;
}

// ─── Normalised domain types ─────────────────────────────────────────────────

export type FuelType = "magna" | "premium" | "diesel";

export interface PriceInfo {
  price: number;
  subproduct: string;
}

export interface StationPrices {
  magna?: PriceInfo;
  premium?: PriceInfo;
  diesel?: PriceInfo;
}

export interface Station {
  /** Número de permiso CRE, usado como ID único */
  id: string;
  name: string;
  address: string;
  municipioId: number;
  municipioName: string;
  prices: StationPrices;
  /** Approximate latitude for map display */
  lat: number;
  /** Approximate longitude for map display */
  lng: number;
}

// ─── UI helper types ─────────────────────────────────────────────────────────

export interface SearchFilters {
  query: string;
  municipio: string;
}

export interface PriceRefreshState {
  isRefreshing: boolean;
  lastUpdated: Date;
}
