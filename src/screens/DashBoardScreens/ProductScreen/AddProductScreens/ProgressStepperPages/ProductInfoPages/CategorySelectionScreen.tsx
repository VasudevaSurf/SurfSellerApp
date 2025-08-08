// Enhanced CategorySelectionScreen.tsx with multi-level navigation

import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  BackHandler,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import ArrowLeftIcon from '../../../../../../assets/icons/ArrowLeftIcon';
import InfoIcon from '../../../../../../assets/icons/InfoIcon';
import ArrowRightIcon from '../../../../../../assets/icons/ArrowRightIcon';
import {MenuItem} from '../../../../../../components/MainComponents/MenuItem/MenuItem';
import {Header} from '../../../../../../components/UserComponents/Header/Header';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {SearchBox} from '../../../../../../components/UserComponents/SearchBox/SearchBox';
import {getFigmaDimension} from '../../../../../../helpers/screenSize';
import {
  FALLBACK_CATEGORIES,
  Category,
  SubCategory,
  UI_TEXT,
} from './CategoryConstants';
import {useCategories} from '../../../../../../hooks/useCategories';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../../../../../components/UserComponents/Button';

interface CategorySelectionScreenProps {
  route: {
    params?: {
      onSelectCategory: (categoryPath: string[]) => void; // Changed to support category path
      initialCategory?: string;
      initialSubcategory?: string;
      productId?: string;
    };
  };
  navigation: any;
}

// Category path type for navigation breadcrumbs
interface CategoryPath {
  id: string;
  name: string;
  level: number;
}

const CategorySelectionScreen: React.FC<CategorySelectionScreenProps> = ({
  route,
  navigation,
}) => {
  const params = route?.params || {};
  const {onSelectCategory, initialCategory, productId} = params;

  const [searchText, setSearchText] = useState('');
  const [categoryPath, setCategoryPath] = useState<CategoryPath[]>([]); // Navigation stack
  const [currentCategories, setCurrentCategories] = useState<Category[]>([]); // Current level categories

  // Use the categories hook
  const {
    categories: apiCategories,
    loading: categoriesLoading,
    error: categoriesError,
    loadCategories,
    refreshCategories,
    clearError,
  } = useCategories();

  // Use API categories if available, otherwise fall back to static categories
  const rootCategories = useMemo(() => {
    if (apiCategories && apiCategories.length > 0) {
      return apiCategories;
    }
    return FALLBACK_CATEGORIES;
  }, [apiCategories]);

  // Load categories when component mounts
  useEffect(() => {
    loadCategories(productId);
  }, [loadCategories, productId]);

  // Initialize current categories with root level
  useEffect(() => {
    if (rootCategories.length > 0 && categoryPath.length === 0) {
      setCurrentCategories(rootCategories);
    }
  }, [rootCategories, categoryPath.length]);

  // Clear any existing errors when component mounts
  useEffect(() => {
    if (categoriesError) {
      clearError();
    }
  }, [clearError, categoriesError]);

  // Handle back navigation
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (categoryPath.length > 0) {
          handleNavigateBack();
          return true;
        } else {
          navigation.goBack();
          return true;
        }
      },
    );

    return () => backHandler.remove();
  }, [categoryPath, navigation]);

  // Helper function to find category by path
  const findCategoryByPath = useCallback(
    (categories: Category[], pathIds: string[]): Category | null => {
      if (pathIds.length === 0) return null;

      let current = categories.find(cat => cat.id === pathIds[0]);
      if (!current) return null;

      for (let i = 1; i < pathIds.length; i++) {
        if (!current.subcategories) return null;
        current = current.subcategories.find(sub => sub.id === pathIds[i]);
        if (!current) return null;
      }

      return current;
    },
    [],
  );

  // Initialize with initial category if provided
  useEffect(() => {
    if (
      initialCategory &&
      rootCategories.length > 0 &&
      categoryPath.length === 0
    ) {
      const foundCategory = rootCategories.find(
        cat =>
          cat.name === initialCategory || initialCategory.startsWith(cat.name),
      );

      if (foundCategory) {
        const newPath = [
          {
            id: foundCategory.id,
            name: foundCategory.name,
            level: 0,
          },
        ];
        setCategoryPath(newPath);
        setCurrentCategories(foundCategory.subcategories || []);
      }
    }
  }, [initialCategory, rootCategories, categoryPath.length]);

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchText.trim()) return currentCategories;

    const searchLower = searchText.toLowerCase();

    const filterRecursive = (categories: Category[]): Category[] => {
      return categories.filter(cat => {
        // Check if category name matches
        if (cat.name.toLowerCase().includes(searchLower)) {
          return true;
        }

        // Check if any subcategory matches (recursive)
        if (cat.subcategories) {
          return filterRecursive(cat.subcategories).length > 0;
        }

        return false;
      });
    };

    return filterRecursive(currentCategories);
  }, [currentCategories, searchText]);

  // Navigate to subcategory
  const handleCategoryPress = useCallback(
    (category: Category) => {
      if (category.subcategories && category.subcategories.length > 0) {
        // Navigate deeper
        const newPath = [
          ...categoryPath,
          {
            id: category.id,
            name: category.name,
            level: categoryPath.length,
          },
        ];
        setCategoryPath(newPath);
        setCurrentCategories(category.subcategories);
        setSearchText('');
      } else {
        // Final selection - build category path array
        const fullPath = [...categoryPath.map(p => p.name), category.name];

        if (onSelectCategory) {
          onSelectCategory(fullPath);
          navigation.goBack();
        } else {
          console.warn('onSelectCategory is undefined');
          navigation.goBack();
        }
      }
    },
    [categoryPath, onSelectCategory, navigation],
  );

  // Navigate back one level
  const handleNavigateBack = useCallback(() => {
    if (categoryPath.length === 0) {
      navigation.goBack();
      return;
    }

    const newPath = categoryPath.slice(0, -1);
    setCategoryPath(newPath);
    setSearchText('');

    if (newPath.length === 0) {
      // Back to root
      setCurrentCategories(rootCategories);
    } else {
      // Navigate to parent category
      const pathIds = newPath.map(p => p.id);
      const parentCategory = findCategoryByPath(rootCategories, pathIds);
      if (parentCategory && parentCategory.subcategories) {
        setCurrentCategories(parentCategory.subcategories);
      }
    }
  }, [categoryPath, navigation, rootCategories, findCategoryByPath]);

  const handleRetry = useCallback(() => {
    refreshCategories(productId);
  }, [refreshCategories, productId]);

  // Get current header title
  const getHeaderTitle = useCallback(() => {
    if (categoryPath.length === 0) {
      return UI_TEXT.SELECT_CATEGORY;
    }
    return `Select in ${categoryPath[categoryPath.length - 1].name}`;
  }, [categoryPath]);

  // Handle header back button press
  const handleHeaderBackPress = useCallback(() => {
    if (categoryPath.length > 0) {
      handleNavigateBack();
    } else {
      navigation.goBack();
    }
  }, [categoryPath.length, handleNavigateBack, navigation]);

  // Render breadcrumb navigation
  const renderBreadcrumb = useCallback(() => {
    if (categoryPath.length === 0) return null;

    return (
      <View style={styles.breadcrumbContainer}>
        <FlatList
          horizontal
          data={categoryPath}
          keyExtractor={item => `${item.level}-${item.id}`}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.breadcrumbItem}
              onPress={() => {
                // Navigate to specific level
                const newPath = categoryPath.slice(0, index + 1);
                setCategoryPath(newPath);

                const pathIds = newPath.map(p => p.id);
                const targetCategory = findCategoryByPath(
                  rootCategories,
                  pathIds,
                );
                if (targetCategory && targetCategory.subcategories) {
                  setCurrentCategories(targetCategory.subcategories);
                } else if (index === 0) {
                  setCurrentCategories(rootCategories);
                }
              }}>
              <Typography
                variant={TypographyVariant.PSMALL_MEDIUM}
                text={item.name}
                customTextStyles={[
                  styles.breadcrumbText,
                  index === categoryPath.length - 1 &&
                    styles.breadcrumbTextActive,
                ]}
              />
              {index < categoryPath.length - 1 && (
                <ArrowRightIcon
                  size={12}
                  color={ColorPalette.GREY_TEXT_300}
                  style={styles.breadcrumbArrow}
                />
              )}
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.breadcrumbContent}
        />
      </View>
    );
  }, [categoryPath, findCategoryByPath, rootCategories]);

  // Loading state
  if (categoriesLoading && rootCategories.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header
          name={getHeaderTitle()}
          leftIcon={
            <ArrowLeftIcon
              size={15}
              onPress={() => navigation.goBack()}
              style={undefined}
            />
          }
          textColor={ColorPalette.AgreeTerms}
          variant={TypographyVariant.LMEDIUM_BOLD}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={ColorPalette.PURPLE_300} />
          <Typography
            variant={TypographyVariant.LMEDIUM_REGULAR}
            text={UI_TEXT.LOADING_CATEGORIES}
            customTextStyles={styles.loadingText}
          />
        </View>
      </SafeAreaView>
    );
  }

  // Error state (but show fallback categories)
  const showErrorMessage = categoriesError && apiCategories.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        name={getHeaderTitle()}
        leftIcon={
          <ArrowLeftIcon
            size={15}
            onPress={handleNavigateBack}
            style={undefined}
          />
        }
        textColor={ColorPalette.AgreeTerms}
        variant={TypographyVariant.LMEDIUM_BOLD}
        rightIcons={[
          {
            icon: InfoIcon,
            onPress: () => console.log('Info icon pressed'),
            size: 24,
            color: ColorPalette.IconColor,
            strokeWidth: 2,
          },
        ]}
      />

      {renderBreadcrumb()}

      {showErrorMessage && (
        <View style={styles.errorContainer}>
          <Typography
            variant={TypographyVariant.PMEDIUM_REGULAR}
            text={UI_TEXT.ERROR_LOADING_CATEGORIES}
            customTextStyles={styles.errorText}
          />
          <Button
            text="Retry"
            variant={ButtonVariant.PRIMARY}
            state={ButtonState.DEFAULT}
            size={ButtonSize.SMALL}
            onPress={handleRetry}
            customStyles={styles.retryButton}
          />
        </View>
      )}

      <View style={styles.searchContainer}>
        <SearchBox
          value={searchText}
          onChangeText={setSearchText}
          placeholder={`Search ${
            categoryPath.length > 0 ? 'subcategories' : 'categories'
          }...`}
        />
      </View>

      {filteredCategories.length > 0 ? (
        <FlatList
          data={filteredCategories}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <MenuItem
              label={item.name}
              leftIcon={item.icon}
              onPress={() => handleCategoryPress(item)}
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              containerStyle={styles.categoryItem}
              rightIcon={
                item.subcategories && item.subcategories.length > 0 ? (
                  <ArrowRightIcon
                    style={undefined}
                    color={ColorPalette.GREY_TEXT_500}
                  />
                ) : null
              }
              showBottomBorder
              textStyle={styles.menuItemText}
              isLastItem={index === filteredCategories.length - 1}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={categoriesLoading}
              onRefresh={() => refreshCategories(productId)}
              colors={[ColorPalette.PURPLE_300]}
              tintColor={ColorPalette.PURPLE_300}
            />
          }
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <Typography
            variant={TypographyVariant.PMEDIUM_REGULAR}
            text={
              searchText.trim()
                ? 'No matching categories found'
                : 'No categories available'
            }
            customTextStyles={styles.emptyStateText}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ColorPalette.White,
  },
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: getFigmaDimension(16),
    paddingVertical: getFigmaDimension(8),
  },
  breadcrumbContainer: {
    paddingHorizontal: getFigmaDimension(16),
    paddingVertical: getFigmaDimension(12),
    backgroundColor: ColorPalette.SearchBack,
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.GREY_100,
  },
  breadcrumbHeader: {
    marginBottom: getFigmaDimension(8),
  },
  breadcrumbHeaderText: {
    color: ColorPalette.GREY_TEXT_200,
    fontSize: getFigmaDimension(12),
  },
  breadcrumbContent: {
    alignItems: 'center',
  },
  breadcrumbItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getFigmaDimension(8),
  },
  breadcrumbText: {
    color: ColorPalette.GREY_TEXT_300,
  },
  breadcrumbTextActive: {
    color: ColorPalette.PURPLE_300,
    fontWeight: '600',
  },
  breadcrumbArrow: {
    marginLeft: getFigmaDimension(8),
  },
  suggestionsContainer: {
    paddingHorizontal: getFigmaDimension(16),
    paddingBottom: getFigmaDimension(16),
  },
  suggestionsHeader: {
    marginBottom: getFigmaDimension(12),
  },
  suggestionsTitle: {
    color: ColorPalette.PURPLE_300,
    marginBottom: getFigmaDimension(4),
  },
  suggestionsSubtitle: {
    color: ColorPalette.GREY_TEXT_200,
  },
  suggestionItem: {
    paddingVertical: getFigmaDimension(12),
    paddingHorizontal: getFigmaDimension(16),
    marginVertical: getFigmaDimension(2),
    borderRadius: getFigmaDimension(8),
  },
  suggestionIcon: {
    width: getFigmaDimension(24),
    height: getFigmaDimension(24),
    borderRadius: getFigmaDimension(12),
    backgroundColor: ColorPalette.PURPLE_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionText: {
    color: ColorPalette.PURPLE_300,
    fontWeight: '500',
  },
  browseCategoriesButton: {
    paddingVertical: getFigmaDimension(12),
    alignItems: 'center',
  },
  browseCategoriesText: {
    color: ColorPalette.GREY_TEXT_300,
    textDecorationLine: 'underline',
  },
  categoryItem: {
    paddingVertical: getFigmaDimension(16),
    paddingHorizontal: getFigmaDimension(16),
  },
  menuItemText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getFigmaDimension(32),
    paddingVertical: getFigmaDimension(48),
  },
  emptyStateText: {
    color: ColorPalette.GREY_TEXT_400,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: getFigmaDimension(16),
  },
  loadingText: {
    color: ColorPalette.GREY_TEXT_300,
  },
  errorContainer: {
    paddingHorizontal: getFigmaDimension(16),
    paddingVertical: getFigmaDimension(8),
    backgroundColor: ColorPalette.RED_00,
    alignItems: 'center',
    gap: getFigmaDimension(8),
  },
  errorText: {
    color: ColorPalette.RED_200,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: getFigmaDimension(16),
  },
  listContent: {
    paddingBottom: getFigmaDimension(20),
  },
});

export default CategorySelectionScreen;
