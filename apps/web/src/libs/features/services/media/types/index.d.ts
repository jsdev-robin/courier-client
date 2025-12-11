import { SuccessResponse } from "../../../types/api-response";

export interface CloudinarySignatureResponse extends SuccessResponse {
  data: {
    signature: string;
    timestamp: string;
    apiKey: string;
    cloudName: string;
  };
}

interface CreateMediaRequest {
  files: {
    resource_type: string;
    public_id: string;
    url: string;
    secure_url: string;
  }[];
}
