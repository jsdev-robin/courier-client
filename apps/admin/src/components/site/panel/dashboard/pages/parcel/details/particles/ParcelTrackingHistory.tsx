'use client';

import type { ParcelTrackingHistory as ParcelTrackingHistoryType } from '@/libs/features/services/parcel/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from '@repo/ui/components/timeline';
import { format, isToday } from 'date-fns';

interface ParcelTrackingHistoryProps {
  trackingHistory: ParcelTrackingHistoryType[] | undefined;
}

const ParcelTrackingHistory: React.FC<ParcelTrackingHistoryProps> = ({
  trackingHistory,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tracking History</CardTitle>
      </CardHeader>
      <CardContent>
        <Timeline activeIndex={1}>
          {trackingHistory?.map((item, i) => (
            <TimelineItem key={i}>
              <TimelineDot />
              <TimelineConnector />
              <TimelineContent>
                <TimelineHeader>
                  <TimelineTime dateTime={item.timestamp}>
                    {isToday(new Date(item.timestamp))
                      ? `Today, ${format(new Date(item.timestamp), 'hh:mm a')}`
                      : format(
                          new Date(item.timestamp),
                          'MMM dd, yyyy, hh:mm a',
                        )}
                  </TimelineTime>
                  <TimelineTitle>{item.status}</TimelineTitle>
                </TimelineHeader>
                <TimelineDescription>{item.notes}</TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default ParcelTrackingHistory;
