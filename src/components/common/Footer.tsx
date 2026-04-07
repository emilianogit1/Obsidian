import { Fuel } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-muted/30 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Fuel className="h-4 w-4" />
            <span className="font-semibold text-foreground">RADAR PETROLERO MX</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Datos de precios basados en reportes de la{" "}
            <abbr title="Comisión Reguladora de Energía">CRE</abbr>. Actualización
            diaria. © {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
