'use client';

import { useFindTodayStatusDistributionMetricsParcelQuery } from '@/libs/features/services/analytics/parcelAnalyticsApi';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@repo/ui/components/chart';
import { Skeleton } from '@repo/ui/components/skeleton';
import { Pie, PieChart } from 'recharts';

const chartConfig = {
  Assigned: {
    label: 'Assigned',
    color: 'var(--chart-2)',
  },
  'Picked Up': {
    label: 'Picked Up',
    color: 'var(--chart-3)',
  },
  'In Transit': {
    label: 'In Transit',
    color: 'var(--chart-4)',
  },
  Delivered: {
    label: 'Delivered',
    color: 'var(--chart-5)',
  },
  Failed: {
    label: 'Failed',
    color: 'var(--destructive)',
  },
} satisfies ChartConfig;

const TodayStatusMetrics = () => {
  const { data, isLoading, isError } =
    useFindTodayStatusDistributionMetricsParcelQuery();

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Today Parcel Status</CardTitle>
        <CardDescription>Live distribution of today’s parcels</CardDescription>
      </CardHeader>
      <CardContent>
        {isError ? (
          <div className="text-destructive">Error</div>
        ) : isLoading ? (
          <Skeleton className="h-75 w-full aspect-square mx-auto" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-75"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="status" />}
              />
              <Pie
                data={data?.data.metrics}
                dataKey="count"
                label
                nameKey="status"
              />

              <ChartLegend
                content={<ChartLegendContent nameKey="status" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default TodayStatusMetrics;
