import { SerializedEditorState } from 'lexical';
import { SuccessResponse } from '../../../types/api-response';
import { SEO } from '../../product/types';

export interface AIMetaProductSeoResponse extends SuccessResponse {
  data: {
    seo: SEO;
  };
}

export interface AIMetaProductDescriptionResponse extends SuccessResponse {
  data: {
    description: SerializedEditorState;
  };
}

export interface AIMetaProductFieldRequest {
  basicInfo?: {
    title?: string;
    description?: string;
  };
}
