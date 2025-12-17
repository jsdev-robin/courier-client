'use client';

import {
  useFindLast7DaysMetricsParcelQuery,
  useFindStatsMetricsParcelQuery,
} from '@/libs/features/services/analytics/parcelAnalyticsApi';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { ChartConfig, ChartContainer } from '@repo/ui/components/chart';
import { Skeleton } from '@repo/ui/components/skeleton';
import { cn } from '@repo/ui/lib/utils';
import { Area, AreaChart, Line, LineChart } from 'recharts';

const config = {
  value: { label: 'Prepaid', color: 'var(--chart-1)' },
} satisfies ChartConfig;

const OverviewStats = () => {
  const {
    data: data1,
    isLoading: loading1,
    isError: error1,
  } = useFindStatsMetricsParcelQuery();
  const {
    data: data2,
    isLoading: laoding2,
    isError: error2,
  } = useFindLast7DaysMetricsParcelQuery();

  const today = data1?.data.metrics;
  const week = data2?.data.metrics;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {error1 || error2 ? (
          <div className="text-destructive">Error</div>
        ) : loading1 || laoding2 ? (
          [...Array(4)].map((_, index) => (
            <Skeleton key={index} className="aspect-square w-full" />
          ))
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardDescription>Total Parcels This Month</CardDescription>
                <CardTitle className="text-3xl">
                  {today?.totalParcels}
                </CardTitle>
                <CardDescription>
                  <span
                    className={cn(
                      /^-/.test(String(today?.totalParcelsChange))
                        ? 'text-destructive'
                        : 'text-green-500',
                    )}
                  >
                    {today?.totalParcelsChange}%
                  </span>{' '}
                  from last month
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-0">
                <ChartContainer config={config} className="h-20 w-full">
                  <LineChart
                    data={week?.parcels}
                    margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                  >
                    <Line
                      type="monotone"
                      dataKey="parcels"
                      stroke="var(--chart-1)"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="pb-0">
              <CardHeader>
                <CardDescription>Prepaid Amount This Month</CardDescription>
                <CardTitle className="text-3xl">
                  {today?.prepaidAmount} BDT
                </CardTitle>
                <CardDescription>
                  <span
                    className={cn(
                      /^-/.test(String(today?.prepaidAmountChange))
                        ? 'text-destructive'
                        : 'text-green-500',
                    )}
                  >
                    {today?.prepaidAmountChange}%
                  </span>{' '}
                  from last month
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto max-h-31 flex-1 p-0">
                <ChartContainer config={config} className="size-full">
                  <AreaChart
                    data={week?.prepaid}
                    margin={{ left: 0, right: 0 }}
                  >
                    <Area
                      dataKey="amount"
                      fill="var(--chart-2)"
                      fillOpacity={0.05}
                      stroke="var(--chart-2)"
                      strokeWidth={2}
                      type="monotone"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="pb-0">
              <CardHeader>
                <CardDescription>COD Amount This Month</CardDescription>
                <CardTitle className="text-3xl">
                  {today?.codAmount} BDT
                </CardTitle>
                <CardDescription>
                  <span
                    className={cn(
                      /^-/.test(String(today?.codAmountChange))
                        ? 'text-destructive'
                        : 'text-green-500',
                    )}
                  >
                    {today?.codAmountChange}%
                  </span>{' '}
                  from last month
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto max-h-31 flex-1 p-0">
                <ChartContainer config={config} className="size-full">
                  <AreaChart data={week?.cod} margin={{ left: 0, right: 0 }}>
                    <Area
                      dataKey="amount"
                      fill="var(--chart-2)"
                      fillOpacity={0.05}
                      stroke="var(--chart-2)"
                      strokeWidth={2}
                      type="monotone"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="pb-0">
              <CardHeader>
                <CardDescription>
                  Delivery Success Rate This Month
                </CardDescription>
                <CardTitle className="text-3xl">
                  {today?.successRate}%
                </CardTitle>
                <CardDescription>
                  <span
                    className={cn(
                      /^-/.test(String(today?.successRateChange))
                        ? 'text-destructive'
                        : 'text-green-500',
                    )}
                  >
                    {today?.successRateChange}%
                  </span>{' '}
                  from last month
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto max-h-31 flex-1 p-0">
                <ChartContainer config={config} className="size-full">
                  <AreaChart
                    data={week?.successRate}
                    margin={{ left: 0, right: 0 }}
                  >
                    <Area
                      dataKey="successRate"
                      fill="var(--chart-2)"
                      fillOpacity={0.05}
                      stroke="var(--chart-2)"
                      strokeWidth={2}
                      type="monotone"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default OverviewStats;
