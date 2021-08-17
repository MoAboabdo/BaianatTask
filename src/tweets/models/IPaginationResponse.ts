export interface IPaginationResponse<T> {
  hasNext: boolean;
  data: T[];
}
