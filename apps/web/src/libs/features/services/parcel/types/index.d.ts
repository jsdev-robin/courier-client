export interface ParcelCreateRequest {
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    location: {
      coordinates: [string, string];
    };
    contactName: string;
    contactPhone: string;
  };
  parcelDetails: {
    size: string;
    weight: string;
    category: string;
    description?: string;
  };
  payment: {
    method: string;
    amount: string;
    codAmount?: string;
    status?: string;
  };
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
  category: string;
  description?: string;
}

export interface ParcelPayment {
  method: string;
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

export interface ParcelItem {
  _id: string;
  trackingNumber: string;
  customer: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  deliveryAddress: ParcelDeliveryAddress;
  parcelDetails: ParcelDetails;
  payment: ParcelPayment;
  trackingHistory: ParcelTrackingHistory[];
  assignedAgent?: AssignedAgent;
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

export interface FindParcelResponse extends SuccessResponse {
  data: {
    parcels: ParcelItem[];
    total: number;
  };
}

export interface FindOneParcel extends SuccessResponse {
  data: {
    parcel: FindOneParcelItem;
  };
}
