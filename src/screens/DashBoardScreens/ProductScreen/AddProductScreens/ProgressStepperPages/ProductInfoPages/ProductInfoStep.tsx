// Updated ProductInfoStep.tsx to handle category path

import React, { useState, useEffect, useMemo } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import ArrowDownIcon from '../../../../../../assets/icons/ArrowDownIcon';
import ArrowRightIcon from '../../../../../../assets/icons/ArrowRightIcon';
import InfoIcon from '../../../../../../assets/icons/InfoIcon';
import InfoIconPay from '../../../../../../assets/icons/InfoIconPay';
import AlignTextCenterIcon from '../../../../../../assets/icons/NewProductIcons/AlignTextCenterIcon';
import AlignTextLeftIcon from '../../../../../../assets/icons/NewProductIcons/AlignTextLeftIcon';
import AlignTextRightIcon from '../../../../../../assets/icons/NewProductIcons/AlignTextRightIcon';
import PencilUnderlineIcon from '../../../../../../assets/icons/NewProductIcons/PencilUnderlineIcon';
import TextSymbolIcon from '../../../../../../assets/icons/NewProductIcons/TextSymbolIcon';
import UnderlineIcon from '../../../../../../assets/icons/NewProductIcons/UnderlineIcon';
import UnderlineTextIcon from '../../../../../../assets/icons/NewProductIcons/UnderlineTextIcon';
import { Badge } from '../../../../../../components/UserComponents/Badges/Badge';
import { BadgeVariant } from '../../../../../../components/UserComponents/Badges/Badge.types';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../../components/UserComponents/Button';
import AnimatedTextInput from '../../../../../../components/UserComponents/TextInput/TextInput';
import { Typography } from '../../../../../../components/UserComponents/Typography/Typography';
import { TypographyVariant } from '../../../../../../components/UserComponents/Typography/Typography.types';
import { ColorPalette } from '../../../../../../config/colorPalette';
import {
  getFigmaDimension,
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import { navigate } from '../../../../../../navigation/utils/navigationRef';
import { styles } from './ProductInfoStep.styles';
import { BorderRadius, Spacing } from '../../../../../../config/globalStyles';
import EuroIcon from '../../../../../../assets/icons/EuroIcon';
import { SlidingBar } from '../../../../../../components/MainComponents/SlidingBar/SlidingBar';
import CrossCircleIcon from '../../../../../../assets/icons/CrossIcon';
import { useCategories } from '../../../../../../hooks/useCategories';
import { Category, FALLBACK_CATEGORIES } from './CategoryConstants';
import Tooltip from '../../../../../../components/MainComponents/Tooltip/Tooltip';

interface ProductInfoStepProps {
  formData: {
    productName: string;
    price: string;
    category: string;
    subcategory?: string;
    description: string;
    categoryPath?: string[]; // Add category path support
    productId?: string; // Make productId optional
    category_listing?: {
      id: number;
      name: string;
    }
  };
  updateFormData: (data: any) => void;
  editMode?: boolean;
}

// Recursive helper: walks the tree by names in order
// Walks the tree based on category names
const findCategoryIdsFromPath = (
  rootCategories: Category[],
  path: string[],
): string[] => {
  const ids: string[] = [];
  let currentLevel = rootCategories;

  for (const name of path) {
    const match = currentLevel.find(cat => cat.name === name);
    if (!match) break; // stop if any level doesn’t exist
    ids.push(match.id);
    currentLevel = match.subcategories || [];
  }

  return ids;
};

const ProductInfoStep: React.FC<ProductInfoStepProps> = ({
  formData = {}, // Provide default empty object
  updateFormData,
  editMode = false,
}) => {

  console.log("formData", formData);


  // Safely access formData properties with defaults
  const safeFormData = {
    productName: formData?.productName || '',
    price: formData?.price || '',
    category: formData?.category || '',
    subcategory: formData?.subcategory || '',
    description: formData?.description || '',
    categoryPath: formData?.categoryPath || [],
    productId: formData?.productId || '',
    selectedCategories: formData?.selectedCategories || [], // NEW
    ...formData, // Spread any additional properties
  };

  console.log("safeFormData", safeFormData.categoryPath);


  const [isFocused, setIsFocused] = useState(false);
  const [textAlignment, setTextAlignment] = useState<
    'left' | 'center' | 'right'
  >('left');
  const [textFormat, setTextFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
  });
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<Set<string>>(
    new Set(safeFormData.selectedCategories.map(c => c.id))
  );
  const [initializedCategories, setInitializedCategories] = useState(false);

  // Use the categories hook
  const { categories: apiCategories } = useCategories();

  // Use API categories if available, otherwise fall back to static categories
  const rootCategories = useMemo(() => {
    if (apiCategories && apiCategories.length > 0) {
      return apiCategories;
    }
    return FALLBACK_CATEGORIES;
  }, [apiCategories]);

  // Track whether initial load from formData is done

  useEffect(() => {
    if (!initializedCategories && safeFormData?.categoryPath?.length && rootCategories.length) {
      const ids = findCategoryIdsFromPath(rootCategories, safeFormData.categoryPath);
      setSelectedCategoryIds(ids);
      setInitializedCategories(true); // mark initialized so we don't override later
    }
  }, [safeFormData?.categoryPath, rootCategories, initializedCategories]);


  // Handle text editor focus
  const handleTextAreaFocus = () => {
    setIsFocused(true);
  };

  const handleTextAreaBlur = () => {
    setIsFocused(false);
  };

  // Text format handlers
  const handleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
    setTextAlignment(alignment);
  };

  const toggleTextFormat = (format: 'bold' | 'italic' | 'underline') => {
    setTextFormat(prev => ({
      ...prev,
      [format]: !prev[format],
    }));
  };

  console.log("formData in ProductInfoStep", formData);

  // NEW: Handle multi-category selection from CategorySelectionScreen
  const handleCategorySelection = (categories: {
    id: string;
    name: string;
    path: string[];
  }[]) => {
    if (!categories || categories.length === 0) return;

    // Update formData
    updateFormData({ selectedCategories: categories });

    // Update local selection state
    setSelectedCategoryIds(new Set(categories.map(c => c.id)));
  };


  console.log("selectedCategoryIds on parent", selectedCategoryIds);


  // Updated navigation to category selection
  const navigateToCategorySelection = () => {
    navigate('Dashboard', {
      screen: 'Product',
      params: {
        screen: 'CategoryScreen',
        params: {
          onSelectCategory: handleCategorySelection,
          initialSelectedCategories: safeFormData.selectedCategories, // pass current selected
          productId: safeFormData.productId,
        },
      },
    });
  };

  // Updated category display text with full path support
  const getCategoryDisplayText = () => {
    // Check if we have a category path (new format)
    if (safeFormData.categoryPath && safeFormData.categoryPath.length > 0) {
      return safeFormData.categoryPath.join(', ');
    }

    // Fallback to old format for backwards compatibility
    if (!safeFormData.category) {
      return 'Select category*';
    }

    return safeFormData.subcategory
      ? `${safeFormData.category} - ${safeFormData.subcategory}`
      : safeFormData.category;
  };

  // Get placeholder text for category selection
  const getCategoryPlaceholderText = () => {
    return 'Select category*';
  };

  // Check if category is selected
  const isCategorySelected = () => {
    return (
      (safeFormData.categoryPath && safeFormData.categoryPath.length > 0) ||
      safeFormData.category
    );
  };

  const getHeaderText = () => {
    return editMode ? 'Update Product Information' : 'Product information';
  };

  const getStatusHeaderText = () => {
    return editMode ? 'Update Status' : 'Status';
  };

  const getDescriptionHeaderText = () => {
    return editMode ? 'Update Product Description' : 'Product description';
  };

  // Helper to get category info for debugging
  const getCategoryDebugInfo = () => {
    if (safeFormData.categoryPath) {
      return `Path: [${safeFormData.categoryPath.join(', ')}]`;
    }
    return `Legacy: ${safeFormData.category}${safeFormData.subcategory ? ` - ${safeFormData.subcategory}` : ''
      }`;
  };

  const statusOptions = [
    { id: 'pendingApproval', label: 'Pending Approval' },
    { id: 'active', label: 'Active' },
    { id: 'disabled', label: 'Disabled' },
  ];

  const [selectedOption, setSelectedOption] = useState(statusOptions[0]);

  const filteredOptions =
    selectedOption.id === 'pendingApproval'
      ? [statusOptions[0]]
      : statusOptions.filter(opt => opt.id !== 'pendingApproval');

  const formatPrice = (value) => {
    const numberValue = parseFloat(value) || 0;
    return numberValue.toLocaleString('en-EN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };


  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text={getHeaderText()}
            customTextStyles={{ color: ColorPalette.GREY_TEXT_500 }}
          />
          <Tooltip
            target={
              <InfoIconPay
                size={22}
                color={ColorPalette.GREY_TEXT_400}
                style={undefined}
              />
            }
            content={
              <Typography customTextStyles={{
                color: ColorPalette.GREY_TEXT_200,
                paddingVertical: getScreenHeight(0.1)
              }} variant={TypographyVariant.LSMALL_MEDIUM}>
                Basic product data such as title, category, and price.
              </Typography>
            }
            placement="bottom"
          />
        </View>

        <View style={styles.inputContainer}>
          <AnimatedTextInput
            label="Enter product name*"
            value={safeFormData.productName}
            onChangeText={text => updateFormData({ productName: text })}
            keyboardType="default"
          />
          <AnimatedTextInput
            label="Enter price*"
            value={formatPrice(safeFormData.price)}
            onChangeText={text => updateFormData({ price: text })}
            keyboardType="phone-pad"
            countryCode={<EuroIcon />}
            showCountrySection
          />

          <View style={styles.selectContainer}>
            {/* Always visible select category row */}
            <TouchableOpacity
              style={[styles.inputContainer, styles.selectBtn]}
              activeOpacity={0.7}
              onPress={navigateToCategorySelection}>
              <Typography
                variant={TypographyVariant.PSMALL_REGULAR}
                text={getCategoryPlaceholderText()}
                customTextStyles={{ color: ColorPalette.GREY_TEXT_300 }}
              />
              <ArrowRightIcon color={ColorPalette.GREY_TEXT_400} />
            </TouchableOpacity>

            {/* Selected categories list (only when available) */}
            {/* Selected categories list */}
            {safeFormData.selectedCategories.length > 0 &&
              safeFormData.selectedCategories.map((item, index) => (
                <View
                  key={item.id} // use id instead of index for stable keys
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#3A5AFE0D',
                    paddingVertical: getScreenHeight(1.5),
                    paddingHorizontal: getScreenWidth(4),
                    borderRadius: BorderRadius.Small,
                    marginTop: getScreenHeight(1),
                  }}
                >
                  {/* Category Name */}
                  <Typography
                    text={item.name}
                    variant={TypographyVariant.PMEDIUM_REGULAR}
                    customTextStyles={{
                      color: ColorPalette.ProgressLine,
                    }}
                  />

                  {/* Remove Icon */}
                  <TouchableOpacity
                    onPress={() => {
                      const updatedCategories = safeFormData.selectedCategories.filter(
                        (_, i) => i !== index
                      );

                      updateFormData({
                        ...safeFormData,
                        selectedCategories: updatedCategories,
                        category: updatedCategories[0]?.name || '',
                        subcategory:
                          updatedCategories.length > 1
                            ? updatedCategories[updatedCategories.length - 1].name
                            : undefined,
                        categoryPath: updatedCategories.map(c => c.name),
                        categoryDisplay: updatedCategories.map(c => c.name).join(' > '),
                      });

                      setSelectedCategoryIds(new Set(updatedCategories.map(c => c.id)));
                    }}
                  >
                    <CrossCircleIcon size={24} />
                  </TouchableOpacity>
                </View>
              ))}

          </View>

          {/* Debug info - remove in production */}
          {/* {__DEV__ && isCategorySelected() && (
            <View style={{paddingHorizontal: getScreenWidth(4), marginTop: 8}}>
              <Typography
                variant={TypographyVariant.LXSMALL_REGULAR}
                text={getCategoryDebugInfo()}
                customTextStyles={{
                  color: ColorPalette.GREY_TEXT_200,
                  fontSize: 10,
                }}
              />
            </View>
          )} */}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text={getStatusHeaderText()}
            customTextStyles={{ color: ColorPalette.GREY_TEXT_500 }}
          />
          <Tooltip
            target={
              <InfoIconPay
                size={22}
                color={ColorPalette.GREY_TEXT_400}
                style={undefined}
              />
            }
            content={
              <Typography customTextStyles={{
                color: ColorPalette.GREY_TEXT_200,
                paddingVertical: getScreenHeight(0.1)
              }} variant={TypographyVariant.LSMALL_MEDIUM}>
                Availability state of the product (active, pending, or inactive).              </Typography>
            }
            placement="right"
          />
        </View>
        <View style={styles.sliderComponent}>
          <SlidingBar
            options={filteredOptions}
            selectedOption={selectedOption}
            onOptionSelect={setSelectedOption}
            customOptionStyle={{
              paddingVertical: getScreenHeight(1.5),
              paddingHorizontal: getScreenWidth(8.5),
              borderWidth: 1,
              borderColor: ColorPalette.GREY_300,
              borderRadius: BorderRadius.Small,
            }}
          />
        </View>
      </View>

      <View style={styles.sectionTwo}>
        <View style={styles.sectionTwoHeader}>
          <View style={styles.descContainer}>
            <Typography
              variant={TypographyVariant.LMEDIUM_EXTRABOLD}
              text={getDescriptionHeaderText()}
              customTextStyles={styles.sectionTitle}
            />
            <Tooltip
              target={
                <InfoIconPay
                  size={22}
                  color={ColorPalette.GREY_TEXT_400}
                  style={undefined} // Pass original style props
                />
              }
              content={
                <Typography customTextStyles={{
                  color: ColorPalette.GREY_TEXT_200,
                  paddingVertical: getScreenHeight(0.1)
                }} variant={TypographyVariant.LSMALL_MEDIUM}>
                  Detailed explanation of product features and usage.                </Typography>
              }
              placement="top"

            />
          </View>

          {/* {!editMode && (
            <Button
              text="Generate"
              variant={ButtonVariant.PRIMARY}
              type={ButtonType.PRIMARY}
              state={ButtonState.AI}
              size={ButtonSize.SMALL}
              onPress={() => {}}
              withShadow
              textVariant={TypographyVariant.LMEDIUM_MEDIUM}
            />
          )} */}
        </View>

        <View style={styles.toolbar}>
          <Badge
            text="Paragraph"
            variant={BadgeVariant.FILLED}
            // rightIcon={ArrowDownIcon}
            onPress={e => {
              e.stopPropagation();
            }}
            textVariant={TypographyVariant.LSMALL_REGULAR}
            customContainerStyle={styles.containerStyle}
            customTextColor={ColorPalette.GREY_TEXT_400}
          // iconSize={16}
          />

          <View style={styles.toolbarIcons}>
            <TouchableOpacity
              onPress={() => toggleTextFormat('bold')}
              style={[textFormat.bold && styles.activeFormatButton]}>
              <Typography
                variant={TypographyVariant.LMEDIUM_EXTRASEMIBOLD}
                text="B"
                customTextStyles={{
                  color: textFormat.bold
                    ? ColorPalette.Primary
                    : ColorPalette.GREY_TEXT_400,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleTextFormat('italic')}
              style={[textFormat.italic && styles.activeFormatButton]}>
              <TextSymbolIcon
                style={undefined}
                size={18}
                color={
                  textFormat.italic
                    ? ColorPalette.Primary
                    : ColorPalette.GREY_TEXT_400
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleTextFormat('underline')}
              style={[textFormat.underline && styles.activeFormatButton]}>
              <UnderlineIcon
                style={undefined}
                size={18}
                color={
                  textFormat.underline
                    ? ColorPalette.Primary
                    : ColorPalette.GREY_TEXT_400
                }
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <PencilUnderlineIcon style={undefined} size={18} />
            </TouchableOpacity>
            <TouchableOpacity>
              <UnderlineTextIcon style={undefined} size={18} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAlignmentChange('left')}
              style={[textAlignment === 'left' && styles.activeFormatButton]}>
              <AlignTextLeftIcon
                style={undefined}
                size={18}
                color={
                  textAlignment === 'left'
                    ? ColorPalette.Primary
                    : ColorPalette.GREY_TEXT_400
                }
                strokeWidth={1.5}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAlignmentChange('center')}
              style={[textAlignment === 'center' && styles.activeFormatButton]}>
              <AlignTextCenterIcon
                style={undefined}
                size={18}
                color={
                  textAlignment === 'center'
                    ? ColorPalette.Primary
                    : ColorPalette.GREY_TEXT_400
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAlignmentChange('right')}
              style={[textAlignment === 'right' && styles.activeFormatButton]}>
              <AlignTextRightIcon
                style={undefined}
                size={18}
                color={
                  textAlignment === 'right'
                    ? ColorPalette.Primary
                    : ColorPalette.GREY_TEXT_400
                }
                strokeWidth={1.5}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* <View
          style={[
            styles.textAreaContainer,
            isFocused && styles.textAreaContainerFocused,
          ]}> */}
        {/* <TextInput
            label="Product Description"
            style={[
              styles.textArea,
              { textAlign: textAlignment },
              textFormat.bold && styles.boldText,
              textFormat.italic && styles.italicText,
              textFormat.underline && styles.underlineText,
            ]}
            placeholder={
              editMode
                ? 'Update your product description...'
                : 'e.g. Sonic Wave: Powerful sound, deep bass, 12H playtime, Bluetooth. Perfect for any space!'
            }
            placeholderTextColor={ColorPalette.GREY_TEXT_00}
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
            value={safeFormData.description}
            onChangeText={text => updateFormData({ description: text })}
            onFocus={handleTextAreaFocus}
            onBlur={handleTextAreaBlur}
          /> */}
        <AnimatedTextInput
          value={safeFormData.description}
          onChangeText={text => updateFormData({ description: text })}
          label={
            editMode
              ? 'Update your product description...'
              : 'E.g., Sonic Wave: Powerful sound, deep bass, 12H playtime, Bluetooth. Perfect for any space!'
          }
          multiline
          numberOfLines={8}
          height={160}
          customContainerStyles={[
            { paddingHorizontal: getScreenWidth(0), paddingVertical: getScreenHeight(0.5) },
          ]}
          customInputStyles={[
            {
              textAlign: textAlignment,
              textAlignVertical: 'top',
              paddingHorizontal: 6,
              paddingTop: getScreenHeight(2),
            },
            textFormat.bold && styles.boldText,
            textFormat.italic && styles.italicText,
            textFormat.underline && styles.underlineText,
          ]}
          customLabelStyles={{
            left: getScreenWidth(0),
            right: getScreenWidth(6),
            paddingHorizontal: 0,
            top: isFocused ? getScreenHeight(2) : getScreenHeight(-0.5),
          }}
        // required={false}
        />



        {/* </View> */}
      </View>
    </View>
  );
};

export default ProductInfoStep;
