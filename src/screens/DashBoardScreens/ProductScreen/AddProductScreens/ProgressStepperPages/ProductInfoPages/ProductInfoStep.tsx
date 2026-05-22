// Updated ProductInfoStep.tsx to handle HTML descriptions

import React, {useState, useEffect, useMemo} from 'react';
import {Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert} from 'react-native';
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
import BrainIcon from '../../../../../../assets/icons/BrainIcon';
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
import {
  getFigmaDimension,
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import {navigate} from '../../../../../../navigation/utils/navigationRef';
import {styles} from './ProductInfoStep.styles';
import {BorderRadius, Spacing} from '../../../../../../config/globalStyles';
import EuroIcon from '../../../../../../assets/icons/EuroIcon';
import {SlidingBar} from '../../../../../../components/MainComponents/SlidingBar/SlidingBar';
import CrossCircleIcon from '../../../../../../assets/icons/CrossIcon';
import {useCategories} from '../../../../../../hooks/useCategories';
import {Category, FALLBACK_CATEGORIES} from './CategoryConstants';
import Tooltip from '../../../../../../components/MainComponents/Tooltip/Tooltip';
import {extractPlainTextForEditing} from '../../../../../../utils/htmlUtils';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../../redux/store';
import {generateContentApi} from '../../../../../../services/apiService';

interface ProductInfoStepProps {
  formData: {
    productName: string;
    price: string;
    category: string;
    subcategory?: string;
    description: string;
    categoryPath?: string[];
    productId?: string;
    category_listing?: {
      id: number;
      name: string;
    };
  };
  updateFormData: (data: any) => void;
  editMode?: boolean;
}

const findCategoryIdsFromPath = (
  rootCategories: Category[],
  path: string[],
): string[] => {
  const ids: string[] = [];
  let currentLevel = rootCategories;

  for (const name of path) {
    const match = currentLevel.find(cat => cat.name === name);
    if (!match) break;
    ids.push(match.id);
    currentLevel = match.subcategories || [];
  }

  return ids;
};

const ProductInfoStep: React.FC<ProductInfoStepProps> = ({
  formData = {},
  updateFormData,
  editMode = false,
}) => {
  console.log('formData', formData);

  const safeFormData = {
    productName: formData?.productName || '',
    price: formData?.price || '',
    category: formData?.category || '',
    subcategory: formData?.subcategory || '',
    description: formData?.description || '',
    categoryPath: formData?.categoryPath || [],
    productId: formData?.productId || '',
    selectedCategories: formData?.selectedCategories || [],
    ...formData,
  };

  console.log('safeFormData', safeFormData.categoryPath);

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
    new Set(safeFormData.selectedCategories.map(c => c.id)),
  );
  const [initializedCategories, setInitializedCategories] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const userId = useSelector(
    (state: RootState) => state.auth.userData?.user_id,
  );

  const {categories: apiCategories} = useCategories();

  const rootCategories = useMemo(() => {
    if (apiCategories && apiCategories.length > 0) {
      return apiCategories;
    }
    return FALLBACK_CATEGORIES;
  }, [apiCategories]);

  useEffect(() => {
    if (
      !initializedCategories &&
      safeFormData?.categoryPath?.length &&
      rootCategories.length
    ) {
      const ids = findCategoryIdsFromPath(
        rootCategories,
        safeFormData.categoryPath,
      );
      setSelectedCategoryIds(ids);
      setInitializedCategories(true);
    }
  }, [safeFormData?.categoryPath, rootCategories, initializedCategories]);

  const handleTextAreaFocus = () => {
    setIsFocused(true);
  };

  const handleTextAreaBlur = () => {
    setIsFocused(false);
  };

  const handleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
    setTextAlignment(alignment);
  };

  const toggleTextFormat = (format: 'bold' | 'italic' | 'underline') => {
    setTextFormat(prev => ({
      ...prev,
      [format]: !prev[format],
    }));
  };

  console.log('formData in ProductInfoStep', formData);

  const handleCategorySelection = (
    categories: {
      id: string;
      name: string;
      path: string[];
    }[],
  ) => {
    if (!categories || categories.length === 0) return;

    updateFormData({selectedCategories: categories});

    setSelectedCategoryIds(new Set(categories.map(c => c.id)));
  };

  console.log('selectedCategoryIds on parent', selectedCategoryIds);

  const navigateToCategorySelection = () => {
    navigate('Dashboard', {
      screen: 'Product',
      params: {
        screen: 'CategoryScreen',
        params: {
          onSelectCategory: handleCategorySelection,
          initialSelectedCategories: safeFormData.selectedCategories,
          productId: safeFormData.productId,
        },
      },
    });
  };

  const getCategoryDisplayText = () => {
    if (safeFormData.categoryPath && safeFormData.categoryPath.length > 0) {
      return safeFormData.categoryPath.join(', ');
    }

    if (!safeFormData.category) {
      return 'Select category*';
    }

    return safeFormData.subcategory
      ? `${safeFormData.category} - ${safeFormData.subcategory}`
      : safeFormData.category;
  };

  const getCategoryPlaceholderText = () => {
    return 'Select category*';
  };

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

  const getCategoryDebugInfo = () => {
    if (safeFormData.categoryPath) {
      return `Path: [${safeFormData.categoryPath.join(', ')}]`;
    }
    return `Legacy: ${safeFormData.category}${
      safeFormData.subcategory ? ` - ${safeFormData.subcategory}` : ''
    }`;
  };

  const statusOptions = [
    {id: 'pendingApproval', label: 'Pending Approval'},
    {id: 'active', label: 'Active'},
    {id: 'disabled', label: 'Disabled'},
  ];

  const [selectedOption, setSelectedOption] = useState(statusOptions[0]);

  const filteredOptions =
    selectedOption.id === 'pendingApproval'
      ? [statusOptions[0]]
      : statusOptions.filter(opt => opt.id !== 'pendingApproval');

  const formatPrice = value => {
    const numberValue = parseFloat(value) || 0;
    return numberValue.toLocaleString('en-EN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleGenerateContent = async () => {
    if (!safeFormData.productName) {
      Alert.alert('Missing Info', 'Please enter a product name first.');
      return;
    }
    if (!userId) {
      Alert.alert('Error', 'User ID not found.');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await generateContentApi(userId, safeFormData.productName);
      if (response && response.result && response.content?.full_description) {
        updateFormData({description: response.content.full_description});
      } else {
        Alert.alert('Error', response.message || 'Failed to generate content.');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred while generating content.');
    } finally {
      setIsGenerating(false);
    }
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
          <Tooltip
            target={
              <InfoIconPay
                size={22}
                color={ColorPalette.GREY_TEXT_400}
                style={undefined}
              />
            }
            content={
              <Typography
                customTextStyles={{
                  color: ColorPalette.GREY_TEXT_200,
                  paddingVertical: getScreenHeight(0.1),
                }}
                variant={TypographyVariant.LSMALL_MEDIUM}>
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
            onChangeText={text => updateFormData({productName: text})}
            keyboardType="default"
          />
          <AnimatedTextInput
            label="Enter price*"
            value={safeFormData.price}
            onChangeText={text => {
              const cleaned = text.replace(/[^0-9.]/g, '');
              const parts = cleaned.split('.');
              const formatted =
                parts.length > 1
                  ? parts[0] + '.' + parts[1].slice(0, 2)
                  : parts[0];

              updateFormData({price: formatted});
            }}
            keyboardType="decimal-pad"
            countryCode={<EuroIcon />}
            showCountrySection
          />

          <View style={styles.selectContainer}>
            <TouchableOpacity
              style={[styles.inputContainer, styles.selectBtn]}
              activeOpacity={0.7}
              onPress={navigateToCategorySelection}>
              <Typography
                variant={TypographyVariant.PSMALL_REGULAR}
                text={getCategoryPlaceholderText()}
                customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
              />
              <ArrowRightIcon color={ColorPalette.GREY_TEXT_400} />
            </TouchableOpacity>

            {safeFormData.selectedCategories.length > 0 &&
              safeFormData.selectedCategories.map((item, index) => (
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#3A5AFE0D',
                    paddingVertical: getScreenHeight(1.5),
                    paddingHorizontal: getScreenWidth(4),
                    borderRadius: BorderRadius.Small,
                    marginTop: getScreenHeight(1),
                  }}>
                  <Typography
                    text={item.name}
                    variant={TypographyVariant.PMEDIUM_REGULAR}
                    customTextStyles={{
                      color: ColorPalette.ProgressLine,
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      const updatedCategories =
                        safeFormData.selectedCategories.filter(
                          (_, i) => i !== index,
                        );

                      updateFormData({
                        ...safeFormData,
                        selectedCategories: updatedCategories,
                        category: updatedCategories[0]?.name || '',
                        subcategory:
                          updatedCategories.length > 1
                            ? updatedCategories[updatedCategories.length - 1]
                                .name
                            : undefined,
                        categoryPath: updatedCategories.map(c => c.name),
                        categoryDisplay: updatedCategories
                          .map(c => c.name)
                          .join(' > '),
                      });

                      setSelectedCategoryIds(
                        new Set(updatedCategories.map(c => c.id)),
                      );
                    }}>
                    <CrossCircleIcon size={24} />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text={getStatusHeaderText()}
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
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
              <Typography
                customTextStyles={{
                  color: ColorPalette.GREY_TEXT_200,
                  paddingVertical: getScreenHeight(0.1),
                }}
                variant={TypographyVariant.LSMALL_MEDIUM}>
                Availability state of the product (active, pending, or
                inactive).{' '}
              </Typography>
            }
            placement="bottom"
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
                  style={undefined}
                />
              }
              content={
                <Typography
                  customTextStyles={{
                    color: ColorPalette.GREY_TEXT_200,
                    paddingVertical: getScreenHeight(0.1),
                  }}
                  variant={TypographyVariant.LSMALL_MEDIUM}>
                  Detailed explanation of product features and usage.{' '}
                </Typography>
              }
              placement="top"
            />
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: ColorPalette.SearchBack,
              paddingHorizontal: getScreenWidth(2),
              paddingVertical: getScreenHeight(0.5),
              borderRadius: BorderRadius.XSmall,
            }}
            onPress={handleGenerateContent}
            disabled={isGenerating}>
            {isGenerating ? (
              <ActivityIndicator size="small" color={ColorPalette.Primary} />
            ) : (
              <BrainIcon size={16} />
            )}
            <Typography
              text={isGenerating ? 'Generating...' : 'Generate'}
              variant={TypographyVariant.LSMALL_MEDIUM}
              customTextStyles={{
                color: ColorPalette.Primary,
                marginLeft: getScreenWidth(1),
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.toolbar}>
          <Badge
            text="Paragraph"
            variant={BadgeVariant.FILLED}
            onPress={e => {
              e.stopPropagation();
            }}
            textVariant={TypographyVariant.LSMALL_REGULAR}
            customContainerStyle={styles.containerStyle}
            customTextColor={ColorPalette.GREY_TEXT_400}
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

        <AnimatedTextInput
          value={safeFormData.description}
          onChangeText={text => updateFormData({description: text})}
          label={
            editMode
              ? 'Update your product description...'
              : 'E.g., Sonic Wave: Powerful sound, deep bass, 12H playtime, Bluetooth. Perfect for any space!'
          }
          multiline
          numberOfLines={8}
          height={160}
          customContainerStyles={[
            {
              paddingHorizontal: getScreenWidth(0),
              paddingVertical: getScreenHeight(0.5),
            },
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
        />
      </View>
    </View>
  );
};

export default ProductInfoStep;
