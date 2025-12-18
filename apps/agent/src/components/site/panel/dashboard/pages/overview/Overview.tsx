import OverviewAssignedParcels from './particles/OverviewAssignedParcels';
import OverviewStats from './particles/OverviewStats';
import TodaysPerformance from './particles/TodaysPerformance';
import TodayStatusMetrics from './particles/TodayStatusMetrics';

const Overview = () => {
  return (
    <section>
      <div className="wrapper">
        <div className="space-y-4">
          <OverviewStats />
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <OverviewAssignedParcels />
            </div>
            <div className="lg:grid-cols-1">
              <div className="space-y-4">
                <TodaysPerformance />
                <TodayStatusMetrics />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
