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

const ParcelPaymentInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <Item className="px-0" size="sm">
            <ItemContent>Payment Type</ItemContent>
            <ItemActions className="font-semibold">Prepaid</ItemActions>
          </Item>
          <Item className="px-0" size="sm">
            <ItemContent>Amount</ItemContent>
            <ItemActions className="font-semibold">$45.99</ItemActions>
          </Item>
          <Item className="px-0" size="sm">
            <ItemContent>COD Amount</ItemContent>
            <ItemActions className="font-semibold">$0.00</ItemActions>
          </Item>
          <Item className="px-0" size="sm">
            <ItemContent>Status</ItemContent>
            <ItemActions className="font-semibold">Paid</ItemActions>
          </Item>
          <ItemSeparator />
          <Item className="px-0" size="sm">
            <ItemContent>Total Amount</ItemContent>
            <ItemActions className="font-semibold text-lg">$45.99</ItemActions>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  );
};

export default ParcelPaymentInfo;
