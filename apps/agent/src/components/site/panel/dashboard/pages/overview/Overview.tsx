import OverviewAssignParcels from './particles/OverviewAssignParcels';
import OverviewQRCodeScanner from './particles/OverviewQRCodeScanner';
import OverviewStats from './particles/OverviewStats';

const Overview = () => {
  return (
    <section>
      <div className="wrapper">
        <div className="space-y-4">
          <OverviewStats />
          <div className="grid gap-4 grid-cols-3">
            <div className="col-span-2">
              <OverviewAssignParcels />
            </div>
            <div className="col-span-1">
              <OverviewQRCodeScanner />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
