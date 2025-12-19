'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components/tabs';
import { Dispatch, SetStateAction } from 'react';
import NearestParcel from './NearestParcel';
import NearestTodayParcel from './NearestTodayParcel';

interface BookedNearestParcelsProps {
  setId: Dispatch<SetStateAction<string | undefined>>;
  id: string | undefined;
}

const BookedNearestParcels: React.FC<BookedNearestParcelsProps> = ({
  id,
  setId,
}) => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="NearestTodayParcel">
        <TabsList>
          <TabsTrigger value="NearestTodayParcel">Today parcel</TabsTrigger>
          <TabsTrigger value="NearestParcel">All parcel</TabsTrigger>
        </TabsList>
        <TabsContent value="NearestTodayParcel">
          <NearestTodayParcel id={id} setId={setId} />
        </TabsContent>
        <TabsContent value="NearestParcel">
          <NearestParcel id={id} setId={setId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookedNearestParcels;
