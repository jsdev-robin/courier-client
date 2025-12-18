import { Parcel } from '@/libs/features/services/parcel/types';
import { paymentClass, PaymentType } from '@/utils/paymentClass';
import { PaymentStatus, paymentStatusClass } from '@/utils/paymentStatusClass';
import { ParcelStatus, statusClass } from '@/utils/statusClass';
import { Badge } from '@repo/ui/components/badge';
import { buttonVariants } from '@repo/ui/components/button';
import Heading from '@repo/ui/components/heading';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from '@repo/ui/components/item';
import { cn } from '@repo/ui/lib/utils';
import { MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import ParcelStatusAction from './ParcelStatusAction';
import QrCodeScannerAction from './QrCodeScannerAction';

interface ParcelItemProps {
  parcel: Parcel;
}

const ParcelItem: React.FC<ParcelItemProps> = ({ parcel }) => {
  return (
    <Item variant="muted" size="sm">
      <ItemHeader>
        <div className="flex items-center gap-2">
          <span>{parcel.trackingNumber}</span>
          <Badge
            className={
              paymentStatusClass[parcel.payment.status as PaymentStatus]
            }
          >
            {parcel.payment.status}
          </Badge>
          <Badge className={paymentClass[parcel.payment.method as PaymentType]}>
            {parcel.payment.method}
          </Badge>
          <Badge className={statusClass[parcel.status as ParcelStatus]}>
            {parcel.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Heading as="h6" asChild className="text-xs">
            Paid: {parcel.payment.amount} BDT
          </Heading>
          <Heading as="h6" asChild className="text-xs">
            COD: {parcel.payment.codAmount} BDT
          </Heading>
          <QrCodeScannerAction
            trackingNumber={parcel.trackingNumber}
            status={parcel.nextStatuses[0]?.status ?? ''}
          />
        </div>
      </ItemHeader>
      <ItemContent>
        <ItemTitle>{parcel.deliveryAddress.contactName}</ItemTitle>
        <ItemDescription>
          <span>
            {parcel.deliveryAddress.street}, {parcel.deliveryAddress.city},{' '}
            {parcel.deliveryAddress.state}, {parcel.deliveryAddress.country}{' '}
            {parcel.deliveryAddress.postalCode}
          </span>
          <span className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="size-4" />
              {parcel.deliveryAddress.contactPhone}
            </span>
          </span>
        </ItemDescription>
      </ItemContent>
      <ItemFooter className="grid gap-2 grid-cols-3">
        <Link
          href={`/account/dashboard/delivery/navigation/${parcel.deliveryAddress.location.coordinates[0]}/${parcel.deliveryAddress.location.coordinates[1]}`}
          className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
        >
          <MapPin />
          View on Map
        </Link>
        <Link
          href={`tel:${parcel.deliveryAddress.contactPhone}`}
          className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
        >
          <Phone />
          Call
        </Link>
        <ParcelStatusAction
          options={parcel.nextStatuses}
          trackingNumber={parcel.trackingNumber}
        />
      </ItemFooter>
    </Item>
  );
};

export default ParcelItem;
