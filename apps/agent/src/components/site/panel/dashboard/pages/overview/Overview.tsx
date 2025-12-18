import OverviewAssignedParcels from './particles/OverviewAssignedParcels';
import OverviewStats from './particles/OverviewStats';

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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
