export interface GetResponse<T> {
  data: T;
  statusCode: number;
  message: string;
}
