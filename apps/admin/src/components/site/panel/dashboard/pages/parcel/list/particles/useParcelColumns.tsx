'use client';

import { Parcel } from '@/libs/features/services/parcel/types';
import { paymentClass, PaymentType } from '@/utils/paymentClass';
import { PaymentStatus, paymentStatusClass } from '@/utils/paymentStatusClass';
import { ParcelStatus, statusClass } from '@/utils/statusClass';
import { Badge } from '@repo/ui/components/badge';
import { buttonVariants } from '@repo/ui/components/button';
import { IndeterminateCheckbox, RowPin } from '@repo/ui/data-grid/index';
import { cn } from '@repo/ui/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import ExportInvoice from './ExportInvoice';

const useParcelColumns = (): ColumnDef<Parcel>[] => {
  return useMemo<ColumnDef<Parcel>[]>(() => {
    return [
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
        id: 'actions',
        header: () => (
          <div className="flex items-center justify-between w-11">
            <span className="[writing-mode:vertical-rl]">View</span>
            <span className="[writing-mode:vertical-rl]">Invoice</span>
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

            <ExportInvoice id={row.original._id} />
          </div>
        ),
        size: 64,
        maxSize: 64,
        enableColumnFilter: false,
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
        accessorKey: 'status',
        id: 'status',
        cell: ({ row, getValue }) => (
          <Badge className={statusClass[row.original.status as ParcelStatus]}>
            {row.original.status}
          </Badge>
        ),
        header: () => <span>Status</span>,
        size: 164,
        maxSize: 164,
        enableHiding: false,
        meta: { filterVariant: 'select' },
      },
      {
        accessorKey: 'trackingNumber',
        id: 'trackingNumber',
        header: 'Tracking Number',
        cell: ({ row }) => (
          <span className="uppercase">{row.original.trackingNumber}</span>
        ),
        enableHiding: true,
        meta: { filterVariant: 'text' },
      },
      {
        header: 'payment',
        columns: [
          {
            accessorKey: 'payment.method',
            id: 'payment.method',
            cell: ({ row }) => (
              <Badge
                className={
                  paymentClass[row.original.payment.method as PaymentType]
                }
              >
                {row.original.payment.method}
              </Badge>
            ),
            header: 'Method',
            enableHiding: true,
            meta: { filterVariant: 'select' },
          },
          {
            accessorKey: 'payment.amount',
            id: 'payment.amount',
            header: 'Amount',
            enableHiding: true,
            meta: { filterVariant: 'text' },
          },
          {
            accessorKey: 'payment.codAmount',
            id: 'payment.codAmount',
            header: 'COD Amount',
            enableHiding: true,
            meta: { filterVariant: 'text' },
          },
          {
            accessorKey: 'payment.status',
            id: 'payment.status',
            header: 'Status',
            cell: ({ row }) => (
              <Badge
                className={
                  paymentStatusClass[
                    row.original.payment.status as PaymentStatus
                  ]
                }
              >
                {row.original.payment.status}
              </Badge>
            ),
            enableHiding: true,
            meta: { filterVariant: 'select' },
          },
        ],
      },
      {
        header: 'deliveryAddress',
        columns: [
          {
            accessorKey: 'deliveryAddress.contactName',
            id: 'deliveryAddress.contactName',
            header: 'Contact Name',
            enableHiding: false,
            meta: { filterVariant: 'text' },
          },
          {
            accessorKey: 'deliveryAddress.contactPhone',
            id: 'deliveryAddress.contactPhone',
            header: 'Contact Phone',
            enableHiding: false,
            meta: { filterVariant: 'text' },
          },
          {
            accessorKey: 'deliveryAddress.street',
            id: 'deliveryAddress.street',
            header: 'Street',
            enableHiding: true,
            meta: { filterVariant: 'text' },
          },
          {
            accessorKey: 'deliveryAddress.city',
            id: 'deliveryAddress.city',
            header: 'City',
            enableHiding: true,
            meta: { filterVariant: 'select' },
          },
          {
            accessorKey: 'deliveryAddress.state',
            id: 'deliveryAddress.state',
            header: 'State',
            enableHiding: true,
            meta: { filterVariant: 'select' },
          },
          {
            accessorKey: 'deliveryAddress.postalCode',
            id: 'deliveryAddress.postalCode',
            header: 'Postal Code',
          },
          {
            header: 'deliveryAddress.location',
            columns: [
              {
                accessorKey: 'deliveryAddress.location.type',
                id: 'deliveryAddress.location.type',
                header: 'Type',
              },
              {
                accessorKey: 'deliveryAddress.location.coordinates',
                id: 'deliveryAddress.location.coordinates',
                header: 'Coordinates',
              },
            ],
          },
        ],
      },
      {
        header: 'parcelDetails',
        columns: [
          {
            accessorKey: 'parcelDetails.size',
            id: 'parcelDetails.size',
            header: 'Size',
          },
          {
            accessorKey: 'parcelDetails.weight',
            id: 'parcelDetails.weight',
            header: 'Weight',
          },
          {
            accessorKey: 'parcelDetails.category',
            id: 'parcelDetails.category',
            header: 'Category',
          },
          {
            accessorKey: 'parcelDetails.description',
            id: 'parcelDetails.description',
            header: 'Description',
          },
        ],
      },

      {
        header: 'customer.personalInfo',
        columns: [
          {
            accessorKey: 'customer.personalInfo.familyName',
            id: 'customer.personalInfo.familyName',
            header: 'Family Name',
          },
          {
            accessorKey: 'customer.personalInfo.givenName',
            id: 'customer.personalInfo.givenName',
            header: 'Given Name',
          },
          {
            accessorKey: 'customer.personalInfo.email',
            id: 'customer.personalInfo.email',
            header: 'Email',
          },
          {
            accessorKey: 'customer.personalInfo.phone',
            id: 'customer.personalInfo.phone',
            header: 'Phone',
          },
          {
            accessorKey: 'customer.personalInfo.address.street',
            id: 'customer.personalInfo.address.street',
            header: 'Street',
          },
          {
            accessorKey: 'customer.personalInfo.address.city',
            id: 'customer.personalInfo.address.city',
            header: 'City',
          },
          {
            accessorKey: 'customer.personalInfo.address.state',
            id: 'customer.personalInfo.address.state',
            header: 'State',
          },
          {
            accessorKey: 'customer.personalInfo.address.postalCode',
            id: 'customer.personalInfo.address.postalCode',
            header: 'Postal Code',
          },
          {
            accessorKey: 'customer.personalInfo.address.coordinates',
            id: 'customer.personalInfo.address.coordinates',
            header: 'Coordinates',
          },
        ],
      },
      {
        header: 'assignedAgent.personalInfo',
        columns: [
          {
            accessorKey: 'assignedAgent.personalInfo.familyName',
            id: 'assignedAgent.personalInfo.familyName',
            header: 'Family Name',
          },
          {
            accessorKey: 'assignedAgent.personalInfo.givenName',
            id: 'assignedAgent.personalInfo.givenName',
            header: 'Given Name',
          },
          {
            accessorKey: 'assignedAgent.personalInfo.email',
            id: 'assignedAgent.personalInfo.email',
            header: 'Email',
          },
          {
            accessorKey: 'assignedAgent.personalInfo.address.coordinates',
            id: 'assignedAgent.personalInfo.address.coordinates',
            header: 'Coordinates',
          },
        ],
      },
      { accessorKey: 'createdAt', id: 'createdAt', header: 'Created At' },
      { accessorKey: 'updatedAt', id: 'updatedAt', header: 'Updated At' },
    ];
  }, []);
};

export default useParcelColumns;
