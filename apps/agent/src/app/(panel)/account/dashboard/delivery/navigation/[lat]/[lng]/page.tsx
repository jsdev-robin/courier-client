'use client';

import DeliveryNavigation from '@/components/site/panel/dashboard/pages/navigations/DeliveryNavigation';
import 'leaflet/dist/leaflet.css';
import { useParams } from 'next/navigation';

const Navigate: React.FC = () => {
  const { lat, lng } = useParams<{ lat: string; lng: string }>();

  return <DeliveryNavigation lat={lat} lng={lng} />;
};

export default Navigate;
