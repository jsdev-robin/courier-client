'use client';

import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { buildQueryParams } from './buildQueryParams';
import { getSortString } from './getSortString';

export const useDataGridQuery = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const queryParams = useMemo(
    () => buildQueryParams(columnFilters),
    [columnFilters],
  );

  const sort = useMemo(() => getSortString(sorting), [sorting]);

  const queryArgs = useMemo(
    () => ({
      pagination,
      queryParams,
      sort,
      globalFilter,
    }),
    [pagination, queryParams, sort, globalFilter],
  );

  const tableProps = {
    pagination,
    setPagination,
    globalFilter,
    setGlobalFilter,
    columnFilters,
    setColumnFilters,
    sorting,
    setSorting,
  };

  return {
    queryArgs,
    tableProps,
  };
};
