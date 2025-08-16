import axios from 'axios';
import {API_ENDPOINTS} from '../constants/apiEndpoints';
// import {API_BASE_URL, API_AUTH_HEADER} from '@env'

const API_BASE_URL = 'https://dev.surf.mt/2.0/api';
const API_AUTH_HEADER =
  'Basic YWRtaW5Ac3VyZi5tdDpOOW9aMnlXMzc3cEg1VTExNTFiY3YyZlYyNDYySTk1NA==';

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
  // Additional fields from API
  list_price?: string;
  format_list_price?: string;
  company_id?: string;
  is_returnable?: boolean;
  return_period?: string;
  average_rating?: string;
  age_verification?: boolean;
  age_limit?: string;
  min_qty?: number;
  max_qty?: number;
  status_details?: any;
}

export interface ProductsResponse {
  products: Product[];
  total_items: string;
}

export interface ProductDetailsResponse {
  product_data: Product;
  sections?: any[];
  images?: any[];
  category_listing?: any[];
  currency?: {
    symbol: string;
  };
}

export interface OrderProduct {
  product_id: string;
  product: string;
  amount: number;
  price: string;
  image_url: string;
}

export interface Order {
  order_id: string;
  order_number?: string;
  timestamp: string;
  status: string;
  total: string;
  firstname?: string;
  lastname?: string;
  email: string;
  phone?: string;
  customer?: {
    email: string;
    phone: string;
    name?: string;
  };
  products?: OrderProduct[];
  shipping_cost?: string;
  subtotal?: string;
  formattedDate?: string;
  formattedTime?: string;
}

export interface OrdersResponse {
  orders: Order[];
  total_items: string;
  result: boolean;
  message?: string;
}

export interface OrderDetailsResponse {
  order_info: {
    order_id: string;
    order_number?: string;
    timestamp: string;
    status: string;
    total: string;
    firstname?: string;
    lastname?: string;
    email: string;
    phone?: string;
    shipping_cost?: string;
    subtotal?: string;
    products?: OrderProduct[];
    [key: string]: any;
  };
  result: boolean;
  message?: string;
}

export interface OrderStatusUpdateResponse {
  result: boolean;
  message: string;
}

export interface ProfileField {
  name: string;
  field_name: string;
  main_object: string;
  field_type: string;
  field_type_desc: string;
  field_disabled: boolean;
  value: string;
  required: boolean;
  variants: any;
}

export interface ProfileBlock {
  block_name: string;
  fields: ProfileField[];
}

export interface ProfileSection {
  name: string;
  section_type: string;
  selected: boolean;
  blocks: ProfileBlock[];
}

export interface ProfileResponse {
  sections: ProfileSection[];
  message: string;
  result: boolean;
}

export interface UserProfile {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  // Company Profile fields
  company?: string;
  b_address?: string;
  b_city?: string;
  b_zipcode?: string;
  b_country?: string;
  tax_exempt?: string;
  tax_number?: string;
  // Bank Details fields
  fields?: {
    account_holder_name?: string;
    account_number?: string;
    swift_bic_code?: string;
  };
  // Additional fields
  password?: string;
  password1?: string;
  password2?: string;
}

export interface Language {
  lang_id: string;
  lang_code: string;
  name: string;
  country_code: string;
  direction: string;
}

export interface ApplicationConfig {
  is_signup_allowed: boolean;
  is_setting_enable: boolean;
  is_booking_enable: boolean;
  is_auction_enable: boolean;
  is_change_language_enable: boolean;
  is_change_storefront_enable: boolean;
  is_seller_promotion_enable: boolean;
  is_wallet_enable: boolean;
  is_blog_enable: boolean;
  is_dark_mode_enable: boolean;
  is_dark_mode: boolean;
  is_biomatric_enable: boolean;
  is_youtube_enable: boolean;
  is_product_filter_enable: boolean;
  is_order_filter_enable: boolean;
  is_chat_enable: boolean;
  is_order_enable: boolean;
  is_product_enable: boolean;
  is_dashboard: boolean;
  is_langauge_enable: boolean;
  is_forgot_password_enable: boolean;
  is_block_enable: boolean;
  is_chat_archive_enable: boolean;
  is_chat_attachment_enable: boolean;
  is_chat_delete_enable: boolean;
  is_company_profile_enable: boolean;
}

export interface PlatformFee {
  min: string;
  max: string;
  fee: string;
}

export interface AppUpdateConfig {
  is_app_update_required: boolean;
  android_version: string;
  ios_version: string;
  android_url: string;
  ios_url: string;
}

export interface Storefront {
  // Define storefront structure if needed
  id?: string;
  name?: string;
  // Add other properties as needed
}

export interface InitializerResponse {
  languages: Language[];
  application_config: ApplicationConfig;
  storefronts: Storefront[];
  privacy_policy_page: string;
  terms_of_use_page: string;
  whatsapp_url: string;
  platform_fee: PlatformFee[];
  app_update_config: AppUpdateConfig;
  default_language: string;
  message: string;
  result: boolean;
}

// Add new interface for filter options
export interface ProductFilters {
  status?: 'A' | 'P' | 'D' | 'all';
  lowStock?: boolean;
  lowStockThreshold?: number;
  page?: number;
  itemsPerPage?: number;
}

// Add interface for delete product response
export interface DeleteProductResponse {
  result: boolean;
  message: string;
}

// Add interface for status update response
export interface StatusUpdateResponse {
  result: boolean;
  message: string;
}

// NEW: Product Creation/Update interfaces
export interface CreateProductRequest {
  image_pair_positon?: string[];
  lang_code: string;
  product_data: {
    amount: string;
    avail_since?: string;
    category_ids: number[];
    details_layout?: string;
    discussion_type?: string;
    exceptions_type?: string;
    full_description: string;
    list_price?: string;
    list_qty_count?: string;
    max_qty?: string;
    min_qty?: string;
    options_type?: string;
    out_of_stock_actions?: string;
    popularity?: string;
    price: string;
    product: string;
    product_code: string;
    promo_text?: string;
    qty_step?: string;
    sales_amount?: string;
    search_words?: string;
    short_description?: string;
    status: string;
    tax_ids?: number[];
    timestamp?: string;
    tracking?: string;
    usergroup_ids?: number[];
    zero_price_action?: string;
  };
  user_id: string;
  product_id?: number; // Optional for create, required for update
}

export interface CreateProductResponse {
  result: boolean;
  message: string;
  product_id?: number;
  product_data?: any;
}

export interface CategoryData {
  id: string;
  name: string;
  subcategories?: CategoryData[];
}

export interface CategoriesResponse {
  categories: CategoryData[];
  result: boolean;
  message: string;
}

// NEW: Balance API interfaces
export interface BalanceItem {
  payout_id: string;
  status: 'Pending' | 'Completed' | 'Declined' | 'Failed';
  description: string;
  payout_type: 'order_placed' | 'withdrawal' | 'payout' | string;
  display_amount: string;
  order_amount?: string;
  date: string;
  comments?: string | null;
}

export interface BalanceSearch {
  page: number;
  items_per_page: number;
  sort_by: string;
  sort_order: string;
  sort_order_rev: string;
  total_items: string;
  api_search: string;
}

export interface BalanceTotals {
  income: string;
  income_carried_forward: string;
}

export interface BalanceResponse {
  balances: BalanceItem[];
  search: BalanceSearch;
  totals: BalanceTotals;
  message: string;
  result: boolean;
}

// Helper function to find category ID by path
const findCategoryIdByPath = (
  categories: CategoryData[],
  categoryPath: string[],
): number[] => {
  const categoryIds: number[] = [];

  const findRecursive = (
    cats: CategoryData[],
    path: string[],
    depth: number = 0,
  ): boolean => {
    if (depth >= path.length) return false;

    const targetName = path[depth];
    const category = cats.find(
      cat => cat.name.toLowerCase() === targetName.toLowerCase(),
    );

    if (category) {
      categoryIds.push(parseInt(category.id));

      // If this is the last item in path, we're done
      if (depth === path.length - 1) {
        return true;
      }

      // Otherwise, search in subcategories
      if (category.subcategories) {
        return findRecursive(category.subcategories, path, depth + 1);
      }
    }

    return false;
  };

  findRecursive(categories, categoryPath);
  return categoryIds;
};

export const fetchInitializerApi = async () => {
  try {
    const response = await apiClient.get(`/api.php`, {
      params: {
        _d: 'NtSeInitializerApi',
      },
    });
    return response.data as InitializerResponse;
  } catch (error) {
    console.error('Fetch Initializer API error:', error);
    throw error;
  }
};

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

export const fetchProfileApi = async (userId: string) => {
  try {
    console.log('Fetching profile for userId:', userId);

    const response = await apiClient.get(`/api.php`, {
      params: {
        _d: 'NtSeProfilesApi',
        user_id: userId,
      },
    });

    console.log('Profile API response:', response.data);
    return response.data as ProfileResponse;
  } catch (error) {
    console.error('Fetch Profile API error:', error);
    throw error;
  }
};

export const updateProfileApi = async (
  userId: string,
  profileData: Partial<UserProfile>,
) => {
  try {
    console.log(
      'Updating profile for userId:',
      userId,
      'with data:',
      profileData,
    );

    // Build the request data based on what fields are being updated
    const requestData: any = {
      user_id: userId,
      user_data: {},
    };

    // Map fields to API expected format
    if (profileData.firstname !== undefined) {
      requestData.user_data.firstname = profileData.firstname;
    }
    if (profileData.lastname !== undefined) {
      requestData.user_data.lastname = profileData.lastname;
    }
    if (profileData.email !== undefined) {
      requestData.user_data.email = profileData.email;
    }
    if (profileData.phone !== undefined) {
      requestData.user_data.phone = profileData.phone;
    }

    // Company fields
    if (profileData.company !== undefined) {
      requestData.user_data.company = profileData.company;
    }
    if (profileData.tax_number !== undefined) {
      requestData.user_data.tax_number = profileData.tax_number;
    }
    if (profileData.b_address !== undefined) {
      requestData.user_data.b_address = profileData.b_address;
    }
    if (profileData.b_city !== undefined) {
      requestData.user_data.b_city = profileData.b_city;
    }
    if (profileData.b_zipcode !== undefined) {
      requestData.user_data.b_zipcode = profileData.b_zipcode;
    }
    if (profileData.b_country !== undefined) {
      requestData.user_data.b_country = profileData.b_country;
    }

    // Bank details - these might be in a fields object
    if (profileData.fields) {
      if (!requestData.user_data.fields) {
        requestData.user_data.fields = {};
      }
      if (profileData.fields.account_holder_name !== undefined) {
        requestData.user_data.fields.account_holder_name =
          profileData.fields.account_holder_name;
      }
      if (profileData.fields.account_number !== undefined) {
        requestData.user_data.fields.account_number =
          profileData.fields.account_number;
      }
      if (profileData.fields.swift_bic_code !== undefined) {
        requestData.user_data.fields.swift_bic_code =
          profileData.fields.swift_bic_code;
      }
    }

    console.log('Sending update request:', requestData);

    const response = await apiClient.post(
      `/api.php?_d=NtSeProfilesApi`,
      requestData,
    );

    console.log('Update Profile API response:', response.data);

    if (response.data.status === 400) {
      throw new Error(response.data.message || 'Invalid profile data');
    }

    return response.data;
  } catch (error: any) {
    console.error('Update Profile API error:', error);

    // Handle different error scenarios
    if (error.response?.status === 400) {
      throw new Error(
        error.response?.data?.message || 'Invalid profile data provided',
      );
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to update this profile');
    } else if (error.response?.status === 404) {
      throw new Error('Profile not found');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error occurred while updating profile');
    } else {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Failed to update profile',
      );
    }
  }
};

// NEW: Balance API function
export const fetchBalanceApi = async (
  userId: string,
  page: number = 1,
  itemsPerPage: number = 10,
  status?: 'Pending' | 'Completed' | 'Declined' | 'Failed',
  type?: 'payouts' | 'withdrawals',
): Promise<BalanceResponse> => {
  try {
    console.log('Fetching balance for userId:', userId);

    let url = `https://dev.surf.mt/api.php?_d=NtSeBalanceApi&user_id=${userId}`;

    // Add pagination parameters
    url += `&page=${page}&items_per_page=${itemsPerPage}`;

    // Add status filter if provided
    if (status) {
      url += `&status=${status}`;
    }

    // Add type filter if provided
    if (type) {
      url += `&payout_type=${type}`;
    }

    const response = await axios({
      method: 'GET',
      url: url,
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
    });

    console.log('Balance API response:', response.data);
    return response.data as BalanceResponse;
  } catch (error) {
    console.error('Fetch Balance API error:', error);
    throw error;
  }
};

// Updated fetchProductsApi with filter support
export const fetchProductsApi = async (
  userId: string,
  filters: ProductFilters = {},
) => {
  try {
    const {
      status = 'all',
      lowStock = false,
      lowStockThreshold = 2,
      page = 1,
      itemsPerPage = 10,
    } = filters;

    // Build the URL with query parameters
    let url = `${API_BASE_URL}/api.php?_d=NtSeProductsApi&user_id=${userId}`;

    // Add status filter if not 'all'
    if (status !== 'all') {
      url += `&status=${status}`;
    }

    // Add low stock filter
    if (lowStock) {
      url += `&status=A&amount_to=${lowStockThreshold}`;
    }

    // Add pagination parameters
    url += `&page=${page}&items_per_page=${itemsPerPage}`;

    console.log('Fetching products from URL:', url);

    const response = await axios({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: API_AUTH_HEADER,
      },
      data: {
        user_login: 'csctest@gmail.com',
        password: 'Zaid@123',
      },
    });

    return response.data as ProductsResponse;
  } catch (error) {
    console.error('Fetch Products API error:', error);
    throw error;
  }
};

// New function to get products by specific status
export const fetchProductsByStatusApi = async (
  userId: string,
  status: 'A' | 'P' | 'D',
  page: number = 1,
  itemsPerPage: number = 10,
) => {
  try {
    const url = `${API_BASE_URL}/api.php?_d=NtSeProductsApi&user_id=${userId}&status=${status}&page=${page}&items_per_page=${itemsPerPage}`;

    console.log(`Fetching ${status} products from URL:`, url);

    const response = await axios({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: API_AUTH_HEADER,
      },
      data: {
        user_login: 'csctest@gmail.com',
        password: 'Zaid@123',
      },
    });

    return response.data as ProductsResponse;
  } catch (error) {
    console.error('Fetch Products By Status API error:', error);
    throw error;
  }
};

// New function to get low stock products
export const fetchLowStockProductsApi = async (
  userId: string,
  threshold: number = 2,
  page: number = 1,
  itemsPerPage: number = 10,
) => {
  try {
    const url = `${API_BASE_URL}/api.php?_d=NtSeProductsApi&user_id=${userId}&status=A&amount_to=${threshold}&page=${page}&items_per_page=${itemsPerPage}`;

    console.log('Fetching low stock products from URL:', url);

    const response = await axios({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: API_AUTH_HEADER,
      },
      data: {
        user_login: 'csctest@gmail.com',
        password: 'Zaid@123',
      },
    });

    return response.data as ProductsResponse;
  } catch (error) {
    console.error('Fetch Low Stock Products API error:', error);
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

// Update existing searchProductsApi to include filters
export const searchProductsApi = async (
  userId: string,
  searchTerm: string,
  filters: ProductFilters = {},
) => {
  try {
    const {
      status = 'all',
      lowStock = false,
      lowStockThreshold = 2,
      page = 1,
      itemsPerPage = 10,
    } = filters;

    // Build the URL with query parameters
    let url = `${API_BASE_URL}/api.php?_d=NtSeProductsApi&user_id=${userId}&search=${encodeURIComponent(
      searchTerm,
    )}`;

    // Add status filter if not 'all'
    if (status !== 'all') {
      url += `&status=${status}`;
    }

    // Add low stock filter
    if (lowStock) {
      url += `&status=A&amount_to=${lowStockThreshold}`;
    }

    // Add pagination parameters
    url += `&page=${page}&items_per_page=${itemsPerPage}`;

    console.log('Searching products from URL:', url);

    const response = await axios({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: API_AUTH_HEADER,
      },
      data: {
        user_login: 'csctest@gmail.com',
        password: 'Zaid@123',
      },
    });

    return response.data as ProductsResponse;
  } catch (error) {
    console.error('Search Products API error:', error);
    throw error;
  }
};

// UPDATED: Orders API Functions with new integration
export const fetchOrdersApi = async (
  userId: string,
  page: number = 1,
  itemsPerPage: number = 10,
  status?: string,
) => {
  try {
    console.log('Fetching orders with params:', {
      userId,
      page,
      itemsPerPage,
      status,
    });

    // Use the new API endpoint format
    const url = `https://dev.surf.mt/api.php?_d=NtSeOrdersApi&user_id=${userId}`;
    let params: any = {
      page,
      items_per_page: itemsPerPage,
    };

    if (status && status !== 'all') {
      params.status = status;
    }

    const response = await axios({
      method: 'GET',
      url: url,
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      params: params,
    });

    console.log('Orders API response:', response.data);
    return response.data as OrdersResponse;
  } catch (error) {
    console.error('Fetch Orders API error:', error);
    throw error;
  }
};

export const fetchOrderDetailsApi = async (userId: string, orderId: string) => {
  try {
    console.log('Fetching order details for:', {userId, orderId});

    // Use the new API endpoint format
    const url = `https://dev.surf.mt/api.php?_d=NtSeOrdersApi&user_id=${userId}&order_id=${orderId}`;

    const response = await axios({
      method: 'GET',
      url: url,
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
    });

    console.log('Order details API response:', response.data);
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
    console.log('Searching orders with:', {userId, searchTerm, page});

    const url = `https://dev.surf.mt/api.php?_d=NtSeOrdersApi&user_id=${userId}`;
    const params = {
      search: searchTerm,
      page,
    };

    const response = await axios({
      method: 'GET',
      url: url,
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      params: params,
    });

    console.log('Search orders API response:', response.data);
    return response.data as OrdersResponse;
  } catch (error) {
    console.error('Search Orders API error:', error);
    throw error;
  }
};

// NEW: Update Order Status API
export const updateOrderStatusApi = async (
  userId: string,
  orderId: string,
  status: string,
): Promise<OrderStatusUpdateResponse> => {
  try {
    console.log('Updating order status:', {userId, orderId, status});

    const url = `https://dev.surf.mt/api.php?_d=NtSeOrdersApi%2F${orderId}`;

    const response = await axios({
      method: 'PUT',
      url: url,
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      data: {
        product_ids: orderId,
        user_id: userId,
        action: 'change_status',
        status_to: status,
      },
    });

    console.log('Update order status response:', response.data);
    return response.data as OrderStatusUpdateResponse;
  } catch (error: any) {
    console.error('Update Order Status API error:', error);

    if (error.response?.status === 404) {
      throw new Error('Order not found');
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to update this order');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error occurred while updating order status');
    } else {
      throw new Error(
        error.response?.data?.message || 'Failed to update order status',
      );
    }
  }
};

// UPDATED: Product Status Change API
export const updateProductStatusApi = async (
  userId: string,
  productId: string,
  status: 'A' | 'D' | 'H' | 'X',
): Promise<StatusUpdateResponse> => {
  try {
    console.log('Updating product status:', {userId, productId, status});

    const response = await axios({
      method: 'PUT',
      url: `https://dev.surf.mt/api.php?_d=NtSeProductsApi%2F${userId}`,
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      data: {
        product_ids: productId,
        user_id: userId,
        action: 'change_status',
        status_to: status,
      },
    });

    console.log('Update product status response:', response.data);
    return response.data as StatusUpdateResponse;
  } catch (error: any) {
    console.error('Update Product Status API error:', error);

    // Handle different error scenarios
    if (error.response?.status === 404) {
      throw new Error('Product not found');
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to update this product');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error occurred while updating product status');
    } else {
      throw new Error(
        error.response?.data?.message || 'Failed to update product status',
      );
    }
  }
};

// Product Toggle Status Helper
export const toggleProductStatusApi = async (
  userId: string,
  productId: string,
  isActive: boolean,
): Promise<StatusUpdateResponse> => {
  const status = isActive ? 'A' : 'D'; // A = Active, D = Disabled/Hidden
  return await updateProductStatusApi(userId, productId, status);
};

// Bulk status update for multiple products
export const updateMultipleProductsStatusApi = async (
  userId: string,
  productIds: string[],
  status: 'A' | 'D' | 'H' | 'X',
): Promise<StatusUpdateResponse> => {
  try {
    console.log('Updating multiple products status:', {
      userId,
      productIds,
      status,
    });

    const response = await axios({
      method: 'PUT',
      url: `https://dev.surf.mt/api.php?_d=NtSeProductsApi%2F${userId}`,
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      data: {
        product_ids: productIds.join(','),
        user_id: userId,
        action: 'change_status',
        status_to: status,
      },
    });

    console.log('Update multiple products status response:', response.data);
    return response.data as StatusUpdateResponse;
  } catch (error: any) {
    console.error('Update Multiple Products Status API error:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to update products status',
    );
  }
};

// Add this function to your apiService.ts
export const fetchCategoriesApi = async (
  userId: string,
  productId?: string,
): Promise<CategoriesResponse> => {
  try {
    const params: any = {
      _d: 'NtSeCategoriesApi',
      user_id: userId,
      for_product_data: true,
    };

    if (productId) {
      params.product_id = productId;
    }

    console.log('Fetching categories with params:', params);

    const response = await apiClient.get(`/api.php`, {params});

    console.log('Categories API response:', response.data);

    // Transform the API response to match your expected format
    const transformedCategories = transformCategoriesData(response.data);

    return {
      categories: transformedCategories,
      result: response.data.result || true,
      message: response.data.message || 'Categories fetched successfully',
    };
  } catch (error) {
    console.error('Fetch Categories API error:', error);
    throw error;
  }
};

// Helper function to transform API response to your expected format
const transformCategoriesData = (apiResponse: any): CategoryData[] => {
  // Your API response has the exact structure we need
  if (apiResponse.categories && Array.isArray(apiResponse.categories)) {
    return apiResponse.categories.map((category: any) =>
      transformCategoryRecursive(category),
    );
  }

  // Fallback if structure is different
  return [];
};

// Recursive function to handle nested subcategories
const transformCategoryRecursive = (category: any): CategoryData => {
  return {
    id: category.id,
    name: category.name,
    subcategories:
      category.subcategories && Array.isArray(category.subcategories)
        ? category.subcategories.map((sub: any) =>
            transformCategoryRecursive(sub),
          )
        : undefined,
  };
};

// NEW: Delete Product API Function
export const deleteProductApi = async (
  userId: string,
  productIds: string | string[],
): Promise<DeleteProductResponse> => {
  try {
    // Convert productIds to string format (comma-separated if multiple)
    const productIdsString = Array.isArray(productIds)
      ? productIds.join(',')
      : productIds;

    console.log('Deleting products:', {userId, productIds: productIdsString});

    const response = await axios({
      method: 'PUT',
      url: `https://dev.surf.mt/api.php?_d=NtSeProductsApi%2F${userId}`,
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      data: {
        product_ids: productIdsString,
        user_id: userId,
      },
    });

    console.log('Delete product response:', response.data);
    return response.data as DeleteProductResponse;
  } catch (error: any) {
    console.error('Delete Product API error:', error);

    // Handle different error scenarios
    if (error.response?.status === 404) {
      throw new Error('Product not found');
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to delete this product');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error occurred while deleting product');
    } else {
      throw new Error(
        error.response?.data?.message || 'Failed to delete product',
      );
    }
  }
};

// Helper function for single product deletion
export const deleteSingleProductApi = async (
  userId: string,
  productId: string,
): Promise<DeleteProductResponse> => {
  return deleteProductApi(userId, productId);
};

// Helper function for multiple product deletion
export const deleteMultipleProductsApi = async (
  userId: string,
  productIds: string[],
): Promise<DeleteProductResponse> => {
  return deleteProductApi(userId, productIds);
};

// NEW: Create new product
export const createProductApi = async (
  productData: CreateProductRequest,
): Promise<CreateProductResponse> => {
  try {
    console.log('Creating product with data:', productData);

    const response = await axios({
      method: 'POST',
      url: `${API_BASE_URL}/api.php?_d=NtSeProductsApi`,
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      data: productData,
    });

    console.log('Create product response:', response.data);
    return response.data as CreateProductResponse;
  } catch (error: any) {
    console.error('Create Product API error:', error);

    if (error.response?.status === 400) {
      throw new Error('Invalid product data provided');
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to create products');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error occurred while creating product');
    } else {
      throw new Error(
        error.response?.data?.message || 'Failed to create product',
      );
    }
  }
};

// NEW: Update existing product
export const updateProductApi = async (
  productData: CreateProductRequest,
): Promise<CreateProductResponse> => {
  try {
    if (!productData.product_id) {
      throw new Error('Product ID is required for update');
    }

    console.log('Updating product with data:', productData);

    const response = await axios({
      method: 'POST',
      url: `${API_BASE_URL}/api.php?_d=NtSeProductsApi`,
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      data: productData,
    });

    console.log('Update product response:', response.data);
    return response.data as CreateProductResponse;
  } catch (error: any) {
    console.error('Update Product API error:', error);

    if (error.response?.status === 404) {
      throw new Error('Product not found');
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to update this product');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error occurred while updating product');
    } else {
      throw new Error(
        error.response?.data?.message || 'Failed to update product',
      );
    }
  }
};

// Helper function to transform form data to API format
export const transformFormDataToApiFormat = (
  formData: any,
  userId: string,
  editMode: boolean = false,
  availableCategories: CategoryData[] = [],
): CreateProductRequest => {
  // Extract category IDs from categoryPath
  let categoryIds: number[] = [309]; // Default fallback

  if (
    formData.categoryPath &&
    formData.categoryPath.length > 0 &&
    availableCategories.length > 0
  ) {
    // Find actual category IDs from the path
    const foundIds = findCategoryIdByPath(
      availableCategories,
      formData.categoryPath,
    );
    if (foundIds.length > 0) {
      categoryIds = foundIds;
    }
  }

  const apiData: CreateProductRequest = {
    lang_code: 'en',
    product_data: {
      amount: formData.quantity || '0',
      avail_since: '',
      category_ids: categoryIds,
      details_layout: 'default',
      discussion_type: 'B',
      exceptions_type: 'F',
      full_description: formData.description || '',
      list_price: '0.00',
      list_qty_count: '',
      max_qty: formData.maxQuantity || '',
      min_qty: formData.minQuantity || '',
      options_type: 'P',
      out_of_stock_actions: 'N',
      popularity: '',
      price: parseFloat(formData.price || '0').toFixed(8), // API expects 8 decimal places
      product: formData.productName || '',
      product_code: formData.productCode || '',
      promo_text: '',
      qty_step: '',
      sales_amount: '',
      search_words: '',
      short_description: '',
      status: 'A', // Active by default
      tax_ids: formData.taxType === 'VAT' ? [1] : [], // Assuming VAT has ID 1
      timestamp: Math.floor(Date.now() / 1000).toString(),
      tracking: formData.trackInventory ? 'B' : 'N',
      usergroup_ids: [],
      zero_price_action: 'P',
    },
    user_id: userId,
  };

  // Add image positions if available
  if (formData.images && formData.images.length > 0) {
    // For now, we'll use placeholder image positions
    // In a real implementation, you'd upload images first and get their paths
    apiData.image_pair_positon = formData.images.map(
      (_, index) => `product_${Date.now()}/image_${index}.jpg`,
    );
  }

  // Add product_id for updates
  if (editMode && formData.productId) {
    apiData.product_id = parseInt(formData.productId);
  }

  return apiData;
};

export default apiClient;
