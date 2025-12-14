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
        agentId: string;
        distance: number;
        distanceUnit: 'miles' | 'km';
      };
    }[];
  };
}

export interface FindOneAndUpdateAssignParcel {
  parcelId: string;
  agentId: string;
}
