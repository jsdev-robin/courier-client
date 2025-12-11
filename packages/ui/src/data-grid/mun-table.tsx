'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Spinner } from '../components/spinner';
import ColumnDnd from './contexts/data-grid-column-dnd';
import { DataGridProvider } from './contexts/data-grid-contexts';
import { useBreakpoint } from './hooks/use-breakpoint';
import MunTableMain from './mun-table/mun-table-main';
import Pagination from './pagination';
import Toolbar from './toolbar';
import { GridProps } from './types/grid-types';
// import {
//   Fingerprint,
//   FolderUp,
//   Import,
//   Printer,
//   Sheet,
//   Table,
//   Upload,
// } from 'lucide-react';
// import { Button } from '../components/button';
// import FilterByBarcode from './features/barcode-scan';

const MunTableSplitLeft = dynamic(
  () => import('./mun-table/mun-table-split-left'),
  {
    ssr: false,
  },
);
const MunTableSplitRight = dynamic(
  () => import('./mun-table/mun-table-split-right'),
  { ssr: false },
);

const MunTable = <T,>({
  data,
  columns,
  isError,
  isLoading,
  isFetching,
  toolbar = {
    active: true,
    open: null,
  },
  isSplit,
  pin,
  pagination,
  setPagination,
  columnFilters,
  setColumnFilters,
  sorting,
  setSorting,
  globalFilter,
  setGlobalFilter,
  subRows = false,
  renderSubComponent,
}: GridProps<T>) => {
  const sm = !useBreakpoint('sm');
  return (
    <DataGridProvider
      data={data}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
      isSplit={isSplit}
      pin={pin}
      pagination={pagination}
      setPagination={setPagination}
      columnFilters={columnFilters}
      setColumnFilters={setColumnFilters}
      sorting={sorting}
      setSorting={setSorting}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      subRows={subRows}
      renderSubComponent={renderSubComponent}
    >
      <ColumnDnd>
        <div className="space-y-3 relative">
          <div className="flex bg-muted rounded-md overflow-hidden border border-border">
            {isFetching && (
              <div className="absolute top-8 left-5">
                <Spinner />
              </div>
            )}
            <Suspense>
              <MunTableSplitLeft />
            </Suspense>
            <div className="overflow-hidden flex-1">
              <MunTableMain />
            </div>
            <Suspense>
              <MunTableSplitRight />
            </Suspense>
            {toolbar.active && sm && <Toolbar open={toolbar.open} />}
          </div>
          <Pagination pagination={[20, 30, 40, 50, 60, 70, 80, 90, 100]} />
        </div>
      </ColumnDnd>
    </DataGridProvider>
  );
};

export default MunTable;
