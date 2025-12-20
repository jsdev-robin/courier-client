'use client';

import { useFindPerformanceAgentQuery } from '@/libs/features/services/analytics/agentAnalyticsApi';
import { Badge } from '@repo/ui/components/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import Heading from '@repo/ui/components/heading';
import { Item } from '@repo/ui/components/item';
import { Progress } from '@repo/ui/components/progress';
import { Skeleton } from '@repo/ui/components/skeleton';

const TodaysPerformance = () => {
  const { data, isError, isLoading } = useFindPerformanceAgentQuery();
  const performance = data?.data.metrics;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&lsquo;s Performance</CardTitle>
        <CardDescription>Shift: {performance?.shift.display}</CardDescription>
        <CardAction>
          {performance?.shift.isActive ? (
            <Badge>On Duty Today</Badge>
          ) : (
            <Badge variant="destructive">Off Duty Today</Badge>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        {isError ? (
          <div className="text-destructive">Error</div>
        ) : isLoading ? (
          <Skeleton className="h-60" />
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 grid-cols-2">
              <Item className="bg-sky-500/5 w-full flex items-center justify-between">
                <div className="space-y-px">
                  <span className="text-xs">Parcels Assigned</span>
                  <Heading as="h6">
                    {performance?.parcelsAssigned.value}
                  </Heading>
                </div>
              </Item>
              <Item className="bg-green-500/5 w-full flex items-center justify-between">
                <div className="space-y-px">
                  <span className="text-xs">Completed</span>
                  <Heading as="h6">{performance?.completed.value}</Heading>
                </div>
              </Item>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Today&lsquo;s Target</span>
                  <span className="text-xs">100%</span>
                </div>
                <Progress
                  value={performance?.todayTarget.value}
                  className="**:data-[slot=progress-indicator]:bg-green-500 bg-green-500/5"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Efficiency Score</span>
                  <span className="text-xs">100%</span>
                </div>
                <Progress
                  value={performance?.efficiencyScore.value}
                  className="**:data-[slot=progress-indicator]:bg-blue-500 bg-blue-500/5"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs">On-Time Delivery</span>
                  <span className="text-xs">100%</span>
                </div>
                <Progress
                  value={performance?.onTimeDelivery.value}
                  className="**:data-[slot=progress-indicator]:bg-violet-500 bg-violet-500/5"
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {isError ? (
          <div className="text-destructive">Error</div>
        ) : isLoading ? (
          <Skeleton className="h-20" />
        ) : (
          <Item className="bg-sky-500/5 w-full flex items-center justify-between">
            <div className="space-y-px">
              <span>Current Earnings</span>
              <Heading as="h6">
                {performance?.currentEarnings.value} BDT
              </Heading>
            </div>
            <div className="space-y-px text-right">
              <span className="text-xs">Today&lsquo;s Commission</span>
              <Heading as="h6">
                {performance?.todayCommission.value} BDT
              </Heading>
            </div>
          </Item>
        )}
      </CardFooter>
    </Card>
  );
};

export default TodaysPerformance;
