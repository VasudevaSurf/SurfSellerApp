import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useEffect, useState, useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ArrowLeftIcon from '../../../../../assets/icons/ArrowLeftIcon';
import {Header} from '../../../../../components/UserComponents/Header/Header';
import AnimatedTextInput from '../../../../../components/UserComponents/TextInput/TextInput';
import {TypographyVariant} from '../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../config/colorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import {goBack, navigate} from '../../../../../navigation/utils/navigationRef';
import {
  fetchProfile,
  updateProfile,
} from '../../../../../redux/slices/profileSlice';
import {styles} from './PerosanlInfo.styles';
import ArrowLeft from '../../../../../assets/icons/ArrowLeft';
import {RootState, AppDispatch} from '../../../../../redux/store';
import {Typography} from '../../../../../components/UserComponents/Typography/Typography';
import Svg, {Circle, Path} from 'react-native-svg';
import {Spacing} from '../../../../../config/globalStyles';
import LockIcon from '../../../../../assets/icons/LockIcon';
import {SlidingBar} from '../../../../../components/MainComponents/SlidingBar/SlidingBar';
import {SlidingBarOption} from '../../../../../components/MainComponents/SlidingBar/SlidingBar.types';
import {BadgeVariant} from '../../../../../components/UserComponents/Badges/Badge.types';
import ArrowDownIcon from '../../../../../assets/icons/ArrowDownIcon';
import TextSymbolIcon from '../../../../../assets/icons/NewProductIcons/TextSymbolIcon';
import UnderlineIcon from '../../../../../assets/icons/NewProductIcons/UnderlineIcon';
import PencilUnderlineIcon from '../../../../../assets/icons/NewProductIcons/PencilUnderlineIcon';
import UnderlineTextIcon from '../../../../../assets/icons/NewProductIcons/UnderlineTextIcon';
import AlignTextLeftIcon from '../../../../../assets/icons/NewProductIcons/AlignTextLeftIcon';
import AlignTextCenterIcon from '../../../../../assets/icons/NewProductIcons/AlignTextCenterIcon';
import AlignTextRightIcon from '../../../../../assets/icons/NewProductIcons/AlignTextRightIcon';
import {Badge} from '../../../../../components/UserComponents/Badges/Badge';
import {containerStyles} from '../CompanyProfilePages/ImageContainer.styles';
import CloudDownloadIcon from '../../../../../assets/icons/CloudDownloadIcon';
import QuestionMarkIcon from '../../../../../assets/icons/QuestionMarkIcon';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../../../../components/UserComponents/Button';

interface PersonalInfoProps {
  editMode?: boolean;
}

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

const INITIAL_COUNTRY_CODE = '+356';
const MALTA_FLAG_URL =
  'https://cdn.countryflags.com/thumbs/malta/flag-round-250.png';

const PersonalInfo: React.FC<PersonalInfoProps> = ({editMode = false}) => {
  const route = useRoute();
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const {profileData, loading, error, rawProfileData} = useSelector(
    (state: RootState) => state.profile,
  );

  // State for all fields
  const [businessName, setBusinessName] = useState('');
  const [vatNumber, setVATNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [cityName, setCityName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState('');

  const [isFocused, setIsFocused] = useState(false);
  const [vatChecked, setVatChecked] = useState(true);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'general', title: 'General'},
    {key: 'description', title: 'Description'},
    {key: 'logo', title: 'Logo'},
    {key: 'terms', title: 'Terms & Condition'},
  ]);

  const [countryCode, setCountryCode] = useState(INITIAL_COUNTRY_CODE);
  const [textAlignment, setTextAlignment] = useState<
    'left' | 'center' | 'right'
  >('left');
  const [textFormat, setTextFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const statusOptions = [
    {id: 'yes', label: 'Yes'},
    {id: 'no', label: 'No'},
  ];
  const [selectedOption, setSelectedOption] = useState(statusOptions[0]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const handleUpdateDescription = async () => {
    if (!userData?.user_id) {
      Alert.alert('Error', 'User not found. Please login again.');
      return;
    }

    try {
      await dispatch(
        updateProfile({
          userId: userData.user_id,
          profileData: {
            company_description: companyDescription,
          },
        }),
      ).unwrap();

      Alert.alert('Success', 'Company description updated successfully');
    } catch (error: any) {
      Alert.alert(
        'Update Failed',
        error.message || 'Failed to update description',
      );
    }
  };

  const handleUpdateTerms = async () => {
    if (!userData?.user_id) {
      Alert.alert('Error', 'User not found. Please login again.');
      return;
    }

    try {
      await dispatch(
        updateProfile({
          userId: userData.user_id,
          profileData: {
            terms: termsAndConditions,
          },
        }),
      ).unwrap();

      Alert.alert('Success', 'Terms and conditions updated successfully');
    } catch (error: any) {
      Alert.alert('Update Failed', error.message || 'Failed to update terms');
    }
  };

  // Fetch profile data when component mounts
  useFocusEffect(
    React.useCallback(() => {
      if (userData?.user_id) {
        dispatch(fetchProfile(userData.user_id));
      }
    }, [dispatch, userData?.user_id]),
  );

  // Extract field value helper function
  // Replace the getFieldValue helper function
  const getFieldValue = (fieldName: string): string => {
    if (!rawProfileData?.sections) {
      console.warn('⚠️ No rawProfileData sections available');
      return '';
    }

    for (const section of rawProfileData.sections) {
      for (const block of section.blocks) {
        const field = block.fields.find(f => f.field_name === fieldName);
        if (field) {
          console.log(`✅ Found ${fieldName}:`, field.value || '(empty)');
          return field.value || '';
        }
      }
    }

    console.warn(`⚠️ Field not found: ${fieldName}`);
    return '';
  };

  // Update the useEffect that extracts field values
  useEffect(() => {
    if (rawProfileData) {
      console.log('📊 Profile data updated, refreshing display values');

      // Extract all values from API - using getFieldValue helper
      const company = getFieldValue('company');
      const vat = getFieldValue('fields_52');
      const address = getFieldValue('address');
      const city = getFieldValue('city');
      const postal = getFieldValue('postal_code');
      const countryVal = getFieldValue('country');
      const description = getFieldValue('company_description');
      const terms = getFieldValue('terms');

      console.log('📋 All extracted values:', {
        company,
        vat,
        address,
        city,
        postal,
        countryVal,
        descriptionLength: description?.length || 0,
        termsLength: terms?.length || 0,
      });

      // Update all state values
      setBusinessName(company);
      setVATNumber(vat);
      setStreetName(address);
      setCityName(city);
      setPostalCode(postal);
      setCountry(countryVal);
      setCompanyDescription(description);
      setTermsAndConditions(terms);
    }
  }, [rawProfileData]);

  // Update state when profile data changes
  // Update the useEffect that listens to profile data changes
  // Update the useEffect that extracts field values
  useEffect(() => {
    if (rawProfileData) {
      console.log('📊 Profile data updated, refreshing display values');

      // Extract all values from API - using getFieldValue helper
      const company = getFieldValue('company');
      const vat = getFieldValue('fields_52');
      const address = getFieldValue('address');
      const city = getFieldValue('city');
      const postal = getFieldValue('postal_code');
      const countryVal = getFieldValue('country');
      const description = getFieldValue('company_description');
      const terms = getFieldValue('terms');

      console.log('📋 Extracted values:', {
        company,
        vat,
        address,
        city,
        postal,
        countryVal,
        description: description?.substring(0, 50) + '...',
        terms: terms?.substring(0, 50) + '...',
      });

      // Only update state if values exist (to preserve data)
      if (company !== undefined) setBusinessName(company);
      if (vat !== undefined) setVATNumber(vat);
      if (address !== undefined) setStreetName(address);
      if (city !== undefined) setCityName(city);
      if (postal !== undefined) setPostalCode(postal);
      if (countryVal !== undefined) setCountry(countryVal);
      if (description !== undefined) setCompanyDescription(description);
      if (terms !== undefined) setTermsAndConditions(terms);
    }
  }, [rawProfileData]);

  // Update the useFocusEffect to always refresh when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      console.log(
        '🔄 PersonalInfo screen focused, fetching latest profile data',
      );
      if (userData?.user_id) {
        dispatch(fetchProfile(userData.user_id));
      }
    }, [dispatch, userData?.user_id]),
  );

  // Add a new useEffect to log when state values change
  useEffect(() => {
    console.log('📝 Current state values:', {
      businessName,
      vatNumber,
      streetName,
      cityName,
      postalCode,
      country,
      hasDescription: !!companyDescription,
      hasTerms: !!termsAndConditions,
    });
  }, [
    businessName,
    vatNumber,
    streetName,
    cityName,
    postalCode,
    country,
    companyDescription,
    termsAndConditions,
  ]);

  const toggleTextFormat = (format: 'bold' | 'italic' | 'underline') => {
    setTextFormat(prev => ({
      ...prev,
      [format]: !prev[format],
    }));
  };

  const handleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
    setTextAlignment(alignment);
  };

  const handleEditBusinessName = () => {
    navigate('EditField', {
      fieldType: 'businessName',
      initialValue: businessName,
      headerTitle: 'Update business name',
      label: 'Business name',
      description:
        'Please update your business name to ensure buyers recognize you.',
      keyboardType: 'default',
      validationType: 'businessName',
      onSubmitActionType: 'updateBusinessName',
      originScreen: 'CompanyProfile',
    });
  };

  const handleEditVATNumber = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditField',
        params: {
          fieldType: 'vatNumber',
          initialValue: vatNumber,
          headerTitle: 'Update your VAT number',
          label: 'VAT number',
          description:
            'Please update your VAT number to ensure accurate billing and compliance.',
          keyboardType: 'default',
          captionText: 'VAT number verified',
          iconImage: require('../../../../../assets/images/success.png'),
          validationType: 'vatNumber',
          onSubmitActionType: 'updateVATNumber',
          originScreen: 'CompanyProfile',
        },
      },
    });
  };

  const handleEditStreetName = () => {
    navigate('EditField', {
      fieldType: 'streetName',
      initialValue: streetName,
      headerTitle: 'Update street address',
      label: 'Street name and number',
      keyboardType: 'default',
      validationType: 'streetName',
      onSubmitActionType: 'updateStreetName',
      originScreen: 'CompanyProfile',
    });
  };

  const handleEditCityName = () => {
    navigate('EditField', {
      fieldType: 'cityName',
      initialValue: cityName,
      headerTitle: 'Update city',
      label: 'City',
      keyboardType: 'default',
      validationType: 'cityName',
      onSubmitActionType: 'updateCityName',
      originScreen: 'CompanyProfile',
    });
  };

  const handleEditPostalCode = () => {
    navigate('EditField', {
      fieldType: 'postalCode',
      initialValue: postalCode,
      headerTitle: 'Update postal code',
      label: 'Postal code',
      keyboardType: 'default',
      validationType: 'postalCode',
      onSubmitActionType: 'updatePostalCode',
      originScreen: 'CompanyProfile',
    });
  };

  const handleUpload = () => {
    setIsAddModalVisible(true);
  };

  // Update from route params
  useFocusEffect(
    React.useCallback(() => {
      if (route.params) {
        const {
          updatedName,
          updatedVat,
          updatedStreet,
          updatedCity,
          updatedPostal,
          updatedCountry,
        } = route.params;
        if (updatedName) setBusinessName(updatedName);
        if (updatedVat) setVATNumber(updatedVat);
        if (updatedStreet) setStreetName(updatedStreet);
        if (updatedCity) setCityName(updatedCity);
        if (updatedPostal) setPostalCode(updatedPostal);
        if (updatedCountry) setCountry(updatedCountry);
      }
    }, [route.params]),
  );

  // General Tab Component
  const GeneralRoute = () => (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={[
        styles.scrollContent,
        {paddingTop: getScreenHeight(2)},
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainerTwo1}>
        <AnimatedTextInput
          label="Business name"
          value={businessName}
          onChangeText={setBusinessName}
          keyboardType="default"
          customLabelColorFocused={ColorPalette.GREY_TEXT_400}
          customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
          rightText="Edit"
          onRightTextPress={handleEditBusinessName}
          customBorderColor={ColorPalette.GREY_TEXT_400}
          customBorderWidth={1}
          disabled={true}
        />
        <AnimatedTextInput
          label="VAT number"
          value={vatNumber}
          onChangeText={setVATNumber}
          keyboardType="default"
          customLabelColorFocused={ColorPalette.GREY_TEXT_400}
          customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
          rightText="Edit"
          onRightTextPress={handleEditVATNumber}
          customBorderColor={ColorPalette.GREY_TEXT_400}
          customBorderWidth={1}
          disabled={true}
        />
      </View>
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
          onChangeText={setStreetName}
          keyboardType="default"
          customLabelColorFocused={ColorPalette.GREY_TEXT_400}
          customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
          rightText="Edit"
          onRightTextPress={handleEditStreetName}
          customBorderColor={ColorPalette.GREY_TEXT_400}
          customBorderWidth={1}
          disabled={true}
        />
        <AnimatedTextInput
          label="City"
          value={cityName}
          onChangeText={setCityName}
          keyboardType="default"
          customLabelColorFocused={ColorPalette.GREY_TEXT_400}
          customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
          rightText="Edit"
          onRightTextPress={handleEditCityName}
          customBorderColor={ColorPalette.GREY_TEXT_400}
          customBorderWidth={1}
          disabled={true}
        />
        <AnimatedTextInput
          label="Postal code"
          value={postalCode}
          onChangeText={setPostalCode}
          keyboardType="default"
          customLabelColorFocused={ColorPalette.GREY_TEXT_400}
          customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
          rightText="Edit"
          onRightTextPress={handleEditPostalCode}
          customBorderColor={ColorPalette.GREY_TEXT_400}
          customBorderWidth={1}
          disabled={true}
        />
        <AnimatedTextInput
          label="Country"
          value={country}
          onChangeText={setCountry}
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
      <View style={styles.taxCheckContainer1}>
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
      </View>
    </ScrollView>
  );

  // Description Tab Component
  const DescriptionRoute = () => (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={[
        styles.scrollContent,
        {paddingTop: getScreenHeight(2)},
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainerTwo}>
        <View style={styles.taxCheckContainer}>
          <View style={{flexDirection: 'row', gap: 5, marginBottom: 16}}>
            <Typography
              text="Description"
              variant={TypographyVariant.LMEDIUM_EXTRABOLD}
              customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
            />
            <InfoIcon />
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
                style={[
                  textAlignment === 'center' && styles.activeFormatButton,
                ]}>
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
                style={[
                  textAlignment === 'right' && styles.activeFormatButton,
                ]}>
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
              placeholder="Enter company description..."
              placeholderTextColor={ColorPalette.PlaceholderText}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
              value={companyDescription}
              onChangeText={setCompanyDescription}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>

          {/* Add Save Button */}
          <View style={{marginTop: getScreenHeight(2)}}>
            <Button
              text="SAVE CHANGES"
              variant={ButtonVariant.PRIMARY}
              state={ButtonState.DEFAULT}
              size={ButtonSize.MEDIUM}
              onPress={handleUpdateDescription}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );

  // Logo Tab Component
  const LogoRoute = () => (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={[
        styles.scrollContent,
        {paddingTop: getScreenHeight(2)},
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <View style={{flexDirection: 'row', gap: 5, marginBottom: 25}}>
          <Typography
            text="Upload Logo"
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
          <InfoIcon />
        </View>
        <View style={containerStyles.wrapper}>
          <View style={containerStyles.logoContainer}>
            <View style={containerStyles.imageWrapper}>
              <Image
                source={require('../../../../../assets/images/companyProfile.png')}
                style={containerStyles.image}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={containerStyles.editButton}
                onPress={handleUpload}>
                <CloudDownloadIcon
                  size={18}
                  color={ColorPalette.GREY_TEXT_400}
                />
              </TouchableOpacity>
            </View>
            <Typography
              text="Company logo"
              variant={TypographyVariant.LMEDIUM_REGULAR}
              customTextStyles={containerStyles.labelText}
            />
          </View>

          <View style={containerStyles.divider} />

          <View style={containerStyles.logoContainer}>
            <View style={containerStyles.imageWrapper}>
              <Image
                source={require('../../../../../assets/images/invoiceLogo.png')}
                style={[containerStyles.image, containerStyles.invoiceImage]}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={containerStyles.editButton}
                onPress={handleUpload}>
                <CloudDownloadIcon
                  size={18}
                  color={ColorPalette.GREY_TEXT_400}
                />
              </TouchableOpacity>
            </View>

            <Typography
              text="Invoice logo"
              variant={TypographyVariant.LMEDIUM_REGULAR}
              customTextStyles={containerStyles.labelText}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );

  // Terms & Condition Tab Component
  const TermsRoute = () => (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={[
        styles.scrollContent,
        {paddingTop: getScreenHeight(2)},
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainerTwo}>
        <View style={styles.taxCheckContainer}>
          <View style={{flexDirection: 'row', gap: 5, marginBottom: 16}}>
            <Typography
              text="Terms & Condition"
              variant={TypographyVariant.LMEDIUM_EXTRABOLD}
              customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
            />
            <InfoIcon />
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
                style={[
                  textAlignment === 'center' && styles.activeFormatButton,
                ]}>
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
                style={[
                  textAlignment === 'right' && styles.activeFormatButton,
                ]}>
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
              placeholder="Enter terms and conditions..."
              placeholderTextColor={ColorPalette.PlaceholderText}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
              value={termsAndConditions}
              onChangeText={setTermsAndConditions}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>

          {/* Add Save Button */}
          <View style={{marginTop: getScreenHeight(2)}}>
            <Button
              text="SAVE CHANGES"
              variant={ButtonVariant.PRIMARY}
              state={ButtonState.DEFAULT}
              size={ButtonSize.MEDIUM}
              onPress={handleUpdateTerms}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderScene = SceneMap({
    general: GeneralRoute,
    description: DescriptionRoute,
    logo: LogoRoute,
    terms: TermsRoute,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: ColorPalette.AgreeTerms,
        height: 2,
      }}
      style={{
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
        borderBottomColor: ColorPalette.GREY_TEXT_400,
      }}
      tabStyle={{
        width: getScreenWidth(100) / 4,
        paddingHorizontal: 0,
      }}
      scrollEnabled={false}
      labelStyle={{
        color: ColorPalette.AgreeTerms,
        fontSize: 12,
        fontWeight: '500',
        textTransform: 'none',
        textAlign: 'center',
      }}
      activeColor={ColorPalette.AgreeTerms}
      inactiveColor={ColorPalette.GREY_TEXT_400}
    />
  );

  if (loading) {
    return (
      <SafeAreaView style={{flex: 1}} edges={['bottom']}>
        <Header
          name="Business Profile"
          variant={TypographyVariant.H6_BOLD}
          textColor={ColorPalette.AgreeTerms}
          leftIcon={<ArrowLeft style={undefined} size={22} onPress={goBack} />}
          rightIcons={[
            {
              icon: QuestionMarkIcon,
              onPress: () => {
                navigate('Dashboard', {
                  screen: 'Account',
                  params: {screen: 'FAQScreen'},
                });
              },
              size: 24,
              color: ColorPalette.IconColor,
              strokeWidth: 1.5,
            },
          ]}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Typography
            text="Loading profile..."
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name="Business Profile"
        variant={TypographyVariant.H6_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={<ArrowLeft style={undefined} size={22} onPress={goBack} />}
        rightIcons={[
          {
            icon: QuestionMarkIcon,
            onPress: () => {
              navigate('Dashboard', {
                screen: 'Account',
                params: {screen: 'FAQScreen'},
              });
            },
            size: 24,
            color: ColorPalette.IconColor,
            strokeWidth: 1.5,
          },
        ]}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: getScreenWidth(100)}}
        renderTabBar={renderTabBar}
        style={{flex: 1}}
      />
    </SafeAreaView>
  );
};

export default PersonalInfo;
