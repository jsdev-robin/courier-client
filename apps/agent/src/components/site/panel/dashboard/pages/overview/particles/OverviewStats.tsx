'use client';

import { Card, CardContent } from '@repo/ui/components/card';
import { ChartContainer } from '@repo/ui/components/chart';
import { Area, AreaChart, XAxis } from 'recharts';

const data = [
  {
    date: 'Nov 24, 2023',
    'Total Revenue': 9421.32,
    'Total Orders': 468,
    'Conversion Rate': 2.76,
    'Avg. Order Value': 79.42,
  },
  {
    date: 'Nov 25, 2023',
    'Total Revenue': 11052.84,
    'Total Orders': 542,
    'Conversion Rate': 3.01,
    'Avg. Order Value': 84.12,
  },
  {
    date: 'Nov 26, 2023',
    'Total Revenue': 12593.17,
    'Total Orders': 589,
    'Conversion Rate': 3.22,
    'Avg. Order Value': 88.73,
  },
  {
    date: 'Nov 27, 2023',
    'Total Revenue': 10347.65,
    'Total Orders': 511,
    'Conversion Rate': 2.84,
    'Avg. Order Value': 80.74,
  },
  {
    date: 'Nov 28, 2023',
    'Total Revenue': 11896.34,
    'Total Orders': 553,
    'Conversion Rate': 3.15,
    'Avg. Order Value': 85.47,
  },
  {
    date: 'Nov 29, 2023',
    'Total Revenue': 13122.58,
    'Total Orders': 606,
    'Conversion Rate': 3.41,
    'Avg. Order Value': 86.72,
  },
  {
    date: 'Nov 30, 2023',
    'Total Revenue': 12637.91,
    'Total Orders': 573,
    'Conversion Rate': 3.09,
    'Avg. Order Value': 87.56,
  },
  {
    date: 'Dec 01, 2023',
    'Total Revenue': 14259.28,
    'Total Orders': 641,
    'Conversion Rate': 3.48,
    'Avg. Order Value': 88.73,
  },
  {
    date: 'Dec 02, 2023',
    'Total Revenue': 13478.64,
    'Total Orders': 612,
    'Conversion Rate': 3.32,
    'Avg. Order Value': 87.31,
  },
  {
    date: 'Dec 03, 2023',
    'Total Revenue': 15724.83,
    'Total Orders': 699,
    'Conversion Rate': 3.56,
    'Avg. Order Value': 89.48,
  },
  {
    date: 'Dec 04, 2023',
    'Total Revenue': 14982.42,
    'Total Orders': 667,
    'Conversion Rate': 3.42,
    'Avg. Order Value': 88.63,
  },
  {
    date: 'Dec 05, 2023',
    'Total Revenue': 16274.38,
    'Total Orders': 712,
    'Conversion Rate': 3.64,
    'Avg. Order Value': 90.18,
  },
  {
    date: 'Dec 06, 2023',
    'Total Revenue': 15892.47,
    'Total Orders': 689,
    'Conversion Rate': 3.51,
    'Avg. Order Value': 89.72,
  },
  {
    date: 'Dec 07, 2023',
    'Total Revenue': 17435.62,
    'Total Orders': 745,
    'Conversion Rate': 3.72,
    'Avg. Order Value': 91.25,
  },
  {
    date: 'Dec 08, 2023',
    'Total Revenue': 16978.93,
    'Total Orders': 728,
    'Conversion Rate': 3.69,
    'Avg. Order Value': 90.81,
  },
];

const OverviewStats = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Card className="p-0">
        <CardContent className="p-4 pb-0">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Total Revenue
              </p>
              <div className="flex items-baseline justify-between">
                <p className="text-lg font-semibold text-green-500">$212.89</p>
                <p className="flex items-center space-x-1 text-sm">
                  <span className="font-medium text-foreground">+15.86</span>
                  <span className="text-green-500">(+10.4%)</span>
                </p>
              </div>
            </div>
            <div className="h-16 overflow-hidden">
              <ChartContainer
                className="w-full h-full"
                config={{
                  'Total Revenue': {
                    label: 'Total Revenue',
                    color: 'hsl(142.1 76.2% 36.3%)',
                  },
                }}
              >
                <AreaChart data={data}>
                  <defs>
                    <linearGradient
                      id="gradient-total-revenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(142.1 76.2% 36.3%)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(142.1 76.2% 36.3%)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" hide={true} />
                  <Area
                    dataKey="Total Revenue"
                    stroke="hsl(142.1 76.2% 36.3%)"
                    fill="url(#gradient-total-revenue)"
                    fillOpacity={0.4}
                    strokeWidth={1.5}
                    type="monotone"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="p-0">
        <CardContent className="p-4 pb-0">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Total Orders
              </p>
              <div className="flex items-baseline justify-between">
                <p className="text-lg font-semibold text-green-500">1,847</p>
                <p className="flex items-center space-x-1 text-sm">
                  <span className="font-medium text-foreground">+4.65</span>
                  <span className="text-green-500">(+6.3%)</span>
                </p>
              </div>
            </div>
            <div className="h-16 overflow-hidden">
              <ChartContainer
                className="w-full h-full"
                config={{
                  'Total Orders': {
                    label: 'Total Orders',
                    color: 'hsl(142.1 76.2% 36.3%)',
                  },
                }}
              >
                <AreaChart data={data}>
                  <defs>
                    <linearGradient
                      id="gradient-total-orders"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(142.1 76.2% 36.3%)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(142.1 76.2% 36.3%)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" hide={true} />
                  <Area
                    dataKey="Total Orders"
                    stroke="hsl(142.1 76.2% 36.3%)"
                    fill="url(#gradient-total-orders)"
                    fillOpacity={0.4}
                    strokeWidth={1.5}
                    type="monotone"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="p-0">
        <CardContent className="p-4 pb-0">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Conversion Rate
              </p>
              <div className="flex items-baseline justify-between">
                <p className="text-lg font-semibold text-red-500">3.94%</p>
                <p className="flex items-center space-x-1 text-sm">
                  <span className="font-medium text-foreground">-5.74</span>
                  <span className="text-red-500">(-7.1%)</span>
                </p>
              </div>
            </div>
            <div className="h-16 overflow-hidden">
              <ChartContainer
                className="w-full h-full"
                config={{
                  'Conversion Rate': {
                    label: 'Conversion Rate',
                    color: 'hsl(0 72.2% 50.6%)',
                  },
                }}
              >
                <AreaChart data={data}>
                  <defs>
                    <linearGradient
                      id="gradient-conversion-rate"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(0 72.2% 50.6%)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(0 72.2% 50.6%)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" hide={true} />
                  <Area
                    dataKey="Conversion Rate"
                    stroke="hsl(0 72.2% 50.6%)"
                    fill="url(#gradient-conversion-rate)"
                    fillOpacity={0.4}
                    strokeWidth={1.5}
                    type="monotone"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="p-0">
        <CardContent className="p-4 pb-0">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Avg. Order Value
              </p>
              <div className="flex items-baseline justify-between">
                <p className="text-lg font-semibold text-green-500">$123.57</p>
                <p className="flex items-center space-x-1 text-sm">
                  <span className="font-medium text-foreground">+4.65</span>
                  <span className="text-green-500">(5.3%)</span>
                </p>
              </div>
            </div>
            <div className="h-16 overflow-hidden">
              <ChartContainer
                className="w-full h-full"
                config={{
                  'Avg. Order Value': {
                    label: 'Avg. Order Value',
                    color: 'hsl(142.1 76.2% 36.3%)',
                  },
                }}
              >
                <AreaChart data={data}>
                  <defs>
                    <linearGradient
                      id="gradient-avg-order-value"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(142.1 76.2% 36.3%)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(142.1 76.2% 36.3%)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" hide={true} />
                  <Area
                    dataKey="Avg. Order Value"
                    stroke="hsl(142.1 76.2% 36.3%)"
                    fill="url(#gradient-avg-order-value)"
                    fillOpacity={0.4}
                    strokeWidth={1.5}
                    type="monotone"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewStats;
