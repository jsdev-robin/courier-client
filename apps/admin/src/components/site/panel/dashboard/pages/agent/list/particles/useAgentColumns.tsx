'use client';

import { Agent } from '@/libs/features/services/agent/types';
import { buttonVariants } from '@repo/ui/components/button';
import { IndeterminateCheckbox, RowPin } from '@repo/ui/data-grid/index';
import { cn } from '@repo/ui/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

const useAgentColumns = (): ColumnDef<Agent>[] => {
  return useMemo<ColumnDef<Agent>[]>(
    () => [
      {
        accessorFn: (_row, index) => index + 1,
        cell: ({ row }) => row.index + 1,
        id: 'rowNumber',
        header: '',
        size: 54,
        maxSize: 54,
        enableColumnFilter: false,
      },
      {
        id: 'pin',
        header: 'Pin',
        cell: ({ row }) => <RowPin row={row} />,
        size: 60,
        maxSize: 60,
      },
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
            aria-label="Select row"
          />
        ),
        size: 40,
        maxSize: 40,
        enableColumnFilter: false,
      },
      {
        id: 'actions',
        header: () => (
          <div className="w-9">
            <span className="[writing-mode:vertical-rl]">View</span>
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Link
              href={`/account/dashboard/parcel/details/${row.original._id}`}
              className={cn(
                buttonVariants({ size: 'icon-sm', variant: 'outline' }),
                'size-5 rounded',
              )}
            >
              <Eye />
            </Link>
          </div>
        ),
        size: 40,
        maxSize: 40,
        enableColumnFilter: false,
      },
      {
        id: 'personal',
        header: 'Personal Info',
        columns: [
          {
            id: 'personalInfo.givenName',
            accessorKey: 'personalInfo.givenName',
            header: 'Given Name',
          },
          {
            id: 'personalInfo.familyName',
            accessorKey: 'personalInfo.familyName',
            header: 'Family Name',
          },
          {
            id: 'personalInfo.email',
            accessorKey: 'personalInfo.email',
            header: 'Email',
          },
          {
            id: 'personalInfo.phone',
            accessorKey: 'personalInfo.phone',
            header: 'Phone',
          },
        ],
      },
      {
        id: 'address',
        header: 'Address',
        columns: [
          {
            id: 'personalInfo.address.street',
            accessorKey: 'personalInfo.address.street',
            header: 'Street',
          },
          {
            id: 'personalInfo.address.city',
            accessorKey: 'personalInfo.address.city',
            header: 'City',
          },
          {
            id: 'personalInfo.address.state',
            accessorKey: 'personalInfo.address.state',
            header: 'State',
          },
          {
            id: 'personalInfo.address.postalCode',
            accessorKey: 'personalInfo.address.postalCode',
            header: 'Postal Code',
          },
          {
            id: 'personalInfo.address.coordinates.0',
            accessorKey: 'personalInfo.address.coordinates.0',
            header: 'Lat',
          },
          {
            id: 'personalInfo.address.coordinates.1',
            accessorKey: 'personalInfo.address.coordinates.1',
            header: 'Lng',
          },
        ],
      },
      {
        id: 'location',
        header: 'Live Location',
        columns: [
          { id: 'location.type', accessorKey: 'location.type', header: 'Type' },
          {
            id: 'location.coordinates.0',
            accessorKey: 'location.coordinates.0',
            header: 'Lng',
          },
          {
            id: 'location.coordinates.1',
            accessorKey: 'location.coordinates.1',
            header: 'Lat',
          },
        ],
      },
    ],
    [],
  );
};

export default useAgentColumns;
