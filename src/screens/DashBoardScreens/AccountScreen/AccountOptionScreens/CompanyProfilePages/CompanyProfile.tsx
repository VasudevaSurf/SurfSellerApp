// src/screens/DashBoardScreens/AccountScreen/AccountOptionScreens/CompanyProfilePages/CompanyProfile.tsx
import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ArrowLeft from '../../../../../assets/icons/ArrowLeft';
import LockIcon from '../../../../../assets/icons/LockIcon';
import PencilIcon from '../../../../../assets/icons/PencilIcon';
import {AddModal} from '../../../../../components/MainComponents/AddModal/AddModal';
import {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../components/UserComponents/Button';
import {Header} from '../../../../../components/UserComponents/Header/Header';
import AnimatedTextInput from '../../../../../components/UserComponents/TextInput/TextInput';
import {Typography} from '../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../config/colorPalette';
import {getScreenHeight} from '../../../../../helpers/screenSize';
import {goBack, navigate} from '../../../../../navigation/utils/navigationRef';
import {fetchProfile} from '../../../../../redux/slices/profileSlice';
import {styles} from './CompanyProfile.styles';
import {containerStyles} from './ImageContainer.styles';
import {RootState, AppDispatch} from '../../../../../redux/store';

const MALTA_FLAG_URL =
  'https://cdn.countryflags.com/thumbs/malta/flag-round-250.png';

const CompanyProfile = () => {
  const route = useRoute();
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const {profileData, loading, error} = useSelector(
    (state: RootState) => state.profile,
  );

  const [businessName, setBusinessName] = useState('');
  const [vatNumber, setVATNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [cityName, setCityName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Malta');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  // Fetch profile data when component mounts
  useEffect(() => {
    if (userData?.user_id) {
      dispatch(fetchProfile(userData.user_id));
    }
  }, [dispatch, userData?.user_id]);

  // Update state when profile data changes
  useEffect(() => {
    if (profileData) {
      setBusinessName(profileData.company || 'Annies flower Shop');
      setVATNumber(profileData.tax_number || 'MT10927393');
      setStreetName(profileData.b_address || 'Triq San Pawl');
      setCityName(profileData.b_city || 'Valletta');
      setPostalCode(profileData.b_zipcode || 'CLT 1210');
      setCountry(profileData.b_country || 'Malta');
    }
  }, [profileData]);

  const handleUpload = () => {
    setIsAddModalVisible(true);
  };

  const modalButtons = [
    {
      text: 'Upload from Gallery',
      onPress: () => {},
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      type: ButtonType.PRIMARY,
      size: ButtonSize.MEDIUM,
    },
    {
      text: 'Select from Drive',
      onPress: () => {},
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      type: ButtonType.OUTLINED,
      size: ButtonSize.MEDIUM,
      customStyles: styles.customButton,
    },
    {
      text: 'Take a Photo',
      onPress: () => {},
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      type: ButtonType.OUTLINED,
      size: ButtonSize.MEDIUM,
      customTextStyles: styles.customText,
    },
  ];

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

  const handleEditBusinessName = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditField',
        params: {
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
        },
      },
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

  const handleEditStreet = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditField',
        params: {
          fieldType: 'streetName',
          initialValue: streetName,
          headerTitle: 'Update your street name and number',
          label: 'Street name and number',
          description:
            'Please update your Street name and number for better experience.',
          keyboardType: 'default',
          validationType: 'streetName',
          onSubmitActionType: 'updateStreetName',
          originScreen: 'CompanyProfile',
        },
      },
    });
  };

  const handleEditCity = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditField',
        params: {
          fieldType: 'cityName',
          initialValue: cityName,
          headerTitle: 'Update your city name',
          label: 'City',
          description: 'Please update your city name for better experience.',
          keyboardType: 'default',
          validationType: 'cityName',
          onSubmitActionType: 'updateCityName',
          originScreen: 'CompanyProfile',
        },
      },
    });
  };

  const handleEditPostalCode = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditField',
        params: {
          fieldType: 'postalCode',
          initialValue: postalCode,
          headerTitle: 'Update postal code',
          label: 'Postal code',
          description: 'Please enter your valid postal code.',
          keyboardType: 'default',
          validationType: 'postalCode',
          onSubmitActionType: 'updatePostalCode',
          originScreen: 'CompanyProfile',
        },
      },
    });
  };

  const handleEditCompanyLogo = () => {
    Alert.alert('Edit Company Logo', 'Upload or change your company logo');
  };

  const handleEditInvoiceLogo = () => {
    Alert.alert('Edit Invoice Logo', 'Upload or change your invoice logo');
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name="Company Profile"
        variant={TypographyVariant.LMEDIUM_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={<ArrowLeft style={undefined} size={16} onPress={goBack} />}
        rightIcons={null}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingTop: getScreenHeight(2)},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainerTwo}>
          <View style={styles.imageContainer}>
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
                    <PencilIcon size={18} color={ColorPalette.GREY_TEXT_400} />
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
                    style={[
                      containerStyles.image,
                      containerStyles.invoiceImage,
                    ]}
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    style={containerStyles.editButton}
                    onPress={handleUpload}>
                    <PencilIcon size={18} color={ColorPalette.GREY_TEXT_400} />
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
          <AnimatedTextInput
            label="Street name and number"
            value={streetName}
            onChangeText={setStreetName}
            keyboardType="default"
            customLabelColorFocused={ColorPalette.GREY_TEXT_400}
            customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
            rightText="Edit"
            onRightTextPress={handleEditStreet}
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
            onRightTextPress={handleEditCity}
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
        <AddModal
          isVisible={isAddModalVisible}
          onClose={() => setIsAddModalVisible(false)}
          buttons={modalButtons}
          showCloseIcon={true}
          containerStyle={{paddingVertical: 16}}
          footerStyle={{flexDirection: 'column', gap: 12}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompanyProfile;
