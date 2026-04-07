import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // <-- ESTO APAGA EL DOBLE RENDER DE DESARROLLO
};

export default nextConfig;