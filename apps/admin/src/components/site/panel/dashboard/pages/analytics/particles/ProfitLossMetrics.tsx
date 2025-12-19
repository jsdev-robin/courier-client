'use client';

import { useFindProfitLossMetricsQuery } from '@/libs/features/services/metrics/metricsApi';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/ui/components/breadcrumb';
import { Button } from '@repo/ui/components/button';
import { Calendar } from '@repo/ui/components/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { ChartConfig, ChartContainer } from '@repo/ui/components/chart';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/popover';
import { Skeleton } from '@repo/ui/components/skeleton';
import { format, startOfMonth } from 'date-fns';
import Link from 'next/link';
import { useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { Area, AreaChart } from 'recharts';

const chartConfig = {
  totalParcels: {
    label: 'totalParcels',
    color: 'var(--chart-2)',
  },
  profitTimeline: {
    label: 'profitTimeline',
    color: 'var(--chart-2)',
  },
  loseTimeline: {
    label: 'loseTimeline',
    color: 'var(--destructive)',
  },
  successRateTimeline: {
    label: 'successRateTimeline',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const ProfitLossMetrics = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  const { data, isError, isLoading } = useFindProfitLossMetricsQuery(
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/account/dashboard/overview">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Metrics</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
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
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {isError ? (
          <div className="text-destructive">Error </div>
        ) : isLoading ? (
          [...Array(4)].map((_, index) => (
            <Skeleton key={index} className="aspect-square w-full" />
          ))
        ) : (
          <>
            <Card className="pb-0">
              <CardHeader>
                <CardDescription>Total Parcels</CardDescription>
                <CardTitle className="text-3xl">
                  {data?.data.metrics.summary.totalParcels}
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-auto max-h-31 flex-1 p-0">
                <ChartContainer config={chartConfig} className="size-full">
                  <AreaChart
                    data={data?.data.metrics.totalParcelsTimeline}
                    margin={{ left: 0, right: 0 }}
                  >
                    <Area
                      dataKey="totalParcels"
                      fill="var(--color-totalParcels)"
                      fillOpacity={0.05}
                      stroke="var(--color-totalParcels)"
                      strokeWidth={2}
                      type="monotone"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="pb-0">
              <CardHeader>
                <CardDescription>Total Profit</CardDescription>
                <CardTitle className="text-3xl">
                  {data?.data.metrics.summary.profit} BDT
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-auto max-h-31 flex-1 p-0">
                <ChartContainer config={chartConfig} className="size-full">
                  <AreaChart
                    data={data?.data.metrics.profitTimeline}
                    margin={{ left: 0, right: 0 }}
                  >
                    <Area
                      dataKey="profit"
                      fill="var(--color-profitTimeline)"
                      fillOpacity={0.05}
                      stroke="var(--color-profitTimeline)"
                      strokeWidth={2}
                      type="monotone"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="pb-0">
              <CardHeader>
                <CardDescription>Total Lose</CardDescription>
                <CardTitle className="text-3xl">
                  {data?.data.metrics.summary.lose} BDT
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-auto max-h-31 flex-1 p-0">
                <ChartContainer config={chartConfig} className="size-full">
                  <AreaChart
                    data={data?.data.metrics.loseTimeline}
                    margin={{ left: 0, right: 0 }}
                  >
                    <Area
                      dataKey="lose"
                      fill="var(--color-loseTimeline)"
                      fillOpacity={0.05}
                      stroke="var(--color-loseTimeline)"
                      strokeWidth={2}
                      type="monotone"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="pb-0">
              <CardHeader>
                <CardDescription>Success Rate</CardDescription>
                <CardTitle className="text-3xl">
                  {data?.data.metrics.summary.successRate} %
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-auto max-h-31 flex-1 p-0">
                <ChartContainer config={chartConfig} className="size-full">
                  <AreaChart
                    data={data?.data.metrics.successRateTimeline}
                    margin={{ left: 0, right: 0 }}
                  >
                    <Area
                      dataKey="successRate"
                      fill="var(--color-successRateTimeline)"
                      fillOpacity={0.05}
                      stroke="var(--color-successRateTimeline)"
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

export default ProfitLossMetrics;
