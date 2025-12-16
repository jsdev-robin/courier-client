'use client';

import ParcelDetails from '@/components/site/panel/dashboard/pages/parcel/ParcelDetails';
import { useParams } from 'next/navigation';

const ParcelDetailsPage = () => {
  const params = useParams<{ id: string }>();
  return (
    <>
      <ParcelDetails id={params.id} />
    </>
  );
};

export default ParcelDetailsPage;
