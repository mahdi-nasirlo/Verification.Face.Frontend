export interface TPage {
  pagenumber: number;
  pagesize: number;
}

export interface TResponse<T> {
  errors: { code: number; message: string }[];
  responseMessage: string;
  result: T | undefined;
  isSuccess: boolean;
  ok?: boolean;
  isFailed: boolean;
}

export type TPaginateResponse<T> = TResponse<{
  data: T;
  totalCount: number | undefined;
}>;

export type TResponse500 = {
  message: string;
  detail: string;
  status?: number;
  code: number;
  data: null;
};
