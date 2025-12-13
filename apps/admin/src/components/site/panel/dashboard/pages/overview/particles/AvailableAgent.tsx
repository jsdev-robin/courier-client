'use client';

import { useFindAvailableAgentQuery } from '@/libs/features/services/agent/agentApi';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { Badge } from '@repo/ui/components/badge';
import Heading from '@repo/ui/components/heading';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@repo/ui/components/item';
import { ScrollArea } from '@repo/ui/components/scroll-area';
import { Skeleton } from '@repo/ui/components/skeleton';

const AvailableAgent = () => {
  const { data, isLoading, isError } = useFindAvailableAgentQuery();

  return (
    <div className="grid grid-cols-1 gap-2 self-start">
      <Heading as="h6" className="text-base font-semibold" asChild>
        Available Agents
      </Heading>
      <ScrollArea className="max-h-100">
        {isError ? (
          <div className="text-destructive">Error</div>
        ) : isLoading ? (
          [...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-20 my-2" />
          ))
        ) : (
          <ItemGroup className="space-y-2 pr-4">
            {data?.data.agents.map((item, i) => (
              <Item variant="outline" key={i}>
                <ItemMedia>
                  <Avatar>
                    <AvatarImage
                      src={item.personalInfo.avatar?.url}
                      className="grayscale"
                    />
                    <AvatarFallback>
                      {item.personalInfo.familyName[0]}
                    </AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="w-full">
                    {item.personalInfo.familyName} {item.personalInfo.givenName}
                    <Badge className="bg-green-500/5 text-green-500 ml-auto">
                      Available
                    </Badge>
                  </ItemTitle>
                  <ItemDescription>
                    {item.todayParcels} parcels today
                  </ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        )}
      </ScrollArea>
    </div>
  );
};

export default AvailableAgent;
