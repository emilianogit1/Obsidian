"use client";

import { useState, useEffect } from "react";
import { Clock, MapPin, RefreshCw, Map as MapIcon } from "lucide-react";
import { formatDate } from "@/utils/formatters";
import { PriceDisplay } from "@/components/common/PriceDisplay";

export function HeroSection({ featured, lastUpdated, onRefresh, onOpenMap }: any) {
  // 1. Parche para el error de "Hydration Mismatch" (la pelea del reloj)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-12 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800">
      <div className="container relative z-10 mx-auto px-4">
        
        {/* Reloj de actualización con seguro anti-errores */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 bg-white/50 dark:bg-white/5 w-fit px-3 py-1 rounded-full border border-slate-200 dark:border-zinc-700">
          <Clock className="h-3.5 w-3.5 text-emerald-600" />
          <span>
            Última actualización: {mounted ? formatDate(lastUpdated) : "Cargando..."}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tight lg:text-6xl mb-4 text-slate-900 dark:text-white">
              Radar <span className="text-emerald-600">Petrolero</span> MX
            </h1>
            <p className="text-lg text-slate-600 dark:text-zinc-400 mb-8 max-w-lg">
              Consulta los precios reales de combustible en la CDMX. Datos actualizados directamente de la CRE.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onRefresh}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-200 dark:shadow-none"
              >
                <RefreshCw className="h-4 w-4" />
                Actualizar Precios
              </button>
              
              <button 
                onClick={onOpenMap}
                className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 px-6 py-3 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all"
              >
                <MapIcon className="h-4 w-4" />
                Ver en el mapa
              </button>
            </div>
          </div>

          {/* Tarjeta de Estación Destacada (PEMEX Reforma) */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-[34px] border border-slate-200 dark:border-zinc-800 shadow-xl">
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                  Estación Destacada
                </span>
                <h3 className="text-xl font-bold mt-2">{featured?.name || "PEMEX Reforma"}</h3>
                <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="truncate max-w-[250px]">{featured?.address}</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-slate-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-2xl">
                ⛽
              </div>
            </div>

            {/* Grid de precios con tus nuevos colores sólidos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <PriceDisplay 
                type="magna" 
                info={featured?.prices?.magna} 
                size="lg" 
              />
              <PriceDisplay 
                type="premium" 
                info={featured?.prices?.premium} 
                size="lg" 
              />
              <PriceDisplay 
                type="diesel" 
                info={featured?.prices?.diesel} 
                size="lg" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}