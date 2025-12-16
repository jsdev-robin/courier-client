import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@repo/ui/components/item';
import { Phone } from 'lucide-react';

const ParcelAssignedAgent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assigned Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <Item size="sm">
          <ItemMedia variant="image">
            <Avatar className="size-10">
              <AvatarImage src="https://github.com/evilrabbit.png" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Agent Johnson</ItemTitle>
            <ItemDescription>Delivery Agent</ItemDescription>
          </ItemContent>
        </Item>
      </CardContent>
      <CardFooter className="w-full">
        <Button className="w-full">
          <Phone />
          Contact Agent
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ParcelAssignedAgent;
