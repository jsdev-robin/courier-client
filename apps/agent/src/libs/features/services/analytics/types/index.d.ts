import { SuccessResponse } from '../../../types/api-response';

export interface FindPerformanceResponse extends SuccessResponse {
  data: {
    metrics: {
      shift: {
        start: string;
        end: string;
        isActive: boolean;
        display: string;
      };
      pauseDeliveryRun: boolean;
      parcelsAssigned: {
        value: number;
      };
      completed: {
        value: number;
      };
      todayTarget: {
        value: number;
      };
      efficiencyScore: {
        value: number;
      };
      onTimeDelivery: {
        value: number;
      };
      currentEarnings: {
        value: number;
      };
      todayCommission: {
        value: number;
      };
    };
  };
}

export interface FindStatsMetricsResponse extends SuccessResponse {
  data: {
    metrics: {
      totalParcels: { value: number; change: number };
      totalRevenue: { value: number; change: number };
      codAmount: { value: number; change: number };
      prepaidAmount: { value: number; change: number };
      successRate: { value: number; change: number };
      agentCommission: { value: number; change: number };
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

export interface FindMapMetricsResponse extends SuccessResponse {
  data: {
    metrics: {
      trackingNumber: string;
      deliveryAddress: {
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
        contactName: string;
        contactPhone: string;
      };
      name: string;
      status: string;
      coordinates: [number, number];
    }[];
  };
}

export interface FindTodayStatusDistributionMetricsResponse extends SuccessResponse {
  data: {
    metrics: {
      status: 'Delivered' | 'Assigned' | 'Picked Up' | 'In Transit' | 'Failed';
      count: number;
    }[];
  };
}
