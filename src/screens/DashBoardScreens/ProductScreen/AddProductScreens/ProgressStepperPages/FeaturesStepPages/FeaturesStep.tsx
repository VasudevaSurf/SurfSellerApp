import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {getFigmaDimension} from '../../../../../../helpers/screenSize';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import InfoIcon from '../../../../../../assets/icons/InfoIcon';
import {styles} from './FeaturesStep.styles';
import ArrowDownIcon from '../../../../../../assets/icons/ArrowDownIcon';
import AnimatedTextInput from '../../../../../../components/UserComponents/TextInput/TextInput';
import {StatusModal} from '../../../../../../components/MainComponents/StatusModal/StatusModal';
import {Option} from '../../../../../../components/MainComponents/StatusModal/StatusModal.types';

const BRAND_OPTIONS: Option[] = [
  {value: 'Kinnie', label: 'Kinnie', isSelected: false},
  {value: 'Twistees', label: 'Twistees', isSelected: false},
  {value: 'Mdina Glass', label: 'Mdina Glass', isSelected: false},
  {value: 'Melita Limited', label: 'Melita Limited', isSelected: false},
  {value: 'Charles & Ron', label: 'Charles & Ron', isSelected: false},
  {
    value: 'Simonds Farsons Cisk',
    label: 'Simonds Farsons Cisk',
    isSelected: false,
  },
  {value: 'Gaia & Nina', label: 'Gaia & Nina', isSelected: false},
  {value: 'Mvintage', label: 'Mvintage', isSelected: false},
  {
    value: 'Corinthia Hotels International',
    label: 'Corinthia Hotels International',
    isSelected: false,
  },
];

const COLOR_OPTIONS: Option[] = [
  {value: 'Chartreuse', label: 'Chartreuse', isSelected: false},
  {value: 'Amber', label: 'Amber', isSelected: false},
  {value: 'Periwinkle', label: 'Periwinkle', isSelected: false},
  {value: 'TurquoiseBlue', label: 'Turquoise', isSelected: false},
  {value: 'Lavender', label: 'Lavender', isSelected: false},
  {value: 'Coral', label: 'Coral', isSelected: false},
  {value: 'Indigo', label: 'Indigo', isSelected: false},
  {value: 'Celeste', label: 'Celeste', isSelected: false},
  {value: 'Ochre', label: 'Ochre', isSelected: false},
];

const SIZE_OPTIONS: Option[] = [
  {value: 'XXS', label: 'XXSmall', isSelected: false},
  {value: 'XS', label: 'XSmall', isSelected: false},
  {value: 'S', label: 'Small', isSelected: false},
  {value: 'L', label: 'Large', isSelected: false},
  {value: 'M', label: 'Medium', isSelected: false},
  {value: 'XL', label: 'XLarge', isSelected: false},
  {value: 'XXL', label: 'XXLarge', isSelected: false},
  {value: 'XXXL', label: 'XXXLarge', isSelected: false},
  {value: '4XL', label: '4XLLarge', isSelected: false},
];

const COUNTRY_OPTIONS: Option[] = [
  {value: 'Malta', label: 'Malta', isSelected: false},
  {value: 'United Kingdom', label: 'United Kingdom', isSelected: false},
  {value: 'Italy', label: 'Italy', isSelected: false},
  {value: 'Germany', label: 'Germany', isSelected: false},
  {value: 'Spain', label: 'Spain', isSelected: false},
  {value: 'Saudi Arabia', label: 'Saudi Arabia', isSelected: false},
  {value: 'France', label: 'France', isSelected: false},
  {value: 'India', label: 'India', isSelected: false},
  {value: 'Russia', label: 'Russia', isSelected: false},
];

const FeaturesStep = () => {
  const [manufacturedBy, setManufacturedBy] = useState('');
  const [weighBy, setWeighBy] = useState('');

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const [isBrandModalVisible, setIsBrandModalVisible] = useState(false);
  const [isColorModalVisible, setIsColorModalVisible] = useState(false);
  const [isSizeModalVisible, setIsSizeModalVisible] = useState(false);
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);

  return (
    <View style={styles.container}>
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

        <View style={{gap: getFigmaDimension(16)}}>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={[styles.inputContainer, styles.selectContainer]}
              onPress={() => setIsBrandModalVisible(true)}>
              <Typography
                variant={TypographyVariant.PSMALL_REGULAR}
                text={selectedBrand || 'Select brand'}
                customTextStyles={{
                  color: selectedBrand
                    ? ColorPalette.GREY_TEXT_500
                    : ColorPalette.GREY_TEXT_00,
                }}
              />
              <ArrowDownIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_400}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.inputContainer, styles.selectContainer]}
              onPress={() => setIsColorModalVisible(true)}>
              <Typography
                variant={TypographyVariant.PSMALL_REGULAR}
                text={selectedColor || 'Select color'}
                customTextStyles={{
                  color: selectedColor
                    ? ColorPalette.GREY_TEXT_500
                    : ColorPalette.GREY_TEXT_00,
                }}
              />
              <ArrowDownIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_400}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.inputContainer, styles.selectContainer]}
              onPress={() => setIsSizeModalVisible(true)}>
              <Typography
                variant={TypographyVariant.PSMALL_REGULAR}
                text={selectedSize || 'Select size'}
                customTextStyles={{
                  color: selectedSize
                    ? ColorPalette.GREY_TEXT_500
                    : ColorPalette.GREY_TEXT_00,
                }}
              />
              <ArrowDownIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_400}
              />
            </TouchableOpacity>
          </View>

          <AnimatedTextInput
            label="Enter weight(Kgs : 0.000)"
            value={weighBy}
            onChangeText={setWeighBy}
            keyboardType="default"
          />
        </View>
      </View>

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
          <AnimatedTextInput
            label="Enter manufactured by"
            value={manufacturedBy}
            onChangeText={setManufacturedBy}
            keyboardType="default"
          />
          <TouchableOpacity
            style={[
              styles.inputContainer,
              styles.selectContainer,
              {marginHorizontal: getFigmaDimension(16)},
            ]}
            onPress={() => setIsCountryModalVisible(true)}>
            <Typography
              variant={TypographyVariant.PSMALL_REGULAR}
              text={selectedCountry || 'Select country of origin'}
              customTextStyles={{
                color: selectedCountry
                  ? ColorPalette.GREY_TEXT_500
                  : ColorPalette.GREY_TEXT_00,
              }}
            />
            <ArrowDownIcon
              style={undefined}
              color={ColorPalette.GREY_TEXT_400}
            />
          </TouchableOpacity>
        </View>
      </View>

      <StatusModal
        isVisible={isBrandModalVisible}
        onClose={() => setIsBrandModalVisible(false)}
        onSubmit={value => {
          setSelectedBrand(value);
          setIsBrandModalVisible(false);
        }}
        initialStatus={selectedBrand}
        options={BRAND_OPTIONS}
        title="Select Brand"
        showSearch={true}
        searchPlaceholder="Search brands"
        selectionType="radio"
      />

      <StatusModal
        isVisible={isColorModalVisible}
        onClose={() => setIsColorModalVisible(false)}
        onSubmit={value => {
          setSelectedColor(value);
          setIsColorModalVisible(false);
        }}
        initialStatus={selectedColor}
        options={COLOR_OPTIONS}
        title="Select Color"
        showSearch={true}
        searchPlaceholder="Search colors"
        selectionType="radio"
      />

      <StatusModal
        isVisible={isSizeModalVisible}
        onClose={() => setIsSizeModalVisible(false)}
        onSubmit={value => {
          setSelectedSize(value);
          setIsSizeModalVisible(false);
        }}
        initialStatus={selectedSize}
        options={SIZE_OPTIONS}
        title="Select Size"
        showSearch={true}
        searchPlaceholder="Search sizes"
        selectionType="checkbox"
        checkboxProps={{
          size: 24,
          backgroundColor: '#9101CF',
          checkColor: 'white',
        }}
      />

      <StatusModal
        isVisible={isCountryModalVisible}
        onClose={() => setIsCountryModalVisible(false)}
        onSubmit={value => {
          setSelectedCountry(value);
          setIsCountryModalVisible(false);
        }}
        initialStatus={selectedCountry}
        options={COUNTRY_OPTIONS}
        title="Select Country of Origin"
        showSearch={true}
        searchPlaceholder="Search countries"
        selectionType="radio"
      />
    </View>
  );
};

export default FeaturesStep;
