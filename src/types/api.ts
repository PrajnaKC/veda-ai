export type ApiError = {
  error: string;
  details?: unknown;
};

export type ApiResponse<T> = {
  data: T;
};

export type ListResponse<T> = {
  data: T[];
};
