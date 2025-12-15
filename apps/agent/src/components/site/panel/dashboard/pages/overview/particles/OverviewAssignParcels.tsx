'use client';

import { useFindParcelQuery } from '@/libs/features/services/parcel/parcelApi';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { ItemGroup } from '@repo/ui/components/item';
import { Skeleton } from '@repo/ui/components/skeleton';
import { ParcelItem } from './ParcelItem';

const OverviewAssignParcels = () => {
  const { data, isError, isLoading } = useFindParcelQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assgined Parcels</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup className="gap-2">
          {isError ? (
            <div className="text-destructive">Error</div>
          ) : isLoading ? (
            [...Array(7)].map((_, i) => (
              <Skeleton key={i} className="h-40 my-2" />
            ))
          ) : (
            data?.data?.parcels?.map((item, i) => (
              <ParcelItem
                key={item.trackingNumber ?? i}
                trackingNumber={item.trackingNumber}
                status={item.status}
                deliveryAddress={item.deliveryAddress}
                payment={item.payment}
                parcelDetails={item.parcelDetails}
                nextStatuses={item.nextStatuses}
                parcel={item.deliveryAddress.coordinates}
                agent={item.agent.location}
              />
            ))
          )}
        </ItemGroup>
      </CardContent>
    </Card>
  );
};

export default OverviewAssignParcels;
