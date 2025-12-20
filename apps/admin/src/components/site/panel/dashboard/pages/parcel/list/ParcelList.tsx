'use client';

import { useFindParcelsQuery } from '@/libs/features/services/parcel/parcelApi';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/ui/components/breadcrumb';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Table, useDataGridQuery } from '@repo/ui/data-grid/index';
import { useFileDownload } from '@repo/ui/hooks/useFileDownload';
import Link from 'next/link';
import useParcelColumns from './particles/useParcelColumns';

const ParcelList = () => {
  const { queryArgs, tableProps } = useDataGridQuery();
  const columns = useParcelColumns();
  const { downloadFile } = useFileDownload();

  const { data, isError, isLoading } = useFindParcelsQuery(queryArgs);

  const handleExportExcel = () => {
    downloadFile({
      url: `http://localhost:8001/api/v1/parcel/admin/csv`,
      fileName: 'parcels.xlsx',
      fileType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      refreshTokenUrl: 'http://localhost:8001/api/v1/auth/admin/refresh-token',
    });
  };

  return (
    <section>
      <div className="wrapper">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/account/dashboard/overview">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Brands</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Parcel Management</CardTitle>
              <CardDescription>
                View and manage all product Parcel.
              </CardDescription>
              <CardAction>
                <Button variant="outline" onClick={() => handleExportExcel()}>
                  Export
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <Table
                {...tableProps}
                data={data?.data}
                columns={columns}
                isError={isError}
                isLoading={isLoading}
                pin={{ right: ['actions'] }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ParcelList;
