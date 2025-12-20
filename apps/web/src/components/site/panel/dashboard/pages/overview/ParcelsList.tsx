'use client';

import { useFindParcelQuery } from '@/libs/features/services/parcel/parcelApi';
import { paymentClass, PaymentType } from '@/utils/paymentClass';
import { ParcelSize, sizeClass } from '@/utils/sizeClass';
import { ParcelStatus, statusClass } from '@/utils/statusClass';
import { Badge } from '@repo/ui/components/badge';
import { Button, buttonVariants } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import Heading from '@repo/ui/components/heading';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table';
import { cn } from '@repo/ui/lib/utils';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ParcelListSkeleton from './particles/ParcelListSkeleton';

const ParcelsList = () => {
  const [page, setPage] = useState(1);
  const { data, isError, isLoading } = useFindParcelQuery(page, {
    skip: !page,
  });

  const total = data?.data.total;
  const totalPages = total ? Math.ceil(total / 20) : 1;

  return (
    <>
      {isError ? (
        <div>Error</div>
      ) : isLoading ? (
        <ParcelListSkeleton />
      ) : (
        <section>
          <div className="container">
            <div className="space-y-6">
              <Heading as="h4" className="text-center">
                Your Parcel History
              </Heading>
              <Card className="p-0 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tracking number</TableHead>
                      <TableHead>Contact Name</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Payment Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data.parcels.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell>{item.trackingNumber}</TableCell>
                        <TableCell>
                          {item.deliveryAddress.contactName}
                        </TableCell>
                        <TableCell>{item.deliveryAddress.street}</TableCell>
                        <TableCell>
                          {item.deliveryAddress.city},{' '}
                          {item.deliveryAddress.state}
                        </TableCell>
                        <TableCell>
                          {item.deliveryAddress.contactPhone}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              sizeClass[item.parcelDetails.size as ParcelSize]
                            }
                          >
                            {item.parcelDetails.size}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.parcelDetails.weight}</TableCell>
                        <TableCell>{item.parcelDetails.category}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              paymentClass[item.payment.method as PaymentType]
                            }
                          >
                            {item.payment.method}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.payment.amount}</TableCell>
                        <TableCell>
                          <Badge
                            className={statusClass[item.status as ParcelStatus]}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`/account/dashboard/parcel/details/${item._id}`}
                            className={cn(
                              buttonVariants({
                                size: 'sm',
                                variant: 'secondary',
                              }),
                            )}
                          >
                            <Eye />
                            View
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setPage(page - 1)}
                  disabled={page <= 1}
                  size="icon-sm"
                >
                  <ChevronLeft />
                </Button>
                <span>Page {page}</span>
                <Button
                  variant="outline"
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalPages}
                  size="icon-sm"
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ParcelsList;
