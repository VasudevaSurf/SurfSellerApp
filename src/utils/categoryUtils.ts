// src/utils/categoryUtils.ts

import {CategoryData} from '../services/apiService';

// Helper function to find category ID by path
export const findCategoryIdByPath = (
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

// Helper function to get category path from category IDs
export const getCategoryPathFromIds = (
  categories: CategoryData[],
  categoryIds: number[],
): string[] => {
  const path: string[] = [];

  const findRecursive = (
    cats: CategoryData[],
    targetIds: number[],
    currentPath: string[] = [],
  ): boolean => {
    for (const category of cats) {
      const categoryId = parseInt(category.id);
      const newPath = [...currentPath, category.name];

      if (targetIds.includes(categoryId)) {
        // Found one of our target categories
        path.push(...newPath);

        // If we've found all categories, return true
        if (path.length === targetIds.length) {
          return true;
        }
      }

      // Search in subcategories
      if (category.subcategories) {
        if (findRecursive(category.subcategories, targetIds, newPath)) {
          return true;
        }
      }
    }

    return false;
  };

  findRecursive(categories, categoryIds);
  return path;
};

// Transform form data to include proper category IDs
export const transformCategoryData = (
  formData: any,
  availableCategories: CategoryData[],
): {categoryIds: number[]; categoryPath: string[]} => {
  if (formData.categoryPath && formData.categoryPath.length > 0) {
    const categoryIds = findCategoryIdByPath(
      availableCategories,
      formData.categoryPath,
    );
    return {
      categoryIds,
      categoryPath: formData.categoryPath,
    };
  }

  // Fallback to default category if no path is set
  return {
    categoryIds: [309], // Default category ID - you may want to make this configurable
    categoryPath: ['Default'],
  };
};
