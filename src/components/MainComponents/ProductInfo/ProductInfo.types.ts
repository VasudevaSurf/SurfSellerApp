// src/components/MainComponents/ProductInfo/ProductInfo.types.ts

import {StyleProp, ViewStyle} from 'react-native';

export interface ProductInfoProps {
  productId: string;
  orderImage: string;
  productName: string;
  sellerPrice: string;
  platformFee: string;
  stock: string;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
  onActiveChange?: (isActive: boolean) => void;
  onShare?: () => void;
  onMoreOptions?: () => void;
  onLongPress?: (productId: string) => void;
  productData?: {
    productId?: string;
    productName: string;
    price: string;
    category: string;
    subcategory?: string;
    description: string;
    images: string[];
    productCode: string;
    quantity: string;
    minQuantity: string;
    maxQuantity: string;
    trackInventory: boolean;
    taxType: string;
    brand: string;
    color: string;
    size: string;
    weight: string;
    manufacturer: string;
    countryOfOrigin: string;
    status?: string;
    // Additional API data
    listPrice?: string;
    formatListPrice?: string;
    productType?: string;
    companyId?: string;
    isReturnable?: boolean;
    returnPeriod?: string;
    averageRating?: string;
    ageVerification?: boolean;
    ageLimit?: string;
    statusDetails?: any;
  };
  disabled?: boolean; // NEW: Add disabled prop for status toggle functionality
}
