'use client';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import { useFindProfitLossMonthlyMetricsQuery } from '@/libs/features/services/metrics/metricsApi';
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
  profit: {
    label: 'profit',
    color: 'var(--chart-1)',
  },
  lose: {
    label: 'lose',
    color: 'var(--destructive)',
  },
} satisfies ChartConfig;

const ProfitLossMonthlyMetrics = () => {
  const { data, isError, isLoading } = useFindProfitLossMonthlyMetricsQuery();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit & Loss Trends - Monthly</CardTitle>
        <CardDescription>
          Track your business profit and loss for each month
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isError ? (
          <div className="text-destructive">Error</div>
        ) : isLoading ? (
          <Skeleton className="h-80" />
        ) : (
          <ChartContainer config={chartConfig} className="h-80 w-full">
            <LineChart
              accessibilityLayer
              data={data?.data.metrics}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="profit"
                type="monotone"
                stroke="var(--color-profit)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="lose"
                type="monotone"
                stroke="var(--color-lose)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfitLossMonthlyMetrics;
