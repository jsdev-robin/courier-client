import { AssignedAgent } from '@/libs/features/services/parcel/types';
import { Alert, AlertDescription, AlertTitle } from '@repo/ui/components/alert';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { buttonVariants } from '@repo/ui/components/button';
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
import { cn } from '@repo/ui/lib/utils';
import { AlertCircleIcon, Phone } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface ParcelAssignedAgentProps {
  assignedAgent: AssignedAgent | undefined;
}

const ParcelAssignedAgent: React.FC<ParcelAssignedAgentProps> = ({
  assignedAgent,
}) => {
  return (
    <>
      {assignedAgent ? (
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
                <ItemTitle>
                  {assignedAgent?.personalInfo.familyName}{' '}
                  {assignedAgent?.personalInfo.givenName}
                </ItemTitle>
                <ItemDescription>Delivery Agent</ItemDescription>
              </ItemContent>
            </Item>
          </CardContent>
          <CardFooter className="w-full">
            <Link
              href={`tel:${assignedAgent?.personalInfo?.phone}`}
              className={cn(buttonVariants({}), 'w-full')}
            >
              <Phone />
              Call
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>No agent assigned yet</AlertTitle>
          <AlertDescription>
            <p>This parcel does not have an assigned delivery agent.</p>
            <ul className="list-inside list-disc text-sm">
              <li>An agent will be assigned soon</li>
              <li>Please check back later</li>
              <li>Contact support if it takes too long</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default ParcelAssignedAgent;
