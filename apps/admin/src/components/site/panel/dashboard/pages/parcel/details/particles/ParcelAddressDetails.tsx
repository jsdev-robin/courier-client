import {
  ParcelCustomer,
  ParcelDeliveryAddress,
} from '@/libs/features/services/parcel/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Item,
  ItemContent,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@repo/ui/components/item';
import { Flag, MapPin, Phone } from 'lucide-react';
import React from 'react';

interface ParcelAddressDetailsProps {
  deliveryAddress: ParcelDeliveryAddress | undefined;
  customer: ParcelCustomer | undefined;
}

const ParcelAddressDetails: React.FC<ParcelAddressDetailsProps> = ({
  deliveryAddress,
  customer,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Address Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-2">
          <Item className="p-0">
            <ItemHeader>Pickup Address</ItemHeader>
            <ItemMedia variant="icon" className="self-start">
              <MapPin />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                {customer?.personalInfo.familyName}{' '}
                {customer?.personalInfo.givenName}
              </ItemTitle>
              <div className="space-y-2">
                <address>
                  {customer?.personalInfo.address.street},
                  {customer?.personalInfo.address.city},
                  {customer?.personalInfo.address.state},
                  {customer?.personalInfo.address.postalCode},
                </address>
                <div className="flex items-center gap-2">
                  <Phone className="size-4" />
                  <p>{customer?.personalInfo.phone}</p>
                </div>
              </div>
            </ItemContent>
          </Item>
          <Item className="p-0">
            <ItemHeader>Delivery Address</ItemHeader>
            <ItemMedia variant="icon" className="self-start">
              <Flag />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{deliveryAddress?.contactName}</ItemTitle>
              <div className="space-y-2">
                <address>
                  {deliveryAddress?.street},{deliveryAddress?.city},
                  {deliveryAddress?.state},{deliveryAddress?.postalCode},
                </address>
                <div className="flex items-center gap-2">
                  <Phone className="size-4" />
                  <p>{deliveryAddress?.contactPhone}</p>
                </div>
              </div>
            </ItemContent>
          </Item>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParcelAddressDetails;
