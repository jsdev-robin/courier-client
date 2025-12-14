import { SuccessResponse } from '../../../types/api-response';

export interface FindDurationResponse extends SuccessResponse {
  data: {
    distance: string;
    duration: string;
  };
}

export interface FindDurationRequest {
  parcel: {
    lat: number;
    lng: number;
  };
  agent: {
    lat: number;
    lng: number;
  };
}
