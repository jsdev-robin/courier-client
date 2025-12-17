import { SuccessResponse } from '../../../types/api-response';

export interface FindStatsMetricsResponse extends SuccessResponse {
  data: {
    metrics: {
      totalParcels: number;
      totalParcelsChange: number;
      totalRevenue: number;
      totalRevenueChange: number;
      codAmount: number;
      codAmountChange: number;
      prepaidAmount: number;
      prepaidAmountChange: number;
      successRate: number;
      successRateChange: number;
    };
  };
}

export interface FindLast7DaysMetricsResponse extends SuccessResponse {
  data: {
    metrics: {
      parcels: { parcels: number }[];
      prepaid: { amount: number; parcels: number }[];
      cod: { amount: number; parcels: number }[];
      successRate: { successRate: number }[];
    };
  };
}
