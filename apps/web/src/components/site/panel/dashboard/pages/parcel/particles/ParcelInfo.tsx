import { ParcelDetails } from '@/libs/features/services/parcel/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
} from '@repo/ui/components/item';
import Image from 'next/image';
import React from 'react';

interface ParcelInfoProps {
  ParcelDetails?: ParcelDetails | undefined;
  qrCode: string | undefined;
  barcode: string | undefined;
}

const ParcelInfo: React.FC<ParcelInfoProps> = ({
  ParcelDetails,
  barcode,
  qrCode,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parcel Details</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <Item className="px-0 pt-0" size="sm">
            <ItemContent>Size</ItemContent>
            <ItemActions className="font-semibold">
              {ParcelDetails?.size}
            </ItemActions>
          </Item>
          <Item className="px-0" size="sm">
            <ItemContent>Weight</ItemContent>
            <ItemActions className="font-semibold">
              {ParcelDetails?.weight}
            </ItemActions>
          </Item>
          <Item className="px-0" size="sm">
            <ItemContent>Type</ItemContent>
            <ItemActions className="font-semibold">
              {ParcelDetails?.type}
            </ItemActions>
          </Item>
          <Item className="px-0 pb-0" size="sm">
            <ItemContent>Description</ItemContent>
            <ItemActions className="font-semibold">
              {ParcelDetails?.description}
            </ItemActions>
          </Item>
        </ItemGroup>
      </CardContent>
      <CardFooter className="flex-col gap-2 items-start">
        <CardTitle>Package Identification</CardTitle>
        <div className="flex items-center gap-4">
          {barcode && (
            <Image
              src={barcode}
              alt="Barcode"
              width={100}
              height={48}
              className="w-full h-12"
            />
          )}
          {qrCode && (
            <Image
              src={qrCode}
              alt="qrCode"
              width={80}
              height={80}
              className="size-20"
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ParcelInfo;
