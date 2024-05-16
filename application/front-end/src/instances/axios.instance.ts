import axios from 'axios';
import type { IHttpRepository } from '@domain/repositories';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const baseURL = 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL,
  headers,
});

export const httpAxios: IHttpRepository = {
  async get<T>(url: string, options = {}) {
    const response = await axiosInstance.get<T>(url, { headers, ...options });
    return response.data;
  },

  async post<T>(url: string, body: any, options = {}) {
    const response = await axiosInstance.post<T>(url, body, { headers, ...options });
    return response.data;
  },

  async put<T>(url: string, body: any, options = {}) {
    const response = await axiosInstance.put<T>(url, body, { headers, ...options });
    return response.data;
  },

  async delete<T>(url: string, options = {}) {
    const response = await axiosInstance.delete<T>(url, { headers, ...options });
    return response.data;
  },
};
