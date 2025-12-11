import { SuccessResponse } from "../../../types/api-response";

export interface BrandOptions extends SuccessResponse {
  data: {
    options: {
      value: string;
      label: string;
    }[];
  };
}
