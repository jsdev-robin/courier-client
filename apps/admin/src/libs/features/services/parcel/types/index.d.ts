import { SuccessResponse } from '../../../types/api-response';

export interface Parcel {
  _id: string;
  trackingNumber: string;
  barcode: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    location: {
      type: string;
      coordinates: number[];
    };
    contactName: string;
    contactPhone: string;
  };
  parcelDetails: {
    size: string;
    weight: number;
    category: string;
    description?: string;
  };
  payment: {
    method: string;
    amount: number;
    codAmount: number;
    status: string;
  };
  customer: {
    _id: string;
    personalInfo: {
      avatar: {
        public_id: string;
        url: string;
      };
      address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        coordinates: [string, string];
      };
      familyName: string;
      givenName: string;
      email: string;
      phone: string;
    };
  };
  status: string;
  trackingHistory: {
    status: string;
    timestamp: string;
    notes: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  assignedAgent: {
    _id: string;
    personalInfo: {
      address: { coordinates: [] };
      familyName: string;
      givenName: string;
      email: string;
    };
  };
}

export type FindParcelsResponse = PaginatedResponse<Parcel>;

export interface FindGeoNearParcelResponse extends SuccessResponse {
  data: {
    parcels: {
      _id: string;
      display: {
        trackingNumber: string;
        size: string;
        paymentType: string;
        agentId: string;
        agentName: string;
        agentInfo: {
          familyName: string;
          givenName: string;
          email: string;
          avatar: {
            url: string;
          };
        };
        distance: number;
        distanceUnit: string;
      };
    }[];
  };
}

export interface FindOneAndUpdateAssignParcel {
  parcelId: string;
  agentId: string;
}
