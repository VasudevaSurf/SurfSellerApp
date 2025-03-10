import React, {useState} from 'react';
import {View} from 'react-native';
import InfoIcon from '../../../../../../assets/icons/InfoIcon';
import Dropdown from '../../../../../../components/MainComponents/DropdownModal/Dropdown';
import AnimatedTextInput from '../../../../../../components/UserComponents/TextInput/TextInput';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {getScreenWidth} from '../../../../../../helpers/screenSize';
import {styles} from './FeaturesStep.styles';

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

const FeaturesStep = () => {
  const [manufacturedBy, setManufacturedBy] = useState('');
  const [weighBy, setWeighBy] = useState('');

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  // State to manage which dropdown is currently active
  const [activeDropdown, setActiveDropdown] = useState(null);

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
            size={16}
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
                onSelect={value => setSelectedBrand(value)}
                placeholder="Select brand"
                showSearch={true}
                searchPlaceholder="Search brands"
                selectionType="radio"
                onDropdownToggle={isOpen =>
                  handleDropdownToggle('brand', isOpen)
                }
              />
            </View>

            {/* Color Dropdown */}
            <View style={{flex: 1, zIndex: activeDropdown === 'color' ? 3 : 1}}>
              <Dropdown
                options={COLOR_OPTIONS}
                selectedValue={selectedColor}
                onSelect={value => setSelectedColor(value)}
                placeholder="Select color"
                showSearch={true}
                searchPlaceholder="Search colors"
                selectionType="radio"
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
                onSelect={values => setSelectedSize(values)}
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
            onChangeText={setWeighBy}
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
            size={16}
            color={ColorPalette.IconColor}
            style={undefined}
          />
        </View>

        <View style={styles.inputContainerOne}>
          {/* Manufacturer input */}
          <AnimatedTextInput
            label="Enter manufactured by"
            value={manufacturedBy}
            onChangeText={setManufacturedBy}
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
              onSelect={value => setSelectedCountry(value)}
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
    </View>
  );
};

export default FeaturesStep;
