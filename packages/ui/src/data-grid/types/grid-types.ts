import {
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  PaginationState,
  Row,
  SortingState,
} from '@tanstack/react-table';

export interface GridProps<T> {
  data?: {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
  };
  columns: ColumnDef<T>[];
  isError: boolean;
  isLoading: boolean;
  isFetching?: boolean;
  toolbar?: {
    active?: boolean;
    open?: 'columns' | 'toolbar' | 'filter' | null;
  };
  isSplit?: boolean;
  pin?: ColumnPinningState;
  pagination?: PaginationState;
  setPagination?: React.Dispatch<React.SetStateAction<PaginationState>>;
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  sorting?: SortingState;
  setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
  globalFilter?: string;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
  subRows?: boolean;
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
}
