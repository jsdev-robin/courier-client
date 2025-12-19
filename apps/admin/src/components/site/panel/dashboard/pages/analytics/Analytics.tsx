import PaymentMetrics from './particles/PaymentMetrics';
import ProfitLossMetrics from './particles/ProfitLossMetrics';
import ProfitLossMonthlyMetrics from './particles/ProfitLossMonthlyMetrics';
import StatusMetrics from './particles/StatusMetrics';
import StatusMonthlyMetrics from './particles/StatusMonthlyMetrics';

const Analytics = () => {
  return (
    <section>
      <div className="wrapper">
        <div className="space-y-4">
          <ProfitLossMetrics />
          <PaymentMetrics />
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <StatusMetrics />
            <ProfitLossMonthlyMetrics />
          </div>
          <StatusMonthlyMetrics />
        </div>
      </div>
    </section>
  );
};

export default Analytics;
