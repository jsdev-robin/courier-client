'use client';

import { useFindStatsMetricsParcelQuery } from '@/libs/features/services/analytics/parcelAnalyticsApi';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@repo/ui/components/card';
import Heading from '@repo/ui/components/heading';
import { cn } from '@repo/ui/lib/utils';

const OverviewStats = () => {
  const { data } = useFindStatsMetricsParcelQuery();

  const metrics = data?.data.metrics;

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      <Card className="gap-0">
        <CardHeader>
          <CardDescription>Total Parcels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Heading as="h6" className="text-base" asChild>
              {metrics?.totalParcels.value}
            </Heading>
            <span
              className={cn(
                /^-/.test(String(metrics?.totalParcels.change))
                  ? 'text-destructive'
                  : 'text-green-500',
                'self-end text-xs',
              )}
            >
              {metrics?.totalParcels.change}%
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="gap-0">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Heading as="h6" className="text-base" asChild>
              {metrics?.totalRevenue.value}৳
            </Heading>
            <span
              className={cn(
                /^-/.test(String(metrics?.totalRevenue.change))
                  ? 'text-destructive'
                  : 'text-green-500',
                'self-end text-xs',
              )}
            >
              {metrics?.totalRevenue.change}%
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="gap-0">
        <CardHeader>
          <CardDescription>Total COD</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Heading as="h6" className="text-base" asChild>
              {metrics?.codAmount.value}৳
            </Heading>
            <span
              className={cn(
                /^-/.test(String(metrics?.codAmount.change))
                  ? 'text-destructive'
                  : 'text-green-500',
                'self-end text-xs',
              )}
            >
              {metrics?.codAmount.change}%
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="gap-0">
        <CardHeader>
          <CardDescription>Total Prepaid</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Heading as="h6" className="text-base" asChild>
              {metrics?.prepaidAmount.value}৳
            </Heading>
            <span
              className={cn(
                /^-/.test(String(metrics?.prepaidAmount.change))
                  ? 'text-destructive'
                  : 'text-green-500',
                'self-end text-xs',
              )}
            >
              {metrics?.prepaidAmount.change}%
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="gap-0">
        <CardHeader>
          <CardDescription>Success Rate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Heading as="h6" className="text-base" asChild>
              {metrics?.successRate.value}%
            </Heading>
            <span
              className={cn(
                /^-/.test(String(metrics?.successRate.change))
                  ? 'text-destructive'
                  : 'text-green-500',
                'self-end text-xs',
              )}
            >
              {metrics?.successRate.change}%
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="gap-0">
        <CardHeader>
          <CardDescription>Success Rate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Heading as="h6" className="text-base" asChild>
              {metrics?.agentCommission.value}৳
            </Heading>
            <span
              className={cn(
                /^-/.test(String(metrics?.agentCommission.change))
                  ? 'text-destructive'
                  : 'text-green-500',
                'self-end text-xs',
              )}
            >
              {metrics?.agentCommission.change}%
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewStats;
