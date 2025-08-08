import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ArrowLeftIcon from '../../../../../assets/icons/ArrowLeftIcon';
import {Header} from '../../../../../components/UserComponents/Header/Header';
import AnimatedTextInput from '../../../../../components/UserComponents/TextInput/TextInput';
import {TypographyVariant} from '../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../config/colorPalette';
import {getScreenHeight} from '../../../../../helpers/screenSize';
import {goBack, navigate} from '../../../../../navigation/utils/navigationRef';
import {fetchProfile} from '../../../../../redux/slices/profileSlice';
import {styles} from './PerosanlInfo.styles';
import ArrowLeft from '../../../../../assets/icons/ArrowLeft';
import {RootState, AppDispatch} from '../../../../../redux/store';

const INITIAL_COUNTRY_CODE = '+356';
const MALTA_FLAG_URL =
  'https://cdn.countryflags.com/thumbs/malta/flag-round-250.png';

const PersonalInfo = () => {
  const route = useRoute();
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const {profileData, loading, error} = useSelector(
    (state: RootState) => state.profile,
  );

  // State for form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(INITIAL_COUNTRY_CODE);

  // Fetch profile data when component mounts
  useEffect(() => {
    if (userData?.user_id) {
      dispatch(fetchProfile(userData.user_id));
    }
  }, [dispatch, userData?.user_id]);

  // Update state when profile data changes
  useEffect(() => {
    if (profileData) {
      // Construct full name from profile data
      const firstName = profileData.firstname || '';
      const lastName = profileData.lastname || '';
      const constructedFullName = `${firstName} ${lastName}`.trim();

      setFullName(constructedFullName || 'Annie Flora');
      setEmail(profileData.email || 'anniesshop@gmail.com');
      setPhoneNumber(profileData.phone || '9864 1234');
    }
  }, [profileData]);

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
          required: true,
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

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name="Personal Info"
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
          <AnimatedTextInput
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
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInfo;
