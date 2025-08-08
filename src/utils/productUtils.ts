// src/utils/productUtils.ts

import {ProductStatus, FilterType, Product} from '../types/product';
import {PRODUCT_STATUS, FILTER_TYPES} from '../constants/apiEndpoints';

/**
 * Maps filter ID to API status parameter
 */
export const mapFilterToStatus = (
  filterId: FilterType,
): ProductStatus | 'all' => {
  const statusMap: Record<FilterType, ProductStatus | 'all'> = {
    [FILTER_TYPES.ALL]: PRODUCT_STATUS.ALL,
    [FILTER_TYPES.ACTIVE]: PRODUCT_STATUS.ACTIVE,
    [FILTER_TYPES.PENDING]: PRODUCT_STATUS.PENDING,
    [FILTER_TYPES.DISABLED]: PRODUCT_STATUS.DISABLED,
    [FILTER_TYPES.LOW_STOCK]: PRODUCT_STATUS.ACTIVE, // Low stock applies to active products
  };

  return statusMap[filterId] || PRODUCT_STATUS.ALL;
};

/**
 * Gets human-readable status label
 */
export const getStatusLabel = (status: ProductStatus): string => {
  const labels: Record<ProductStatus, string> = {
    [PRODUCT_STATUS.ACTIVE]: 'Active',
    [PRODUCT_STATUS.PENDING]: 'Pending',
    [PRODUCT_STATUS.DISABLED]: 'Hidden',
  };

  return labels[status] || 'Unknown';
};

/**
 * Gets status color for UI
 */
export const getStatusColor = (status: ProductStatus): string => {
  const colors: Record<ProductStatus, string> = {
    [PRODUCT_STATUS.ACTIVE]: '#1FC16B', // Green
    [PRODUCT_STATUS.PENDING]: '#DFB400', // Yellow
    [PRODUCT_STATUS.DISABLED]: '#BBBBBB', // Grey
  };

  return colors[status] || '#BBBBBB';
};

/**
 * Checks if product is low in stock
 */
export const isLowStock = (
  product: Product,
  threshold: number = 2,
): boolean => {
  return (
    product.amount <= threshold && product.status === PRODUCT_STATUS.ACTIVE
  );
};

/**
 * Formats product price with currency
 */
export const formatProductPrice = (
  price: string | number,
  currency: string = '€',
): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numericPrice)) return `${currency}0.00`;

  return `${currency}${numericPrice.toFixed(2)}`;
};

/**
 * Validates product data
 */
export const validateProduct = (product: Partial<Product>): string[] => {
  const errors: string[] = [];

  if (!product.product || product.product.trim() === '') {
    errors.push('Product name is required');
  }

  if (!product.price || parseFloat(product.price) <= 0) {
    errors.push('Valid price is required');
  }

  if (product.amount !== undefined && product.amount < 0) {
    errors.push('Stock amount cannot be negative');
  }

  return errors;
};

/**
 * Filters products locally (for additional client-side filtering)
 */
export const filterProductsLocally = (
  products: Product[],
  filters: {
    searchTerm?: string;
    status?: ProductStatus | 'all';
    lowStock?: boolean;
    lowStockThreshold?: number;
  },
): Product[] => {
  let filtered = [...products];

  // Search filter
  if (filters.searchTerm && filters.searchTerm.trim() !== '') {
    const searchLower = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(
      product =>
        product.product.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.product_id.toLowerCase().includes(searchLower),
    );
  }

  // Status filter
  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(product => product.status === filters.status);
  }

  // Low stock filter
  if (filters.lowStock) {
    const threshold = filters.lowStockThreshold || 2;
    filtered = filtered.filter(product => isLowStock(product, threshold));
  }

  return filtered;
};

/**
 * Sorts products by various criteria
 */
export const sortProducts = (
  products: Product[],
  sortBy: 'name' | 'price' | 'stock' | 'status' = 'name',
  order: 'asc' | 'desc' = 'asc',
): Product[] => {
  const sorted = [...products];

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'name':
        comparison = a.product.localeCompare(b.product);
        break;
      case 'price':
        comparison = parseFloat(a.price) - parseFloat(b.price);
        break;
      case 'stock':
        comparison = a.amount - b.amount;
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
    }

    return order === 'desc' ? -comparison : comparison;
  });

  return sorted;
};

/**
 * Groups products by status
 */
export const groupProductsByStatus = (
  products: Product[],
): Record<ProductStatus, Product[]> => {
  return products.reduce((groups, product) => {
    if (!groups[product.status]) {
      groups[product.status] = [];
    }
    groups[product.status].push(product);
    return groups;
  }, {} as Record<ProductStatus, Product[]>);
};

/**
 * Calculates total inventory value
 */
export const calculateInventoryValue = (products: Product[]): number => {
  return products.reduce((total, product) => {
    const price = parseFloat(product.price) || 0;
    return total + price * product.amount;
  }, 0);
};

/**
 * Gets products that need attention (low stock, pending status, etc.)
 */
export const getProductsNeedingAttention = (
  products: Product[],
  lowStockThreshold: number = 2,
): {
  lowStock: Product[];
  pending: Product[];
  outOfStock: Product[];
} => {
  return {
    lowStock: products.filter(p => isLowStock(p, lowStockThreshold)),
    pending: products.filter(p => p.status === PRODUCT_STATUS.PENDING),
    outOfStock: products.filter(
      p => p.amount === 0 && p.status === PRODUCT_STATUS.ACTIVE,
    ),
  };
};

/**
 * Generates filter options with counts
 */
export const generateFilterOptions = (filterCounts: Record<string, number>) => {
  return [
    {
      id: FILTER_TYPES.ALL,
      label: `All${filterCounts.all > 0 ? ` ${filterCounts.all}` : ''}`,
      count: filterCounts.all,
    },
    {
      id: FILTER_TYPES.ACTIVE,
      label: `Active${
        filterCounts.active > 0 ? ` ${filterCounts.active}` : ''
      }`,
      count: filterCounts.active,
    },
    {
      id: FILTER_TYPES.LOW_STOCK,
      label: `Low Stock${
        filterCounts.lowStock > 0 ? ` ${filterCounts.lowStock}` : ''
      }`,
      count: filterCounts.lowStock,
    },
    {
      id: FILTER_TYPES.PENDING,
      label: `Pending${
        filterCounts.pending > 0 ? ` ${filterCounts.pending}` : ''
      }`,
      count: filterCounts.pending,
    },
    {
      id: FILTER_TYPES.DISABLED,
      label: `Hidden${
        filterCounts.disabled > 0 ? ` ${filterCounts.disabled}` : ''
      }`,
      count: filterCounts.disabled,
    },
  ];
};
