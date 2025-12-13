import { SuccessResponse } from '../../../types/api-response';

export interface FindGeoNearParcelResponse extends SuccessResponse {
  data: {
    parcels: {
      _id: string;
      display: {
        trackingNumber: string;
        size: 'Small' | 'Medium' | 'Large';
        paymentType: 'COD' | 'Prepaid';
        agentName: string;
        distance: number;
        distanceUnit: 'miles' | 'km';
      };
    }[];
  };
}
