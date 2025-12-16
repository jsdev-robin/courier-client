import ParcelAddressDetails from './particles/ParcelAddressDetails';
import ParcelAssignedAgent from './particles/ParcelAssignedAgent';
import ParcelCustomerInfo from './particles/ParcelCustomerInfo';
import ParcelInfo from './particles/ParcelInfo';
import ParcelLiveTrackingMap from './particles/ParcelLiveTrackingMap';
import ParcelPaymentInfo from './particles/ParcelPaymentInfo';
import ParcelStatus from './particles/ParcelStatus';
import ParcelTrackingHistory from './particles/ParcelTrackingHistory';

const ParcelDetails = () => {
  return (
    <section>
      <div className="container">
        <div className="grid gap-4 grid-cols-3">
          <div className="col-span-2">
            <div className="space-y-4">
              <ParcelStatus />
              <ParcelLiveTrackingMap />
              <ParcelAddressDetails />
              <ParcelTrackingHistory />
            </div>
          </div>
          <div className="col-span-1">
            <div className="space-y-4">
              <ParcelInfo />
              <ParcelPaymentInfo />
              <ParcelAssignedAgent />
              <ParcelCustomerInfo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParcelDetails;
