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
    options: {
      value: string;
      label: string;
    }[];
  };
}

export interface Attributes extends SuccessResponse {
  data: {
    attributes: {
      name: string;
      type: "text" | "select" | "checkbox" | "number";
      options?: string[];
      required?: boolean;
      group?: string;
    }[];
  };
}
