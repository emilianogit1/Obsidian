import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RADAR PETROLERO MX",
  description: "Consulta los precios de gasolina en tiempo real en la Ciudad de México",
  keywords: ["gasolina", "precios", "CDMX", "magna", "premium", "diésel", "PEMEX", "CRE"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
