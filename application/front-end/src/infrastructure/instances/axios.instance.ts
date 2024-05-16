import axios from "axios";
import type { IHttpRepository } from "@package/domain";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const httpAxios: IHttpRepository = {
  async get<T>(url: string, options = {}) {
    const response = await axios.get<T>(url, { headers, ...options });
    return response.data;
  },

  async post<T>(url: string, body: any, options = {}) {
    const response = await axios.post<T>(url, body, { headers, ...options });
    return response.data;
  },

  async put<T>(url: string, body: any, options = {}) {
    const response = await axios.put<T>(url, body, { headers, ...options });
    return response.data;
  },

  async delete<T>(url: string, options = {}) {
    const response = await axios.delete<T>(url, { headers, ...options });
    return response.data;
  },
};
