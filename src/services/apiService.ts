import axios from 'axios';
import {API_ENDPOINTS} from '../constants/apiEndpoints';
import {API_BASE_URL, API_AUTH_HEADER} from '@env';

export interface Product {
  product_id: string;
  product: string;
  company_name: string;
  category: string;
  product_type: string;
  price: string;
  format_price: string;
  amount: number;
  image_url: string;
  status: string;
}

export interface ProductsResponse {
  products: Product[];
  total_items: string;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: API_AUTH_HEADER,
  },
});

export const loginApi = async (email: string, password: string) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
      user_login: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductsApi = async (
  userId: string,
  page: number = 1,
  itemsPerPage: number = 10,
) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.LIST, {
      params: {
        _d: 'NtSeProductsApi',
        user_id: userId,
        page,
        items_per_page: itemsPerPage,
      },
    });
    return response.data as ProductsResponse;
  } catch (error) {
    throw error;
  }
};

export const searchProductsApi = async (
  userId: string,
  searchTerm: string,
  page: number = 1,
) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.LIST, {
      params: {
        _d: 'NtSeProductsApi',
        user_id: userId,
        search: searchTerm,
        page,
      },
    });
    return response.data as ProductsResponse;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
