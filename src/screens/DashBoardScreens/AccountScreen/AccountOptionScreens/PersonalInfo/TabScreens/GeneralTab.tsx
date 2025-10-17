// src/screens/DashBoardScreens/AccountScreen/AccountOptionScreens/PersonalInfo/GeneralTab.tsx

import React, {useState} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import AnimatedTextInput from '../../../../../../components/UserComponents/TextInput/TextInput';
import {SlidingBar} from '../../../../../../components/MainComponents/SlidingBar/SlidingBar';
import LockIcon from '../../../../../../assets/icons/LockIcon';
import {styles} from '../PerosanlInfo.styles';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import {Spacing} from '../../../../../../config/globalStyles';
import Svg, {Circle, Path} from 'react-native-svg';

const InfoIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Circle
      cx="9.99984"
      cy="9.99996"
      r="8.33333"
      stroke="#4A4A4A"
      strokeWidth="1.5"
    />
    <Path
      d="M9.99325 12.5H10.0007"
      stroke="#4A4A4A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 10L10 6.66667"
      stroke="#4A4A4A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MALTA_FLAG_URL =
  'https://cdn.countryflags.com/thumbs/malta/flag-round-250.png';

interface GeneralTabProps {
  businessName: string;
  vatNumber: string;
  streetName: string;
  cityName: string;
  postalCode: string;
  country: string;
  vatChecked: boolean;
  setVatChecked: (checked: boolean) => void;
  onEditBusinessName: () => void;
  onEditVATNumber: () => void;
  onEditStreetName: () => void;
  onEditCityName: () => void;
  onEditPostalCode: () => void;
}

const GeneralTab: React.FC<GeneralTabProps> = ({
  businessName,
  vatNumber,
  streetName,
  cityName,
  postalCode,
  country,
  vatChecked,
  setVatChecked,
  onEditBusinessName,
  onEditVATNumber,
  onEditStreetName,
  onEditCityName,
  onEditPostalCode,
}) => {
  const statusOptions = [
    {id: 'yes', label: 'Yes'},
    {id: 'no', label: 'No'},
  ];
  const [selectedOption, setSelectedOption] = useState(statusOptions[0]);

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={[
        styles.scrollContent,
        {paddingTop: getScreenHeight(2)},
      ]}
      showsVerticalScrollIndicator={false}>
      {/* Business Details Section */}
      <View style={styles.mainContainerTwo1}>
        <AnimatedTextInput
          label="Business name"
          value={businessName}
          onChangeText={() => {}}
          keyboardType="default"
          customLabelColorFocused={ColorPalette.GREY_TEXT_400}
          customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
          rightText="Edit"
          onRightTextPress={onEditBusinessName}
          customBorderColor={ColorPalette.GREY_TEXT_400}
          customBorderWidth={1}
          disabled={true}
        />
        <AnimatedTextInput
          label="VAT number"
          value={vatNumber}
          onChangeText={() => {}}
          keyboardType="default"
          customLabelColorFocused={ColorPalette.GREY_TEXT_400}
          customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
          rightText="Edit"
          onRightTextPress={onEditVATNumber}
          customBorderColor={ColorPalette.GREY_TEXT_400}
          customBorderWidth={1}
          disabled={true}
        />
      </View>

      {/* Status Section */}
      <View style={styles.taxCheckContainer}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Typography
            text="Status"
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
          <InfoIcon />
        </View>
        <View style={styles.checkBoxContainer}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setVatChecked(!vatChecked)}>
            <View
              style={[
                styles.radioButton,
                vatChecked && {
                  borderColor: '#9101CF',
                },
              ]}>
              {vatChecked && <View style={styles.radioButtonInner} />}
            </View>
            <Typography
              text="Active"
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Store Address Section */}
      <View style={styles.mainContainerTwo1}>
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            paddingHorizontal: Spacing.Medium,
          }}>
          <Typography
            text="Store Address"
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
          <InfoIcon />
        </View>
        <AnimatedTextInput
          label="Street name and number"
          value={streetName}
          onChangeText={() => {}}
          keyboardType="default"
          customLabelColorFocused={ColorPalette.GREY_TEXT_400}
          customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
          rightText="Edit"
          onRightTextPress={onEditStreetName}
          customBorderColor={ColorPalette.GREY_TEXT_400}
          customBorderWidth={1}
          disabled={true}
        />
        <AnimatedTextInput
          label="City"
          value={cityName}
          onChangeText={() => {}}
          keyboardType="default"
          customLabelColorFocused={ColorPalette.GREY_TEXT_400}
          customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
          rightText="Edit"
          onRightTextPress={onEditCityName}
          customBorderColor={ColorPalette.GREY_TEXT_400}
          customBorderWidth={1}
          disabled={true}
        />
        {/* <AnimatedTextInput
          label="Postal code"
          value={postalCode}
          onChangeText={() => {}}
          keyboardType="default"
          customLabelColorFocused={ColorPalette.GREY_TEXT_400}
          customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
          rightText="Edit"
          onRightTextPress={onEditPostalCode}
          customBorderColor={ColorPalette.GREY_TEXT_400}
          customBorderWidth={1}
          disabled={true}
        /> */}
        <AnimatedTextInput
          label="Country"
          value={country}
          onChangeText={() => {}}
          keyboardType="default"
          customLabelColorFocused={ColorPalette.GREY_TEXT_400}
          customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
          showCountrySection
          countryFlag={MALTA_FLAG_URL}
          onCountryPress={() => {}}
          customBorderColor={ColorPalette.GREY_TEXT_400}
          customBorderWidth={1}
          disabled={true}
          rightIcons={[
            {
              icon: <LockIcon size={20} color="#4A4A4A" />,
              onPress: () => {},
            },
          ]}
        />
      </View>

      {/* Billing Address Question */}
      {/* <View style={styles.taxCheckContainer1}>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Typography
            text="Are the store and billing addresses the same?"
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
        </View>
        <View style={styles.checkBoxContainer}>
          <SlidingBar
            options={statusOptions}
            selectedOption={selectedOption}
            customOptionStyle={{
              paddingVertical: getScreenHeight(1.5),
              paddingHorizontal: getScreenWidth(7),
              borderRadius: Spacing.Large,
            }}
          />
        </View>
      </View> */}
    </ScrollView>
  );
};

export default GeneralTab;
