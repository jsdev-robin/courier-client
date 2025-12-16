import { ParcelPayment } from '@/libs/features/services/parcel/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemSeparator,
} from '@repo/ui/components/item';

interface ParcelPaymentInfoProps {
  payment: ParcelPayment | undefined;
}

const ParcelPaymentInfo: React.FC<ParcelPaymentInfoProps> = ({ payment }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <Item className="px-0 pt-0" size="sm">
            <ItemContent>Payment Type</ItemContent>
            <ItemActions className="font-semibold">{payment?.type}</ItemActions>
          </Item>
          <Item className="px-0" size="sm">
            <ItemContent>Amount</ItemContent>
            <ItemActions className="font-semibold">
              ${payment?.amount}
            </ItemActions>
          </Item>
          <Item className="px-0" size="sm">
            <ItemContent>COD Amount</ItemContent>
            <ItemActions className="font-semibold">
              ${payment?.codAmount}
            </ItemActions>
          </Item>
          <Item className="px-0" size="sm">
            <ItemContent>Status</ItemContent>
            <ItemActions className="font-semibold">Paid</ItemActions>
          </Item>
          <ItemSeparator />
          <Item className="px-0 pb-0" size="sm">
            <ItemContent>Total Amount</ItemContent>
            <ItemActions className="font-semibold text-lg">
              ${(payment?.amount || 0) + (payment?.codAmount || 0)}
            </ItemActions>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  );
};

export default ParcelPaymentInfo;
