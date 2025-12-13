'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { ChartConfig, ChartContainer } from '@repo/ui/components/chart';
import { Area, AreaChart, Line, LineChart } from 'recharts';

const revenueData = [
  { revenue: 10400, growth: 12 },
  { revenue: 14405, growth: 18 },
  { revenue: 9400, growth: 22 },
  { revenue: 8200, growth: 15 },
  { revenue: 7000, growth: 28 },
  { revenue: 9600, growth: 25 },
  { revenue: 11244, growth: 30 },
  { revenue: 26475, growth: 35 },
];

const customersData = [
  { customers: 40, active: 25 },
  { customers: 90, active: 50 },
  { customers: 200, active: 120 },
  { customers: 278, active: 180 },
  { customers: 89, active: 45 },
  { customers: 239, active: 150 },
  { customers: 78, active: 30 },
  { customers: 89, active: 40 },
];

const ordersData = [
  { orders: 1200, returned: 30 },
  { orders: 1500, returned: 40 },
  { orders: 1100, returned: 20 },
  { orders: 900, returned: 25 },
  { orders: 1300, returned: 35 },
  { orders: 1700, returned: 50 },
  { orders: 1600, returned: 45 },
  { orders: 2000, returned: 55 },
];

const ratingData = [
  { rating: 4.0, feedbacks: 100 },
  { rating: 4.3, feedbacks: 120 },
  { rating: 4.1, feedbacks: 140 },
  { rating: 4.5, feedbacks: 130 },
  { rating: 4.6, feedbacks: 150 },
  { rating: 4.4, feedbacks: 160 },
  { rating: 4.7, feedbacks: 180 },
  { rating: 4.6, feedbacks: 170 },
];

const chartConfig = {
  revenue: { label: 'Revenue', color: 'var(--chart-1)' },
  customers: { label: 'Customers', color: 'var(--chart-2)' },
  orders: { label: 'Orders', color: 'var(--chart-3)' },
  rating: { label: 'Rating', color: 'var(--chart-4)' },
} satisfies ChartConfig;

const OverviewStats = () => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Total Parcels Today</CardDescription>
            <CardTitle className="text-3xl">23.441</CardTitle>
            <CardDescription>
              <span className="text-chart-2">+12.5%</span> from yesterday
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-0">
            <ChartContainer config={chartConfig} className="h-20 w-full">
              <LineChart
                data={revenueData}
                margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
              >
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="pb-0">
          <CardHeader>
            <CardDescription>Active Delivery Agents</CardDescription>
            <CardTitle className="text-3xl">24</CardTitle>
            <CardDescription>
              <span className="text-chart-2">3</span> new agents this week
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto max-h-31 flex-1 p-0">
            <ChartContainer config={chartConfig} className="size-full">
              <AreaChart data={customersData} margin={{ left: 0, right: 0 }}>
                <Area
                  dataKey="customers"
                  fill="var(--color-customers)"
                  fillOpacity={0.05}
                  stroke="var(--color-customers)"
                  strokeWidth={2}
                  type="monotone"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="pb-0">
          <CardHeader>
            <CardDescription>COD Amount Today</CardDescription>
            <CardTitle className="text-3xl">3,456</CardTitle>
            <CardDescription>
              <span className="text-chart-2">+5.7%</span> vs last month
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto max-h-31 flex-1 p-0">
            <ChartContainer config={chartConfig} className="size-full">
              <AreaChart data={ordersData} margin={{ left: 0, right: 0 }}>
                <Area
                  dataKey="orders"
                  fill="var(--color-orders)"
                  fillOpacity={0.05}
                  stroke="var(--color-orders)"
                  strokeWidth={2}
                  type="monotone"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="pb-0">
          <CardHeader>
            <CardDescription>Delivery Success Rate</CardDescription>
            <CardTitle className="text-3xl">97.2%</CardTitle>
            <CardDescription>
              <span className="text-chart-2">+0.2</span> vs last month
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto max-h-31 flex-1 p-0">
            <ChartContainer config={chartConfig} className="size-full">
              <AreaChart data={ratingData} margin={{ left: 0, right: 0 }}>
                <Area
                  dataKey="rating"
                  fill="var(--color-rating)"
                  fillOpacity={0.05}
                  stroke="var(--color-rating)"
                  strokeWidth={2}
                  type="monotone"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewStats;
