// src/screens/DashBoardScreens/AccountScreen/AccountOptionScreens/PersonalInfo/PersonalInfo.tsx

import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useEffect, useState, useMemo, useRef} from 'react';
import {SafeAreaView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TabView, TabBar} from 'react-native-tab-view';
import ArrowLeft from '../../../../../assets/icons/ArrowLeft';
import {Header} from '../../../../../components/UserComponents/Header/Header';
import {Typography} from '../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../config/colorPalette';
import {getScreenWidth} from '../../../../../helpers/screenSize';
import {goBack, navigate} from '../../../../../navigation/utils/navigationRef';
import {
  fetchProfile,
  fetchProfileLogos,
} from '../../../../../redux/slices/profileSlice';
import {RootState, AppDispatch} from '../../../../../redux/store';
import QuestionMarkIcon from '../../../../../assets/icons/QuestionMarkIcon';

// Import the separate tab components
import GeneralTab from './TabScreens/GeneralTab';
import DescriptionTab from './TabScreens/DescriptionTab';
import LogoTab from './TabScreens/LogoTab';
import TermsTab from './TabScreens/TermsTab';

interface PersonalInfoProps {
  editMode?: boolean;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({editMode = false}) => {
  const route = useRoute();
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const {profileData, loading, error, rawProfileData} = useSelector(
    (state: RootState) => state.profile,
  );

  // Add ref to track if initial fetch is done
  const hasFetchedRef = useRef(false);

  // State for all fields
  const [businessName, setBusinessName] = useState('');
  const [vatNumber, setVATNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [cityName, setCityName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const [vatChecked, setVatChecked] = useState(true);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  // Tab state
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'general', title: 'General'},
    {key: 'description', title: 'Description'},
    {key: 'logo', title: 'Logo'},
    {key: 'terms', title: 'Terms & Condition'},
  ]);

  // Fetch profile data when component mounts - ONLY ONCE
  useFocusEffect(
    React.useCallback(() => {
      console.log('🔄 PersonalInfo focused');

      if (userData?.user_id && !hasFetchedRef.current) {
        console.log('📡 Fetching profile data for first time');
        hasFetchedRef.current = true;
        dispatch(fetchProfile(userData.user_id));
        dispatch(fetchProfileLogos(userData.user_id));
      }

      // Reset the ref when component loses focus
      return () => {
        console.log('👋 PersonalInfo unfocused');
        hasFetchedRef.current = false;
      };
    }, [dispatch, userData?.user_id]),
  );

  // Extract field value helper function
  const getFieldValue = (fieldName: string): string => {
    if (!rawProfileData?.sections) {
      return '';
    }

    for (const section of rawProfileData.sections) {
      for (const block of section.blocks) {
        const field = block.fields.find(f => f.field_name === fieldName);
        if (field) {
          return field.value || '';
        }
      }
    }
    return '';
  };

  // Update state when profile data changes - ONLY when rawProfileData changes
  useEffect(() => {
    if (rawProfileData) {
      console.log('📝 Updating local state from profile data');
      const company = getFieldValue('company');
      const vat = getFieldValue('fields_52');
      const address = getFieldValue('address');
      const city = getFieldValue('city');
      const postal = getFieldValue('postal_code');
      const countryVal = getFieldValue('country');
      const description = getFieldValue('company_description');
      const terms = getFieldValue('terms');

      if (company !== undefined) setBusinessName(company);
      if (vat !== undefined) setVATNumber(vat);
      if (address !== undefined) setStreetName(address);
      if (city !== undefined) setCityName(city);
      if (postal !== undefined) setPostalCode(postal);
      if (countryVal !== undefined) setCountry(countryVal);
      if (description !== undefined) setCompanyDescription(description);
      if (terms !== undefined) setTermsAndConditions(terms);
    }
  }, [rawProfileData]); // Only depend on rawProfileData

  // Edit handlers
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

  // Render scenes using the imported components
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'general':
        return (
          <GeneralTab
            businessName={businessName}
            vatNumber={vatNumber}
            streetName={streetName}
            cityName={cityName}
            postalCode={postalCode}
            country={country}
            vatChecked={vatChecked}
            setVatChecked={setVatChecked}
            onEditBusinessName={handleEditBusinessName}
            onEditVATNumber={handleEditVATNumber}
            onEditStreetName={handleEditStreetName}
            onEditCityName={handleEditCityName}
            onEditPostalCode={handleEditPostalCode}
          />
        );
      case 'description':
        return (
          <DescriptionTab
            companyDescription={companyDescription}
            setCompanyDescription={setCompanyDescription}
          />
        );
      case 'logo':
        return <LogoTab />;
      case 'terms':
        return (
          <TermsTab
            termsAndConditions={termsAndConditions}
            setTermsAndConditions={setTermsAndConditions}
          />
        );
      default:
        return null;
    }
  };

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

  if (loading && !rawProfileData) {
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
