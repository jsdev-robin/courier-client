'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { useFindStatusMonthlyMetricsQuery } from '@/libs/features/services/metrics/metricsApi';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@repo/ui/components/chart';
import { Skeleton } from '@repo/ui/components/skeleton';

const chartConfig = {
  Booked: {
    label: 'Booked',
    color: 'var(--chart-2)',
  },
  Assigned: {
    label: 'Assigned',
    color: 'var(--chart-2)',
  },
  PickedUp: {
    label: 'PickedUp',
    color: 'var(--chart-3)',
  },
  InTransit: {
    label: 'InTransit',
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
  label: {
    color: 'var(--background)',
  },
} satisfies ChartConfig;

const StatusMonthlyMetrics = () => {
  const { data, isError, isLoading } = useFindStatusMonthlyMetricsQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Overview - Monthly Metrics</CardTitle>
        <CardDescription>
          Visual representation of courier status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isError ? (
          <div className="text-destructive">Error</div>
        ) : isLoading ? (
          <Skeleton className="h-80" />
        ) : (
          <ChartContainer config={chartConfig} className="h-80 w-full">
            <BarChart accessibilityLayer data={data?.data.metrics}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="Booked"
                fill="var(--color-Booked)"
                radius={4}
                barSize={20}
              />
              <Bar
                dataKey="Assigned"
                fill="var(--color-Assigned)"
                radius={4}
                barSize={20}
              />
              <Bar
                dataKey="PickedUp"
                fill="var(--color-PickedUp)"
                radius={4}
                barSize={20}
              />
              <Bar
                dataKey="InTransit"
                fill="var(--color-InTransit)"
                radius={4}
                barSize={20}
              />
              <Bar
                dataKey="Delivered"
                fill="var(--color-Delivered)"
                radius={4}
                barSize={20}
              />
              <Bar
                dataKey="Failed"
                fill="var(--color-Failed)"
                radius={4}
                barSize={20}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusMonthlyMetrics;
