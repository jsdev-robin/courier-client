'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { useFindPaymentTypeMetricsQuery } from '@/libs/features/services/metrics/metricsApi';
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
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
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

const chartConfig = {
  Prepaid: {
    label: 'Prepaid',
    color: 'var(--chart-1)',
  },
  COD: {
    label: 'COD',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const PaymentMetrics = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  const { data, isError, isLoading } = useFindPaymentTypeMetricsQuery(
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
    <Card>
      <CardHeader>
        <CardTitle>Payment Method Trends</CardTitle>
        <CardDescription>
          Prepaid vs COD parcel distribution over time
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
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {isError ? (
          <div className="text-destructive">Error</div>
        ) : isLoading ? (
          <Skeleton className="h-80" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-62.5 w-full"
          >
            <AreaChart data={data?.data.metrics}>
              <defs>
                <linearGradient id="fillPrepaid" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-Prepaid)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-Prepaid)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillCOD" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-COD)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-COD)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="COD"
                type="natural"
                fill="url(#fillCOD)"
                stroke="var(--color-COD)"
                stackId="a"
              />
              <Area
                dataKey="Prepaid"
                type="natural"
                fill="url(#fillPrepaid)"
                stroke="var(--color-Prepaid)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentMetrics;
