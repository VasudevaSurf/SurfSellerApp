import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import InfoIconPay from '../../../../../../assets/icons/InfoIconPay';
import Dropdown from '../../../../../../components/MainComponents/DropdownModal/Dropdown';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import {styles} from './FeaturesStep.styles';
import Tooltip from '../../../../../../components/MainComponents/Tooltip/Tooltip';

interface FeaturesStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  editMode?: boolean;
}

const FeaturesStep: React.FC<FeaturesStepProps> = ({
  formData,
  updateFormData,
  editMode = false,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Local state for each feature field
  const [featureValues, setFeatureValues] = useState<{[key: string]: string}>(
    {},
  );

  // Debug logging on mount and when formData changes
  useEffect(() => {
    console.log('🎨 FeaturesStep - Received formData:', {
      hasExtraFieldsData: !!formData.extraFieldsData,
      extraFieldsCount: formData.extraFieldsData?.length || 0,
      hasProductFeatures: !!formData.productFeatures,
      productFeaturesCount: formData.productFeatures
        ? Object.keys(formData.productFeatures).length
        : 0,
      extraFieldsData: formData.extraFieldsData,
      productFeatures: formData.productFeatures,
    });
  }, [formData]);

  // Initialize feature values from formData
  useEffect(() => {
    if (formData.productFeatures) {
      console.log('📋 Initializing feature values:', formData.productFeatures);
      setFeatureValues(formData.productFeatures);
    }
  }, [formData.productFeatures]);

  // Handle dropdown selection
  const handleFeatureChange = (fieldName: string, selectedId: string) => {
    console.log('🔄 Feature changed:', {fieldName, selectedId});

    // Update local state
    const updatedFeatures = {
      ...featureValues,
      [fieldName]: selectedId,
    };
    setFeatureValues(updatedFeatures);

    // Update parent form data
    updateFormData({
      productFeatures: updatedFeatures,
    });
  };

  // Handle dropdown toggle
  const handleDropdownToggle = (fieldName: string, isOpen: boolean) => {
    if (isOpen) {
      setActiveDropdown(fieldName);
    } else if (activeDropdown === fieldName) {
      setActiveDropdown(null);
    }
  };

  // Check if we have extra fields to render
  if (!formData.extraFieldsData || formData.extraFieldsData.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography
              variant={TypographyVariant.LMEDIUM_EXTRABOLD}
              text="Features"
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
                  Key product highlights or specifications.
                </Typography>
              }
              placement="right"
              containerStyle={{
                width: getScreenWidth(60),
              }}
            />
          </View>

          <View style={{paddingHorizontal: getScreenWidth(4)}}>
            <Typography
              variant={TypographyVariant.PMEDIUM_REGULAR}
              text="No additional features available for this product."
              customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text="Product Features"
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
                Key product highlights or specifications from your catalog.
              </Typography>
            }
            placement="right"
            containerStyle={{
              width: getScreenWidth(60),
            }}
          />
        </View>

        <View style={{gap: getScreenWidth(4)}}>
          {formData.extraFieldsData.map((field: any, index: number) => {
            // Skip fields without variants
            if (!field.variants || field.variants.length === 0) {
              return null;
            }

            // Calculate z-index based on position
            const zIndex = formData.extraFieldsData.length - index;
            const isActive = activeDropdown === field.field_name;

            // Transform variants to dropdown format
            const options = field.variants
              .filter((variant: any) => variant.id !== '') // Filter out empty options
              .map((variant: any) => ({
                value: variant.id,
                label: variant.name,
              }));

            // Get current selected value
            const selectedValue =
              featureValues[field.field_name] || field.value || '';

            return (
              <View
                key={field.field_name}
                style={{
                  marginHorizontal: getScreenWidth(4),
                  zIndex: isActive ? 1000 : zIndex,
                }}>
                <Dropdown
                  options={options}
                  selectedValue={selectedValue}
                  onSelect={value =>
                    handleFeatureChange(field.field_name, value)
                  }
                  placeholder={`Select ${field.name.toLowerCase()}`}
                  showSearch={options.length > 5}
                  searchPlaceholder={`Search ${field.name.toLowerCase()}`}
                  selectionType="radio"
                  onDropdownToggle={isOpen =>
                    handleDropdownToggle(field.field_name, isOpen)
                  }
                  disabled={field.field_disabled}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default FeaturesStep;
