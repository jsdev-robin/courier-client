import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface MapAutoMoveProps {
  lat: number;
  lng: number;
  zoom?: number;
}

const MapAutoMove = ({ lat, lng, zoom = 16 }: MapAutoMoveProps) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], zoom, {
      animate: true,
      duration: 0.8,
    });
  }, [lat, lng, zoom, map]);

  return null;
};

export default MapAutoMove;
