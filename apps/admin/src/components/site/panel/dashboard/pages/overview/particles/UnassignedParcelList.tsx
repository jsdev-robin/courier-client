'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import AvailableAgent from './AvailableAgent';
import BookedNearestParcels from './BookedNearestParcels';

const UnassignedParcelList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Assignment Center</CardTitle>
        <CardDescription>Drag & drop parcels to assign agents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <BookedNearestParcels />
          <AvailableAgent />
        </div>
      </CardContent>
    </Card>
  );
};

export default UnassignedParcelList;
