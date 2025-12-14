'use client';

import { useFindDurationQuery } from '@/libs/features/services/navigation/navigationApi';
import { useFindOneAndUpdateStatusBytrackingNumberParcelMutation } from '@/libs/features/services/parcel/parcelApi';
import { paymentClass, PaymentType } from '@/utils/paymentClass';
import { PaymentStatus, paymentStatusClass } from '@/utils/paymentStatusClass';
import { ParcelSize, sizeClass } from '@/utils/sizeClass';
import { ParcelStatus, statusClass } from '@/utils/statusClass';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { Badge } from '@repo/ui/components/badge';
import { Button, buttonVariants } from '@repo/ui/components/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from '@repo/ui/components/item';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select';
import { cn } from '@repo/ui/lib/utils';
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from '@repo/ui/utils/contants';
import { MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import ParcelItemQrCode from './ParcelItemQrCode';

interface ParcelItemProps {
  trackingNumber: string;
  status: string;
  deliveryAddress: { street: string; state: string };
  payment: { type: string; status: string };
  parcelDetails: { size: string };
  nextStatuses: {
    status: string;
  }[];
  parcel: {
    lat: number;
    lng: number;
  };
  agent: {
    lat: number;
    lng: number;
  };
}

export const ParcelItem: React.FC<ParcelItemProps> = ({
  trackingNumber,
  status,
  deliveryAddress,
  payment,
  parcelDetails,
  nextStatuses,
  parcel,
  agent,
}) => {
  const [findOneAndUpdateStatusBytrackingNumberParcel, { isSuccess }] =
    useFindOneAndUpdateStatusBytrackingNumberParcelMutation();
  const { data, isLoading, isError } = useFindDurationQuery(
    { parcel, agent },
    {
      skip: !parcel || !agent,
    },
  );

  const handleStatus = (newStatus: string) => {
    toast.promise(
      findOneAndUpdateStatusBytrackingNumberParcel({
        trackingNumber,
        status: newStatus,
      }).unwrap(),
      {
        loading: 'Updating parcel status...',
        success: (res) => {
          return res.message || DEFAULT_SUCCESS_MESSAGE;
        },
        error: (err) => {
          return err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE;
        },
      },
    );
  };

  return (
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>
          {trackingNumber}
          <Badge className={statusClass[status as ParcelStatus]}>
            {status}
          </Badge>
          <ParcelItemQrCode
            trackingNumber={trackingNumber}
            status={nextStatuses[0]?.status ?? ''}
          />
        </ItemTitle>
        <ItemDescription>
          <span className="flex-col flex gap-2">
            <span className="inline">
              {deliveryAddress.street}, {deliveryAddress.state},{' '}
              {isError
                ? null
                : isLoading
                  ? 'Calculating...'
                  : `${data?.data.distance}, ${data?.data.duration} away`}
            </span>
            <span className="inline-flex items-center gap-2">
              <Badge
                className={paymentStatusClass[payment.status as PaymentStatus]}
              >
                {payment.status}
              </Badge>
              <Badge className={paymentClass[payment.type as PaymentType]}>
                {payment.type}
              </Badge>
              <Badge className={sizeClass[parcelDetails.size as ParcelSize]}>
                {parcelDetails.size}
              </Badge>
            </span>
          </span>
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge>High</Badge>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </ItemActions>
      <ItemFooter className="grid gap-4 md:grid-cols-3">
        <Link
          href={`/account/dashboard/delivery/navigation/333`}
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <MapPin />
          View on Map
        </Link>
        <Button variant="outline">
          <Phone />
          Call Customre
        </Button>
        <Select onValueChange={handleStatus} disabled={!nextStatuses.length}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Next status..." />
          </SelectTrigger>
          <SelectContent>
            {nextStatuses.map((item, i) => (
              <SelectItem
                value={item.status}
                key={i}
                disabled={i !== 0 && i !== nextStatuses.length - 1}
              >
                {item.status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </ItemFooter>
    </Item>
  );
};
