import React, {useState, useEffect, useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
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
import CloseCircleIcon from '../../../../../assets/icons/CloseCircleIcon';
import {RootState, AppDispatch} from '../../../../../redux/store';
import {
  fetchProfile,
  updateProfile,
} from '../../../../../redux/slices/profileSlice';
import {
  updateProfileApi,
  UserProfile,
  ProfileField,
  fetchProfileApi,
} from '../../../../../services/apiService';
import {styles} from './EditAdministrator.styles';
import QuestionMarkIcon from '../../../../../assets/icons/QuestionMarkIcon';

const INITIAL_COUNTRY_CODE = '+356';
const MALTA_FLAG_URL =
  'https://cdn.countryflags.com/thumbs/malta/flag-round-250.png';

interface RouteParams {
  administrator: Administrator | null;
  isCurrentUser?: boolean;
}

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
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [cityName, setCityName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Malta');

  // Field edit states
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  // Error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Fetch profile data on mount
  useEffect(() => {
    const loadProfileData = async () => {
      if (!userData?.user_id) {
        setFetchError('User ID not found');
        setInitialLoading(false);
        return;
      }

      try {
        setInitialLoading(true);
        setFetchError('');

        // Fetch profile data using API
        const response = await fetchProfileApi(userData.user_id);

        if (response.result && response.sections) {
          // Parse profile sections to extract field values
          const profileFields: {[key: string]: string} = {};

          response.sections.forEach(section => {
            section.blocks.forEach(block => {
              block.fields.forEach((field: ProfileField) => {
                profileFields[field.field_name] = field.value || '';
              });
            });
          });

          // Populate form fields
          setEmail(profileFields.email || administrator?.email || '');
          setFirstName(
            profileFields.firstname ||
              administrator?.fullName?.split(' ')[0] ||
              '',
          );
          setLastName(
            profileFields.lastname ||
              administrator?.fullName?.split(' ')[1] ||
              '',
          );
          setPhoneNumber(
            profileFields.phone?.replace('+356 ', '') ||
              administrator?.phone?.replace('+356 ', '') ||
              '',
          );
          setStreetName(profileFields.s_address || '');
          setCityName(profileFields.s_city || '');
          setPostalCode(profileFields.s_zipcode || '');
          setCountry(profileFields.s_country || 'Malta');
        }
      } catch (error: any) {
        console.error('Error loading profile:', error);
        setFetchError(error.message || 'Failed to load profile data');
      } finally {
        setInitialLoading(false);
      }
    };

    loadProfileData();
  }, [userData?.user_id, administrator]);

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Password validation
  const validatePassword = (): boolean => {
    if (!isEditMode && !password.trim()) {
      setPasswordError('Password is required');
      return false;
    }
    if (password && password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    if (password && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    setPasswordError('');
    setConfirmPasswordError('');
    return true;
  };

  // Name validation
  const validateNames = (): boolean => {
    let isValid = true;

    if (!firstName.trim()) {
      setFirstNameError('First name is required');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    if (!lastName.trim()) {
      setLastNameError('Last name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }

    return isValid;
  };

  // Phone validation
  const validatePhone = (): boolean => {
    if (!phoneNumber.trim()) {
      setPhoneError('Phone number is required');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleSubmit = async () => {
    // Validate all fields
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword();
    const areNamesValid = validateNames();
    const isPhoneValid = validatePhone();

    if (!isEmailValid || !isPasswordValid || !areNamesValid || !isPhoneValid) {
      return;
    }

    if (!userData?.user_id) {
      Alert.alert('Error', 'User ID not found');
      return;
    }

    try {
      setLoading(true);

      // Prepare update data
      const updateData: Partial<UserProfile> = {
        email: email.trim(),
        firstname: firstName.trim(),
        lastname: lastName.trim(),
        phone: `+356 ${phoneNumber.trim()}`,
      };

      // Add address fields if provided
      if (streetName.trim()) {
        updateData.street = streetName.trim();
      }
      if (cityName.trim()) {
        updateData.city = cityName.trim();
      }
      if (postalCode.trim()) {
        updateData.postal_code = postalCode.trim();
      }
      if (country.trim()) {
        updateData.country = country.trim();
      }

      console.log('Updating profile with data:', updateData);

      // Call update API
      const response = await updateProfileApi(userData.user_id, updateData);

      if (response.result) {
        // Update Redux store
        dispatch(fetchProfile(userData.user_id));

        Alert.alert(
          'Success',
          isEditMode
            ? 'Administrator updated successfully'
            : 'Administrator created successfully',
          [
            {
              text: 'OK',
              onPress: () => goBack(),
            },
          ],
        );
      } else {
        Alert.alert(
          'Error',
          response.message || 'Failed to update administrator',
        );
      }
    } catch (error: any) {
      console.error('Error updating administrator:', error);
      Alert.alert(
        'Error',
        error.message || 'An error occurred while updating administrator',
      );
    } finally {
      setLoading(false);
    }
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
            // TODO: Implement delete API call
            console.log('Delete administrator:', administrator?.id);
            Alert.alert('Info', 'Delete functionality will be implemented');
          },
        },
      ],
    );
  };

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };

  const handleCancelEditEmail = () => {
    setIsEditingEmail(false);
    setEmail(profileData?.email || administrator?.email || '');
    setEmailError('');
  };

  const handleSaveEmail = () => {
    if (validateEmail(email)) {
      setIsEditingEmail(false);
    }
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
            <TouchableOpacity>
              <Typography
                text="ⓘ"
                variant={TypographyVariant.PMEDIUM_REGULAR}
                customTextStyles={styles.infoIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputsContainer}>
            {isCurrentUser && !isEditingEmail ? (
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
            ) : (
              <AnimatedTextInput
                label="Email ID"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  setEmailError('');
                }}
                keyboardType="email-address"
                customLabelColorFocused={ColorPalette.PURPLE_300}
                customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
                customBorderColor={
                  emailError ? ColorPalette.RED : ColorPalette.GREY_TEXT_400
                }
                customFocusedBorderColor={ColorPalette.PURPLE_300}
                customBorderWidth={1}
                customFocusedBorderWidth={2}
                error={emailError}
                customTextColor={ColorPalette.GREY_TEXT_500}
                rightIcons={
                  isEditingEmail
                    ? [
                        {
                          icon: <CloseCircleIcon style={undefined} />,
                          onPress: handleCancelEditEmail,
                        },
                      ]
                    : [
                        {
                          icon: <CloseCircleIcon style={undefined} />,
                          onPress: () => setEmail(''),
                        },
                      ]
                }
              />
            )}

            <AnimatedTextInput
              label="Password"
              value={password}
              onChangeText={text => {
                setPassword(text);
                setPasswordError('');
              }}
              keyboardType="default"
              type="password"
              customLabelColorFocused={ColorPalette.PURPLE_300}
              customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
              customBorderColor={
                passwordError ? ColorPalette.RED : ColorPalette.GREY_TEXT_400
              }
              customFocusedBorderColor={ColorPalette.PURPLE_300}
              customBorderWidth={1}
              customFocusedBorderWidth={2}
              error={passwordError}
              customTextColor={ColorPalette.GREY_TEXT_500}
              rightIcons={[
                {
                  icon: <CloseCircleIcon style={undefined} />,
                  onPress: () => setPassword(''),
                },
              ]}
            />

            <AnimatedTextInput
              label="Confirm password"
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                setConfirmPasswordError('');
              }}
              keyboardType="default"
              type="password"
              customLabelColorFocused={ColorPalette.PURPLE_300}
              customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
              customBorderColor={
                confirmPasswordError
                  ? ColorPalette.RED
                  : ColorPalette.GREY_TEXT_400
              }
              customFocusedBorderColor={ColorPalette.PURPLE_300}
              customBorderWidth={1}
              customFocusedBorderWidth={2}
              error={confirmPasswordError}
              customTextColor={ColorPalette.GREY_TEXT_500}
              rightIcons={[
                {
                  icon: <CloseCircleIcon style={undefined} />,
                  onPress: () => setConfirmPassword(''),
                },
              ]}
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
            <TouchableOpacity>
              <Typography
                text="ⓘ"
                variant={TypographyVariant.PMEDIUM_REGULAR}
                customTextStyles={styles.infoIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputsContainer}>
            <AnimatedTextInput
              label="First name"
              value={firstName}
              onChangeText={text => {
                setFirstName(text);
                setFirstNameError('');
              }}
              keyboardType="default"
              customLabelColorFocused={ColorPalette.PURPLE_300}
              customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
              customBorderColor={
                firstNameError ? ColorPalette.RED : ColorPalette.GREY_TEXT_400
              }
              customFocusedBorderColor={ColorPalette.PURPLE_300}
              customBorderWidth={1}
              customFocusedBorderWidth={2}
              error={firstNameError}
              customTextColor={ColorPalette.GREY_TEXT_500}
              rightIcons={[
                {
                  icon: <CloseCircleIcon style={undefined} />,
                  onPress: () => setFirstName(''),
                },
              ]}
            />

            <AnimatedTextInput
              label="Last name"
              value={lastName}
              onChangeText={text => {
                setLastName(text);
                setLastNameError('');
              }}
              keyboardType="default"
              customLabelColorFocused={ColorPalette.PURPLE_300}
              customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
              customBorderColor={
                lastNameError ? ColorPalette.RED : ColorPalette.GREY_TEXT_400
              }
              customFocusedBorderColor={ColorPalette.PURPLE_300}
              customBorderWidth={1}
              customFocusedBorderWidth={2}
              error={lastNameError}
              customTextColor={ColorPalette.GREY_TEXT_500}
              rightIcons={[
                {
                  icon: <CloseCircleIcon style={undefined} />,
                  onPress: () => setLastName(''),
                },
              ]}
            />

            <AnimatedTextInput
              label="Phone Number"
              value={phoneNumber}
              onChangeText={text => {
                setPhoneNumber(text);
                setPhoneError('');
              }}
              keyboardType="phone-pad"
              showCountrySection
              countryCode={INITIAL_COUNTRY_CODE}
              countryFlag={MALTA_FLAG_URL}
              onCountryPress={() => {}}
              customLabelColorFocused={ColorPalette.PURPLE_300}
              customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
              customBorderColor={
                phoneError ? ColorPalette.RED : ColorPalette.GREY_TEXT_400
              }
              customFocusedBorderColor={ColorPalette.PURPLE_300}
              customBorderWidth={1}
              customFocusedBorderWidth={2}
              error={phoneError}
              customTextColor={ColorPalette.GREY_TEXT_500}
              rightIcons={[
                {
                  icon: <CloseCircleIcon style={undefined} />,
                  onPress: () => setPhoneNumber(''),
                },
              ]}
            />

            <AnimatedTextInput
              label="Street name and number"
              value={streetName}
              onChangeText={setStreetName}
              keyboardType="default"
              customLabelColorFocused={ColorPalette.PURPLE_300}
              customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
              customBorderColor={ColorPalette.GREY_TEXT_400}
              customFocusedBorderColor={ColorPalette.PURPLE_300}
              customBorderWidth={1}
              customFocusedBorderWidth={2}
              customTextColor={ColorPalette.GREY_TEXT_500}
              rightIcons={[
                {
                  icon: <CloseCircleIcon style={undefined} />,
                  onPress: () => setStreetName(''),
                },
              ]}
            />

            <AnimatedTextInput
              label="City"
              value={cityName}
              onChangeText={setCityName}
              keyboardType="default"
              customLabelColorFocused={ColorPalette.PURPLE_300}
              customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
              customBorderColor={ColorPalette.GREY_TEXT_400}
              customFocusedBorderColor={ColorPalette.PURPLE_300}
              customBorderWidth={1}
              customFocusedBorderWidth={2}
              customTextColor={ColorPalette.GREY_TEXT_500}
              rightIcons={[
                {
                  icon: <CloseCircleIcon style={undefined} />,
                  onPress: () => setCityName(''),
                },
              ]}
            />

            <AnimatedTextInput
              label="Postal code"
              value={postalCode}
              onChangeText={setPostalCode}
              keyboardType="default"
              customLabelColorFocused={ColorPalette.PURPLE_300}
              customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
              customBorderColor={ColorPalette.GREY_TEXT_400}
              customFocusedBorderColor={ColorPalette.PURPLE_300}
              customBorderWidth={1}
              customFocusedBorderWidth={2}
              customTextColor={ColorPalette.GREY_TEXT_500}
              rightIcons={[
                {
                  icon: <CloseCircleIcon style={undefined} />,
                  onPress: () => setPostalCode(''),
                },
              ]}
            />

            {/* Country Badge */}
            <View style={styles.countryContainer}>
              <View style={styles.countryBadge}>
                <View style={styles.countryContent}>
                  <Typography text="🇲🇹" variant={TypographyVariant.H6_BOLD} />
                  <Typography
                    text={country}
                    variant={TypographyVariant.LMEDIUM_MEDIUM}
                    customTextStyles={styles.countryText}
                  />
                </View>
                <TouchableOpacity style={styles.lockIcon}>
                  <Typography
                    text="🔒"
                    variant={TypographyVariant.PMEDIUM_REGULAR}
                  />
                </TouchableOpacity>
              </View>
            </View>
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

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <Button
          text={loading ? 'SAVING...' : 'SAVE'}
          variant={ButtonVariant.PRIMARY}
          state={loading ? ButtonState.DISABLED : ButtonState.DEFAULT}
          size={ButtonSize.LARGE}
          onPress={handleSubmit}
          textVariant={TypographyVariant.H6_BOLD}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditAdministrator;
