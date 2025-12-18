'use client';

import { useFindOneAndUpdateStatusParcelMutation } from '@/libs/features/services/parcel/parcelApi';
import SelectInput from '@repo/ui/components/select-input';
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
} from '@repo/ui/utils/contants';
import { toast } from 'sonner';

const ParcelStatusAction = ({
  options,
  trackingNumber,
}: {
  options: { status: string }[];
  trackingNumber: string;
}) => {
  const [findOneAndUpdateStatusParcel, { isSuccess }] =
    useFindOneAndUpdateStatusParcelMutation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const confirmChange = confirm(
      `Are you sure you want to change the parcel status to "${e.target.value}"?`,
    );

    if (!confirmChange) return;

    toast.promise(
      findOneAndUpdateStatusParcel({
        trackingNumber,
        status: e.target.value,
      }).unwrap(),
      {
        loading: 'Updating parcel status...',
        success: (res) => res.message || DEFAULT_SUCCESS_MESSAGE,
        error: (err) => err?.data?.message || DEFAULT_SERVER_ERROR_MESSAGE,
      },
    );
  };

  return (
    <SelectInput
      value=""
      onChange={handleChange}
      placeholder="Next Status"
      options={options.map((item) => ({
        value: item.status,
        label: item.status,
      }))}
    />
  );
};

export default ParcelStatusAction;
