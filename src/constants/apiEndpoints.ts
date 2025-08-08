export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api.php?_d=NtSeLoginApi',
  },
  PRODUCTS: {
    LIST: '/api.php?_d=NtSeProductsApi',
    DETAIL: '/api.php?_d=NtSeProductsApi',
    UPDATE_STATUS: '/api.php?_d=NtSeProductsApi',
    BY_STATUS: '/api.php?_d=NtSeProductsApi',
    LOW_STOCK: '/api.php?_d=NtSeProductsApi',
    SEARCH: '/api.php?_d=NtSeProductsApi',
  },
  ORDERS: {
    LIST: '/api.php?_d=NtSeOrdersApi',
    DETAIL: '/api.php?_d=NtSeOrdersApi',
  },
  PROFILE: {
    GET: '/api.php?_d=NtSeProfilesApi',
    UPDATE: '/api.php?_d=NtSeProfilesApi',
  },
  INITIALIZER: {
    GET: '/api.php?_d=NtSeInitializerApi',
  },
};

// Filter status constants
export const PRODUCT_STATUS = {
  ACTIVE: 'A',
  PENDING: 'P',
  DISABLED: 'D',
  ALL: 'all',
} as const;

// Filter types
export const FILTER_TYPES = {
  ALL: 'all',
  ACTIVE: 'active',
  PENDING: 'pending',
  DISABLED: 'disabled',
  LOW_STOCK: 'lowStock',
} as const;

// Default filter settings
export const DEFAULT_FILTER_SETTINGS = {
  LOW_STOCK_THRESHOLD: 2,
  ITEMS_PER_PAGE: 10,
  SEARCH_DEBOUNCE_MS: 300,
} as const;
