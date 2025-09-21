import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
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
import {fetchProfile} from '../../../../../redux/slices/profileSlice';
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
  const {profileData, loading, error} = useSelector(
    (state: RootState) => state.profile,
  );
  const [description, setDescription] = useState('');

  const [isFocused, setIsFocused] = useState(false);
  const [vatChecked, setVatChecked] = useState(false);

  const [businessName, setBusinessName] = useState('John’s flower Shop');
  const [vatNumber, setVATNumber] = useState('MT10927393');
  // Tab state
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'general', title: 'General'},
    {key: 'description', title: 'Description'},
    {key: 'logo', title: 'Logo'},
    {key: 'terms', title: 'Terms & Condition'},
  ]);

  // State for form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(INITIAL_COUNTRY_CODE);
  const [streetName, setStreetName] = useState('Triq San Pawl');
  const [cityName, setCityName] = useState('City');
  const [postalCode, setPostalCode] = useState('CLT 1210');
  const [country, setCountry] = useState('Malta');

  // Fetch profile data when component mounts or when returning to screen
  useFocusEffect(
    React.useCallback(() => {
      if (userData?.user_id) {
        dispatch(fetchProfile(userData.user_id));
      }
    }, [dispatch, userData?.user_id]),
  );

  // Update state when profile data changes
  useEffect(() => {
    if (profileData) {
      // Construct full name from profile data
      const firstName = profileData.firstname || '';
      const lastName = profileData.lastname || '';
      const constructedFullName = `${firstName} ${lastName}`.trim();

      setFullName(constructedFullName || '');
      setEmail(profileData.email || '');
      setPhoneNumber(profileData.phone || '');
    }
  }, [profileData]);

  const [textAlignment, setTextAlignment] = useState<
    'left' | 'center' | 'right'
  >('left');
  const [textFormat, setTextFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const toggleTextFormat = (format: 'bold' | 'italic' | 'underline') => {
    setTextFormat(prev => ({
      ...prev,
      [format]: !prev[format],
    }));
  };

  const handleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
    setTextAlignment(alignment);
  };

  const statusOptions = [
    {id: 'yes', label: 'Yes'},
    {id: 'no', label: 'No'},
  ];

  const [selectedOption, setSelectedOption] = useState(statusOptions[0]);

  // Update from route params (for immediate UI feedback)
  useFocusEffect(
    React.useCallback(() => {
      if (route.params) {
        const {updatedName, updatedEmail, updatedPhone} = route.params;
        if (updatedName) setFullName(updatedName);
        if (updatedEmail) setEmail(updatedEmail);
        if (updatedPhone) setPhoneNumber(updatedPhone);
      }
    }, [route.params]),
  );

  const handleEditName = () => {
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    navigate('EditField', {
      fieldType: 'name',
      multipleFields: true,
      initialValues: {
        firstName,
        lastName,
      },
      headerTitle: 'Update your name',
      description:
        'Please enter your name exactly as it appears on your ID or passport.',
      fields: [
        {
          key: 'firstName',
          label: 'First name',
          keyboardType: 'default',
          required: true,
          validationType: 'firstName',
        },
        {
          key: 'lastName',
          label: 'Last name',
          keyboardType: 'default',
          required: false,
          validationType: 'lastName',
        },
      ],
      onSubmitActionType: 'updateName',
    });
  };

  const handleEditEmail = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditField',
        params: {
          fieldType: 'email',
          initialValue: email,
          headerTitle: 'Update your email',
          label: 'Email ID',
          description:
            'Please update your email ID to receive important updates and notifications.',
          keyboardType: 'email-address',
          validationType: 'email',
          onSubmitActionType: 'updateEmail',
          captionText: 'Email verified',
          iconImage: require('../../../../../assets/images/elements.png'),
          size: 24,
        },
      },
    });
  };

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const handleUpload = () => {
    setIsAddModalVisible(true);
  };

  const handleEditPhone = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditField',
        params: {
          fieldType: 'phone',
          initialValue: phoneNumber,
          headerTitle: 'Update your phone number',
          label: 'WhatsApp number',
          description:
            'Please update your WhatsApp number to get all your updates and orders details.',
          keyboardType: 'phone-pad',
          showCountrySection: true,
          countryCode: countryCode,
          countryFlag: MALTA_FLAG_URL,
          validationType: 'phone',
          onSubmitActionType: 'updatePhone',
          captionText: 'WhatsApp number verified',
          iconImage: require('../../../../../assets/images/elements.png'),
          size: 24,
        },
      },
    });
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
        {/* <AnimatedTextInput
          label="Full name"
          value={fullName}
          onChangeText={setFullName}
          keyboardType="default"
          customLabelColorFocused={ColorPalette.GREY_TEXT_400}
          customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
          rightText="Edit"
          onRightTextPress={handleEditName}
          customBorderColor={ColorPalette.GREY_TEXT_400}
          customBorderWidth={1}
          disabled={true}
        />
        <AnimatedTextInput
          label="Email ID"
          value={email}
          onChangeText={setEmail}
          keyboardType="default"
          customLabelColorFocused={ColorPalette.GREY_TEXT_400}
          customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
          rightText="Edit"
          onRightTextPress={handleEditEmail}
          customBorderColor={ColorPalette.GREY_TEXT_400}
          customBorderWidth={1}
          disabled={true}
        />
        <AnimatedTextInput
          label="WhatsApp number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          customLabelColorFocused={ColorPalette.GREY_TEXT_400}
          customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
          showCountrySection
          countryCode={countryCode}
          countryFlag={MALTA_FLAG_URL}
          onCountryPress={() => {}}
          rightText="Edit"
          onRightTextPress={handleEditPhone}
          customBorderColor={ColorPalette.GREY_TEXT_400}
          customBorderWidth={1}
          disabled={true}
        /> */}
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
          onRightTextPress={handleEditName}
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
          onRightTextPress={handleEditEmail}
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
          onRightTextPress={handleEditName}
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
              placeholder={
                editMode
                  ? 'Update your product description...'
                  : 'Sonic Wave Powerful sound, deep bass, 12H playtime, Bluetooth. Perfect for any space!'
              }
              placeholderTextColor={ColorPalette.PlaceholderText}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
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
          {/* Company Logo Section */}
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

          {/* Divider */}
          <View style={containerStyles.divider} />

          {/* Invoice Logo Section */}
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
              placeholder={
                editMode
                  ? 'Update your product description...'
                  : 'Sonic Wave Powerful sound, deep bass, 12H playtime, Bluetooth. Perfect for any space!'
              }
              placeholderTextColor={ColorPalette.PlaceholderText}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );

  // Scene map for tabs
  const renderScene = SceneMap({
    general: GeneralRoute,
    description: DescriptionRoute,
    logo: LogoRoute,
    terms: TermsRoute,
  });

  // Custom Tab Bar
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
        width: getScreenWidth(100) / 4, // Divide screen width equally among 4 tabs
        paddingHorizontal: 0,
      }}
      scrollEnabled={false} // Disable scrolling to fit all tabs on screen
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

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name="Personal Info"
        variant={TypographyVariant.LMEDIUM_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={<ArrowLeft style={undefined} size={16} onPress={goBack} />}
        rightIcons={null}
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
