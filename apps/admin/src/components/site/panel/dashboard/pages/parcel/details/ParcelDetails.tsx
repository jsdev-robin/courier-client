'use client';

import { useFindOneParcelQuery } from '@/libs/features/services/parcel/parcelApi';
import { useParams } from 'next/navigation';
import ParcelAddressDetails from './particles/ParcelAddressDetails';
import ParcelAssignedAgent from './particles/ParcelAssignedAgent';
import ParcelCustomerInfo from './particles/ParcelCustomerInfo';
import ParcelInfo from './particles/ParcelInfo';
import ParcelLiveTrackingMap from './particles/ParcelLiveTrackingMap';
import ParcelPaymentInfo from './particles/ParcelPaymentInfo';
import ParcelStatus from './particles/ParcelStatus';
import ParcelTrackingHistory from './particles/ParcelTrackingHistory';

const ParcelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useFindOneParcelQuery(id, {
    skip: !id,
  });

  const parcel = data?.data.parcel;

  return (
    <section>
      <div className="wrapper">
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <ParcelStatus
                trackingNumber={parcel?.trackingNumber}
                status={parcel?.status}
                updatedAt={parcel?.updatedAt}
              />
              <ParcelLiveTrackingMap
                agentId={parcel?.assignedAgent?._id}
                customer={parcel?.customer}
                deliveryAddress={parcel?.deliveryAddress}
              />
              <ParcelAddressDetails
                deliveryAddress={parcel?.deliveryAddress}
                customer={parcel?.customer}
              />
              <ParcelTrackingHistory
                trackingHistory={parcel?.trackingHistory}
              />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <ParcelInfo
                ParcelDetails={parcel?.parcelDetails}
                qrCode={parcel?.qrCode}
                barcode={parcel?.barcode}
              />
              <ParcelPaymentInfo payment={parcel?.payment} />
              <ParcelAssignedAgent assignedAgent={parcel?.assignedAgent} />
              <ParcelCustomerInfo customer={parcel?.customer} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParcelDetails;
