import { PaginationState } from '@tanstack/react-table';

export interface SuccessResponse {
  status: 'success';
  message: string;
}

export interface PaginatedResponse<T> {
  status: 'success';
  message: string;
  data: {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
  };
  total: number;
}

export type GetQueryParams = {
  pagination?: PaginationState;
  sort?: string;
  queryParams?: string;
  globalFilter?: string;
};
