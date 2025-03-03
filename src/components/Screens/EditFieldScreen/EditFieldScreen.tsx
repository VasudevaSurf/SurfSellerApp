import React, {useCallback, useState} from 'react';
import {Image, SafeAreaView, ScrollView, View} from 'react-native';
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
import {styles} from './EditFieldScreen.styles';
import {
  EditFieldParams,
  ErrorValues,
  FieldValues,
} from './EditFieldScreen.types';

type ValidationFunction = (value: string) => string | true;

interface UpdatedEditFieldScreenProps {
  route: {
    params: EditFieldParams;
  };
  navigation: any;
}

const submitFormAction = (actionType: string, values: any) => {
  switch (actionType) {
    case 'updateName':
    case 'updateBusinessName':
    case 'updateVATNumber':
    case 'updateStreetName':
    case 'updateCityName':
    case 'updatePostalCode':
    case 'updateCountry':
    case 'updateEmail':
    case 'updatePhone':
    case 'updateAccountName':
    case 'updateAccountNumber':
    case 'updateBicCode':
      break;
    default:
      console.warn(`Unhandled action type: ${actionType}`);
  }
  return true;
};

const EditFieldScreen: React.FC<UpdatedEditFieldScreenProps> = ({
  route,
  navigation,
}) => {
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
            if (!value.trim()) return 'Last name cannot be empty';
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
            const phoneRegex = /^\d[\d\s]{7,14}$/;
            if (!value.trim()) return 'Phone number cannot be empty';
            if (!phoneRegex.test(value))
              return 'Please enter a valid phone number';
            return true;
          };
        case 'businessName':
          return value => {
            if (!value.trim()) return 'Business name cannot be empty';
            return true;
          };
        case 'vatNumber':
          return value => {
            if (!value.trim()) return 'VAT number cannot be empty';
            return true;
          };
        case 'streetName':
          return value => {
            if (!value.trim()) return 'Street address cannot be empty';
            return true;
          };
        case 'cityName':
          return value => {
            if (!value.trim()) return 'City cannot be empty';
            return true;
          };
        case 'postalCode':
          return value => {
            if (!value.trim()) return 'Postal code cannot be empty';
            return true;
          };
        case 'country':
          return value => {
            if (!value.trim()) return 'Country cannot be empty';
            return true;
          };
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

  const navigateBack = (updatedData: any) => {
    navigation.goBack();

    // Determine where to navigate based on originScreen
    if (originScreen === 'CompanyProfile') {
      navigation.navigate('CompanyProfile', updatedData);
    } else if (originScreen === 'BankDetails') {
      // Add this condition
      navigation.navigate('BankDetails', updatedData);
    } else if (fieldType === 'email') {
      navigation.navigate('Dashboard', {
        screen: 'Account',
        params: {
          screen: 'PersonalInfo',
          params: updatedData,
        },
      });
    } else {
      navigation.navigate('PersonalInfo', updatedData);
    }
  };

  const handleSubmit = (): void => {
    if (multipleFields) {
      let hasErrors = false;
      const newErrors: ErrorValues = {};

      fields.forEach(field => {
        const validationFn = getValidationForType(field.validationType);
        const validationResult = validationFn(fieldValues[field.key]);

        if (validationResult !== true) {
          newErrors[field.key] = validationResult;
          hasErrors = true;
        }
      });

      if (hasErrors) {
        setErrors(newErrors);
        return;
      }

      submitFormAction(onSubmitActionType, fieldValues);

      if (originScreen === 'CompanyProfile') {
        // For CompanyProfile, we may still need name combinations in some cases
        if (fieldValues.firstName && fieldValues.lastName) {
          const fullName = `${fieldValues.firstName} ${fieldValues.lastName}`;
          navigateBack({updatedName: fullName});
        } else {
          navigateBack(fieldValues);
        }
      } else {
        // Default PersonalInfo handling
        const fullName = `${fieldValues.firstName} ${fieldValues.lastName}`;
        navigateBack({updatedName: fullName});
      }
    } else {
      const validationFn = getValidationForType(validationType || fieldType);
      const validationResult = validationFn(fieldValue);

      if (validationResult !== true) {
        setError(validationResult);
        return;
      }

      submitFormAction(onSubmitActionType, fieldValue);

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
        let updatedData = {};
        switch (fieldType) {
          case 'businessName':
            updatedData = {updatedName: fieldValue};
            break;
          case 'vatNumber':
            updatedData = {updatedVat: fieldValue};
            break;
          case 'streetName':
            updatedData = {updatedStreet: fieldValue};
            break;
          case 'cityName':
            updatedData = {updatedCity: fieldValue};
            break;
          case 'postalCode':
            updatedData = {updatedPostal: fieldValue};
            break;
          case 'country':
            updatedData = {updatedCountry: fieldValue};
            break;
          case 'email':
            updatedData = {updatedEmail: fieldValue};
            break;
          case 'accountName':
            updatedData = {updatedAccountName: fieldValue};
            break;
          case 'accountNumber':
            updatedData = {updatedAccountNumber: fieldValue};
            break;
          case 'bicCode':
            updatedData = {updatedBicCode: fieldValue};
            break;
          default:
            updatedData = {updatedName: fieldValue};
        }
        navigateBack(updatedData);
      }
    }
  };

  const isSubmitDisabled = (): boolean => {
    if (multipleFields) {
      return fields.some(
        field =>
          field.required &&
          (!fieldValues[field.key] || fieldValues[field.key].trim() === ''),
      );
    }
    return fieldValue.trim() === '';
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name={headerTitle || `Update your ${fieldType}`}
        variant={TypographyVariant.LMEDIUM_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={
          <ArrowLeftIcon style={undefined} size={15} onPress={goBack} />
        }
        rightIcons={null}
      />
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingTop: getScreenHeight(2)},
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
                      customLabelColorFocused={ColorPalette.GREY_TEXT_400}
                      customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
                      customBorderColor={
                        errors[field.key]
                          ? ColorPalette.RED
                          : ColorPalette.GREY_TEXT_400
                      }
                      customBorderWidth={1}
                      customFocusedBorderWidth={2}
                      customErrorBorderWidth={2}
                      error={errors[field.key]}
                      rightIcons={[
                        {
                          icon: <CloseCircleIcon style={undefined} />,
                          onPress: () => handleMultiFieldChange(field.key, ''),
                        },
                      ]}
                    />
                  ))}
                </View>
              ) : (
                <AnimatedTextInput
                  label={label || fieldType}
                  value={fieldValue}
                  onChangeText={handleSingleFieldChange}
                  keyboardType={keyboardType}
                  customLabelColorFocused={ColorPalette.GREY_TEXT_400}
                  customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
                  customBorderColor={
                    error ? ColorPalette.RED : ColorPalette.GREY_TEXT_400
                  }
                  customBorderWidth={1}
                  customFocusedBorderWidth={2}
                  customErrorBorderWidth={2}
                  error={error}
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
            text="SUBMIT"
            variant={ButtonVariant.PRIMARY}
            state={
              isSubmitDisabled() ? ButtonState.DISABLED : ButtonState.DEFAULT
            }
            size={ButtonSize.MEDIUM}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditFieldScreen;
