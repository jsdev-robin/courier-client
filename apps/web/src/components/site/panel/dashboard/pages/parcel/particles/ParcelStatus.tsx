import { Badge } from '@repo/ui/components/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from '@repo/ui/components/item';
import { Clock, Truck } from 'lucide-react';

import {
  ParcelStatus as ParcelStatusType,
  statusClass,
} from '@/utils/statusClass';
import { Progress } from '@repo/ui/components/progress';
import { format, isToday } from 'date-fns';
import { parcelProgressMap } from '../../../../../../../utils/parcelProgressMap';

interface ParcelStatusProps {
  trackingNumber: string | undefined;
  status: string | undefined;
  updatedAt: string | undefined;
}

const ParcelStatus: React.FC<ParcelStatusProps> = ({
  trackingNumber,
  status,
  updatedAt,
}) => {
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parcel Status</CardTitle>
        <CardDescription>
          <Badge className={statusClass[status as ParcelStatusType]}>
            {status}
          </Badge>{' '}
          Last updated:{' '}
          {updatedAt &&
            (isToday(new Date(updatedAt))
              ? `Today, ${format(new Date(updatedAt), 'hh:mm a')}`
              : format(new Date(updatedAt), 'MMM dd, yyyy, hh:mm a'))}
        </CardDescription>
        <CardAction>
          <p className="text-xs text-muted-foreground">Tracking Number</p>
          <h1 className="text-base font-medium">{trackingNumber}</h1>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={parcelProgressMap[status ?? 0]} />

          <div className="flex items-center justify-between gap-8">
            {['Booked', 'Assigned', 'Picked Up', 'In Transit', 'Delivered'].map(
              (item, i) => (
                <div className="text-xs font-medium" key={i}>
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Item>
          <ItemMedia>
            <ItemMedia variant="icon">
              <Truck className="size-5" />
            </ItemMedia>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Package is in transit</ItemTitle>
            <ItemDescription>
              Your package has departed from the distribution center and is on
              its way to the destination city. Current location: Kansas City,
              MO.
            </ItemDescription>
          </ItemContent>
          <ItemFooter>
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <Clock className="size-4" />
              <p>Estimated delivery: {estimatedDelivery.toDateString()}</p>
            </span>
          </ItemFooter>
        </Item>
      </CardFooter>
    </Card>
  );
};

export default ParcelStatus;
