"use client";

import { useState, useCallback } from "react";
import type { Station } from "@/types";

function applyPriceJitter(station: Station): Station {
  const jitter = () => Math.round((Math.random() * 0.04 - 0.02) * 100) / 100;
  return {
    ...station,
    prices: {
      magna: station.prices.magna
        ? { ...station.prices.magna, price: Math.round((station.prices.magna.price + jitter()) * 100) / 100 }
        : undefined,
      premium: station.prices.premium
        ? { ...station.prices.premium, price: Math.round((station.prices.premium.price + jitter()) * 100) / 100 }
        : undefined,
      diesel: station.prices.diesel
        ? { ...station.prices.diesel, price: Math.round((station.prices.diesel.price + jitter()) * 100) / 100 }
        : undefined,
    },
  };
}

export function useStations(initialStations: Station[]) {
  const [stations, setStations] = useState<Station[]>(initialStations);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStations((prev) => prev.map(applyPriceJitter));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  }, []);

  return { stations, isRefreshing, lastUpdated, refresh };
}
