import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import ArrowDownIcon from '../../../../../../assets/icons/ArrowDownIcon';
import ArrowRightIcon from '../../../../../../assets/icons/ArrowRightIcon';
import InfoIcon from '../../../../../../assets/icons/InfoIcon';
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
import {styles} from './ProductInfoStep.styles';
import {navigate} from '../../../../../../navigation/utils/navigationRef';

interface ProductInfoStepProps {
  formData: {
    productName: string;
    price: string;
    category: string;
    subcategory?: string;
    description: string;
  };
  updateFormData: (data: any) => void;
}

const ProductInfoStep: React.FC<ProductInfoStepProps> = ({
  formData,
  updateFormData,
}) => {
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

  // Fix navigation to CategorySelection
  const navigateToCategorySelection = () => {
    navigate('Dashboard', {
      screen: 'Product',
      params: {
        screen: 'CategoryScreen',
        params: {
          // Add nested params properly
          onSelectCategory: handleCategorySelection,
          initialCategory: formData.category,
          initialSubcategory: formData.subcategory,
        },
      },
    });
  };

  const handleCategorySelection = (category: string, subcategory?: string) => {
    const categoryData = subcategory
      ? {category, subcategory}
      : {category, subcategory: undefined};

    updateFormData(categoryData);
  };

  // Format the category display text
  const getCategoryDisplayText = () => {
    if (!formData.category) {
      return 'Select category*';
    }

    return formData.subcategory
      ? `${formData.category} - ${formData.subcategory}`
      : formData.category;
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text="Product information"
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
          <InfoIcon
            size={16}
            color={ColorPalette.IconColor}
            style={undefined}
          />
        </View>

        <View style={styles.inputContainer}>
          <AnimatedTextInput
            label="Enter product name*"
            value={formData.productName}
            onChangeText={text => updateFormData({productName: text})}
            keyboardType="default"
          />
          <AnimatedTextInput
            label="Enter price*"
            value={formData.price || ''}
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
                  color: formData.category
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
        </View>
      </View>

      <View style={styles.sectionTwo}>
        <View style={styles.sectionTwoHeader}>
          <View style={styles.descContainer}>
            <Typography
              variant={TypographyVariant.LMEDIUM_EXTRABOLD}
              text="Product description"
              customTextStyles={styles.sectionTitle}
            />
            <InfoIcon
              size={16}
              color={ColorPalette.IconColor}
              style={undefined}
            />
          </View>

          <Button
            text="Generate"
            variant={ButtonVariant.PRIMARY}
            type={ButtonType.PRIMARY}
            state={ButtonState.DEFAULT}
            size={ButtonSize.SMALL}
            onPress={() => {}}
          />
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
                variant={TypographyVariant.LMEDIUM_BOLD}
                text="B"
                customTextStyles={{
                  color: textFormat.bold
                    ? ColorPalette.Primary
                    : ColorPalette.GREY_TEXT_400,
                  fontSize: 18,
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
            placeholder="Sonic Wave Powerful sound, deep bass, 12H playtime, Bluetooth. Perfect for any space!"
            placeholderTextColor={ColorPalette.PlaceholderText}
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
            value={formData.description}
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
