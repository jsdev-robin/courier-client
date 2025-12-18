'use client';

import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { ItemGroup } from '@repo/ui/components/item';
import { Skeleton } from '@repo/ui/components/skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useFindParcelQuery } from '../../../../../../../libs/features/services/parcel/parcelApi';
import ParcelItem from './ParcelItem';

const OverviewAssignedParcels = () => {
  const [page, setPage] = useState(1);
  const { data, isError, isLoading } = useFindParcelQuery(page);

  const totalPages = Math.ceil(
    (data?.data.total || 0) / (data?.data.limit || 10),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assigned Parcels</CardTitle>
        <CardDescription>Today's delivery schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <ItemGroup className="gap-2">
          {isError ? (
            <div className="text-destructive">Error</div>
          ) : isLoading ? (
            [...Array(10)].map((_, i) => <Skeleton key={i} className="h-40" />)
          ) : (
            data?.data.parcels.map((item, i) => (
              <ParcelItem parcel={item} key={i} />
            ))
          )}
        </ItemGroup>
      </CardContent>
      <CardFooter className="justify-between">
        <Button
          variant="outline"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >
          <ChevronLeft />
        </Button>
        <span>Page {page}</span>
        <Button
          variant="outline"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >
          <ChevronRight />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OverviewAssignedParcels;
