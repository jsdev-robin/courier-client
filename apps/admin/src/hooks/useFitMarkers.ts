'use client';
import { LatLngBoundsExpression, Map as LeafletMap } from 'leaflet';
import { useEffect, useRef } from 'react';

interface Location {
  name: string;
  coordinates: [number, number];
}

export const useFitMarkers = (locations?: Location[]) => {
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (locations?.length && mapRef.current) {
      const bounds: LatLngBoundsExpression = locations.map((item) => [
        item.coordinates[1],
        item.coordinates[0],
      ]);
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations]);

  return mapRef;
};
