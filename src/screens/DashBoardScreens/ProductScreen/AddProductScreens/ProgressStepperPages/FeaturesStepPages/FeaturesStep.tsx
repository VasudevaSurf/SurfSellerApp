import React, {useState, useEffect} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
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
import CheckIcon from '../../../../../../assets/icons/CheckIcon';
import InfoIconPay from '../../../../../../assets/icons/InfoIconPay';
import Tooltip from '../../../../../../components/MainComponents/Tooltip/Tooltip';

interface FeatureField {
  name: string;
  field_name: string;
  main_object: string;
  field_type: string;
  field_type_desc: string;
  field_disabled: boolean;
  required: boolean;
  value: string | null;
  variants: Array<{id: string; name: string}> | null;
}

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
  // ✅ Dynamic state to store all feature values
  const [featureValues, setFeatureValues] = useState<{
    [fieldName: string]: string;
  }>({});
  const [features, setFeatures] = useState<FeatureField[]>([]);
  const [apiDataLoaded, setApiDataLoaded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // ✅ STEP 1: Load features from API response
  useEffect(() => {
    if (editMode && formData?.apiResponse?.sections) {
      console.log('🔍 Loading features from API response...');

      // Find the Features section
      const featuresSection = formData.apiResponse.sections.find(
        (section: any) => section.section_type === 'features',
      );

      if (
        featuresSection?.features &&
        Array.isArray(featuresSection.features)
      ) {
        console.log('✅ Found features array:', featuresSection.features);

        // Filter out fields without variants (empty dropdowns)
        const validFeatures = featuresSection.features.filter(
          (feature: FeatureField) => {
            // Keep INPUT fields
            if (feature.field_type === 'I') return true;
            // Keep SELECTBOX fields that have variants
            if (
              feature.field_type === 'S' &&
              feature.variants &&
              feature.variants.length > 1
            ) {
              return true;
            }
            return false;
          },
        );

        setFeatures(validFeatures);

        // ✅ Initialize feature values from API
        const initialValues: {[fieldName: string]: string} = {};
        validFeatures.forEach((feature: FeatureField) => {
          if (feature.value) {
            initialValues[feature.field_name] = feature.value;
          }
        });

        console.log('✅ Initial feature values:', initialValues);
        setFeatureValues(initialValues);
        setApiDataLoaded(true);
      }
    } else if (!editMode) {
      setApiDataLoaded(true);
    }
  }, [editMode, formData?.apiResponse]);

  // ✅ Handle value change for any feature
  const handleFeatureChange = (fieldName: string, value: string) => {
    console.log(`🔄 Feature changed: ${fieldName} = ${value}`);

    setFeatureValues(prev => ({
      ...prev,
      [fieldName]: value,
    }));

    // ✅ Update formData with the new feature value
    updateFormData({
      [`feature_${fieldName}`]: value,
      featureFieldName: fieldName,
    });
  };

  const handleDropdownToggle = (dropdownName: string, isOpen: boolean) => {
    if (isOpen) {
      setActiveDropdown(dropdownName);
    } else if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    }
  };

  // ✅ Render a single feature field based on its type
  const renderFeatureField = (feature: FeatureField, index: number) => {
    const zIndex = activeDropdown === feature.field_name ? 999 : 1;

    // ✅ SELECTBOX - Render Dropdown
    if (feature.field_type === 'S' && feature.variants) {
      const options = feature.variants
        .filter(v => v.id !== '') // Remove empty "--" option
        .map(v => ({
          value: v.id,
          label: v.name,
        }));

      const selectedValue = featureValues[feature.field_name] || '';

      return (
        <View
          key={`${feature.field_name}-${index}`}
          style={{
            flex: 1,
            zIndex,
            minWidth: getScreenWidth(28),
          }}>
          <Dropdown
            options={options}
            selectedValue={selectedValue}
            onSelect={(value: string) =>
              handleFeatureChange(feature.field_name, value)
            }
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

    // ✅ INPUT - Render Text Input
    if (feature.field_type === 'I') {
      const value = featureValues[feature.field_name] || '';

      return (
        <View key={`${feature.field_name}-${index}`} style={{flex: 1}}>
          <AnimatedTextInput
            label={`Enter ${feature.name.toLowerCase()}`}
            value={value}
            onChangeText={(text: string) =>
              handleFeatureChange(feature.field_name, text)
            }
            keyboardType="default"
          />
        </View>
      );
    }

    return null;
  };

  // ✅ Group features into rows of 3
  const renderFeatureRows = () => {
    const rows: JSX.Element[] = [];

    for (let i = 0; i < features.length; i += 3) {
      const rowFeatures = features.slice(i, i + 3);

      rows.push(
        <View key={`row-${i}`} style={styles.inputContainer}>
          {rowFeatures.map((feature, idx) =>
            renderFeatureField(feature, i + idx),
          )}
        </View>,
      );
    }

    return rows;
  };

  if (editMode && !apiDataLoaded) {
    return (
      <View style={styles.container}>
        <Typography
          text="Loading features..."
          variant={TypographyVariant.LMEDIUM_REGULAR}
          customTextStyles={{textAlign: 'center', marginTop: 20}}
        />
      </View>
    );
  }

  console.log('🎨 FeaturesStep render:', {
    featuresCount: features.length,
    featureValues,
    activeDropdown,
  });

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}>
      {/* Features Section */}
      {features.length > 0 && (
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
                  Detailed product specifications and characteristics.
                </Typography>
              }
              placement="right"
              containerStyle={{
                width: getScreenWidth(60),
              }}
            />
          </View>

          <View style={{gap: getScreenWidth(4)}}>{renderFeatureRows()}</View>
        </View>
      )}

      {/* Show message if no features available */}
      {features.length === 0 && (
        <View style={styles.section}>
          <Typography
            text="No features available for this product"
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={{
              color: ColorPalette.GREY_TEXT_300,
              textAlign: 'center',
              marginTop: getScreenHeight(2),
            }}
          />
        </View>
      )}

      {/* Extra spacing at bottom for scroll */}
      <View style={{height: getScreenHeight(4)}} />
    </ScrollView>
  );
};

export default FeaturesStep;
