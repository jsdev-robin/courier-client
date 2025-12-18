import { SuccessResponse } from '../../../types/api-response';

export interface FindDurationResponse extends SuccessResponse {
  data: {
    distance: string;
    duration: string;
  };
}

export interface FindNavigateResponse extends SuccessResponse {
  data: {
    polyline: [number, number][];
    navigation: {
      instruction: string;
      distance: number;
      duration: number;
    }[];
    distance: string;
    duration: string;
  };
}

export interface FindDurationRequest {
  location: string[];
}
