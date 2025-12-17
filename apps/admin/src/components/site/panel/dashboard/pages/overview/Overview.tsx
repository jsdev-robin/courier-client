import DeliveryMap from './particles/DeliveryMap';
import InviteNewAgent from './particles/InviteNewAgent';
import OverviewStats from './particles/OverviewStats';
import TodayStatusMetrics from './particles/TodayStatusMetrics';
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
              <div className="space-y-4">
                <TodayStatusMetrics />
                <InviteNewAgent />
              </div>
            </div>
          </div>
          <DeliveryMap />
        </div>
      </div>
    </section>
  );
};

export default Overview;
