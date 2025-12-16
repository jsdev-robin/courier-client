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

const ParcelCustomerInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <Item className="px-0" size="sm">
            <ItemContent>
              <ItemDescription>Customer</ItemDescription>
              <ItemTitle>Michael Brown</ItemTitle>
            </ItemContent>
          </Item>
          <Item className="px-0" size="sm">
            <ItemContent>
              <ItemDescription>Email</ItemDescription>
              <ItemTitle>michael.brown@example.com</ItemTitle>
            </ItemContent>
          </Item>
          <Item className="px-0" size="sm">
            <ItemContent>
              <ItemDescription>Phone</ItemDescription>
              <ItemTitle>+1 (555) 345-6789</ItemTitle>
            </ItemContent>
          </Item>
          <Item className="px-0" size="sm">
            <ItemContent>
              <ItemDescription>Account Created</ItemDescription>
              <ItemTitle>Jan 15, 2022</ItemTitle>
            </ItemContent>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  );
};

export default ParcelCustomerInfo;
