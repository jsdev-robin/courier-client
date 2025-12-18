'use client';

import { useFindOneAndUpdateStatusParcelMutation } from '@/libs/features/services/parcel/parcelApi';
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

const QrCodeScannerAction = ({
  trackingNumber,
  status,
}: {
  trackingNumber: string;
  status: string;
}) => {
  const [scan, setScan] = useState('');
  const [open, setOpen] = useState(false);
  const [findOneAndUpdateStatusParcel] =
    useFindOneAndUpdateStatusParcelMutation();

  useEffect(() => {
    if (scan && status) {
      toast.promise(
        findOneAndUpdateStatusParcel({
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
  }, [scan, status, findOneAndUpdateStatusParcel]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setScan('')}
          variant="outline"
          size="icon-sm"
          disabled={!status.length}
        >
          <QrCode />
        </Button>
      </DialogTrigger>
      <DialogContent className="size-60! aspect-square">
        <DialogHeader>
          <DialogTitle className="text-sm">Parcel QR Scanner</DialogTitle>
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

export default QrCodeScannerAction;
