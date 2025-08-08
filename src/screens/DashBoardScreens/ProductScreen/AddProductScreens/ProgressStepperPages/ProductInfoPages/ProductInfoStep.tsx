// Updated ProductInfoStep.tsx to handle category path

import React, {useState, useEffect} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
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
import {Badge} from '../../../../../../components/UserComponents/Badges/Badge';
import {BadgeVariant} from '../../../../../../components/UserComponents/Badges/Badge.types';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../../components/UserComponents/Button';
import AnimatedTextInput from '../../../../../../components/UserComponents/TextInput/TextInput';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {getScreenWidth} from '../../../../../../helpers/screenSize';
import {navigate} from '../../../../../../navigation/utils/navigationRef';
import {styles} from './ProductInfoStep.styles';
import {Spacing} from '../../../../../../config/globalStyles';

interface ProductInfoStepProps {
  formData: {
    productName: string;
    price: string;
    category: string;
    subcategory?: string;
    description: string;
    categoryPath?: string[]; // Add category path support
    productId?: string; // Make productId optional
  };
  updateFormData: (data: any) => void;
  editMode?: boolean;
}

const ProductInfoStep: React.FC<ProductInfoStepProps> = ({
  formData = {}, // Provide default empty object
  updateFormData,
  editMode = false,
}) => {
  // Safely access formData properties with defaults
  const safeFormData = {
    productName: formData?.productName || '',
    price: formData?.price || '',
    category: formData?.category || '',
    subcategory: formData?.subcategory || '',
    description: formData?.description || '',
    categoryPath: formData?.categoryPath || [],
    productId: formData?.productId || '',
    ...formData, // Spread any additional properties
  };
  const [isFocused, setIsFocused] = useState(false);
  const [textAlignment, setTextAlignment] = useState<
    'left' | 'center' | 'right'
  >('left');
  const [textFormat, setTextFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

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

  // Updated navigation to category selection
  const navigateToCategorySelection = () => {
    navigate('Dashboard', {
      screen: 'Product',
      params: {
        screen: 'CategoryScreen',
        params: {
          onSelectCategory: handleCategorySelection,
          // Don't pass initialCategory to allow fresh start from root
          // This allows users to change to completely different categories
          productId: safeFormData.productId, // Use safe form data
        },
      },
    });
  };

  // Updated category selection handler to support category path
  const handleCategorySelection = (categoryPath: string[]) => {
    console.log('Category path selected:', categoryPath);

    if (categoryPath.length === 0) return;

    // Store the full category path and also maintain backwards compatibility
    const categoryData = {
      categoryPath: categoryPath,
      category: categoryPath[0], // Root category for backwards compatibility
      subcategory:
        categoryPath.length > 1
          ? categoryPath[categoryPath.length - 1]
          : undefined,
      // Store the full path as a formatted string for display
      categoryDisplay: categoryPath.join(' > '),
    };

    updateFormData(categoryData);
  };

  // Updated category display text with full path support
  const getCategoryDisplayText = () => {
    // Check if we have a category path (new format)
    if (safeFormData.categoryPath && safeFormData.categoryPath.length > 0) {
      return safeFormData.categoryPath.join(' > ');
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

  const getDescriptionHeaderText = () => {
    return editMode ? 'Update Product Description' : 'Product description';
  };

  // Helper to get category info for debugging
  const getCategoryDebugInfo = () => {
    if (safeFormData.categoryPath) {
      return `Path: [${safeFormData.categoryPath.join(', ')}]`;
    }
    return `Legacy: ${safeFormData.category}${
      safeFormData.subcategory ? ` - ${safeFormData.subcategory}` : ''
    }`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text={getHeaderText()}
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
          <InfoIconPay
            size={16}
            color={ColorPalette.GREY_TEXT_400}
            style={undefined}
          />
        </View>

        <View style={styles.inputContainer}>
          <AnimatedTextInput
            label="Enter product name*"
            value={safeFormData.productName}
            onChangeText={text => updateFormData({productName: text})}
            keyboardType="default"
          />
          <AnimatedTextInput
            label="Enter price*"
            value={safeFormData.price}
            onChangeText={text => updateFormData({price: text})}
            keyboardType="phone-pad"
            countryCode="€"
            showCountrySection
          />

          <View style={{paddingHorizontal: getScreenWidth(4)}}>
            <TouchableOpacity
              style={[styles.inputContainer, styles.selectContainer]}
              activeOpacity={0.7}
              onPress={navigateToCategorySelection}>
              <Typography
                variant={TypographyVariant.PSMALL_REGULAR}
                text={getCategoryDisplayText()}
                customTextStyles={{
                  color: isCategorySelected()
                    ? ColorPalette.GREY_TEXT_500
                    : ColorPalette.GREY_TEXT_300,
                }}
              />
              <ArrowRightIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_400}
              />
            </TouchableOpacity>
          </View>

          {/* Debug info - remove in production */}
          {__DEV__ && isCategorySelected() && (
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
          )}
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
            <InfoIconPay
              size={16}
              color={ColorPalette.GREY_TEXT_400}
              style={undefined}
            />
          </View>

          {!editMode && (
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
          )}
        </View>

        <View style={styles.toolbar}>
          <Badge
            text="Paragraph"
            variant={BadgeVariant.FILLED}
            rightIcon={ArrowDownIcon}
            onPress={e => {
              e.stopPropagation();
            }}
            textVariant={TypographyVariant.LSMALL_REGULAR}
            customContainerStyle={styles.containerStyle}
            customTextColor={ColorPalette.GREY_TEXT_400}
            iconSize={16}
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

        <View
          style={[
            styles.textAreaContainer,
            isFocused && styles.textAreaContainerFocused,
          ]}>
          <TextInput
            style={[
              styles.textArea,
              {textAlign: textAlignment},
              textFormat.bold && styles.boldText,
              textFormat.italic && styles.italicText,
              textFormat.underline && styles.underlineText,
            ]}
            placeholder={
              editMode
                ? 'Update your product description...'
                : 'Sonic Wave Powerful sound, deep bass, 12H playtime, Bluetooth. Perfect for any space!'
            }
            placeholderTextColor={ColorPalette.PlaceholderText}
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
            value={safeFormData.description}
            onChangeText={text => updateFormData({description: text})}
            onFocus={handleTextAreaFocus}
            onBlur={handleTextAreaBlur}
          />
        </View>
      </View>
    </View>
  );
};

export default ProductInfoStep;
