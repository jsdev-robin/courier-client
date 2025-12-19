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
