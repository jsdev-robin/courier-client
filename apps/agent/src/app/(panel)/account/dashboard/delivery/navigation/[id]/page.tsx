'use client';

import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';

const Navigate: React.FC = () => {
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [center, setCenter] = useState<[number, number]>([23.85, 90.2]);

  useEffect(() => {
    const fetchRoute = async () => {
      const res = await axios.get('http://localhost:8005/agent/navigate');
      const coords = res.data.data.features[0].geometry.coordinates.map(
        ([lng, lat]: number[]) => [lat, lng] as [number, number],
      );
      setRouteCoords(coords);
      if (coords.length > 0) setCenter(coords[0]);
    };

    fetchRoute();
  }, []);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer
        center={center}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />
        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="blue" />
        )}
      </MapContainer>
    </div>
  );
};

export default Navigate;
