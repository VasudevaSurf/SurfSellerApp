import axios from 'axios';
import {API_ENDPOINTS} from '../constants/apiEndpoints';

const API_BASE_URL = 'https://surf.mt/2.0/api';
const API_AUTH_HEADER =
  'Basic YWRtaW5Ac3VyZi5tdDpSMlZXbjE2N1VaUFc2Y3VLNDEwMWdCMTM2UTk0UFQ2SA==';

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

export interface RecentOrder {
  order_id: string;
  issuer_id: string | null;
  user_id: string;
  is_parent_order: string;
  parent_order_id: string;
  company_id: string;
  company: string;
  timestamp: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  status: string;
  total: string;
  issuer_name: string | null;
  invoice_id: string | null;
  status_details: {
    status_id: string;
    status: string;
    description: string;
    type: string;
    color: string;
  };
}

export interface OrderStatus {
  status: string;
  description: string;
  color: string;
}

export interface Statistic {
  name: string;
  value: string;
  icon: string;
}

export interface AppConfiguration {
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

export interface Currency {
  currency_code: string;
  symbol: string;
  is_primary: string;
  description: string;
}

export interface DashboardResponse {
  from: string;
  to: string;
  recent_orders: RecentOrder[];
  order_statuses: OrderStatus[];
  statistics: Statistic[];
  app_configuration: AppConfiguration;
  storefronts: any[];
  languages: Language[];
  currencies: Currency[];
  default_currency: string;
  message: string;
  result: boolean;
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

export interface NotificationItem {
  notification_id: string;
  user_id: string;
  title: string;
  message: string;
  severity: string; // 'N' for normal
  section: string; // 'administration', 'products', etc.
  tag: string;
  area: string;
  action_url: string;
  is_read: string; // '0' or '1'
  pinned: string; // '0' or '1'
  remind: string; // '0' or '1'
  timestamp: string;
}

export interface NotificationsResponse {
  notifications: NotificationItem[];
  message: string;
  result: boolean;
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

  // ✅ ADD THESE NEW FIELDS
  shipping_name?: string;
  shipping?: Array<{
    shipping_id: string;
    shipping: string;
    delivery_time?: string;
    rate?: number;
    [key: string]: any;
  }>;
  customer_address?: {
    name?: string;
    line_1?: string;
    line_2?: string;
    line_3?: string;
    line_4?: string;
  };
  s_address?: string;
  s_address_2?: string;
  s_city?: string;
  s_zipcode?: string;
  s_country_descr?: string;
  s_country?: string;
  payment_name?: string;
  payment_method?: {
    payment_id: string;
    payment: string;
    description?: string;
    [key: string]: any;
  };
  billing_address?: {
    name?: string;
    line_1?: string;
    line_2?: string;
    line_3?: string;
    line_4?: string;
  };
  b_address?: string;
  b_address_2?: string;
  b_city?: string;
  b_zipcode?: string;
  b_country_descr?: string;
  b_phone?: string;
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
  email?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  password1?: string; // ✅ Add this for password updates
  company?: string;
  vat_number?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  company_logo?: string;
  invoice_logo?: string;
  company_description?: string;
  terms?: string;
  // Bank details fields
  accountholder_full_name?: string;
  bank_name?: string;
  iban?: string;
  bic?: string;
  account_type?: number;
}

export const ACCOUNT_TYPES = {
  INDIVIDUAL: 1,
  BUSINESS: 2,
} as const;

// ✅ NEW: Helper function to get account type label
export const getAccountTypeLabel = (value: number | string): string => {
  const numValue = typeof value === 'string' ? parseInt(value) : value;
  return numValue === ACCOUNT_TYPES.BUSINESS ? 'Business' : 'Individual';
};

// ✅ NEW: Helper function to get account type options
export const getAccountTypeOptions = () => [
  {value: ACCOUNT_TYPES.INDIVIDUAL, name: 'Individual'},
  {value: ACCOUNT_TYPES.BUSINESS, name: 'Business'},
];

export interface ProfileLogoField {
  name: string;
  field_name: string;
  main_object: string;
  field_type: string;
  field_type_desc: string;
  field_disabled: boolean;
  logos: LogoData;
  required: boolean;
  variants: any;
}

export interface LogoImage {
  logo_id: string;
  layout_id: string;
  style_id: string;
  company_id: string;
  type: string;
  storefront_id: string;
  image: any[];
}

export interface LogoData {
  theme?: LogoImage;
  mail?: LogoImage;
}

export interface LogoUploadResponse {
  result: boolean;
  message: string;
  logo_data?: {
    theme?: string;
    mail?: string;
  };
}

export interface ProfileUpdateResponse {
  result: boolean;
  message: string;
  user_data?: UserProfile;
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
  id?: string;
  name?: string;
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

export interface ProductFilters {
  status?: 'A' | 'P' | 'D' | 'all';
  lowStock?: boolean;
  lowStockThreshold?: number;
  page?: number;
  itemsPerPage?: number;
  minPrice?: number; // NEW
  maxPrice?: number; // NEW
}

export interface DeleteProductResponse {
  result: boolean;
  message: string;
}

export interface StatusUpdateResponse {
  result: boolean;
  message: string;
}

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
  product_id?: number;
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

// FILE UPLOAD INTERFACES
export interface FileUploadParams {
  user_id?: string;
  lang_code?: string;
  type?: string;
  category?: string;
  product_id?: string;
}

export interface FileUploadResponse {
  result: boolean;
  message: string;
  file_data?: {
    relative_path: string;
    view_url: string;
  };
}

export interface WithdrawalRequest {
  amount: number;
  user_id: string;
  comments?: string;
}

export interface WithdrawalResponse {
  result: boolean;
  message: string;
  withdrawal_id?: string;
  new_balance?: string;
}

export interface ProductImagePair {
  pair_id: string | number;
  detailed_id?: string | number;
  image_id?: number;
  object_id?: string | number;
  position?: number;
  object_type?: string;
  detailed?: {
    object_id: string | number;
    object_type: string;
    type: string;
  };
}

export interface DeleteProductImageRequest {
  user_id: string;
  delete_image: 1;
  product_data: {
    product_id: string | number;
    lang_code: string;
    image_pairs?: {
      [pairId: string]: ProductImagePair;
    };
    main_pair?: ProductImagePair;
  };
}

export interface DeleteProductImageResponse {
  result: boolean;
  message: string;
}

export interface DeleteAccountResponse {
  result: boolean;
  message: string;
}

// Create the API client with the correct base URL and authorization
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: API_AUTH_HEADER,
  },
  timeout: 10000,
});

export const uploadCompanyLogoApi = async (
  userId: string,
  logoUri: string,
  logoType: 'theme' | 'mail' = 'theme',
): Promise<LogoUploadResponse> => {
  try {
    console.log('📤 Uploading company logo:', {userId, logoType, logoUri});

    const formData = new FormData();

    // Get the file name and type
    const uriParts = logoUri.split('/');
    const fileName =
      uriParts[uriParts.length - 1] || `logo_${logoType}_${Date.now()}.jpg`;

    // Determine mime type from file extension
    let mimeType = 'image/jpeg';
    if (fileName.toLowerCase().endsWith('.png')) {
      mimeType = 'image/png';
    } else if (
      fileName.toLowerCase().endsWith('.jpg') ||
      fileName.toLowerCase().endsWith('.jpeg')
    ) {
      mimeType = 'image/jpeg';
    }

    console.log('📋 File details:', {fileName, mimeType, logoType});

    // CRITICAL: Add the file with correct format
    formData.append(`file_logotypes_image_icon[${logoType}]`, {
      uri: logoUri,
      type: mimeType,
      name: fileName,
    } as any);

    // Add the metadata fields exactly as shown in the working curl
    formData.append(`type_logotypes_image_icon[${logoType}]`, 'local');
    formData.append(`is_high_res_logotypes_image_icon[${logoType}]`, '');
    formData.append('user_id', userId);
    formData.append('logo_update', '1');

    // Add the logotypes_image_data fields
    formData.append(`logotypes_image_data[${logoType}][type]`, 'M');
    formData.append(`logotypes_image_data[${logoType}][object_id]`, userId);
    formData.append(
      `logotypes_image_data[${logoType}][image_alt]`,
      logoType === 'theme' ? 'Company Logo' : 'Invoice Logo',
    );

    console.log('📦 FormData prepared with fields:', {
      file: `file_logotypes_image_icon[${logoType}]`,
      type: `type_logotypes_image_icon[${logoType}]`,
      user_id: userId,
      logo_update: '1',
      data_type: 'M',
      data_object_id: userId,
      data_image_alt: logoType === 'theme' ? 'Company Logo' : 'Invoice Logo',
    });

    const response = await fetch(
      'https://surf.mt/api.php?_d=NtSeProfilesApi', // UPDATED
      {
        method: 'POST',
        headers: {
          Authorization: API_AUTH_HEADER,
        },
        body: formData,
      },
    );

    const responseText = await response.text();
    console.log('📥 Logo upload response:', {
      status: response.status,
      responseText: responseText.substring(0, 500),
    });

    if (!response.ok) {
      console.error('❌ Upload failed with status:', response.status);
      return {
        result: false,
        message: `HTTP ${response.status}: Failed to upload logo`,
      };
    }

    try {
      const responseData = JSON.parse(responseText);

      console.log('📊 Parsed response:', responseData);

      if (responseData.result) {
        console.log('✅ Logo uploaded successfully');

        return {
          result: true,
          message: responseData.message || 'Logo uploaded successfully',
          logo_data: responseData.logo_data,
        };
      } else {
        console.error('❌ API returned result: false');
        return {
          result: false,
          message: responseData.message || 'Logo upload failed',
        };
      }
    } catch (parseError) {
      console.error('❌ Error parsing response:', parseError);

      // If we got 200 status but can't parse, assume success
      if (response.status === 200) {
        return {
          result: true,
          message: 'Logo uploaded successfully',
        };
      }
      throw parseError;
    }
  } catch (error: any) {
    console.error('❌ Upload logo error:', error);
    console.error('Error stack:', error.stack);
    throw new Error(error.message || 'Failed to upload logo');
  }
};

// Update the getProfileLogosApi to extract image URLs correctly
export const getProfileLogosApi = async (
  userId: string,
): Promise<LogoData | null> => {
  try {
    console.log('📥 Fetching profile logos for userId:', userId);

    const response = await fetchProfileApi(userId);

    // Find the Profile Logo section
    const logoSection = response.sections.find(
      section => section.section_type === 'profile_logo',
    );

    if (logoSection && logoSection.blocks.length > 0) {
      const logoField = logoSection.blocks[0].fields[0] as any;

      if (logoField && logoField.logos) {
        console.log('✅ Found logos:', logoField.logos);

        // Log the complete structure to debug
        console.log(
          '🔍 Theme logo structure:',
          JSON.stringify(logoField.logos.theme, null, 2),
        );
        console.log(
          '🔍 Mail logo structure:',
          JSON.stringify(logoField.logos.mail, null, 2),
        );

        return logoField.logos as LogoData;
      }
    }

    console.log('⚠️ No logos found in profile');
    return null;
  } catch (error) {
    console.error('❌ Get profile logos error:', error);
    return null;
  }
};

export const fetchNotificationsApi = async (
  userId: string,
  severity: string = 'N',
  section?: string, // 'administration' | 'products' | undefined for all
): Promise<NotificationsResponse> => {
  try {
    console.log('Fetching notifications for userId:', userId);

    let url = `https://surf.mt/api.php?_d=NtSeNotificationsApi&user_id=${userId}&severity=${severity}`; // UPDATED

    if (section) {
      url += `&section=${section}`;
    }

    const response = await axios({
      method: 'GET',
      url: url,
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
    });

    console.log('Notifications API response:', response.data);
    return response.data as NotificationsResponse;
  } catch (error: any) {
    console.error('Fetch Notifications API error:', error);

    if (error.response?.status === 404) {
      throw new Error('Notifications not found');
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to view notifications');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch notifications',
      );
    }
  }
};

// Add function to mark notification as read
export const markNotificationAsReadApi = async (
  userId: string,
  notificationId: string,
): Promise<{result: boolean; message: string}> => {
  try {
    console.log('Marking notification as read:', {userId, notificationId});

    const response = await axios({
      method: 'PUT',
      url: `https://surf.mt/api.php?_d=NtSeNotificationsApi`, // UPDATED
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      data: {
        user_id: userId,
        notification_id: notificationId,
        is_read: '1',
      },
    });

    console.log('Mark as read response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Mark notification as read error:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to mark notification as read',
    );
  }
};

// Add function to delete notification
export const deleteNotificationApi = async (
  userId: string,
  notificationId: string,
): Promise<{result: boolean; message: string}> => {
  try {
    console.log('Deleting notification:', {userId, notificationId});

    const response = await axios({
      method: 'DELETE',
      url: `https://surf.mt/api.php?_d=NtSeNotificationsApi`, // UPDATED
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      data: {
        user_id: userId,
        notification_id: notificationId,
      },
    });

    console.log('Delete notification response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Delete notification error:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to delete notification',
    );
  }
};

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

      if (depth === path.length - 1) {
        return true;
      }

      if (category.subcategories) {
        return findRecursive(category.subcategories, path, depth + 1);
      }
    }

    return false;
  };

  findRecursive(categories, categoryPath);
  return categoryIds;
};

// FILE UPLOAD API FUNCTIONS
export const uploadProductImageApi = async (
  imageUri: string,
  fileName: string,
  mimeType: string,
  params: FileUploadParams = {},
): Promise<{
  success: boolean;
  relativePath?: string;
  viewUrl?: string;
  error?: string;
}> => {
  try {
    console.log('🚀 Uploading product image:', {fileName, params});

    const formData = new FormData();

    // Add the file
    formData.append('file', {
      uri: imageUri,
      type: mimeType,
      name: fileName,
    } as any);

    // Add required parameters for the API to work
    formData.append('lang_code', params.lang_code || 'en');
    formData.append('type', params.type || 'product_image');

    // Add optional parameters if provided
    if (params.user_id) {
      formData.append('user_id', params.user_id);
    }
    if (params.category) {
      formData.append('category', params.category);
    }
    if (params.product_id) {
      formData.append('product_id', params.product_id);
    }

    console.log('📤 Sending upload request...');

    const response = await fetch(
      'https://surf.mt/api.php?_d=NtSeFileUploaderApi', // UPDATED
      {
        method: 'POST',
        headers: {
          Authorization: API_AUTH_HEADER,
        },
        body: formData,
      },
    );

    const responseText = await response.text();
    console.log(
      '📥 Upload response:',
      response.status,
      responseText.substring(0, 200) + '...',
    );

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${responseText}`,
      };
    }

    const responseData: FileUploadResponse = JSON.parse(responseText);

    if (responseData.result && responseData.file_data) {
      console.log('✅ Upload successful:', {
        fileName,
        relativePath: responseData.file_data.relative_path,
        viewUrl: responseData.file_data.view_url,
      });

      return {
        success: true,
        relativePath: responseData.file_data.relative_path,
        viewUrl: responseData.file_data.view_url,
      };
    } else {
      return {
        success: false,
        error: responseData.message || 'Upload failed - no file data returned',
      };
    }
  } catch (error: any) {
    console.error('💥 Upload error:', error);
    return {
      success: false,
      error: error.message || 'Network error during upload',
    };
  }
};

export const createWithdrawalApi = async (
  userId: string,
  amount: number,
  comments?: string,
): Promise<WithdrawalResponse> => {
  try {
    console.log('Creating withdrawal:', {userId, amount, comments});

    const response = await axios({
      method: 'POST',
      url: `https://surf.mt/api.php?_d=NtSeBalanceApi&user_id=${userId}`, // UPDATED
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      data: {
        amount: amount,
        user_id: parseInt(userId),
        comments: comments || 'Withdrawal',
      },
    });

    console.log('Withdrawal API response:', response.data);
    return response.data as WithdrawalResponse;
  } catch (error: any) {
    console.error('Create Withdrawal API error:', error);

    if (error.response?.status === 400) {
      throw new Error('Invalid withdrawal amount or insufficient balance');
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to make withdrawals');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else {
      throw new Error(
        error.response?.data?.message || 'Failed to process withdrawal',
      );
    }
  }
};

// Batch upload function optimized for product images
export const uploadMultipleProductImages = async (
  images: Array<{uri: string; fileName: string; type: string}>,
  params: FileUploadParams = {},
  onProgress?: (current: number, total: number, fileName: string) => void,
): Promise<{
  success: boolean;
  uploadedImages: Array<{
    fileName: string;
    relativePath: string;
    viewUrl: string;
  }>;
  errors: string[];
}> => {
  const uploadedImages: Array<{
    fileName: string;
    relativePath: string;
    viewUrl: string;
  }> = [];
  const errors: string[] = [];

  console.log(`🚀 Starting batch upload of ${images.length} images`);

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    if (onProgress) {
      onProgress(i, images.length, image.fileName);
    }

    try {
      const result = await uploadProductImageApi(
        image.uri,
        image.fileName,
        image.type,
        params,
      );

      if (result.success && result.relativePath && result.viewUrl) {
        uploadedImages.push({
          fileName: image.fileName,
          relativePath: result.relativePath,
          viewUrl: result.viewUrl,
        });
        console.log(`✅ Uploaded: ${image.fileName} -> ${result.relativePath}`);
      } else {
        const error = `Failed to upload ${image.fileName}: ${result.error}`;
        errors.push(error);
        console.error('❌', error);
      }
    } catch (error: any) {
      const errorMsg = `Error uploading ${image.fileName}: ${error.message}`;
      errors.push(errorMsg);
      console.error('❌', errorMsg);
    }

    if (onProgress) {
      onProgress(i + 1, images.length, image.fileName);
    }
  }

  const result = {
    success: uploadedImages.length > 0,
    uploadedImages,
    errors,
  };

  console.log('📊 Upload Summary:', {
    total: images.length,
    successful: uploadedImages.length,
    failed: errors.length,
  });

  return result;
};

// AUTHENTICATION
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

// INITIALIZER
export const fetchInitializerApi = async () => {
  try {
    console.log('📡 [API] Fetching initializer data...');

    // ✅ Use the correct endpoint format
    const response = await apiClient.get(`/api.php`, {
      params: {
        _d: 'NtSeInitializerApi',
      },
    });

    console.log('✅ [API] Initializer data fetched successfully');
    console.log('📊 Response data:', {
      hasPrivacyPolicy: !!response.data.privacy_policy_page,
      hasTermsOfUse: !!response.data.terms_of_use_page,
      hasWhatsappUrl: !!response.data.whatsapp_url,
      privacyPolicyUrl: response.data.privacy_policy_page,
      termsOfUseUrl: response.data.terms_of_use_page,
    });

    return response.data as InitializerResponse;
  } catch (error) {
    console.error('❌ [API] Fetch Initializer error:', error);
    throw error;
  }
};

// PROFILE
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

// Update the updateProfileApi function - add account_type handling
export const updateProfileApi = async (
  userId: string,
  profileData: Partial<UserProfile>,
  currentProfileData?: UserProfile | null,
): Promise<ProfileUpdateResponse> => {
  try {
    console.log('🔄 Updating profile for userId:', userId);
    console.log('📝 New data to update:', profileData);
    console.log('📋 Current profile data:', currentProfileData);

    const userData: any = {};
    const companyData: any = {};

    // Helper function to check if a value is provided in the update
    const isUpdating = (key: keyof UserProfile) =>
      profileData.hasOwnProperty(key);

    // Populate with existing data ONLY for fields NOT being updated
    if (currentProfileData) {
      // User data fields
      if (!isUpdating('email') && currentProfileData.email !== undefined) {
        userData.email = currentProfileData.email;
      }
      if (
        !isUpdating('firstname') &&
        currentProfileData.firstname !== undefined
      ) {
        userData.firstname = currentProfileData.firstname;
      }
      if (
        !isUpdating('lastname') &&
        currentProfileData.lastname !== undefined
      ) {
        userData.lastname = currentProfileData.lastname;
      }
      if (!isUpdating('phone') && currentProfileData.phone !== undefined) {
        userData.phone = currentProfileData.phone;
      }

      // Company data fields
      if (!isUpdating('company') && currentProfileData.company !== undefined) {
        companyData.company = currentProfileData.company;
      }
      if (
        !isUpdating('vat_number') &&
        currentProfileData.vat_number !== undefined
      ) {
        companyData.fields_52 = currentProfileData.vat_number;
      }
      if (!isUpdating('address') && currentProfileData.address !== undefined) {
        companyData.address = currentProfileData.address;
      }
      if (!isUpdating('city') && currentProfileData.city !== undefined) {
        companyData.city = currentProfileData.city;
      }
      if (
        !isUpdating('postal_code') &&
        currentProfileData.postal_code !== undefined
      ) {
        companyData.postal_code = currentProfileData.postal_code;
      }
      if (!isUpdating('country') && currentProfileData.country !== undefined) {
        companyData.country = currentProfileData.country;
      }
      if (
        !isUpdating('company_description') &&
        currentProfileData.company_description !== undefined
      ) {
        companyData.company_description =
          currentProfileData.company_description;
      }
      if (!isUpdating('terms') && currentProfileData.terms !== undefined) {
        companyData.terms = currentProfileData.terms;
      }

      // Bank details - ONLY include if NOT being updated
      if (
        !isUpdating('accountholder_full_name') &&
        currentProfileData.accountholder_full_name !== undefined
      ) {
        companyData.fields_53 = currentProfileData.accountholder_full_name;
      }
      if (
        !isUpdating('bank_name') &&
        currentProfileData.bank_name !== undefined
      ) {
        companyData.fields_57 = currentProfileData.bank_name;
      }
      if (!isUpdating('iban') && currentProfileData.iban !== undefined) {
        companyData.fields_54 = currentProfileData.iban;
      }
      if (!isUpdating('bic') && currentProfileData.bic !== undefined) {
        companyData.fields_56 = currentProfileData.bic;
      }
      // ✅ NEW: Account Type
      if (
        !isUpdating('account_type') &&
        currentProfileData.account_type !== undefined
      ) {
        companyData.fields_55 = currentProfileData.account_type;
      }
    }

    if (profileData.email !== undefined) {
      userData.email = profileData.email;
    }
    if (profileData.firstname !== undefined) {
      userData.firstname = profileData.firstname;
    }
    if (profileData.lastname !== undefined) {
      userData.lastname = profileData.lastname;
    }
    if (profileData.phone !== undefined) {
      userData.phone = profileData.phone;
    }
    // ✅ NEW: Handle password update
    if (profileData.password1 !== undefined) {
      userData.password1 = profileData.password1;
      console.log('✅ Updating password');
    }

    // Company data
    if (profileData.company !== undefined) {
      companyData.company = profileData.company;
    }
    if (profileData.vat_number !== undefined) {
      companyData.fields_52 = profileData.vat_number;
    }
    if (profileData.address !== undefined) {
      companyData.address = profileData.address;
    }
    if (profileData.city !== undefined) {
      companyData.city = profileData.city;
    }
    if (profileData.postal_code !== undefined) {
      companyData.postal_code = profileData.postal_code;
    }
    if (profileData.country !== undefined) {
      companyData.country = profileData.country;
    }
    if (profileData.company_description !== undefined) {
      companyData.company_description = profileData.company_description;
    }
    if (profileData.terms !== undefined) {
      companyData.terms = profileData.terms;
    }

    // Bank details updates - MAP to correct field names
    if (profileData.accountholder_full_name !== undefined) {
      companyData.fields_53 = profileData.accountholder_full_name;
      console.log(
        '✅ Updating fields_53 (Account Holder) to:',
        profileData.accountholder_full_name,
      );
    }
    if (profileData.bank_name !== undefined) {
      companyData.fields_57 = profileData.bank_name;
      console.log(
        '✅ Updating fields_57 (Bank Name) to:',
        profileData.bank_name,
      );
    }
    if (profileData.iban !== undefined) {
      companyData.fields_54 = profileData.iban;
      console.log('✅ Updating fields_54 (IBAN) to:', profileData.iban);
    }
    if (profileData.bic !== undefined) {
      companyData.fields_56 = profileData.bic;
      console.log('✅ Updating fields_56 (BIC) to:', profileData.bic);
    }
    // ✅ NEW: Account Type update
    if (profileData.account_type !== undefined) {
      companyData.fields_55 = profileData.account_type;
      console.log(
        '✅ Updating fields_55 (Account Type) to:',
        profileData.account_type,
      );
    }

    const requestBody = {
      user_id: parseInt(userId),
      user_data: userData,
      company_data: companyData,
    };

    console.log('📤 Final request body:', JSON.stringify(requestBody, null, 2));

    const response = await axios({
      method: 'POST',
      url: 'https://surf.mt/api.php?_d=NtSeProfilesApi', // UPDATED
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      data: requestBody,
      timeout: 10000,
    });

    console.log('📥 Update Profile API response:', response.data);

    if (
      typeof response.data === 'string' &&
      response.data.includes('<b>Warning</b>')
    ) {
      throw new Error('Server returned an error. Please try again.');
    }

    return response.data;
  } catch (error: any) {
    console.error('❌ Update Profile API error:', error);

    if (error.code === 'ECONNABORTED') {
      throw new Error(
        'Request timeout. Please check your connection and try again.',
      );
    } else if (error.response?.status === 400) {
      throw new Error(
        error.response?.data?.message || 'Invalid profile data provided',
      );
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to update this profile');
    } else if (error.response?.status === 404) {
      throw new Error('Profile not found');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Failed to update profile',
      );
    }
  }
};

// BALANCE
export const fetchBalanceApi = async (
  userId: string,
  page: number = 1,
  itemsPerPage: number = 10,
  status?: 'Pending' | 'Completed' | 'Declined' | 'Failed',
  type?: 'payouts' | 'withdrawals',
): Promise<BalanceResponse> => {
  try {
    console.log('Fetching balance for userId:', userId);

    let url = `https://surf.mt/api.php?_d=NtSeBalanceApi&user_id=${userId}`; // UPDATED

    url += `&page=${page}&items_per_page=${itemsPerPage}`;

    if (status) {
      url += `&status=${status}`;
    }

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

// PRODUCTS
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

    let url = `${API_BASE_URL}/api.php?_d=NtSeProductsApi&user_id=${userId}`;

    if (status !== 'all') {
      url += `&status=${status}`;
    }

    if (lowStock) {
      url += `&status=A&amount_to=${lowStockThreshold}`;
    }

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
    console.log('🌐 Fetching product details from API:', {userId, productId});

    const response = await apiClient.get(`/api.php`, {
      params: {
        _d: 'NtSeProductsApi',
        user_id: userId,
        product_id: productId,
        for_product_data: true,
      },
    });

    // ✅ ADD THIS: Log complete raw response
    console.log('='.repeat(80));
    console.log('📡 RAW API RESPONSE FROM SERVER:');
    console.log('='.repeat(80));
    console.log('Response Status:', response.status);
    console.log('Response Headers:', JSON.stringify(response.headers, null, 2));
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
    console.log('='.repeat(80));

    return response.data as ProductDetailsResponse;
  } catch (error) {
    console.error('❌ Fetch Product Details API error:', error);
    throw error;
  }
};

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

    let url = `${API_BASE_URL}/api.php?_d=NtSeProductsApi&user_id=${userId}&search=${encodeURIComponent(
      searchTerm,
    )}`;

    if (status !== 'all') {
      url += `&status=${status}`;
    }

    if (lowStock) {
      url += `&status=A&amount_to=${lowStockThreshold}`;
    }

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

export const updateProductStatusApi = async (
  userId: string,
  productId: string,
  status: 'A' | 'D' | 'H' | 'X',
): Promise<StatusUpdateResponse> => {
  try {
    console.log('Updating product status:', {userId, productId, status});

    const response = await axios({
      method: 'PUT',
      url: `https://surf.mt/api.php?_d=NtSeProductsApi%2F${userId}`, // UPDATED
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

export const toggleProductStatusApi = async (
  userId: string,
  productId: string,
  isActive: boolean,
): Promise<StatusUpdateResponse> => {
  const status = isActive ? 'A' : 'D';
  return await updateProductStatusApi(userId, productId, status);
};

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
      url: `https://surf.mt/api.php?_d=NtSeProductsApi%2F${userId}`, // UPDATED
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

export const deleteProductApi = async (
  userId: string,
  productIds: string | string[],
): Promise<DeleteProductResponse> => {
  try {
    const productIdsString = Array.isArray(productIds)
      ? productIds.join(',')
      : productIds;

    console.log('Deleting products:', {userId, productIds: productIdsString});

    const response = await axios({
      method: 'PUT',
      url: `https://surf.mt/api.php?_d=NtSeProductsApi%2F${userId}`, // UPDATED
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

export const deleteSingleProductApi = async (
  userId: string,
  productId: string,
): Promise<DeleteProductResponse> => {
  return deleteProductApi(userId, productId);
};

export const deleteMultipleProductsApi = async (
  userId: string,
  productIds: string[],
): Promise<DeleteProductResponse> => {
  return deleteProductApi(userId, productIds);
};

// CATEGORIES
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

const transformCategoriesData = (apiResponse: any): CategoryData[] => {
  if (apiResponse.categories && Array.isArray(apiResponse.categories)) {
    return apiResponse.categories.map((category: any) =>
      transformCategoryRecursive(category),
    );
  }

  return [];
};

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

// PRODUCT CREATION/UPDATE
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

export const updateProductApi = async (
  productData: CreateProductRequest,
): Promise<CreateProductResponse> => {
  try {
    if (!productData.product_id) {
      throw new Error('Product ID is required for update');
    }

    console.log('🔄 Updating product with complete image replacement:', {
      productId: productData.product_id,
      productName: productData.product_data.product,
      imageCount: productData.image_pair_positon?.length || 0,
      imagePaths: productData.image_pair_positon,
    });

    // IMPORTANT: The API should replace ALL images with this new set
    const response = await axios({
      method: 'POST',
      url: `${API_BASE_URL}/api.php?_d=NtSeProductsApi`,
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      data: {
        ...productData,
        // Ensure we're explicitly updating images
        update_images: true, // Add this flag if your API supports it
      },
    });

    console.log('✅ Product update response:', response.data);

    if (response.data.result === false) {
      throw new Error(response.data.message || 'Product update failed');
    }

    return response.data as CreateProductResponse;
  } catch (error: any) {
    console.error('❌ Update Product API error:', error);

    if (error.response?.status === 404) {
      throw new Error('Product not found');
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to update this product');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error occurred while updating product');
    } else {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update product';
      console.error('Full error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: errorMessage,
      });
      throw new Error(errorMessage);
    }
  }
};

export const transformFormDataToApiFormat = (
  formData: any,
  userId: string,
  editMode: boolean = false,
  availableCategories: CategoryData[] = [],
  originalImages?: string[],
): CreateProductRequest => {
  console.log('🔄 Transforming form data to API format:', formData);

  // Extract category IDs
  let categoryIds: number[] = [309];
  if (
    formData.categoryPath &&
    formData.categoryPath.length > 0 &&
    availableCategories.length > 0
  ) {
    const foundIds = findCategoryIdByPath(
      availableCategories,
      formData.categoryPath,
    );
    if (foundIds.length > 0) {
      categoryIds = foundIds;
    }
  }

  // ✅ UPDATED: Handle tax_ids correctly
  let taxIds: number[] = [];
  if (formData.tax_ids) {
    // If tax_ids is already an array, use it
    taxIds = Array.isArray(formData.tax_ids) ? formData.tax_ids : [];
  } else if (formData.taxType === 'VAT') {
    // Fallback: if taxType is 'VAT', add tax ID 6
    taxIds = [6];
  }

  console.log('💰 Tax configuration:', {
    formData_tax_ids: formData.tax_ids,
    formData_taxType: formData.taxType,
    final_taxIds: taxIds,
  });

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
      list_qty_count: formData.listQtyCount || '',
      max_qty: formData.maxQuantity || '',
      min_qty: formData.minQuantity || '',
      options_type: 'P',
      out_of_stock_actions: 'N',
      popularity: '',
      price: parseFloat(formData.price || '0').toFixed(8),
      product: formData.productName || '',
      product_code: formData.productCode || '',
      promo_text: '',
      qty_step: formData.qtyStep || '',
      sales_amount: '',
      search_words: '',
      short_description: '',
      status: 'A',
      tax_ids: taxIds, // ✅ Use the calculated tax IDs
      timestamp: Math.floor(Date.now() / 1000).toString(),
      tracking: formData.trackInventory ? 'B' : 'N',
      usergroup_ids: [],
      zero_price_action: 'P',
    },
    user_id: userId,
  };

  // Collect ALL product features from formData
  const productFeature: {[key: string]: string} = {};

  Object.keys(formData).forEach(key => {
    if (key.startsWith('feature_')) {
      const fieldName = key.replace('feature_', '');
      const value = formData[key];

      if (value) {
        productFeature[fieldName] = value;
        console.log(`✅ Adding feature: ${fieldName} = ${value}`);
      }
    }
  });

  if (Object.keys(productFeature).length > 0) {
    (apiData as any).product_feature = productFeature;
    console.log('🎨 Product features to send:', productFeature);
  }

  // Handle images
  const imagePaths: string[] = [];

  if (editMode) {
    const currentImages = formData.images || [];
    for (const imageUrl of currentImages) {
      if (imageUrl.startsWith('http')) {
        const relativePath = extractRelativePathFromUrl(imageUrl);
        if (relativePath && !imagePaths.includes(relativePath)) {
          imagePaths.push(relativePath);
        }
      }
    }

    if (formData.imageRelativePaths && formData.imageRelativePaths.length > 0) {
      for (const relativePath of formData.imageRelativePaths) {
        if (
          relativePath &&
          !relativePath.startsWith('http') &&
          !imagePaths.includes(relativePath)
        ) {
          imagePaths.push(relativePath);
        }
      }
    }
  } else {
    if (formData.imageRelativePaths && formData.imageRelativePaths.length > 0) {
      formData.imageRelativePaths.forEach((path: string) => {
        if (path && !path.startsWith('http') && !imagePaths.includes(path)) {
          imagePaths.push(path);
        }
      });
    }
  }

  if (imagePaths.length > 0) {
    apiData.image_pair_positon = imagePaths;
  } else {
    apiData.image_pair_positon = [];
  }

  if (editMode && formData.productId) {
    apiData.product_id = parseInt(formData.productId);
  }

  console.log('🎯 Final API data:', {
    productId: apiData.product_id,
    productName: apiData.product_data.product,
    imageCount: apiData.image_pair_positon?.length || 0,
    tax_ids: apiData.product_data.tax_ids,
    productFeature: (apiData as any).product_feature,
    isEdit: editMode,
  });

  return apiData;
};

// ENHANCED: Better relative path extraction function
export const extractRelativePathFromUrl = (url: string): string => {
  if (!url || !url.startsWith('http')) {
    return url; // Already a relative path
  }

  try {
    console.log('🔗 Extracting relative path from URL:', url);

    // ✅ UPDATED: Specific pattern for surf.mt URLs (production)
    // Example: https://surf.mt/images/detailed/123/image.jpg -> images/detailed/123/image.jpg
    const surfPattern = /https?:\/\/surf\.mt\/(.+)$/;
    const match = url.match(surfPattern);

    if (match && match[1]) {
      // Remove any query parameters
      const relativePath = match[1].split('?')[0];
      console.log(`✅ Extracted relative path: ${url} -> ${relativePath}`);
      return relativePath;
    }

    // Fallback: try general pattern (works for both dev and prod)
    const generalPattern = /https?:\/\/[^\/]+\/(.+)$/;
    const generalMatch = url.match(generalPattern);

    if (generalMatch && generalMatch[1]) {
      const relativePath = generalMatch[1].split('?')[0];
      console.log(`✅ Extracted with fallback: ${url} -> ${relativePath}`);
      return relativePath;
    }

    // Last resort: return URL as-is
    console.warn(
      '⚠️ Could not extract relative path, returning original URL:',
      url,
    );
    return url;
  } catch (error) {
    console.error('❌ Error extracting relative path:', error);
    return url;
  }
};

// ORDERS
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

    const url = `https://surf.mt/api.php?_d=NtSeOrdersApi&user_id=${userId}`; // UPDATED
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

    const url = `https://surf.mt/api.php?_d=NtSeOrdersApi&user_id=${userId}&order_id=${orderId}`; // UPDATED

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

export const deleteProductImageApi = async (
  userId: string,
  productId: string,
  imagePairData: {
    pairId: string;
    detailedId: string;
    isMainPair?: boolean;
  },
): Promise<DeleteProductImageResponse> => {
  try {
    console.log('🗑️ Deleting product image:', {
      userId,
      productId,
      imagePairData,
    });

    const imageObject: ProductImagePair = {
      pair_id: imagePairData.pairId,
      detailed_id: imagePairData.detailedId,
      object_id: productId,
    };

    const requestData: DeleteProductImageRequest = {
      user_id: userId,
      delete_image: 1,
      product_data: {
        product_id: productId,
        lang_code: 'en',
      },
    };

    if (imagePairData.isMainPair) {
      requestData.product_data.main_pair = {
        ...imageObject,
        image_id: 0,
        position: 0,
        object_type: 'product',
        detailed: {
          object_id: productId,
          object_type: 'product',
          type: 'M',
        },
      };
    } else {
      requestData.product_data.image_pairs = {
        [imagePairData.pairId]: imageObject,
      };
    }

    console.log(
      '📤 Delete request payload:',
      JSON.stringify(requestData, null, 2),
    );

    const response = await axios({
      method: 'POST',
      url: `${API_BASE_URL}/api.php?_d=NtSeProductsApi&user_id=${userId}`,
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      data: requestData,
    });

    console.log('📥 Delete image response:', response.data);
    return response.data as DeleteProductImageResponse;
  } catch (error: any) {
    console.error('❌ Delete Product Image API error:', error);

    if (error.response?.status === 404) {
      throw new Error('Product or image not found');
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to delete this image');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error occurred while deleting image');
    } else {
      throw new Error(
        error.response?.data?.message || 'Failed to delete product image',
      );
    }
  }
};

export const searchOrdersApi = async (
  userId: string,
  searchTerm: string,
  page: number = 1,
) => {
  try {
    console.log('Searching orders with:', {userId, searchTerm, page});

    const url = `https://surf.mt/api.php?_d=NtSeOrdersApi&user_id=${userId}`; // UPDATED
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

export const updateOrderStatusApi = async (
  userId: string,
  orderId: string,
  status: string, // ✅ Accept API status code directly
): Promise<OrderStatusUpdateResponse> => {
  try {
    console.log('Updating order status:', {userId, orderId, status});

    const url = `https://surf.mt/api.php?_d=NtSeOrdersApi%2F${orderId}`; // UPDATED

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
        status_to: status, // ✅ Pass status directly
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

// DASHBOARD
export const fetchDashboardApi = async (
  userId: string,
): Promise<DashboardResponse> => {
  try {
    console.log('Fetching dashboard for userId:', userId);

    const response = await axios({
      method: 'GET',
      // ✅ FIXED: Removed extra '/api/' - should be just one 'api.php'
      url: `https://surf.mt/api.php?_d=NtSeDashboardApi&user_id=${userId}`,
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
    });

    console.log('Dashboard API response:', response.data);
    return response.data as DashboardResponse;
  } catch (error: any) {
    console.error('Fetch Dashboard API error:', error);

    if (error.response?.status === 404) {
      throw new Error('Dashboard data not found');
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to view dashboard');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch dashboard data',
      );
    }
  }
};

export const deleteAccountApi = async (
  userId: string,
  userData: {
    email?: string;
    firstname?: string;
    lastname?: string;
  },
  companyData: {
    fields_53?: string;
    fields_54?: string;
    fields_56?: string;
    fields_57?: string;
  },
): Promise<DeleteAccountResponse> => {
  try {
    console.log('🗑️ Deleting account for userId:', userId);

    const requestBody = {
      user_data: userData,
      company_data: companyData,
      user_id: parseInt(userId),
      delete: 1, // ✅ This triggers account deletion
    };

    console.log(
      '📤 Delete account request:',
      JSON.stringify(requestBody, null, 2),
    );

    const response = await axios({
      method: 'POST',
      url: 'https://surf.mt/api.php?_d=NtSeProfilesApi', // UPDATED
      headers: {
        Authorization: API_AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      data: requestBody,
      timeout: 10000,
    });

    console.log('📥 Delete account response:', response.data);

    return response.data as DeleteAccountResponse;
  } catch (error: any) {
    console.error('❌ Delete Account API error:', error);

    if (error.code === 'ECONNABORTED') {
      throw new Error(
        'Request timeout. Please check your connection and try again.',
      );
    } else if (error.response?.status === 400) {
      throw new Error(error.response?.data?.message || 'Invalid request');
    } else if (error.response?.status === 403) {
      throw new Error('You do not have permission to delete this account');
    } else if (error.response?.status === 404) {
      throw new Error('Account not found');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Failed to delete account',
      );
    }
  }
};

export default apiClient;
