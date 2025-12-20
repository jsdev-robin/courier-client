'use client';

import axios from 'axios';
import debounce from 'lodash.debounce';
import { useEffect, useRef, useState } from 'react';

export interface Place {
  display_name: string;
  lat: string;
  lon: string;
}

interface Coords {
  lat: number;
  lng: number;
  name: string;
}

interface UsePlaceSearch {
  query: string;
  setQuery: (q: string) => void;
  results: Place[];
  loading: boolean;
  coords: Coords | null;
  selectPlace: (place: Place) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const usePlaceSearch = (delay = 500): UsePlaceSearch => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<Coords | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const debouncedFetchRef = useRef(
    debounce(async (q: string) => {
      if (!q) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const { data } = await axios.get<Place[]>(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            q,
          )}&format=json&limit=20`,
        );
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, delay),
  );

  useEffect(() => {
    debouncedFetchRef.current(query);
  }, [query]);

  const selectPlace = (place: Place) => {
    setCoords({
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
      name: place.display_name,
    });
    setQuery(place.display_name);
    setResults([]);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setResults([]);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return {
    query,
    setQuery,
    results,
    loading,
    coords,
    selectPlace,
    containerRef,
  };
};
