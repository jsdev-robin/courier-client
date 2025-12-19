import { ParcelCustomer } from '@/libs/features/services/parcel/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@repo/ui/components/item';
import React from 'react';

interface ParcelCustomerInfoProps {
  customer: ParcelCustomer | undefined;
}

const ParcelCustomerInfo: React.FC<ParcelCustomerInfoProps> = ({
  customer,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <Item className="px-0 pt-0" size="sm">
            <ItemContent>
              <ItemDescription>Customer</ItemDescription>
              <ItemTitle>
                {customer?.personalInfo.familyName}{' '}
                {customer?.personalInfo.givenName}
              </ItemTitle>
            </ItemContent>
          </Item>
          <Item className="px-0" size="sm">
            <ItemContent>
              <ItemDescription>Email</ItemDescription>
              <ItemTitle>{customer?.personalInfo.email}</ItemTitle>
            </ItemContent>
          </Item>
          <Item className="px-0 pb-0" size="sm">
            <ItemContent>
              <ItemDescription>Phone</ItemDescription>
              <ItemTitle>{customer?.personalInfo.phone}</ItemTitle>
            </ItemContent>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  );
};

export default ParcelCustomerInfo;
