import React, {useState, useEffect, useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Header} from '../../../../../components/UserComponents/Header/Header';
import {TypographyVariant} from '../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../config/colorPalette';
import {goBack, navigate} from '../../../../../navigation/utils/navigationRef';
import ArrowLeft from '../../../../../assets/icons/ArrowLeft';
import AnimatedTextInput from '../../../../../components/UserComponents/TextInput/TextInput';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../../../../components/UserComponents/Button';
import {Typography} from '../../../../../components/UserComponents/Typography/Typography';
import {Administrator} from '../../../../../components/MainComponents/AdministratorCard/AdministratorCard';
import {TrashIcon2} from '../../../../../assets/icons/NewProductIcons/TrashIcon2';
import {RootState, AppDispatch} from '../../../../../redux/store';
import {fetchProfile} from '../../../../../redux/slices/profileSlice';
import {styles} from './EditAdministrator.styles';
import QuestionMarkIcon from '../../../../../assets/icons/QuestionMarkIcon';
import LockIcon from '../../../../../assets/icons/LockIcon';

const INITIAL_COUNTRY_CODE = '+356';
const MALTA_FLAG_URL =
  'https://cdn.countryflags.com/thumbs/malta/flag-round-250.png';

interface RouteParams {
  administrator: Administrator | null;
  isCurrentUser?: boolean;
}

const InfoIcon = () => (
  <Typography
    text="ⓘ"
    variant={TypographyVariant.PMEDIUM_REGULAR}
    customTextStyles={{color: ColorPalette.GREY_TEXT_400, fontSize: 20}}
  />
);

const EditAdministrator = () => {
  const route = useRoute();
  const dispatch = useDispatch<AppDispatch>();
  const {administrator, isCurrentUser} = (route.params as RouteParams) || {};
  const isEditMode = !!administrator;

  const userData = useSelector((state: RootState) => state.auth.userData);
  const {profileData, loading: profileLoading} = useSelector(
    (state: RootState) => state.profile,
  );

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  // Form state
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [streetName, setStreetName] = useState('');
  const [cityName, setCityName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Malta');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch profile data on mount and when returning from EditFieldScreen
  useFocusEffect(
    React.useCallback(() => {
      if (userData?.user_id && isCurrentUser) {
        dispatch(fetchProfile(userData.user_id));
      }
    }, [dispatch, userData?.user_id, isCurrentUser]),
  );

  // Update state when profile data changes or route params change
  useEffect(() => {
    if (isCurrentUser && profileData) {
      // Use profile data for current user
      const firstName = profileData.firstname || '';
      const lastName = profileData.lastname || '';
      const constructedFullName = `${firstName} ${lastName}`.trim();

      setFullName(constructedFullName || '');
      setEmail(profileData.email || '');
      setPhoneNumber(profileData.phone?.replace('+356 ', '') || '');
      setStreetName(profileData.street || '');
      setCityName(profileData.city || '');
      setPostalCode(profileData.postal_code || '');
      setCountry(profileData.country || 'Malta');
      setInitialLoading(false);
    } else if (administrator) {
      // Use administrator data for other admins
      setFullName(administrator.fullName || '');
      setEmail(administrator.email || '');
      setPhoneNumber(administrator.phone?.replace('+356 ', '') || '');
      setStreetName('');
      setCityName('');
      setPostalCode('');
      setCountry('Malta');
      setInitialLoading(false);
    }
  }, [profileData, administrator, isCurrentUser]);

  // Handle updates from route params (when returning from EditFieldScreen)
  useFocusEffect(
    React.useCallback(() => {
      if (route.params) {
        const {
          updatedName,
          updatedEmail,
          updatedPhone,
          updatedStreet,
          updatedCity,
          updatedPostal,
          updatedCountry,
        } = route.params;

        if (updatedName) setFullName(updatedName);
        if (updatedEmail) setEmail(updatedEmail);
        if (updatedPhone) setPhoneNumber(updatedPhone);
        if (updatedStreet) setStreetName(updatedStreet);
        if (updatedCity) setCityName(updatedCity);
        if (updatedPostal) setPostalCode(updatedPostal);
        if (updatedCountry) setCountry(updatedCountry);
      }
    }, [route.params]),
  );

  const handleEditName = () => {
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditField',
        params: {
          fieldType: 'name',
          multipleFields: true,
          initialValues: {
            firstName,
            lastName,
          },
          headerTitle: 'Update name',
          description:
            'Please enter the name exactly as it appears on the ID or passport.',
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
          originScreen: 'EditAdministrator',
        },
      },
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
          headerTitle: 'Update email',
          label: 'Email ID',
          description:
            'Please update the email ID to receive important updates and notifications.',
          keyboardType: 'email-address',
          validationType: 'email',
          onSubmitActionType: 'updateEmail',
          captionText: 'Email verified',
          iconImage: require('../../../../../assets/images/elements.png'),

          size: 24,
          originScreen: 'EditAdministrator',
        },
      },
    });
  };

  const handleEditPassword = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditField',
        params: {
          fieldType: 'password',
          multipleFields: true,
          initialValues: {
            password: '',
            confirmPassword: '',
          },
          headerTitle: 'Update password',
          description:
            'Please enter a new password. Password must be at least 6 characters long.',
          fields: [
            {
              key: 'password',
              label: 'New Password',
              keyboardType: 'default',
              required: true,
              validationType: 'password',
            },
            {
              key: 'confirmPassword',
              label: 'Confirm New Password',
              keyboardType: 'default',
              required: true,
              validationType: 'password',
            },
          ],
          onSubmitActionType: 'updatePassword',
          originScreen: 'EditAdministrator',
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
          headerTitle: 'Update phone number',
          label: 'WhatsApp number',
          description:
            'Please update the WhatsApp number to get all updates and order details.',
          keyboardType: 'phone-pad',
          showCountrySection: true,
          countryCode: INITIAL_COUNTRY_CODE,
          countryFlag: MALTA_FLAG_URL,
          validationType: 'phone',
          onSubmitActionType: 'updatePhone',
          captionText: 'WhatsApp number verified',
          iconImage: require('../../../../../assets/images/elements.png'),

          size: 24,
          originScreen: 'EditAdministrator',
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
          headerTitle: 'Update street name and number',
          label: 'Street name and number',
          description:
            'Please update the street name and number for better experience.',
          keyboardType: 'default',
          validationType: 'streetName',
          onSubmitActionType: 'updateStreetName',
          originScreen: 'EditAdministrator',
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
          headerTitle: 'Update city name',
          label: 'City',
          description: 'Please update the city name for better experience.',
          keyboardType: 'default',
          validationType: 'cityName',
          onSubmitActionType: 'updateCityName',
          originScreen: 'EditAdministrator',
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
          description: 'Please enter a valid postal code.',
          keyboardType: 'default',
          validationType: 'postalCode',
          onSubmitActionType: 'updatePostalCode',
          originScreen: 'EditAdministrator',
        },
      },
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Administrator',
      'Are you sure you want to delete this administrator? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('Delete administrator:', administrator?.id);
            Alert.alert('Info', 'Delete functionality will be implemented');
            goBack();
          },
        },
      ],
    );
  };

  const handleBack = () => {
    goBack();
  };

  const headerIcons = useMemo(
    () => [
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
    ],
    [],
  );

  if (initialLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <Header
          name={isEditMode ? 'Edit Administrator' : 'Add Administrator'}
          variant={TypographyVariant.H6_BOLD}
          textColor={ColorPalette.AgreeTerms}
          leftIcon={
            <ArrowLeft
              style={undefined}
              size={22}
              onPress={handleBack}
              color={ColorPalette.GREY_TEXT_400}
            />
          }
          rightIcons={headerIcons}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={ColorPalette.PURPLE_300} />
          <Typography
            text="Loading administrator data..."
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={{
              marginTop: 16,
              color: ColorPalette.GREY_TEXT_400,
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (fetchError) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <Header
          name={isEditMode ? 'Edit Administrator' : 'Add Administrator'}
          variant={TypographyVariant.H6_BOLD}
          textColor={ColorPalette.AgreeTerms}
          leftIcon={<ArrowLeft style={undefined} size={16} onPress={goBack} />}
          rightIcons={null}
        />
        <View style={styles.errorContainer}>
          <Typography
            text={fetchError}
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={{color: ColorPalette.RED_200}}
          />
          <Button
            text="Retry"
            variant={ButtonVariant.PRIMARY}
            state={ButtonState.DEFAULT}
            size={ButtonSize.MEDIUM}
            onPress={() => {
              setFetchError('');
              setInitialLoading(true);
            }}
            customStyles={{marginTop: 16}}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name={isEditMode ? 'Edit Administrator' : 'Add Administrator'}
        variant={TypographyVariant.H6_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={<ArrowLeft style={undefined} size={16} onPress={goBack} />}
        rightIcons={null}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* User Account Information Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography
              text="User account information"
              variant={TypographyVariant.LMEDIUM_EXTRABOLD}
              customTextStyles={styles.sectionTitle}
            />
            {/* <TouchableOpacity>
              <InfoIcon />
            </TouchableOpacity> */}
          </View>

          <View style={styles.inputsContainer}>
            <AnimatedTextInput
              label="Email ID"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              customLabelColorFocused={ColorPalette.GREY_TEXT_400}
              customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
              rightText="Edit"
              onRightTextPress={handleEditEmail}
              customBorderColor={ColorPalette.GREY_TEXT_400}
              customBorderWidth={1}
              disabled={true}
              customTextColor={ColorPalette.GREY_TEXT_500}
            />

            <AnimatedTextInput
              label="Password"
              value="••••••••"
              onChangeText={() => {}}
              keyboardType="default"
              secureTextEntry={true}
              customLabelColorFocused={ColorPalette.GREY_TEXT_400}
              customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
              rightText="Edit"
              onRightTextPress={handleEditPassword}
              customBorderColor={ColorPalette.GREY_TEXT_400}
              customBorderWidth={1}
              disabled={true}
              customTextColor={ColorPalette.GREY_TEXT_500}
            />

            <AnimatedTextInput
              label="Confirm Password"
              value="••••••••"
              onChangeText={() => {}}
              keyboardType="default"
              secureTextEntry={true}
              customLabelColorFocused={ColorPalette.GREY_TEXT_400}
              customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
              rightText="Edit"
              onRightTextPress={handleEditPassword}
              customBorderColor={ColorPalette.GREY_TEXT_400}
              customBorderWidth={1}
              disabled={true}
              customTextColor={ColorPalette.GREY_TEXT_500}
            />
          </View>
        </View>

        {/* Contact Information Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography
              text="Contact information"
              variant={TypographyVariant.LMEDIUM_EXTRABOLD}
              customTextStyles={styles.sectionTitle}
            />
            {/* <TouchableOpacity>
              <InfoIcon />
            </TouchableOpacity> */}
          </View>

          <View style={styles.inputsContainer}>
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
              customTextColor={ColorPalette.GREY_TEXT_500}
            />

            <AnimatedTextInput
              label="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              showCountrySection
              countryCode={INITIAL_COUNTRY_CODE}
              countryFlag={MALTA_FLAG_URL}
              onCountryPress={() => {}}
              customLabelColorFocused={ColorPalette.GREY_TEXT_400}
              customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
              rightText="Edit"
              onRightTextPress={handleEditPhone}
              customBorderColor={ColorPalette.GREY_TEXT_400}
              customBorderWidth={1}
              disabled={true}
              customTextColor={ColorPalette.GREY_TEXT_500}
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
              customTextColor={ColorPalette.GREY_TEXT_500}
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
              customTextColor={ColorPalette.GREY_TEXT_500}
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
              customTextColor={ColorPalette.GREY_TEXT_500}
            />

            {/* Country Badge */}
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
        </View>

        {/* Delete Button (only in edit mode and not current user) */}
        {isEditMode && !isCurrentUser && (
          <View style={styles.deleteContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}>
              <TrashIcon2
                style={undefined}
                size={20}
                color={ColorPalette.RED_200}
              />
              <Typography
                text="Delete Administrator"
                variant={TypographyVariant.PMEDIUM_MEDIUM}
                customTextStyles={styles.deleteText}
              />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          text={isSubmitting ? 'UPDATING...' : 'SUBMIT'}
          variant={ButtonVariant.PRIMARY}
          state={ButtonState.DEFAULT}
          size={ButtonSize.MEDIUM}
          onPress={() => {}}
          loading={isSubmitting}
          // disabled={isSubmitDisabled()}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditAdministrator;
