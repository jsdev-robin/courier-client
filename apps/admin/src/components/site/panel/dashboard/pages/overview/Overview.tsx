import DeliveryMap from './particles/DeliveryMap';
import OverviewStats from './particles/OverviewStats';
import ParcelPaymentStatus from './particles/ParcelPaymentStatus';
import UnassignedParcelList from './particles/UnassignedParcelList';

const Overview = () => {
  return (
    <section>
      <div className="wrapper">
        <div className="space-y-4">
          <OverviewStats />
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <UnassignedParcelList />
            </div>
            <div className="lg:col-span-1 h-full">
              <ParcelPaymentStatus />
            </div>
          </div>
          <DeliveryMap />
        </div>
      </div>
    </section>
  );
};

export default Overview;
