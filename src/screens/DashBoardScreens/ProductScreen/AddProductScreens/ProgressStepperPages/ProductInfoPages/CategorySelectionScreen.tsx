import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  BackHandler,
  StyleSheet,
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
import {CATEGORIES, Category, SubCategory, UI_TEXT} from './CategoryConstants';

interface CategorySelectionScreenProps {
  route: {
    params?: {
      onSelectCategory: (category: string, subcategory?: string) => void;
      initialCategory?: string;
      initialSubcategory?: string;
    };
  };
  navigation: any;
}

const CategorySelectionScreen: React.FC<CategorySelectionScreenProps> = ({
  route,
  navigation,
}) => {
  const params = route?.params || {};
  const {onSelectCategory, initialCategory} = params;

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (selectedCategory) {
          setSelectedCategory(null);
          return true;
        } else {
          navigation.goBack();
          return true;
        }
      },
    );

    return () => backHandler.remove();
  }, [selectedCategory, navigation]);

  useEffect(() => {
    if (initialCategory) {
      const foundCategory = CATEGORIES.find(
        cat =>
          cat.name === initialCategory || initialCategory.startsWith(cat.name),
      );

      if (foundCategory) {
        setSelectedCategory(foundCategory);
      }
    }
  }, [initialCategory]);

  const filteredCategories = useMemo(() => {
    if (!searchText) return CATEGORIES;

    const searchLower = searchText.toLowerCase();
    return CATEGORIES.filter(
      cat =>
        cat.name.toLowerCase().includes(searchLower) ||
        cat.subcategories?.some(sub =>
          sub.name.toLowerCase().includes(searchLower),
        ),
    );
  }, [CATEGORIES, searchText]);

  const filteredSubcategories = useMemo(() => {
    if (!selectedCategory) return [];
    if (!searchText) return selectedCategory.subcategories || [];

    const searchLower = searchText.toLowerCase();
    return (
      selectedCategory.subcategories?.filter(sub =>
        sub.name.toLowerCase().includes(searchLower),
      ) || []
    );
  }, [selectedCategory, searchText]);

  const handleCategoryPress = useCallback(
    (category: Category) => {
      if (category.subcategories && category.subcategories.length > 0) {
        setSelectedCategory(category);
        setSearchText('');
      } else {
        if (onSelectCategory) {
          onSelectCategory(category.name);
          navigation.goBack();
        } else {
          console.warn('onSelectCategory is undefined');
          navigation.goBack();
        }
      }
    },
    [onSelectCategory, navigation],
  );

  const handleSubcategoryPress = useCallback(
    (subcategory: SubCategory) => {
      if (selectedCategory && onSelectCategory) {
        onSelectCategory(selectedCategory.name, subcategory.name);
        navigation.goBack();
      } else {
        console.warn(
          'onSelectCategory is undefined or selectedCategory is null',
        );
        navigation.goBack();
      }
    },
    [selectedCategory, onSelectCategory, navigation],
  );

  const handleBackFromSubcategory = useCallback(() => {
    setSelectedCategory(null);
    setSearchText('');
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderSubcategoryScreen = useCallback(() => {
    if (!selectedCategory) return null;

    return (
      <View style={styles.container}>
        <Header
          name={UI_TEXT.SELECT_SUBCATEGORY}
          leftIcon={
            <ArrowLeftIcon
              size={15}
              onPress={handleBackFromSubcategory}
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

        <View style={styles.searchContainer}>
          <SearchBox
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search subcategories..."
          />
        </View>

        <View style={styles.categoryHeaderContainer}>
          <MenuItem
            label={selectedCategory.name}
            leftIcon={
              <ArrowLeftIcon
                size={15}
                style={undefined}
                color={ColorPalette.GREY_TEXT_500}
                onPress={undefined}
              />
            }
            onPress={handleBackFromSubcategory}
            rightIcon={null}
            variant={TypographyVariant.LMEDIUM_BOLD}
            showBottomBorder
            containerStyle={styles.categoryHeaderItem}
          />
        </View>

        {filteredSubcategories.length > 0 ? (
          <FlatList
            data={filteredSubcategories}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <MenuItem
                label={item.name}
                onPress={() => handleSubcategoryPress(item)}
                rightIcon={null}
                variant={TypographyVariant.LMEDIUM_REGULAR}
                textStyle={styles.menuItemText}
                containerStyle={styles.subcategoryItem}
                showBottomBorder
              />
            )}
          />
        ) : (
          <View style={styles.emptyStateContainer}>
            <Typography
              variant={TypographyVariant.PMEDIUM_REGULAR}
              text={UI_TEXT.NO_SUBCATEGORIES}
              customTextStyles={styles.emptyStateText}
            />
          </View>
        )}
      </View>
    );
  }, [
    selectedCategory,
    searchText,
    filteredSubcategories,
    handleBackFromSubcategory,
    handleSubcategoryPress,
  ]);

  const renderCategoryList = useCallback(() => {
    return (
      <View style={styles.container}>
        <Header
          name={UI_TEXT.SELECT_CATEGORY}
          leftIcon={
            <ArrowLeftIcon size={15} onPress={handleGoBack} style={undefined} />
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

        <View style={styles.searchContainer}>
          <SearchBox
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search categories..."
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
                  <ArrowRightIcon
                    style={undefined}
                    color={ColorPalette.GREY_TEXT_500}
                  />
                }
                showBottomBorder
                textStyle={styles.menuItemText}
                isLastItem={index === filteredCategories.length - 1}
              />
            )}
          />
        ) : (
          <View style={styles.emptyStateContainer}>
            <Typography
              variant={TypographyVariant.PMEDIUM_REGULAR}
              text={UI_TEXT.NO_CATEGORIES}
              customTextStyles={styles.emptyStateText}
            />
          </View>
        )}
      </View>
    );
  }, [filteredCategories, searchText, handleCategoryPress, handleGoBack]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {selectedCategory ? renderSubcategoryScreen() : renderCategoryList()}
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
  categoryHeaderContainer: {
    marginTop: getFigmaDimension(8),
  },
  categoryHeaderItem: {
    paddingHorizontal: getFigmaDimension(16),
  },
  categoryItem: {
    paddingVertical: getFigmaDimension(20),
  },
  subcategoryItem: {
    paddingVertical: getFigmaDimension(20),
    paddingHorizontal: getFigmaDimension(32),
  },
  menuItemText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    color: ColorPalette.GREY_TEXT_400,
  },
});

export default CategorySelectionScreen;
