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

export interface CustomerPersonalInfo {
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
    coordinates: [string, string];
  };
}

export interface ParcelCustomer {
  personalInfo: CustomerPersonalInfo;
}

export interface ParcelDeliveryAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  contactName: string;
  contactPhone: string;
}

export interface ParcelDetails {
  size: string;
  weight: number;
  type: string;
  description?: string;
}

export interface ParcelPayment {
  type: string;
  amount: number;
  codAmount?: number;
  status: string;
}

export interface ParcelTrackingHistory {
  status: string;
  timestamp: string;
  notes?: string;
}

export interface AssignedAgent {
  personalInfo: {
    familyName: string;
    givenName: string;
    email: string;
    phone: string;
    avatar: {
      url: string;
    };
  };
}

export interface FindOneParcelItem {
  _id: string;
  trackingNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  qrCode: string;
  barcode: string;
  customer: ParcelCustomer;
  deliveryAddress: ParcelDeliveryAddress;
  parcelDetails: ParcelDetails;
  payment: ParcelPayment;
  trackingHistory: ParcelTrackingHistory[];
  assignedAgent?: AssignedAgent;
}

export interface FindOneParcel extends SuccessResponse {
  data: {
    parcel: FindOneParcelItem;
  };
}

export interface FindNearestResponse extends SuccessResponse {
  data: {
    limit: number;
    total: number;
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
            coordinates: [string, string];
          };
        };
        distance: number;
        distanceUnit: string;
      };
    }[];
  };
}
