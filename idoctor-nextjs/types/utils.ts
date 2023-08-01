export type PaginatedResponse<T extends unknown> = {
  page: number;
  totalItems: number;
  hasNextPage: boolean;
  totalPages: number;
  items: T[];
};

export type SelectValues = {title: string; value: string};
export type DataTableFilter = {
  page: number;
  keyword?: string;
  direction?: number;
  sort?: string;
};
