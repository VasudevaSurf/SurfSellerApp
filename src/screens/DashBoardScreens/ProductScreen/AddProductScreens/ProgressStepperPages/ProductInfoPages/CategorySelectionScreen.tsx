// Enhanced CategorySelectionScreen.tsx with multi-level navigation

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import ArrowLeft from '../../../../../../assets/icons/ArrowLeft';
import InfoIcon from '../../../../../../assets/icons/InfoIcon';
import ArrowRightIcon from '../../../../../../assets/icons/ArrowRightIcon';
import { MenuItem } from '../../../../../../components/MainComponents/MenuItem/MenuItem';
import { Header } from '../../../../../../components/UserComponents/Header/Header';
import { Typography } from '../../../../../../components/UserComponents/Typography/Typography';
import { TypographyVariant } from '../../../../../../components/UserComponents/Typography/Typography.types';
import { ColorPalette } from '../../../../../../config/colorPalette';
import { SearchBox } from '../../../../../../components/UserComponents/SearchBox/SearchBox';
import {
  getFigmaDimension,
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import {
  FALLBACK_CATEGORIES,
  Category,
  SubCategory,
  UI_TEXT,
} from './CategoryConstants';
import { useCategories } from '../../../../../../hooks/useCategories';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../../../../../components/UserComponents/Button';
import CheckIcon from '../../../../../../assets/icons/CheckIcon';
import { BorderRadius, Spacing } from '../../../../../../config/globalStyles';
import Accordion from 'react-native-collapsible/Accordion';
import { ScrollView } from 'react-native-gesture-handler';
import QuestionMarkIcon from '../../../../../../assets/icons/QuestionMarkIcon';
import { goBack, navigate } from '../../../../../../navigation/utils/navigationRef';
import ArrowDownIcon from '../../../../../../assets/icons/ArrowDownIcon';

interface CategorySelectionScreenProps {
  route: {
    params?: {
      onSelectCategory: (categories: { id: string; name: string; path: string[] }[]) => void;
      initialSelectedCategories?: { id: string; name: string; path: string[] }[];
      productId?: string;
    };
  };
  navigation: any;
}

// Category path type for navigation breadcrumbs
// interface CategoryPath {
//   id: string;
//   name: string;
//   level: number;
// }

const CategorySelectionScreen: React.FC<CategorySelectionScreenProps> = ({
  route,
  navigation,
}) => {
  const params = route?.params || {};

  const { onSelectCategory, initialSelectedCategories = [], productId } = params;

  const { categories: apiCategories, loadCategories } = useCategories();

  const rootCategories = useMemo(() => apiCategories?.length ? apiCategories : FALLBACK_CATEGORIES, [apiCategories]);

  const [expandedMap, setExpandedMap] = useState<{ [id: string]: boolean }>({});
  const [selectedMap, setSelectedMap] = useState<{ [id: string]: boolean }>({});
  const [searchText, setSearchText] = useState('');
  const [currentCategories, setCurrentCategories] = useState<Category[]>([]);


  console.log('currentCategories', currentCategories)
  console.log('initialSelectedCategories', initialSelectedCategories)

  useEffect(() => {
    const initSelected: { [id: string]: boolean } = {};
    const initExpanded: { [id: string]: boolean } = {};

    const markSelectedAndExpanded = (categories: Category[]) => {
      categories.forEach(cat => {
        if (initialSelectedCategories.find(sel => sel.id === cat.id)) {
          initSelected[cat.id] = true;
          // expand parents recursively
          initExpanded[cat.id] = true;
        }
        if (cat.subcategories?.length) {
          markSelectedAndExpanded(cat.subcategories);
          // if any child is selected, expand this parent
          if (cat.subcategories.some(sub => initSelected[sub.id])) {
            initExpanded[cat.id] = true;
          }
        }
      });
    };

    markSelectedAndExpanded(rootCategories);
    setSelectedMap(initSelected);
    setExpandedMap(initExpanded);
  }, [rootCategories, initialSelectedCategories]);



  // Load categories when component mounts
  useEffect(() => {
    loadCategories(productId);
  }, [loadCategories, productId]);

  // // Initialize current categories with root level
  useEffect(() => {
    if (rootCategories.length > 0) {
      setCurrentCategories(rootCategories);
    }
  }, [rootCategories]);


  const toggleSelect = (id: string) => {
    setSelectedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExpand = (id: string) => {
    setExpandedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };



  const renderCategory = (category: Category, isTopLevel: boolean = true) => {
    const isSelected = !!selectedMap[category.id];
    const hasChildren = !!category.subcategories?.length;
    const isExpanded = !!expandedMap[category.id];

    return (
      <View key={category.id} style={{
        marginVertical: 4,

      }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            backgroundColor: '#fff',
            borderBottomWidth: isTopLevel && !isExpanded ? 1 : 0,
            borderColor: ColorPalette.GREY_100,
          }}
          onPress={() => {
            toggleSelect(category.id);
            if (hasChildren) toggleExpand(category.id);
          }}
        >
          <View
            style={{
              width: 26,
              height: 26,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: ColorPalette.GREY_400,
              backgroundColor: isSelected ? ColorPalette.PURPLE_300 : 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12,
            }}
          >
            {isSelected && <CheckIcon size={26} checkColor={ColorPalette.White} />}
          </View>
          <Typography
            text={category.name}
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={{ flex: 1 }}
          />
          {hasChildren && <ArrowDownIcon style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }} color={ColorPalette.GREY_TEXT_500} />}
        </TouchableOpacity>

        {hasChildren && isExpanded && (
          <View style={{
            marginHorizontal: getScreenWidth(4),
            borderWidth: 1,
            borderRadius: Spacing.Small,
            padding: 4,
            borderColor: ColorPalette.GREY_100
            // paddingLeft: 8,
          }}>
            {category.subcategories!.map(sub =>
              sub ? renderCategory(sub, false) : null
            )}
          </View>
        )}
      </View>
    );
  };

  const handleConfirmSelection = () => {
    const selectedCategories: { id: string; name: string; path: string[] }[] = [];

    const collectSelected = (categories: Category[], path: string[] = []) => {
      categories.forEach(cat => {
        const newPath = [...path, cat.name];
        if (selectedMap[cat.id]) {
          selectedCategories.push({ id: cat.id, name: cat.name, path: newPath });
        }
        if (cat.subcategories?.length) collectSelected(cat.subcategories, newPath);
      });
    };

    collectSelected(rootCategories);
    onSelectCategory?.(selectedCategories);
    navigation.goBack();
  };



  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        name={UI_TEXT.SELECT_CATEGORY}
        leftIcon={
          <ArrowLeft
            size={22}
            onPress={goBack} style={undefined}
          />
        }
        textColor={ColorPalette.AgreeTerms}
        variant={TypographyVariant.H6_BOLD}
        rightIcons={[
          {
            icon: QuestionMarkIcon,
            onPress: () => {
              navigate('Dashboard', {
                screen: 'Account',
                params: { screen: 'FAQ' },
              });
            },
            size: 24,
            color: ColorPalette.IconColor,
            strokeWidth: 1.5,
          },
        ]}
      />



      <View style={styles.searchContainer}>
        <SearchBox
          value={searchText}
          onChangeText={setSearchText}
          placeholder={`Search Categories`}
        />
      </View>

      {/* {renderBreadcrumb()} commented out after discussion */}

      <View style={{ flex: 1 }}>
        {currentCategories.length > 0 ? (
          <ScrollView style={{ flex: 1, paddingHorizontal: 8 }}>
            {rootCategories.map(cat => renderCategory(cat))}
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
