import { SuccessResponse } from '../../../types/api-response';

export interface FindPaymentTypeStatsResponse extends SuccessResponse {
  data: {
    chartData: {
      count: number;
      paymentType: string;
      fill: string;
    }[];
  };
}
