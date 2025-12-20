'use client';

import { useFindOneAndUpdateAssignAutoParcelMutation } from '@/libs/features/services/parcel/parcelApi';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Spinner } from '@repo/ui/components/spinner';
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from '@repo/ui/utils/contants';
import { useState } from 'react';
import { toast } from 'sonner';
import { AiButton } from '../../../../../../ui/AiButton';
import AvailableAgent from './AvailableAgent';
import BookedNearestParcels from './BookedNearestParcels';

const UnassignedParcelList = () => {
  const [id, setId] = useState<string>();

  const [findOneAndUpdateAssignAutoParcel, { isLoading }] =
    useFindOneAndUpdateAssignAutoParcelMutation();

  const handleAutoAssignParcel = async (id: string) => {
    await toast.promise(findOneAndUpdateAssignAutoParcel(id).unwrap(), {
      loading: 'Auto Assigning parcel...',
      success: (res) => {
        setId('');
        return res.message || DEFAULT_SUCCESS_MESSAGE;
      },
      error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Assignment Center</CardTitle>
        <CardDescription>
          Manage and assign parcels to agents quickly and efficiently.
          Today&rsquo;s unassigned parcels are listed for immediate action.
        </CardDescription>
        {id && (
          <CardAction>
            <AiButton onClick={() => handleAutoAssignParcel(id)}>
              {isLoading && <Spinner className="mr-2" />}AI-Powered Assign
            </AiButton>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <BookedNearestParcels id={id} setId={setId} />
          <AvailableAgent />
        </div>
      </CardContent>
    </Card>
  );
};

export default UnassignedParcelList;
