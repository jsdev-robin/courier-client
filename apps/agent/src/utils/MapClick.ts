import { useMapEvents } from 'react-leaflet';

interface MapClickProps {
  onSelect: (lat: number, lng: number) => void;
}

const MapClick = ({ onSelect }: MapClickProps) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
};

export default MapClick;
