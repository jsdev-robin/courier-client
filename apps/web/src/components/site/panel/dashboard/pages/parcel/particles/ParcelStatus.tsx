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
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperList,
  StepperSeparator,
  StepperTrigger,
} from '@repo/ui/components/stepper';
import { format, isToday } from 'date-fns';

const steps = [
  {
    value: 'account',
  },
  {
    value: 'profile',
  },
  {
    value: 'payment',
  },
  {
    value: 'complete',
  },
  {
    value: '5',
  },
];

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
        <Stepper defaultValue="account" className="w-full">
          <StepperList>
            {steps.map((step) => (
              <StepperItem key={step.value} value={step.value}>
                <StepperTrigger>
                  <StepperIndicator />
                </StepperTrigger>
                <StepperSeparator />
              </StepperItem>
            ))}
          </StepperList>
        </Stepper>
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
              Estimated delivery: Dec 28, 2023
            </span>
          </ItemFooter>
        </Item>
      </CardFooter>
    </Card>
  );
};

export default ParcelStatus;
