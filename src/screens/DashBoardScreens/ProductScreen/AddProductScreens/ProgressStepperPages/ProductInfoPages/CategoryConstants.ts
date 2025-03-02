import React from 'react';
import {View} from 'react-native';
import {ColorPalette} from '../../../../../../config/colorPalette';

export interface SubCategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: React.ReactNode;
  subcategories?: SubCategory[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'men',
    name: 'Men',
    subcategories: [
      {id: 'men-top', name: 'Top wear'},
      {id: 'men-bottom', name: 'Bottom wear'},
      {id: 'men-inner', name: 'Inner wear & Sleep wear'},
      {id: 'men-sports', name: 'Sports & Activity wear'},
      {id: 'men-foot', name: 'Foot wear'},
      {id: 'men-accessories', name: "Men's accessories"},
      {id: 'men-personal', name: 'Personal care & Grooming'},
    ],
  },
  {
    id: 'women',
    name: 'Women',
    subcategories: [
      {id: 'women-top', name: 'Top wear'},
      {id: 'women-bottom', name: 'Bottom wear'},
      {id: 'women-inner', name: 'Inner wear & Sleep wear'},
      {id: 'women-sports', name: 'Sports & Activity wear'},
    ],
  },
  {
    id: 'kids',
    name: 'Kids',
  },
  {
    id: 'beauty',
    name: 'Beauty Care',
  },
  {
    id: 'jewelry',
    name: 'Jewellery',
  },
  {
    id: 'accessories',
    name: 'Accessories',
  },
  {
    id: 'home',
    name: 'Home & Kitchen',
  },
  {
    id: 'footwear',
    name: 'Footwear & Bags',
  },
  {
    id: 'living',
    name: 'Home & Living',
  },
  {
    id: 'health',
    name: 'Health & Wellness',
  },
];

// Search-related constants
export const PLACEHOLDER_TEXT = {
  CATEGORY_SEARCH: 'Search category',
  SUBCATEGORY_SEARCH: 'Search subcategory',
};

// UI strings
export const UI_TEXT = {
  SELECT_CATEGORY: 'Select category',
  SELECT_SUBCATEGORY: 'Select subcategory',
  NO_CATEGORIES: 'No categories found',
  NO_SUBCATEGORIES: 'No subcategories found',
};
