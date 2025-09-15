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
  Text,
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
import {
  getFigmaDimension,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
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
import CheckIcon from '../../../../../../assets/icons/CheckIcon';
import {BorderRadius, Spacing} from '../../../../../../config/globalStyles';
import Accordion from 'react-native-collapsible/Accordion';
import {ScrollView} from 'react-native-gesture-handler';

interface CategorySelectionScreenProps {
  route: {
    params?: {
      onSelectCategory: (categories: {id: string; name: string}[]) => void;
      initialCategory?: string[];
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
  const [expandedSubcategories, setExpandedSubcategories] = useState<{
    [categoryId: string]: Category[];
  }>({});
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    if (
      initialCategory &&
      Array.isArray(initialCategory) &&
      initialCategory.length > 0
    ) {
      const idsSet = new Set(initialCategory.map(String));
      console.log('idsSet:', Array.from(idsSet)); // good
      setSelectedCategoryIds(idsSet);
    }
  }, [initialCategory]);

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

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchText.trim()) return currentCategories;

    const searchLower = searchText.toLowerCase();

    const filterRecursive = (categories: Category[]): Category[] => {
      return categories.filter(cat => {
        if (cat.name.toLowerCase().includes(searchLower)) {
          return true;
        }

        if (cat.subcategories) {
          return filterRecursive(cat.subcategories).length > 0;
        }

        return false;
      });
    };

    return filterRecursive(currentCategories);
  }, [currentCategories, searchText]);

  const toggleCategorySelection = (id: string) => {
    setSelectedCategoryIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const [activeRootSections, setActiveRootSections] = useState<number[]>([]);
  const [activeSubSectionsMap, setActiveSubSectionsMap] = useState<{
    [key: string]: number[];
  }>({});

  console.log('activeRootSectionsactiveRootSections', activeSubSectionsMap);

  const handleConfirmSelection = () => {
    if (onSelectCategory) {
      const selectedCategories: {id: string; name: string}[] = [];

      const collectCategories = (categories: Category[]) => {
        categories.forEach(cat => {
          if (selectedCategoryIds.has(cat.id)) {
            selectedCategories.push({id: cat.id, name: cat.name});
          }
          if (cat.subcategories) {
            collectCategories(cat.subcategories);
          }
        });
      };

      collectCategories(rootCategories);

      onSelectCategory(selectedCategories);
    }
    navigation.goBack();
  };

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
    return `${categoryPath[categoryPath.length - 1].name}`;
    // return `Select in ${categoryPath[categoryPath.length - 1].name}`;
  }, [categoryPath]);

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
          <AnimatedLoader size={52} />
          <Typography
            text={UI_TEXT.LOADING_CATEGORIES}
            variant={TypographyVariant.PSMALL_MEDIUM}
            customTextStyles={{
              color: ColorPalette.PRIMARY_GRADIENT_SELLER.colors[0],
              marginTop: getScreenHeight(1),
            }}
          />
          {/* <Typography
            variant={TypographyVariant.LMEDIUM_REGULAR}
            text={UI_TEXT.LOADING_CATEGORIES}
            customTextStyles={styles.loadingText}
          /> */}
        </View>
      </SafeAreaView>
    );
  }

  // Error state (but show fallback categories)
  const showErrorMessage = categoriesError && apiCategories.length === 0;

  //accordion code

  // Root Header
  const renderRootHeader = (
    section: Category,
    index: number,
    isActive: boolean,
  ) => {
    const isSelected = selectedCategoryIds.has(section.id);
    const hasChildren = section.subcategories?.length > 0;

    // Single handler for the entire row
    const handlePress = () => {
      toggleCategorySelection(section.id); // toggle checkbox

      if (hasChildren) {
        setActiveRootSections(prev => {
          if (!isSelected) {
            // if now checked, open accordion
            return [...prev, index];
          } else {
            // if now unchecked, close accordion
            return prev.filter(i => i !== index);
          }
        });

        setExpandedSubcategories(prev => ({
          ...prev,
          [section.id]: !isSelected ? section.subcategories! : [],
        }));
      }
    };

    return (
      <TouchableOpacity
        onPress={handlePress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderColor: ColorPalette.GREY_100,
        }}>
        {/* Checkbox */}
        <View
          style={{
            width: 26,
            height: 26,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: ColorPalette.GREY_400,
            backgroundColor: isSelected
              ? ColorPalette.PURPLE_300
              : 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
          }}>
          {isSelected && (
            <CheckIcon size={26} checkColor={ColorPalette.White} />
          )}
        </View>

        {/* Label */}
        <Typography
          text={section.name}
          variant={TypographyVariant.PMEDIUM_REGULAR}
          customTextStyles={{flex: 1}}
        />

        {/* Arrow */}
        {hasChildren && (
          <ArrowRightIcon
            color={ColorPalette.GREY_TEXT_500}
            style={{transform: [{rotate: isActive ? '90deg' : '0deg'}]}}
          />
        )}
      </TouchableOpacity>
    );
  };

  // Root Content (load only that category’s subcategories accordion)
  const renderRootContent = (category: Category) => {
    const subcategories = expandedSubcategories[category.id];
    if (!subcategories || subcategories.length === 0) return null;

    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: ColorPalette.GREY_100,
          borderRadius: BorderRadius.Small,
          marginHorizontal: getScreenWidth(3),
          marginBottom: getScreenWidth(3),
          paddingVertical: 8,
          paddingHorizontal: 12,
          backgroundColor: '#fff',
        }}>
        {subcategories.map(sub => {
          const isSelected = selectedCategoryIds.has(sub.id);
          const hasChildren = sub.subcategories && sub.subcategories.length > 0;
          const activeSubSections = activeSubSectionsMap[sub.id] || [];

          const handlePress = () => {
            toggleCategorySelection(sub.id);

            if (hasChildren) {
              setActiveSubSectionsMap(prev => ({
                ...prev,
                [sub.id]: isSelected ? [] : [0], // open if checked, close if unchecked
              }));

              setExpandedSubcategories(prev => ({
                ...prev,
                [sub.id]: !isSelected ? sub.subcategories! : [],
              }));
            }
          };

          return (
            <Accordion
              key={sub.id}
              sections={[sub]}
              activeSections={activeSubSections}
              expandMultiple
              underlayColor="transparent"
              renderHeader={(_, __, isActive) => (
                <TouchableOpacity
                  onPress={handlePress}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                  }}>
                  {/* Checkbox */}
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor: '#aaa',
                      backgroundColor: isSelected ? '#6c5ce7' : 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 12,
                    }}>
                    {isSelected && <CheckIcon size={26} checkColor="#fff" />}
                  </View>

                  {/* Label */}
                  <Typography
                    text={sub.name}
                    variant={TypographyVariant.PMEDIUM_REGULAR}
                    customTextStyles={{flex: 1}}
                  />

                  {/* Arrow */}
                  {hasChildren && (
                    <ArrowRightIcon
                      color="#888"
                      style={{
                        transform: [{rotate: isActive ? '90deg' : '0deg'}],
                      }}
                    />
                  )}
                </TouchableOpacity>
              )}
              renderContent={() => {
                if (!hasChildren) return null;
                return renderRootContent(sub); // recursion for deeper levels
              }}
              onChange={newActive =>
                setActiveSubSectionsMap(prev => ({
                  ...prev,
                  [sub.id]: newActive,
                }))
              }
            />
          );
        })}
      </View>
    );
  };

  // expand parents when initialCategory pre-fills - encountering a small issue in opening sub/sub cat accordion.
  useEffect(() => {
    if (rootCategories.length > 0 && selectedCategoryIds.size > 0) {
      const expandParents = (
        categories: Category[],
        parentIndex?: number,
        parentId?: string,
      ): boolean => {
        let found = false;

        categories.forEach((cat, index) => {
          if (selectedCategoryIds.has(cat.id)) {
            found = true;
          }

          if (cat.subcategories && cat.subcategories.length > 0) {
            const childHasSelected = expandParents(
              cat.subcategories,
              index,
              cat.id,
            );
            if (childHasSelected) {
              found = true;

              // open this accordion section
              if (parentId) {
                // it's a sub accordion
                setActiveSubSectionsMap(prev => ({
                  ...prev,
                  [parentId]: [0], // expand this parent
                }));
                setExpandedSubcategories(prev => ({
                  ...prev,
                  [parentId]: cat.subcategories!,
                }));
              } else {
                // it's a root accordion
                setActiveRootSections(prev => [...new Set([...prev, index])]);
                setExpandedSubcategories(prev => ({
                  ...prev,
                  [cat.id]: cat.subcategories!,
                }));
              }
            }
          }
        });

        return found;
      };

      expandParents(rootCategories);
    }
  }, [rootCategories, selectedCategoryIds]);

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

      {/* {renderBreadcrumb()} commented out after discussion */}

      <View style={{flex: 1}}>
        {filteredCategories.length > 0 ? (
          // <FlatList
          //   data={filteredCategories}
          //   keyExtractor={item => item.id}
          //   ItemSeparatorComponent={() => (
          //     <View
          //       style={{height: 1, backgroundColor: ColorPalette.GREY_100}}
          //     />
          //   )}
          //   renderItem={({item, index}) => {
          //     const isLastLevel =
          //       !item.subcategories || item.subcategories.length === 0;
          //     const isRootLevel = categoryPath.length === 0;

          //     const isSelected = selectedCategories.includes(item.id);
          //     return (
          //       <MenuItem
          //         label={item.name}
          //         leftIcon={
          //           isLastLevel &&
          //           !isRootLevel && (
          //             <View
          //               style={[
          //                 styles.checkbox,
          //                 isSelected && styles.checkboxSelected,
          //               ]}>
          //               {isSelected && (
          //                 <CheckIcon
          //                   size={24}
          //                   backgroundColor="transparent"
          //                   checkColor={ColorPalette.White}
          //                 />
          //               )}
          //             </View>
          //           )
          //         }
          //         leftIconContainerStyle={{marginRight: getScreenWidth(-4)}}
          //         onPress={() => {
          //           if (!isLastLevel) {
          //             handleCategoryPress(item);
          //           } else if (!isRootLevel) {
          //             toggleCategorySelection(item.id);
          //           } else {
          //             handleCategoryPress(item);
          //           }
          //         }}
          //         variant={TypographyVariant.LMEDIUM_MEDIUM}
          //         containerStyle={styles.categoryItem}
          //         rightIcon={
          //           !isLastLevel ? (
          //             <ArrowRightIcon
          //               style={undefined}
          //               color={ColorPalette.GREY_TEXT_500}
          //             />
          //           ) : null
          //         }
          //         showBottomBorder
          //         textStyle={styles.menuItemText}
          //         isLastItem={index === filteredCategories.length - 1}
          //       />
          //     );
          //   }}
          //   refreshControl={
          //     <RefreshControl
          //       refreshing={categoriesLoading}
          //       onRefresh={() => refreshCategories(productId)}
          //       colors={[ColorPalette.PURPLE_300]}
          //       tintColor={ColorPalette.PURPLE_300}
          //     />
          //   }
          //   contentContainerStyle={styles.listContent}
          // />

          <ScrollView>
            {filteredCategories.map((category, index) => (
              <Accordion
                key={category.id}
                sections={[category]}
                activeSections={activeRootSections.includes(index) ? [0] : []}
                renderHeader={(section, _, isActive) =>
                  renderRootHeader(section, index, isActive)
                }
                renderContent={renderRootContent}
                onChange={newActive =>
                  setActiveRootSections(
                    prev =>
                      newActive.length > 0
                        ? [...prev, index] // expand
                        : prev.filter(i => i !== index), // collapse
                  )
                }
                expandMultiple={false}
                underlayColor="transparent"
              />
            ))}
          </ScrollView>
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
        {/* {categoryPath.length > 0 &&
          currentCategories.every(
            c => !c.subcategories || c.subcategories.length === 0,
          ) && ( */}
        <View style={styles.doneButtonContainer}>
          <Button
            text="Save"
            onPress={handleConfirmSelection}
            variant={ButtonVariant.PRIMARY}
            state={ButtonState.DEFAULT}
            size={ButtonSize.MEDIUM}
            withShadow
            // disabled={selectedCategories.length === 0}
            // customStyles={{
            //   opacity: selectedCategories.length === 0 ? 0.6 : 1,
            // }}
          />
        </View>
        {/* )} */}
      </View>
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
  checkbox: {
    width: getScreenWidth(6),
    height: getScreenWidth(6),
    borderRadius: BorderRadius.XXSmall,
    borderWidth: 2,
    borderColor: ColorPalette.GREY_200,
    marginRight: getScreenWidth(2.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: ColorPalette.PURPLE_300,
    borderColor: ColorPalette.PURPLE_300,
  },
  doneButtonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: ColorPalette.GREY_100,
    backgroundColor: ColorPalette.White,
  },
});

export default CategorySelectionScreen;
