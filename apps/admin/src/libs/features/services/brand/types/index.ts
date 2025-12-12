import {
  PaginatedResponse,
  SuccessResponse,
} from "../../../types/api-response";

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  searchTags?: string[];
  isActive?: boolean;
  image: {
    url?: string;
    public_id?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export type FindBrandsResponse = PaginatedResponse<Brand>;

export interface FindByIdBrandResponse extends SuccessResponse {
  data: {
    brand: Brand;
  };
}

export interface FindByIdAndUpdateBrandResponse extends SuccessResponse {
  data: {
    brand: Brand;
  };
}

export interface BrandUpdateRequest {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  searchTags?: string[];
}
