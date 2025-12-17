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

  const [findOneAndUpdateAssignAutoParcel] =
    useFindOneAndUpdateAssignAutoParcelMutation();

  const handleAutoAssignParcel = async (id: string) => {
    await toast.promise(findOneAndUpdateAssignAutoParcel(id).unwrap(), {
      loading: 'Auto Assigning parcel...',
      success: (res) => res.message || DEFAULT_SUCCESS_MESSAGE,
      error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Assignment Center</CardTitle>
        <CardDescription>Drag & drop parcels to assign agents</CardDescription>
        {id && (
          <CardAction>
            <AiButton onClick={() => handleAutoAssignParcel(id)}>
              AI-Powered Assign
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
