import { Badge } from '@repo/ui/components/badge';
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

const ParcelAddressDetails = () => {
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
              <ItemTitle>John Smith</ItemTitle>
              <div className="space-y-2">
                <address>
                  123 Main Street New York, NY 10001 United States
                </address>
                <div className="flex items-center gap-2">
                  <Phone className="size-4" />
                  <p>+1 (555) 123-4567</p>
                </div>
                <Badge variant="secondary">Scheduled: Dec 20, 2023</Badge>
              </div>
            </ItemContent>
          </Item>
          <Item className="p-0">
            <ItemHeader>Delivery Address</ItemHeader>
            <ItemMedia variant="icon" className="self-start">
              <Flag />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>John Smith</ItemTitle>
              <div className="space-y-2">
                <address>
                  123 Main Street New York, NY 10001 United States
                </address>
                <div className="flex items-center gap-2">
                  <Phone className="size-4" />
                  <p>+1 (555) 123-4567</p>
                </div>
                <Badge variant="secondary">Scheduled: Dec 20, 2023</Badge>
              </div>
            </ItemContent>
          </Item>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParcelAddressDetails;
