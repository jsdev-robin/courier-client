import { SuccessResponse } from '../../../types/api-response';

export interface FindAvailableAgentResponse extends SuccessResponse {
  data: {
    agents: {
      _id: string;
      personalInfo: {
        familyName: string;
        givenName: string;
        avatar?: {
          url: string;
        };
      };
      todayParcels: number;
    }[];
  };
}
