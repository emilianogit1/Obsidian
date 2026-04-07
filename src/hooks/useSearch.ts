"use client";

import { useState, useEffect, useMemo } from "react";
import type { Station, SearchFilters } from "@/types";

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function useSearch(stations: Station[]) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    municipio: "",
  });

  const debouncedQuery = useDebounce(filters.query, 300);

  const filtered = useMemo(() => {
    let result = stations;

    if (filters.municipio) {
      result = result.filter((s) => s.municipioName === filters.municipio);
    }

    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q) ||
          s.municipioName.toLowerCase().includes(q)
      );
    }

    return result;
  }, [stations, debouncedQuery, filters.municipio]);

  return { filters, setFilters, filtered };
}
