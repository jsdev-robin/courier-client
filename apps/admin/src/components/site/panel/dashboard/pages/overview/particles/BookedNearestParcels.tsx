'use client';

import { useFindGeoNearParcelQuery } from '@/libs/features/services/parcel/parcelApi';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import Heading from '@repo/ui/components/heading';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@repo/ui/components/item';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { Skeleton } from '@repo/ui/components/skeleton';
import { cn } from '@repo/ui/lib/utils';
import { EllipsisIcon } from 'lucide-react';

const BookedNearestParcels = () => {
  const { data, isLoading, isError } = useFindGeoNearParcelQuery();

  return (
    <div className="grid grid-cols-1 gap-2 self-start">
      <Heading as="h6" className="text-base font-semibold" asChild>
        Unassigned Parcels
      </Heading>
      <ScrollArea className="max-h-100">
        {isError ? (
          <div className="text-destructive">Error</div>
        ) : isLoading ? (
          [...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-20 my-2" />
          ))
        ) : (
          <ItemGroup className="space-y-2 pr-4">
            {data?.data.parcels.map((item, i) => (
              <Item variant="outline" key={i}>
                <ItemContent>
                  <ItemTitle>
                    {item.display.trackingNumber}
                    <Badge className="bg-green-500/5 text-green-500">
                      {item.display.size}
                    </Badge>
                    <Badge
                      className={cn(
                        item.display.paymentType === 'COD'
                          ? 'bg-chart-1/5 text-chart-1'
                          : 'bg-chart-2/5 text-chart-2',
                      )}
                    >
                      {item.display.paymentType}
                    </Badge>
                  </ItemTitle>
                  <ItemDescription>
                    Nearest: {item.display.agentName} • {item.display.distance}{' '}
                    {item.display.distanceUnit}
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button variant="outline" size="sm">
                    <EllipsisIcon />
                  </Button>
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
        )}
      </ScrollArea>
    </div>
  );
};

export default BookedNearestParcels;
