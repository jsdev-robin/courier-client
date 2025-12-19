export interface FindPaymentTypeMetricsResponse extends SuccessResponse {
  data: {
    metrics: {
      date: string;
      Prepaid: number;
      COD: number;
    }[];
  };
}

export interface FindStatusDistributionMetricsResponse extends SuccessResponse {
  data: {
    metrics: {
      status: string;
      count: number;
      fill: string;
    }[];
  };
}

export interface FindStatusMonthlyMetricsResponse extends SuccessResponse {
  data: {
    metrics: {
      _id: number;
      Booked: number;
      Assigned: number;
      PickedUp: number;
      InTransit: number;
      Delivered: number;
      Failed: number;
      month: string;
    }[];
  };
}

export interface FindProfitLossMonthlyMetricsResponse extends SuccessResponse {
  data: {
    metrics: {
      profit: number;
      lose: number;
      month: string;
    }[];
  };
}

export interface FindProfitLossMetricsResponse extends SuccessResponse {
  data: {
    metrics: {
      summary: {
        _id: string | null;
        totalParcels: number;
        profit: number;
        lose: number;
        successRate: number;
      };
      totalParcelsTimeline: { date: string; totalParcels: number }[];
      profitTimeline: { date: string; profit: number }[];
      loseTimeline: { date: string; lose: number }[];
      successRateTimeline: { date: string; successRate: number }[];
    };
  };
}
