import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Dropdown from '../../../../../../components/MainComponents/DropdownModal/Dropdown';
import AnimatedTextInput from '../../../../../../components/UserComponents/TextInput/TextInput';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import {styles} from './FeaturesStep.styles';
import InfoIconPay from '../../../../../../assets/icons/InfoIconPay';
import Tooltip from '../../../../../../components/MainComponents/Tooltip/Tooltip';
import {ProductFeature} from '../../../../../../services/apiService';
import CheckIcon from '../../../../../../assets/icons/CheckIcon';
import {BorderRadius, Spacing} from '../../../../../../config/globalStyles';

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
  const [localFeatureValues, setLocalFeatureValues] = useState<{
    [fieldName: string]: string;
  }>({});

  // Shipping properties state
  const [shippingWeight, setShippingWeight] = useState('');
  const [shippingPrice, setShippingPrice] = useState('');
  const [freeShippingChecked, setFreeShippingChecked] = useState(false);

  // Item in a box state
  const [unitsPerBox, setUnitsPerBox] = useState('');
  const [extraUnitsInSameBox, setExtraUnitsInSameBox] = useState('');

  // Box dimension state
  const [boxDimensionLength, setBoxDimensionLength] = useState('');
  const [boxDimensionWidth, setBoxDimensionWidth] = useState('');
  const [boxDimensionHeight, setBoxDimensionHeight] = useState('');

  // Extract available features from formData
  const availableFeatures: ProductFeature[] = formData.availableFeatures || [];

  console.log('🎨 FeaturesStep render:', {
    editMode,
    availableFeaturesCount: availableFeatures.length,
    selectedFeatures: formData.selectedFeatures,
    availableFeatures: availableFeatures.map(f => ({
      name: f.name,
      fieldName: f.field_name,
      value: f.value,
      hasVariants: !!f.variants,
    })),
  });

  // Initialize local state from formData
  useEffect(() => {
    if (formData.selectedFeatures) {
      console.log('📥 Initializing feature values:', formData.selectedFeatures);
      setLocalFeatureValues(formData.selectedFeatures);
    }
  }, [formData.selectedFeatures]);

  // Initialize shipping and box data from formData
  useEffect(() => {
    if (editMode && formData) {
      setShippingWeight(formData.shippingWeight || '');
      setShippingPrice(formData.shippingPrice || '');
      setFreeShippingChecked(formData.freeShipping || false);
      setUnitsPerBox(formData.unitsPerBox || '');
      setExtraUnitsInSameBox(formData.extraUnitsInSameBox || '');
      setBoxDimensionLength(formData.boxDimensionLength || '');
      setBoxDimensionWidth(formData.boxDimensionWidth || '');
      setBoxDimensionHeight(formData.boxDimensionHeight || '');
    }
  }, [editMode, formData]);

  const handleDropdownToggle = (fieldName: string, isOpen: boolean) => {
    if (isOpen) {
      setActiveDropdown(fieldName);
    } else if (activeDropdown === fieldName) {
      setActiveDropdown(null);
    }
  };

  const handleFeatureChange = (fieldName: string, value: string) => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎨 [FEATURE CHANGE] User changed a feature');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Field Name:', fieldName);
    console.log('New Value:', value);
    console.log('Previous Value:', localFeatureValues[fieldName] || '(empty)');

    const updatedValues = {
      ...localFeatureValues,
      [fieldName]: value,
    };

    console.log('\n📊 All Feature Values After Change:');
    console.log(JSON.stringify(updatedValues, null, 2));

    setLocalFeatureValues(updatedValues);

    console.log('\n📤 Updating parent formData...');
    updateFormData({
      selectedFeatures: updatedValues,
    });
    console.log('✅ Parent formData updated');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  };

  const handleShippingWeightChange = (value: string) => {
    setShippingWeight(value);
    updateFormData({shippingWeight: value});
  };

  const handleShippingPriceChange = (value: string) => {
    setShippingPrice(value);
    updateFormData({shippingPrice: value});
  };

  const handleFreeShippingCheckbox = (checked: boolean) => {
    setFreeShippingChecked(checked);
    updateFormData({freeShipping: checked});
  };

  const handleUnitsPerBoxChange = (value: string) => {
    setUnitsPerBox(value);
    updateFormData({unitsPerBox: value});
  };

  const handleExtraUnitInSameBoxChange = (value: string) => {
    setExtraUnitsInSameBox(value);
    updateFormData({extraUnitsInSameBox: value});
  };

  const handleBoxDimensionLengthChange = (value: string) => {
    setBoxDimensionLength(value);
    updateFormData({boxDimensionLength: value});
  };

  const handleBoxDimensionWidthChange = (value: string) => {
    setBoxDimensionWidth(value);
    updateFormData({boxDimensionWidth: value});
  };

  const handleBoxDimensionHeightChange = (value: string) => {
    setBoxDimensionHeight(value);
    updateFormData({boxDimensionHeight: value});
  };

  // Group features by field name for better organization
  const brandFeature = availableFeatures.find(f =>
    f.name.toLowerCase().includes('brand'),
  );
  const colorFeature = availableFeatures.find(f =>
    f.name.toLowerCase().includes('color'),
  );
  const sizeFeature = availableFeatures.find(f =>
    f.name.toLowerCase().includes('size'),
  );
  const weightFeature = availableFeatures.find(f =>
    f.name.toLowerCase().includes('weight'),
  );

  // Get other features that don't match the common ones
  const otherFeatures = availableFeatures.filter(
    f =>
      !f.name.toLowerCase().includes('brand') &&
      !f.name.toLowerCase().includes('color') &&
      !f.name.toLowerCase().includes('size') &&
      !f.name.toLowerCase().includes('weight'),
  );

  const renderFeatureField = (
    feature: ProductFeature,
    index: number,
    totalCount: number,
  ) => {
    const currentValue = localFeatureValues[feature.field_name] || '';
    const zIndex = totalCount - index;

    console.log('🎨 Rendering feature:', {
      name: feature.name,
      fieldName: feature.field_name,
      currentValue,
      hasVariants: !!feature.variants,
      variantsCount: feature.variants?.length || 0,
    });

    // If field has variants, show dropdown
    if (feature.variants && feature.variants.length > 0) {
      const options = feature.variants.map(variant => ({
        value: variant.id,
        label: variant.name,
      }));

      return (
        <View
          key={feature.field_name}
          style={{
            zIndex: activeDropdown === feature.field_name ? 999 : zIndex,
          }}>
          <Dropdown
            options={options}
            selectedValue={currentValue}
            onSelect={value => handleFeatureChange(feature.field_name, value)}
            placeholder={`Select ${feature.name.toLowerCase()}`}
            showSearch={options.length > 5}
            searchPlaceholder={`Search ${feature.name.toLowerCase()}`}
            selectionType="radio"
            onDropdownToggle={isOpen =>
              handleDropdownToggle(feature.field_name, isOpen)
            }
          />
        </View>
      );
    }

    // If no variants, show text input
    return (
      <View key={feature.field_name}>
        <AnimatedTextInput
          label={`Enter ${feature.name.toLowerCase()}`}
          value={currentValue}
          onChangeText={value => handleFeatureChange(feature.field_name, value)}
          keyboardType="default"
          required={feature.required}
        />
      </View>
    );
  };

  // Render loading state
  if (editMode && (!availableFeatures || availableFeatures.length === 0)) {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography
              variant={TypographyVariant.LMEDIUM_EXTRABOLD}
              text="Features"
              customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
            />
          </View>

          <View
            style={{
              padding: getScreenWidth(4),
              alignItems: 'center',
              gap: getScreenHeight(2),
            }}>
            <ActivityIndicator size="large" color={ColorPalette.PURPLE_300} />
            <Typography
              variant={TypographyVariant.PSMALL_REGULAR}
              text="Loading features..."
              customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: getScreenHeight(8)}}>
      {/* Product Features Section */}
      {availableFeatures.length > 0 && (
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
                  Key product highlights or specifications.
                </Typography>
              }
              placement="right"
              containerStyle={{
                width: getScreenWidth(60),
              }}
            />
          </View>

          <View
            style={{
              gap: getScreenWidth(4),
              paddingHorizontal: getScreenWidth(4),
            }}>
            {/* Render common features first if they exist */}
            {(brandFeature || colorFeature || sizeFeature) && (
              <View style={{gap: getScreenWidth(4)}}>
                {brandFeature &&
                  renderFeatureField(brandFeature, 0, availableFeatures.length)}
                {colorFeature &&
                  renderFeatureField(colorFeature, 1, availableFeatures.length)}
                {sizeFeature &&
                  renderFeatureField(sizeFeature, 2, availableFeatures.length)}
              </View>
            )}

            {/* Render weight feature separately */}
            {weightFeature &&
              renderFeatureField(weightFeature, 3, availableFeatures.length)}

            {/* Render other features */}
            {otherFeatures.map((feature, index) =>
              renderFeatureField(feature, index + 4, availableFeatures.length),
            )}
          </View>
        </View>
      )}

      {/* Shipping Properties Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text="Shipping properties"
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
                Details used to calculate delivery options and costs.
              </Typography>
            }
            placement="bottom"
          />
        </View>

        <View style={styles.inputContainerOne}>
          <AnimatedTextInput
            label="Enter weight (Kgs: 0.000)"
            value={shippingWeight}
            onChangeText={handleShippingWeightChange}
            keyboardType="numeric"
          />

          <AnimatedTextInput
            label="Enter price"
            value={shippingPrice}
            onChangeText={handleShippingPriceChange}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.checkBoxContainer}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => handleFreeShippingCheckbox(!freeShippingChecked)}>
            <View
              style={[
                styles.checkbox,
                freeShippingChecked && {
                  backgroundColor: ColorPalette.PURPLE_300,
                  borderColor: ColorPalette.PURPLE_300,
                },
              ]}>
              {freeShippingChecked && (
                <View style={styles.checkmark}>
                  <CheckIcon size={24} />
                </View>
              )}
            </View>
            <Typography
              text="Free Shipping"
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Item in a Box Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text="Item in a box"
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
                List of everything included with the product.
              </Typography>
            }
            placement="bottom"
          />
        </View>

        <AnimatedTextInput
          label="Enter units per box (e.g., 18)"
          value={unitsPerBox}
          onChangeText={handleUnitsPerBoxChange}
          keyboardType="numeric"
        />

        <AnimatedTextInput
          label="Enter extra units in the same box (optional)"
          value={extraUnitsInSameBox}
          onChangeText={handleExtraUnitInSameBoxChange}
          keyboardType="numeric"
          required={false}
        />
      </View>

      {/* Box Dimension Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text="Box Dimension"
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
                Packaging size used for shipping calculations.
              </Typography>
            }
            placement="bottom"
          />
        </View>

        <View style={styles.inputContainerOne}>
          <AnimatedTextInput
            label="Enter length (Inch: 0.000)"
            value={boxDimensionLength}
            onChangeText={handleBoxDimensionLengthChange}
            keyboardType="numeric"
          />

          <AnimatedTextInput
            label="Enter width (Inch: 0.000)"
            value={boxDimensionWidth}
            onChangeText={handleBoxDimensionWidthChange}
            keyboardType="numeric"
          />

          <AnimatedTextInput
            label="Enter height (Inch: 0.000)"
            value={boxDimensionHeight}
            onChangeText={handleBoxDimensionHeightChange}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Fallback message if no features */}
      {availableFeatures.length === 0 && !editMode && (
        <View style={styles.section}>
          <View
            style={{
              padding: getScreenWidth(4),
              alignItems: 'center',
            }}>
            <Typography
              variant={TypographyVariant.PSMALL_REGULAR}
              text="No features available for this product category. Features will load after saving the product."
              customTextStyles={{
                color: ColorPalette.GREY_TEXT_300,
                textAlign: 'center',
              }}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default FeaturesStep;
