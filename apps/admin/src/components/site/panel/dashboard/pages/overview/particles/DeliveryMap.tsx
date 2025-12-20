'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components/tabs';
import ParcelLiveMapAll from './ParcelLiveMapAll';
import ParcelLiveMapToday from './ParcelLiveMapToday';

const DeliveryMap = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Delivery Map</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Tdoday">
          <TabsList>
            <TabsTrigger value="Tdoday">Today</TabsTrigger>
            <TabsTrigger value="All">All</TabsTrigger>
          </TabsList>
          <TabsContent value="Tdoday">
            <ParcelLiveMapToday />
          </TabsContent>
          <TabsContent value="All">
            <ParcelLiveMapAll />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DeliveryMap;
