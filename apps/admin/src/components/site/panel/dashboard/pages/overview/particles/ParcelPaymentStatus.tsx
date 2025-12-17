// 'use client';

// import { useFindPaymentTypeStatsParcelQuery } from '@/libs/features/services/analytics/parcelAnalyticsApi';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@repo/ui/components/card';
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartLegend,
//   ChartLegendContent,
//   ChartTooltip,
//   ChartTooltipContent,
// } from '@repo/ui/components/chart';
// import { Skeleton } from '@repo/ui/components/skeleton';
// import { Pie, PieChart } from 'recharts';

// const chartConfig = {
//   count: {
//     label: "Today's Parcels",
//   },
//   COD: {
//     label: 'COD',
//     color: 'var(--chart-1)',
//   },
//   Prepaid: {
//     label: 'Prepaid',
//     color: 'var(--chart-2)',
//   },
//   other: {
//     label: 'Other',
//     color: 'var(--chart-3)',
//   },
// } satisfies ChartConfig;

// const ParcelPaymentStatus = () => {
//   const { data, isLoading, isError } = useFindPaymentTypeStatsParcelQuery();

//   if (isLoading) <div>dd</div>;

//   return (
//     <Card className="h-full">
//       <CardHeader>
//         <CardTitle>Parcel Payment Status</CardTitle>
//         <CardDescription>
//           Overview of today's parcel payments by type (COD, Prepaid, Other).
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="h-full lg:pt-10">
//         {isError ? (
//           <div className="text-destructive">Error</div>
//         ) : isLoading ? (
//           <Skeleton className="h-80" />
//         ) : (
//           <ChartContainer
//             config={chartConfig}
//             className="mx-auto aspect-square"
//           >
//             <PieChart>
//               <ChartTooltip content={<ChartTooltipContent hideLabel />} />
//               <Pie
//                 data={data?.data.chartData}
//                 dataKey="count"
//                 label
//                 nameKey="paymentType"
//               />
//               <ChartLegend
//                 content={<ChartLegendContent nameKey="paymentType" />}
//                 className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
//               />
//             </PieChart>
//           </ChartContainer>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ParcelPaymentStatus;

const ParcelPaymentStatus = () => {
  return <div>ParcelPaymentStatus</div>;
};

export default ParcelPaymentStatus;
