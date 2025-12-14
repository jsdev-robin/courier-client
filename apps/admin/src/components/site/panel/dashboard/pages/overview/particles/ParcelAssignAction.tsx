'use client';
import { useFindAvailableAgentQuery } from '@/libs/features/services/agent/agentApi';
import { useFindOneAndUpdateAssignParcelMutation } from '@/libs/features/services/parcel/parcelApi';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { Button } from '@repo/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@repo/ui/components/item';
import { cn } from '@repo/ui/lib/utils';
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from '@repo/ui/utils/contants';
import { EllipsisVertical } from 'lucide-react';
import { toast } from 'sonner';

const ParcelAssignAction = ({
  agentId,
  parcelId,
}: {
  agentId: string;
  parcelId: string;
}) => {
  const { data, isLoading, isError } = useFindAvailableAgentQuery();

  const [findOneAndUpdateAssignParcel] =
    useFindOneAndUpdateAssignParcelMutation();

  const handleAssignParcel = async (agentId: string) => {
    await toast.promise(
      findOneAndUpdateAssignParcel({ parcelId, agentId }).unwrap(),
      {
        loading: 'Assigning parcel...',
        success: (res) => res.message || DEFAULT_SUCCESS_MESSAGE,
        error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" disabled={isError || isLoading}>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 [--radius:0.65rem]" align="end">
        {data?.data.agents.map((item, i) => (
          <DropdownMenuItem
            key={i}
            className={cn('p-0', agentId === item._id && 'bg-green-500/5')}
            onClick={() => handleAssignParcel(item._id)}
          >
            <Item size="sm" className="w-full p-2">
              <ItemMedia>
                <Avatar className="size-8">
                  <AvatarImage
                    src={item.personalInfo.avatar?.url}
                    className="grayscale"
                  />
                  <AvatarFallback>
                    {item.personalInfo.familyName[0]}
                  </AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-0.5">
                <ItemTitle>
                  {item.personalInfo.familyName} {item.personalInfo.givenName}
                </ItemTitle>
                <ItemDescription>
                  {item.todayParcels} parcels today
                </ItemDescription>
              </ItemContent>
            </Item>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ParcelAssignAction;
