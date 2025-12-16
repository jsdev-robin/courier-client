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
import { Barcode, QrCode } from 'lucide-react';

const ParcelInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parcel Details</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <Item className="px-0" size="sm">
            <ItemContent>Size</ItemContent>
            <ItemActions className="font-semibold">Medium</ItemActions>
          </Item>
          <Item className="px-0" size="sm">
            <ItemContent>Weight</ItemContent>
            <ItemActions className="font-semibold">2KG</ItemActions>
          </Item>
          <Item className="px-0" size="sm">
            <ItemContent>Type</ItemContent>
            <ItemActions className="font-semibold">Electronics</ItemActions>
          </Item>
          <Item className="px-0" size="sm">
            <ItemContent>Description</ItemContent>
            <ItemActions className="font-semibold">
              Smartphone and accessories
            </ItemActions>
          </Item>
        </ItemGroup>
      </CardContent>
      <CardFooter className="flex-col gap-2 items-start">
        <CardTitle>Package Identification</CardTitle>
        <div className="flex items-center gap-4">
          <Barcode className="size-20" />
          <QrCode className="size-20" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ParcelInfo;
