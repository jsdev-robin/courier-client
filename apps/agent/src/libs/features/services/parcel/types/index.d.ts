import { SuccessResponse } from '../../../types/api-response';

export interface findOneAndUpdateStatusParcel {
  status: string;
  trackingNumber: string;
}

export interface Parcel {
  _id: string;
  trackingNumber: string;
  customer: {
    personalInfo: {
      familyName: string;
      givenName: string;
      email: string;
      phone: string;
      avatar: {
        public_id: string;
        url: string;
      };
      address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        coordinates: string[];
      };
    };
  };
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    location: {
      type: 'Point';
      coordinates: number[];
    };
    contactName: string;
    contactPhone: string;
  };
  parcelDetails: {
    size: string;
  };
  payment: {
    method: string;
    amount: number;
    codAmount: number;
    status: string;
  };
  status: string;
  nextStatuses: {
    status: string;
  }[];
  agent: {
    location: {
      coordinates: number[];
    };
  };
}

export interface FindParcelResponse extends SuccessResponse {
  data: {
    total: number;
    limit: number;
    parcels: Parcel[];
  };
}
