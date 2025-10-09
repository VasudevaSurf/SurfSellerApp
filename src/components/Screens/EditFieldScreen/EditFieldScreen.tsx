import React, {useCallback, useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, View, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeftIcon';
import CloseCircleIcon from '../../../assets/icons/CloseCircleIcon';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../../components/UserComponents/Button';
import {Header} from '../../../components/UserComponents/Header/Header';
import AnimatedTextInput from '../../../components/UserComponents/TextInput/TextInput';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {goBack, navigate} from '../../../navigation/utils/navigationRef';
import {
  updateProfile,
  clearUpdateSuccess,
  fetchProfile,
} from '../../../redux/slices/profileSlice';
import {styles} from './EditFieldScreen.styles';
import {
  EditFieldParams,
  ErrorValues,
  FieldValues,
} from './EditFieldScreen.types';
import ArrowLeft from '../../../assets/icons/ArrowLeft';
import {RootState, AppDispatch} from '../../../redux/store';
import QuestionMarkIcon from '../../../assets/icons/QuestionMarkIcon';
import Dropdown from '../../MainComponents/DropdownModal/Dropdown';

type ValidationFunction = (value: string) => string | true;

interface UpdatedEditFieldScreenProps {
  route: {
    params: EditFieldParams;
  };
  navigation: any;
}

// Update the submitFormAction function with better logging
const submitFormAction = async (
  actionType: string,
  values: any,
  dispatch: AppDispatch,
  userId: string,
) => {
  try {
    let profileData: any = {};

    console.log('🎯 Submit action:', {actionType, values});

    // Only include the specific field being updated
    switch (actionType) {
      case 'updateName':
        profileData = {
          firstname: values.firstName,
          lastname: values.lastName,
        };
        break;
      case 'updateEmail':
        profileData = {
          email: values,
        };
        break;
      case 'updatePhone':
        profileData = {
          phone: values,
        };
        break;
      case 'updateBusinessName':
        profileData = {
          company: values,
        };
        console.log('📝 Updating business name to:', values);
        break;
      case 'updateVATNumber':
        profileData = {
          vat_number: values,
        };
        console.log('📝 Updating VAT number to:', values);
        break;
      case 'updateStreetName':
        profileData = {
          address: values,
        };
        break;
      case 'updateCityName':
        profileData = {
          city: values,
        };
        break;
      case 'updatePostalCode':
        profileData = {
          postal_code: values,
        };
        break;
      case 'updateCountry':
        profileData = {
          country: values,
        };
        break;
      case 'updateCompanyDescription':
        profileData = {
          company_description: values,
        };
        break;
      case 'updateTermsAndConditions':
        profileData = {
          terms: values,
        };
        break;
      default:
        console.warn(`Unhandled action type: ${actionType}`);
        return false;
    }

    console.log('🚀 Dispatching profile update with data:', profileData);

    const result = await dispatch(
      updateProfile({
        userId,
        profileData,
      }),
    ).unwrap();

    console.log('✅ Profile update successful:', result);
    return true;
  } catch (error) {
    console.error('❌ Profile update failed:', error);
    throw error;
  }
};

const EditFieldScreen: React.FC<UpdatedEditFieldScreenProps> = ({
  route,
  navigation,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const {updating, updateError, updateSuccess} = useSelector(
    (state: RootState) => state.profile,
  );

  const {
    fieldType,
    initialValue = '',
    initialValues = {},
    headerTitle,
    label,
    description,
    keyboardType = 'default',
    validationType,
    onSubmitActionType,
    multipleFields = false,
    fields = [],
    showCountrySection = false,
    countryCode = '',
    countryFlag = '',
    captionText = '',
    iconComponent = null,
    iconImage = '',
    size = 16,
    originScreen = 'PersonalInfo',
  } = route.params;

  const [fieldValue, setFieldValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>('');
  const [fieldValues, setFieldValues] = useState<FieldValues>(initialValues);
  const [errors, setErrors] = useState<ErrorValues>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const ACCOUNT_TYPE_OPTIONS = [
    {value: 'Checking', label: 'Checking'},
    {value: 'Savings', label: 'Savings'},
    {value: 'Business', label: 'Business'},
    {value: 'Other', label: 'Other'},
  ];

  const renderIconOrImage = () => {
    if (iconComponent) {
      return iconComponent;
    }
    if (iconImage) {
      const imageSource =
        typeof iconImage === 'string' && iconImage.startsWith('http')
          ? {uri: iconImage}
          : iconImage;
      return (
        <Image
          source={imageSource}
          style={{width: size, height: size, resizeMode: 'contain'}}
        />
      );
    }
    return null;
  };

  const getValidationForType = useCallback(
    (type: string): ValidationFunction => {
      switch (type) {
        case 'firstName':
          return value => {
            if (!value.trim()) return 'First name cannot be empty';
            if (value.length < 2) return 'First name is too short';
            return true;
          };
        case 'lastName':
          return value => {
            // Last name is optional, so empty is allowed
            return true;
          };
        case 'email':
          return value => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value.trim()) return 'Email cannot be empty';
            if (!emailRegex.test(value))
              return 'Please enter a valid email address';
            return true;
          };
        case 'phone':
          return value => {
            const phoneRegex = /^\d[\d\s]{6,14}$/;
            if (!value.trim()) return 'Phone number cannot be empty';
            if (!phoneRegex.test(value))
              return 'Please enter a valid phone number';
            return true;
          };
        case 'businessName':
        case 'vatNumber':
        case 'streetName':
        case 'cityName':
        case 'postalCode':
        case 'country':
          // All company fields are optional
          return () => true;
        default:
          return () => true;
      }
    },
    [],
  );

  const handleSingleFieldChange = (text: string): void => {
    setFieldValue(text);
    setError('');
  };

  const handleMultiFieldChange = (field: string, text: string): void => {
    setFieldValues(prev => ({...prev, [field]: text}));
    setErrors(prev => ({...prev, [field]: ''}));
  };

  const handleDropdownChange = (value: string) => {
    setFieldValue(value);
    setError('');
    setActiveDropdown(null);
  };

  const handleDropdownToggle = (key: string, isOpen: boolean) => {
    setActiveDropdown(isOpen ? key : null);
  };

  // Replace the navigateBack function
  const navigateBack = (updatedData: any) => {
    // Dispatch action to refresh profile data
    if (userData?.user_id) {
      dispatch(fetchProfile(userData.user_id));
    }

    // Show success message
    Alert.alert(
      'Success',
      'Profile updated successfully',
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate back
            navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
  };

  // Replace the entire handleSubmit function
  const handleSubmit = async (): Promise<void> => {
    if (!userData?.user_id) {
      setError('User not found. Please login again.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (multipleFields) {
        let hasErrors = false;
        const newErrors: ErrorValues = {};

        fields.forEach(field => {
          const validationFn = getValidationForType(field.validationType);
          const validationResult = validationFn(fieldValues[field.key] || '');

          if (validationResult !== true) {
            newErrors[field.key] = validationResult;
            hasErrors = true;
          }
        });

        if (hasErrors) {
          setErrors(newErrors);
          setIsSubmitting(false);
          return;
        }

        await submitFormAction(
          onSubmitActionType,
          fieldValues,
          dispatch,
          userData.user_id,
        );

        navigateBack(fieldValues);
      } else {
        const validationFn = getValidationForType(validationType || fieldType);
        const validationResult = validationFn(fieldValue);

        if (validationResult !== true) {
          setError(validationResult);
          setIsSubmitting(false);
          return;
        }

        await submitFormAction(
          onSubmitActionType,
          fieldValue,
          dispatch,
          userData.user_id,
        );

        if (fieldType === 'phone') {
          navigate('Auth', {
            screen: 'OTPVerification',
            params: {
              phoneNumber: `${countryCode} ${fieldValue}`,
              flow: 'update',
              returnData: {updatedPhone: fieldValue},
              returnScreen: originScreen,
              returnStack: 'Account',
            },
          });
        } else {
          navigateBack({});
        }
      }
    } catch (error: any) {
      console.error('Submit failed:', error);
      Alert.alert(
        'Update Failed',
        error.message || 'Failed to update profile. Please try again.',
        [{text: 'OK'}],
      );
      if (multipleFields) {
        setErrors({general: error.message || 'Update failed'});
      } else {
        setError(error.message || 'Update failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled = (): boolean => {
    if (updating || isSubmitting) return true;

    if (multipleFields) {
      // Check if any changes were made
      const hasChanges = fields.some(field => {
        const currentValue = fieldValues[field.key] || '';
        const initialValue = initialValues[field.key] || '';
        return currentValue !== initialValue;
      });

      // Check required fields
      const hasRequiredFields = fields.every(
        field =>
          !field.required ||
          (fieldValues[field.key] && fieldValues[field.key].trim() !== ''),
      );

      return !hasChanges || !hasRequiredFields;
    }

    // For single fields, check if value changed
    const hasChanged = fieldValue !== initialValue;

    // For optional fields, allow submission even if empty but changed
    const optionalFields = [
      'businessName',
      'vatNumber',
      'streetName',
      'cityName',
      'postalCode',
      'country',
    ];
    if (optionalFields.includes(fieldType)) {
      return !hasChanged;
    }

    return !hasChanged || fieldValue.trim() === '';
  };

  // Show update error from Redux if it exists
  const displayError = updateError || error;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name={headerTitle || `Update your ${fieldType}`}
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
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingTop: getScreenHeight(1.2)},
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainerTwo}>
            {description && (
              <View style={{paddingHorizontal: getScreenWidth(4)}}>
                <Typography
                  variant={TypographyVariant.PSMALL_REGULAR}
                  text={description}
                />
              </View>
            )}
            <View style={{flexDirection: 'column', gap: getScreenHeight(1)}}>
              {multipleFields ? (
                <View style={{gap: getScreenHeight(2)}}>
                  {fields.map(field => (
                    <AnimatedTextInput
                      key={field.key}
                      label={field.label}
                      value={fieldValues[field.key] || ''}
                      onChangeText={text =>
                        handleMultiFieldChange(field.key, text)
                      }
                      keyboardType={field.keyboardType || 'default'}
                      customLabelColorFocused={ColorPalette.PURPLE_300}
                      customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
                      customBorderColor={
                        errors[field.key]
                          ? ColorPalette.RED
                          : ColorPalette.GREY_TEXT_400
                      }
                      customFocusedBorderColor={ColorPalette.PURPLE_300}
                      customBorderWidth={1}
                      customFocusedBorderWidth={2}
                      customErrorBorderWidth={2}
                      error={errors[field.key]}
                      customTextColor={ColorPalette.GREY_TEXT_500}
                      rightIcons={[
                        {
                          icon: <CloseCircleIcon style={undefined} />,
                          onPress: () => handleMultiFieldChange(field.key, ''),
                        },
                      ]}
                    />
                  ))}
                  {errors.general && (
                    <View style={{paddingHorizontal: getScreenWidth(4)}}>
                      <Typography
                        variant={TypographyVariant.PSMALL_REGULAR}
                        text={errors.general}
                        customTextStyles={{color: ColorPalette.RED}}
                      />
                    </View>
                  )}
                </View>
              ) : fieldType === 'accountType' ? (
                <View
                  style={{
                    flex: 1,
                    zIndex: activeDropdown === 'accountType' ? 3 : 1,
                    paddingHorizontal: getScreenWidth(4),
                  }}>
                  <Dropdown
                    options={ACCOUNT_TYPE_OPTIONS}
                    selectedValue={fieldValue}
                    onSelect={handleDropdownChange}
                    placeholder="Select account type"
                    showSearch={false}
                    selectionType="radio"
                    onDropdownToggle={isOpen =>
                      handleDropdownToggle('accountType', isOpen)
                    }
                  />
                  {displayError && (
                    <Typography
                      text={displayError}
                      customTextStyles={{color: ColorPalette.RED, marginTop: 5}}
                    />
                  )}
                </View>
              ) : (
                <AnimatedTextInput
                  label={label || fieldType}
                  value={fieldValue}
                  onChangeText={handleSingleFieldChange}
                  keyboardType={keyboardType}
                  customLabelColorFocused={ColorPalette.PURPLE_300}
                  customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
                  customBorderColor={
                    displayError ? ColorPalette.RED : ColorPalette.GREY_TEXT_400
                  }
                  customFocusedBorderColor={ColorPalette.PURPLE_300}
                  customBorderWidth={1}
                  customFocusedBorderWidth={2}
                  customErrorBorderWidth={2}
                  error={displayError}
                  customTextColor={ColorPalette.GREY_TEXT_500}
                  showCountrySection={showCountrySection}
                  countryCode={countryCode}
                  countryFlag={countryFlag}
                  onCountryPress={() => {}}
                  rightIcons={[
                    {
                      icon: <CloseCircleIcon style={undefined} />,
                      onPress: () => handleSingleFieldChange(''),
                    },
                  ]}
                />
              )}
              {captionText && (
                <View
                  style={{
                    paddingHorizontal: getScreenWidth(4),
                    flexDirection: 'row',
                    gap: getScreenHeight(0.75),
                    alignItems: 'center',
                  }}>
                  {renderIconOrImage()}
                  <Typography
                    variant={TypographyVariant.PSMALL_REGULAR}
                    text={captionText}
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            text={isSubmitting ? 'UPDATING...' : 'SUBMIT'}
            variant={ButtonVariant.PRIMARY}
            state={
              isSubmitDisabled() ? ButtonState.DISABLED : ButtonState.DEFAULT
            }
            size={ButtonSize.MEDIUM}
            onPress={handleSubmit}
            loading={isSubmitting}
            disabled={isSubmitDisabled()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditFieldScreen;
