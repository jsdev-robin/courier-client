'use client';

import { useFindOneAndUpdateStatusParcelMutation } from '@/libs/features/services/parcel/parcelApi';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';
import { ToggleGroup, ToggleGroupItem } from '@repo/ui/components/toggle-group';
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from '@repo/ui/utils/contants';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Box, CircleCheck, QrCode, TriangleAlert, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const OverviewQRCodeScanner = () => {
  const [scan, setScan] = useState('');
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(false);
  const [findOneAndUpdateStatusBytrackingNumberParcel, { isLoading }] =
    useFindOneAndUpdateStatusParcelMutation();

  useEffect(() => {
    if (scan && status) {
      toast.promise(
        findOneAndUpdateStatusBytrackingNumberParcel({
          trackingNumber: scan,
          status: status,
        }).unwrap(),
        {
          loading: 'Updating parcel status...',
          success: (res) => {
            setScan('');
            setStatus('');
            setOpen(false);
            return res.message || DEFAULT_SUCCESS_MESSAGE;
          },
          error: (err) => {
            setScan('');
            setStatus('');
            setOpen(false);
            return err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE;
          },
        },
      );
    }
  }, [scan, status, findOneAndUpdateStatusBytrackingNumberParcel]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recover Status</CardTitle>
        <CardAction>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setScan('')}
                variant="outline"
                size="sm"
                disabled={!status.length}
              >
                <QrCode />
                Scan QR
              </Button>
            </DialogTrigger>
            <DialogContent className="size-60! aspect-square">
              <DialogHeader>
                <DialogTitle>Parcel QR Scanner</DialogTitle>
              </DialogHeader>
              {!scan && (
                <Scanner
                  onScan={(results) => {
                    if (results.length > 0) setScan(results[0].rawValue);
                  }}
                />
              )}
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>

      <CardContent>
        <ToggleGroup
          type="single"
          variant="outline"
          spacing={2}
          size="sm"
          className="flex-col w-full"
          value={status}
          onValueChange={setStatus}
        >
          <ToggleGroupItem
            value="Picked Up"
            aria-label="Toggle Picked Up"
            className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:text-sky-500 data-[state=on]:*:[svg]:stroke-sky-500 w-full"
            size="lg"
          >
            <Box />
            Picked Up
          </ToggleGroupItem>
          <ToggleGroupItem
            value="In Transit"
            aria-label="Toggle Transit"
            className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:text-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500 w-full"
            size="lg"
          >
            <Truck />
            In Transit
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Delivered"
            aria-label="Toggle Delivered"
            className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:text-green-500 data-[state=on]:*:[svg]:stroke-green-500 w-full"
            size="lg"
          >
            <CircleCheck />
            Delivered
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Failed"
            aria-label="Toggle Failed"
            className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:text-red-500 data-[state=on]:*:[svg]:stroke-red-500 w-full"
            size="lg"
          >
            <TriangleAlert />
            Failed
          </ToggleGroupItem>
        </ToggleGroup>
      </CardContent>
    </Card>
  );
};

export default OverviewQRCodeScanner;
