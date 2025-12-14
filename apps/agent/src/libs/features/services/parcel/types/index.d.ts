export interface FindOneAndUpdateStatusBytrackingNumberRequest {
  status: string;
  trackingNumber: string;
}

export interface FindParcelResponse extends SuccessResponse {
  data: {
    parcels: {
      _id: string;
      trackingNumber: string;
      customer: {
        personalInfo: {
          familyName: string;
          givenName: string;
          email: string;
        };
      };
      deliveryAddress: {
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
        coordinates: {
          lat: number;
          lng: number;
          address: string;
        };
      };
      parcelDetails: {
        size: 'Small' | 'Medium' | 'Large';
      };
      payment: {
        type: 'COD' | 'Prepaid';
        status: 'Pending' | 'Paid';
      };
      status: 'Failed' | 'Delivered' | 'Assigned' | 'In Transit' | 'Picked Up';
      nextStatuses: {
        status: 'Failed' | 'Delivered' | 'Picked Up' | 'In Transit';
      }[];
      agent: {
        location: {
          lat: number;
          lng: number;
        };
      };
    }[];
  };
}
