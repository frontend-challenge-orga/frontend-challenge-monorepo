export interface IHttpRepository {
  get<T>(url: string, options?: RequestInit): Promise<T>;
  post<T>(url: string, body: any, options?: RequestInit): Promise<T>;
  put<T>(url: string, body: any, options?: RequestInit): Promise<T>;
  delete<T>(url: string, options?: RequestInit): Promise<T>;
}
