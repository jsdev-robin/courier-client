'use client';

import { useFindStatusDistributionMetricsQuery } from '@/libs/features/services/metrics/metricsApi';
import { Button } from '@repo/ui/components/button';
import { Calendar } from '@repo/ui/components/calendar';
import {
  Card,
  CardAction,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/popover';
import { Skeleton } from '@repo/ui/components/skeleton';
import { format, startOfMonth } from 'date-fns';
import { useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { Pie, PieChart } from 'recharts';

const chartConfig = {
  Booked: {
    label: 'Booked',
    color: 'var(--chart-1)',
  },
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

const StatusMetrics = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  const { data, isError, isLoading } = useFindStatusDistributionMetricsQuery(
    dateRange?.from && dateRange?.to
      ? {
          from: dateRange.from.toISOString(),
          to: dateRange.to.toISOString(),
        }
      : undefined,
    {
      skip: !dateRange?.from || !dateRange?.to,
    },
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Parcel Status Overview</CardTitle>
        <CardDescription>
          Visualize the distribution of all parcels from the start of this month
          to today
        </CardDescription>
        <CardAction>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'MMM dd, yyyy')} –{' '}
                      {format(dateRange.to, 'MMM dd, yyyy')}
                    </>
                  ) : (
                    format(dateRange.from, 'MMM dd, yyyy')
                  )
                ) : (
                  'Pick a date range'
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-0">
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
              />
            </PopoverContent>
          </Popover>
        </CardAction>
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

export default StatusMetrics;
