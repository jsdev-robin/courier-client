export interface CategoryRequest {
  name: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  searchTags: string[];
  img?: File | undefined;
  p?: string;
  s?: string;
}

export interface CategoryOptions extends SuccessResponse {
  data: {
    categories: {
      value: string;
      label: string;
    }[];
  };
}
