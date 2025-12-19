import {
  PaginatedResponse,
  SuccessResponse,
} from '../../../types/api-response';

export interface Agent {
  _id: string;
  role: 'agent';
  createdAt: string;
  updatedAt: string;
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
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export type FindAgentsResponse = PaginatedResponse<Agent>;

export interface FindAvailableAgentResponse extends SuccessResponse {
  data: {
    agents: {
      _id: string;
      personalInfo: {
        familyName: string;
        givenName: string;
        avatar: {
          public_id: string;
          url: string;
        };
      };
      todayParcels: number;
      totalParcels: number;
    }[];
  };
}
