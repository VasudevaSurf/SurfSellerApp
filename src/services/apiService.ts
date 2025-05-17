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
  full_description?: string;
}

export interface ProductsResponse {
  products: Product[];
  total_items: string;
}

export interface ProductDetailsResponse {
  product_data: Product;
}

export interface Order {
  order_id: string;
  order_number: string;
  timestamp: string;
  status: string;
  total: string;
  customer: {
    email: string;
    phone: string;
    name?: string;
  };
  products: Array<{
    product_id: string;
    product: string;
    amount: number;
    price: string;
    image_url: string;
  }>;
}

export interface OrdersResponse {
  orders: Order[];
  total_items: string;
}

export interface OrderDetailsResponse {
  order_data: Order;
}

// Create the API client with the correct base URL and authorization
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
    console.error('Login API error:', error);
    throw error;
  }
};

export const fetchProductsApi = async (
  userId: string,
  page: number = 1,
  itemsPerPage: number = 10,
) => {
  try {
    const response = await apiClient.get(`/api.php`, {
      params: {
        _d: 'NtSeProductsApi',
        user_id: userId,
        page,
        items_per_page: itemsPerPage,
      },
    });
    return response.data as ProductsResponse;
  } catch (error) {
    console.error('Fetch Products API error:', error);
    throw error;
  }
};

export const fetchProductDetailsApi = async (
  userId: string,
  productId: string,
) => {
  try {
    // Using the correct URL format as shown in the curl example
    const response = await apiClient.get(`/api.php`, {
      params: {
        _d: 'NtSeProductsApi',
        user_id: userId,
        product_id: productId,
        for_product_data: true,
      },
    });
    return response.data as ProductDetailsResponse;
  } catch (error) {
    console.error('Fetch Product Details API error:', error);
    throw error;
  }
};

export const searchProductsApi = async (
  userId: string,
  searchTerm: string,
  page: number = 1,
) => {
  try {
    const response = await apiClient.get(`/api.php`, {
      params: {
        _d: 'NtSeProductsApi',
        user_id: userId,
        search: searchTerm,
        page,
      },
    });
    return response.data as ProductsResponse;
  } catch (error) {
    console.error('Search Products API error:', error);
    throw error;
  }
};

// New Orders API Functions
export const fetchOrdersApi = async (
  userId: string,
  page: number = 1,
  itemsPerPage: number = 10,
  status?: string,
) => {
  try {
    const params: any = {
      _d: 'NtSeOrdersApi',
      user_id: userId,
      page,
      items_per_page: itemsPerPage,
    };

    if (status && status !== 'all') {
      params.status = status;
    }

    const response = await apiClient.get(`/api.php`, {params});
    return response.data as OrdersResponse;
  } catch (error) {
    console.error('Fetch Orders API error:', error);
    throw error;
  }
};

export const fetchOrderDetailsApi = async (userId: string, orderId: string) => {
  try {
    const response = await apiClient.get(`/api.php`, {
      params: {
        _d: 'NtSeOrdersApi',
        user_id: userId,
        order_id: orderId,
        for_order_data: true,
      },
    });
    return response.data as OrderDetailsResponse;
  } catch (error) {
    console.error('Fetch Order Details API error:', error);
    throw error;
  }
};

export const searchOrdersApi = async (
  userId: string,
  searchTerm: string,
  page: number = 1,
) => {
  try {
    const response = await apiClient.get(`/api.php`, {
      params: {
        _d: 'NtSeOrdersApi',
        user_id: userId,
        search: searchTerm,
        page,
      },
    });
    return response.data as OrdersResponse;
  } catch (error) {
    console.error('Search Orders API error:', error);
    throw error;
  }
};

export default apiClient;
