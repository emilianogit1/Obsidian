# RADAR PETROLERO MX

Visualizador de precios de gasolina en tiempo real para la Ciudad de México. Construido con Next.js 15 App Router, TypeScript, Tailwind CSS y shadcn/ui.

## Stack

- **Framework:** Next.js 15 (App Router, Server + Client Components)
- **Lenguaje:** TypeScript (strict)
- **Estilos:** Tailwind CSS 3 + shadcn/ui (hand-coded)
- **Mapa:** react-leaflet + Leaflet (carga dinámica, sin SSR)
- **Íconos:** lucide-react
- **Tema oscuro:** next-themes

## Instalación y desarrollo

```bash
# 1. Clonar y entrar al proyecto
git clone <repo-url>
cd Obsidian

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:3000
# (redirige automáticamente a /radar-petrolero)
```

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx                  ← Layout raíz con ThemeProvider
│   ├── page.tsx                    ← Redirect a /radar-petrolero
│   └── (radar)/radar-petrolero/
│       ├── page.tsx                ← Server Component: carga datos
│       └── components/
│           ├── HeroSection.tsx     ← Estación destacada + precios + mapa
│           └── StationsGrid.tsx    ← Búsqueda + grid de tarjetas
├── components/
│   ├── theme-provider.tsx
│   ├── ui/                         ← Primitivos: Button, Card, Badge, Dialog…
│   └── common/                     ← Header, Footer, StationCard, MapModal…
├── lib/
│   ├── stationsData.ts             ← Normalización y cache de estaciones
│   └── utils.ts                    ← cn() utility
├── hooks/
│   ├── useSearch.ts                ← Filtro con debounce
│   └── useStations.ts              ← Estado de estaciones + refresh simulado
├── utils/
│   └── formatters.ts               ← formatPrice, getFuelColor, etc.
├── types/
│   └── index.ts                    ← Tipos TypeScript del dominio
└── data/
    └── stations.json               ← Datos crudos CRE (array plano)
```

## Agregar una nueva página

1. Crear `src/app/(radar)/<nombre-pagina>/page.tsx`
2. Importar `Header` y `Footer` de `@/components/common`
3. Usar `getAllStations()` de `@/lib/stationsData` para obtener datos

```tsx
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { getAllStations } from "@/lib/stationsData";

export default function MiPagina() {
  const stations = getAllStations();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Contenido */}
      </main>
      <Footer />
    </div>
  );
}
```

## Actualizar datos de precios

Los datos viven en `src/data/stations.json`. El formato esperado es un array de registros con esta estructura:

```json
[
  {
    "Numero": "PL/XXXXX/EXP/ES/2022",
    "Nombre": "Nombre de la estación",
    "Direccion": "Dirección completa",
    "Producto": "Gasolinas y Gasavión",
    "SubProducto": "Magna Regular",
    "PrecioVigente": 23.45,
    "EntidadFederativaId": 9,
    "MunicipioId": 15
  }
]
```

Para conectar a la API real de la CRE, reemplaza `getAllStations()` en `src/lib/stationsData.ts` para hacer `fetch` en lugar de importar el JSON estático. Usar `cache: 'no-store'` para datos en tiempo real o `revalidate: 3600` para ISR por hora.

```ts
// Ejemplo de migración a API real
export async function getAllStations(): Promise<Station[]> {
  const res = await fetch("https://api.cre.gob.mx/v1/precios-gasolina", {
    next: { revalidate: 3600 },
  });
  const data: RawRecord[] = await res.json();
  // ... normalización igual que antes
}
```

## Deploy en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy desde la raíz del proyecto
vercel

# Variables de entorno necesarias: ninguna (datos estáticos)
# Para API real: agregar NEXT_PUBLIC_CRE_API_KEY en Vercel Dashboard
```

El proyecto es compatible con Vercel sin configuración adicional. El mapa Leaflet se carga con `ssr: false` para evitar errores en Edge Functions.
