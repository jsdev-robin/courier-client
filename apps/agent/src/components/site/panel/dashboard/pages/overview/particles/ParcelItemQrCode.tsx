'use client';

import { useFindOneAndUpdateStatusBytrackingNumberParcelMutation } from '@/libs/features/services/parcel/parcelApi';
import { Button } from '@repo/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from '@repo/ui/utils/contants';
import { Scanner } from '@yudiel/react-qr-scanner';
import { QrCode } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const ParcelItemQrCode = ({
  trackingNumber,
  status,
}: {
  trackingNumber: string;
  status: string;
}) => {
  const [scan, setScan] = useState('');
  const [open, setOpen] = useState(false);
  const [findOneAndUpdateStatusBytrackingNumberParcel] =
    useFindOneAndUpdateStatusBytrackingNumberParcelMutation();

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
            setOpen(false);
            return res.message || DEFAULT_SUCCESS_MESSAGE;
          },
          error: (err) => {
            setScan('');
            setOpen(false);
            return err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE;
          },
        },
      );
    }
  }, [scan, status, findOneAndUpdateStatusBytrackingNumberParcel]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setScan('')}
          variant="ghost"
          size="icon"
          disabled={!status.length}
        >
          <QrCode />
        </Button>
      </DialogTrigger>
      <DialogContent className="size-60! aspect-square">
        <DialogHeader>
          <DialogTitle>Parcel QR Scanner</DialogTitle>
        </DialogHeader>
        {!scan && (
          <Scanner
            onScan={(results) => {
              if (results.length > 0) {
                const scannedValue = results[0].rawValue;

                if (scannedValue !== trackingNumber) {
                  toast.error('Scanned tracking number does not match!');
                  return;
                }

                setScan(scannedValue);
              }
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ParcelItemQrCode;
