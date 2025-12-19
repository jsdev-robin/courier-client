'use client';

import { useFindNearestParcelQuery } from '@/libs/features/services/parcel/parcelApi';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@repo/ui/components/item';
import { Skeleton } from '@repo/ui/components/skeleton';
import { cn } from '@repo/ui/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import ParcelAssignAction from './ParcelAssignAction';

interface BookedNearestParcelsProps {
  setId: Dispatch<SetStateAction<string | undefined>>;
  id: string | undefined;
}

const NearestParcel: React.FC<BookedNearestParcelsProps> = ({ id, setId }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching } =
    useFindNearestParcelQuery(page);

  const total = data?.data.total;
  const limit = data?.data.limit;
  const totalPages = total && limit ? Math.ceil(total / limit) : 1;

  return (
    <div className="space-y-4">
      <div>
        {isError ? (
          <div className="text-destructive">Error</div>
        ) : isLoading ? (
          [...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-20 my-2" />
          ))
        ) : (
          <ItemGroup className="space-y-2">
            {data?.data.parcels.map((item, i) => (
              <Item
                variant="outline"
                key={i}
                onClick={() => setId(id ? '' : item._id)}
                className={cn(id === item._id && 'bg-green-500/5')}
              >
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
                  <ParcelAssignAction
                    agentId={item.display.agentId}
                    parcelId={item._id}
                  />
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
        )}
      </div>
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          size="icon-sm"
        >
          <ChevronLeft />
        </Button>
        <span>Page {page}</span>
        <Button
          variant="outline"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          size="icon-sm"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default NearestParcel;
