import React, {useState, useEffect} from 'react';
import {Pressable, Text, TextInput, TouchableOpacity, View} from 'react-native';
import InfoIcon from '../../../../../../assets/icons/InfoIcon';
import Dropdown from '../../../../../../components/MainComponents/DropdownModal/Dropdown';
import AnimatedTextInput from '../../../../../../components/UserComponents/TextInput/TextInput';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {getScreenWidth} from '../../../../../../helpers/screenSize';
import {styles} from './FeaturesStep.styles';
import CheckIcon from '../../../../../../assets/icons/CheckIcon';

const BRAND_OPTIONS = [
  {value: 'Kinnie', label: 'Kinnie'},
  {value: 'Twistees', label: 'Twistees'},
  {value: 'Mdina Glass', label: 'Mdina Glass'},
  {value: 'Melita Limited', label: 'Melita Limited'},
  {value: 'Charles & Ron', label: 'Charles & Ron'},
  {value: 'Simonds Farsons Cisk', label: 'Simonds Farsons Cisk'},
  {value: 'Gaia & Nina', label: 'Gaia & Nina'},
  {value: 'Mvintage', label: 'Mvintage'},
  {
    value: 'Corinthia Hotels International',
    label: 'Corinthia Hotels International',
  },
  {value: 'Kandy Kids', label: 'Kandy Kids'},
  {value: 'Kullhadd', label: 'Kullhadd'},
  {value: 'KRS Releasing', label: 'KRS Releasing'},
  {value: "Kellogg's", label: "Kellogg's"},
];

const COLOR_OPTIONS = [
  {value: 'Chartreuse', label: 'Chartreuse'},
  {value: 'Amber', label: 'Amber'},
  {value: 'Periwinkle', label: 'Periwinkle'},
  {value: 'TurquoiseBlue', label: 'Turquoise'},
  {value: 'Lavender', label: 'Lavender'},
  {value: 'Coral', label: 'Coral'},
  {value: 'Indigo', label: 'Indigo'},
  {value: 'Celeste', label: 'Celeste'},
  {value: 'Ochre', label: 'Ochre'},
];

const SIZE_OPTIONS = [
  {value: 'XXS', label: 'XXSmall'},
  {value: 'XS', label: 'XSmall'},
  {value: 'S', label: 'Small'},
  {value: 'L', label: 'Large'},
  {value: 'M', label: 'Medium'},
  {value: 'XL', label: 'XLarge'},
  {value: 'XXL', label: 'XXLarge'},
  {value: 'XXXL', label: 'XXXLarge'},
  {value: '4XL', label: '4XLLarge'},
];

const COUNTRY_OPTIONS = [
  {value: 'Malta', label: 'Malta'},
  {value: 'United Kingdom', label: 'United Kingdom'},
  {value: 'Italy', label: 'Italy'},
  {value: 'Germany', label: 'Germany'},
  {value: 'Spain', label: 'Spain'},
  {value: 'Saudi Arabia', label: 'Saudi Arabia'},
  {value: 'France', label: 'France'},
  {value: 'India', label: 'India'},
  {value: 'Russia', label: 'Russia'},
];

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
  const [manufacturedBy, setManufacturedBy] = useState('');
  const [weighBy, setWeighBy] = useState('');

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  const [shippingPrice, setShippingPrice] = useState('');
  const [shippingWeight, setShippingWeight] = useState('');
  const [freeShippingChecked, setFreeShippingChecked] = useState(false);
  const [boxDimensionLength, setBoxDimensionLength] = useState('');
  const [boxDimensionWidth, setBoxDimensionWidth] = useState('');
  const [boxDimensionHeigth, setBoxDimensionHeight] = useState('');
  const [unitsPerBox, setUnitsPerBox] = useState('');
  const [extraUnitsInSameBox, setExtraUnitsInSameBox] = useState(''); //optional

  // State to manage which dropdown is currently active
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Pre-fill data if in edit mode
  useEffect(() => {
    if (editMode && formData) {
      setManufacturedBy(formData.manufacturer || '');
      setWeighBy(formData.weight || '');
      setSelectedBrand(formData.brand || '');
      setSelectedColor(formData.color || '');
      setSelectedSize(formData.size ? [formData.size] : []);
      setSelectedCountry(formData.countryOfOrigin || '');
    }
  }, [editMode, formData]);

  // Update form data when values change
  const handleManufacturerChange = (text: string) => {
    setManufacturedBy(text);
    updateFormData({manufacturer: text});
  };

  const handleWeightChange = (text: string) => {
    setWeighBy(text);
    updateFormData({weight: text});
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    updateFormData({brand: value});
  };

  const handleColorChange = (value: string) => {
    setSelectedColor(value);
    updateFormData({color: value});
  };

  const handleSizeChange = (values: string[]) => {
    setSelectedSize(values);
    updateFormData({size: values.length > 0 ? values[0] : ''});
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    updateFormData({countryOfOrigin: value});
  };

  const handleShippingWeightChange = (value: string) => {
    setShippingWeight(value);
  };

  const handleShippingPriceChange = (value: string) => {
    setShippingPrice(value);
  };

  const handleFreeShippingCheckbox = (checked: boolean) => {
    setFreeShippingChecked(checked);
  };

  const handleUnitsPerBoxChange = (value: string) => {
    setUnitsPerBox(value);
  };

  const handleExtraUnitInSameBoxChange = (value: string) => {
    setExtraUnitsInSameBox(value);
  };

  const handleBoxDimensionLengthChange = (value: string) => {
    setBoxDimensionLength(value);
  };

  const handleBoxDimensionWidthChange = (value: string) => {
    setBoxDimensionWidth(value);
  };

  const handleBoxDimensionHeightChange = (value: string) => {
    setBoxDimensionHeight(value);
  };

  // Handler for dropdown toggle
  const handleDropdownToggle = (dropdownName, isOpen) => {
    if (isOpen) {
      setActiveDropdown(dropdownName);
    } else if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    }
  };

  return (
    <View style={styles.container}>
      {/* Features Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text="Features"
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
          <InfoIcon
            size={26}
            color={ColorPalette.IconColor}
            style={undefined}
          />
        </View>

        <View style={{gap: getScreenWidth(4)}}>
          {/* First row of dropdowns */}
          <View style={styles.inputContainer}>
            {/* Brand Dropdown */}
            <View style={{flex: 1, zIndex: activeDropdown === 'brand' ? 3 : 1}}>
              <Dropdown
                options={BRAND_OPTIONS}
                selectedValue={selectedBrand}
                onSelect={handleBrandChange}
                placeholder="Select brand"
                showSearch={true}
                searchPlaceholder="Search brands"
                selectionType="radio"
                onDropdownToggle={isOpen =>
                  handleDropdownToggle('brand', isOpen)
                }
              />
            </View>

            {/* Color Dropdown with color indicators */}
            <View style={{flex: 1, zIndex: activeDropdown === 'color' ? 3 : 1}}>
              <Dropdown
                options={COLOR_OPTIONS}
                selectedValue={selectedColor}
                onSelect={handleColorChange}
                placeholder="Select color"
                showSearch={true}
                searchPlaceholder="Search colors"
                selectionType="radio"
                showColorIndicator={true} // Enable color indicators
                onDropdownToggle={isOpen =>
                  handleDropdownToggle('color', isOpen)
                }
              />
            </View>

            {/* Size Dropdown - multi-select */}
            <View style={{flex: 1, zIndex: activeDropdown === 'size' ? 3 : 1}}>
              <Dropdown
                options={SIZE_OPTIONS}
                selectedValue={selectedSize}
                onSelect={handleSizeChange}
                placeholder="Select size"
                showSearch={true}
                searchPlaceholder="Search sizes"
                selectionType="checkbox"
                onDropdownToggle={isOpen =>
                  handleDropdownToggle('size', isOpen)
                }
              />
            </View>
          </View>

          {/* Weight input */}
          <AnimatedTextInput
            label="Enter weight(Kgs : 0.000)"
            value={weighBy}
            onChangeText={handleWeightChange}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Manufacturing Details Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text="Manufacturing details"
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
          <InfoIcon
            size={26}
            color={ColorPalette.IconColor}
            style={undefined}
          />
        </View>

        <View style={styles.inputContainerOne}>
          {/* Manufacturer input */}
          <AnimatedTextInput
            label="Enter manufactured by"
            value={manufacturedBy}
            onChangeText={handleManufacturerChange}
            keyboardType="default"
          />

          {/* Country dropdown */}
          <View
            style={{
              flex: 1,
              marginHorizontal: getScreenWidth(4),
              zIndex: activeDropdown === 'country' ? 3 : 1,
            }}>
            <Dropdown
              options={COUNTRY_OPTIONS}
              selectedValue={selectedCountry}
              onSelect={handleCountryChange}
              placeholder="Select country of origin"
              showSearch={true}
              searchPlaceholder="Search countries"
              selectionType="radio"
              onDropdownToggle={isOpen =>
                handleDropdownToggle('country', isOpen)
              }
            />
          </View>
        </View>
      </View>

      {/* Shipping Property Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text="Shipping properties"
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
          <InfoIcon
            size={26}
            color={ColorPalette.IconColor}
            style={undefined}
          />
        </View>

        <View style={styles.inputContainerOne}>
          {/* Weight input */}
          <AnimatedTextInput
            label="Enter weight(Kgs : 0.000)"
            value={shippingWeight}
            onChangeText={handleShippingWeightChange}
            keyboardType="numeric"
          />

          {/* Enter Price */}
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
            <View style={[styles.checkbox]}>
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

      {/* Item in a box Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text="Item in a box"
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
          <InfoIcon
            size={26}
            color={ColorPalette.IconColor}
            style={undefined}
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

      {/* Box Dimension Section*/}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text="Box Dimension"
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
          <InfoIcon
            size={26}
            color={ColorPalette.IconColor}
            style={undefined}
          />
        </View>

        <View style={styles.inputContainerOne}>
          {/* Weight input */}
          <AnimatedTextInput
            label="Enter length (Inch : 0.000)"
            value={boxDimensionLength}
            onChangeText={handleBoxDimensionLengthChange}
            keyboardType="numeric"
          />
          {/* Weight input */}
          <AnimatedTextInput
            label="Enter width (Inch : 0.000)"
            value={boxDimensionWidth}
            onChangeText={handleBoxDimensionWidthChange}
            keyboardType="numeric"
          />
          {/* Weight input */}
          <AnimatedTextInput
            label="Enter height (Inch : 0.000)"
            value={boxDimensionHeigth}
            onChangeText={handleBoxDimensionHeightChange}
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );
};

export default FeaturesStep;
