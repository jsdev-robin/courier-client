'use client';

import { useFindParcelQuery } from '@/libs/features/services/parcel/parcelApi';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { ItemGroup } from '@repo/ui/components/item';
import { ParcelItem } from './ParcelItem';

const OverviewAssignParcels = () => {
  const { data } = useFindParcelQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assgined Parcels</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup className="gap-2">
          {data?.data?.parcels.map((item, i) => (
            <ParcelItem
              key={i}
              trackingNumber={item.trackingNumber}
              status={item.status}
              deliveryAddress={item.deliveryAddress}
              payment={item.payment}
              parcelDetails={item.parcelDetails}
              nextStatuses={item.nextStatuses}
              parcel={item.deliveryAddress.coordinates}
              agent={item.agent.location}
            />
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
};

export default OverviewAssignParcels;
