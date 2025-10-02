import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Header} from '../../../../../components/UserComponents/Header/Header';
import {TypographyVariant} from '../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../config/colorPalette';
import {goBack} from '../../../../../navigation/utils/navigationRef';
import {styles} from './EditAdministrator.styles';
import ArrowLeft from '../../../../../assets/icons/ArrowLeft';
import AnimatedTextInput from '../../../../../components/UserComponents/TextInput/TextInput';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../components/UserComponents/Button';
import {Typography} from '../../../../../components/UserComponents/Typography/Typography';
import {getScreenHeight} from '../../../../../helpers/screenSize';
import {Administrator} from '../../../../../components/MainComponents/AdministratorCard/AdministratorCard';
import {TrashIcon2} from '../../../../../assets/icons/NewProductIcons/TrashIcon2';
import CloseCircleIcon from '../../../../../assets/icons/CloseCircleIcon';

const INITIAL_COUNTRY_CODE = '+356';
const MALTA_FLAG_URL =
  'https://cdn.countryflags.com/thumbs/malta/flag-round-250.png';

const EditAdministrator = () => {
  const route = useRoute();
  const {administrator} = route.params as {administrator: Administrator | null};
  const isEditMode = !!administrator;

  // Form state
  const [email, setEmail] = useState(administrator?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState(
    administrator?.fullName?.split(' ')[0] || '',
  );
  const [lastName, setLastName] = useState(
    administrator?.fullName?.split(' ')[1] || '',
  );
  const [phoneNumber, setPhoneNumber] = useState(
    administrator?.phone?.replace('+356 ', '') || '',
  );
  const [streetName, setStreetName] = useState('Triq San Pawl');
  const [cityName, setCityName] = useState('City');
  const [postalCode, setPostalCode] = useState('CLT 1210');

  // Error states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSubmit = () => {
    // Validate form
    let hasErrors = false;

    if (!email.trim()) {
      setEmailError('Email is required');
      hasErrors = true;
    }

    if (!isEditMode && !password.trim()) {
      setPasswordError('Password is required');
      hasErrors = true;
    }

    if (!isEditMode && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    // Submit logic here
    console.log('Submitting administrator:', {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      streetName,
      cityName,
      postalCode,
    });

    goBack();
  };

  const handleDelete = () => {
    // Show confirmation modal
    console.log('Delete administrator:', administrator?.id);
  };

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
              rightIcons={[
                {
                  icon: <CloseCircleIcon style={undefined} />,
                  onPress: () => setEmail(''),
                },
              ]}
            />

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
              onChangeText={setFirstName}
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
                  onPress: () => setFirstName(''),
                },
              ]}
            />

            <AnimatedTextInput
              label="Last name"
              value={lastName}
              onChangeText={setLastName}
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
                  onPress: () => setLastName(''),
                },
              ]}
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
                    text="Malta"
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

        {/* Delete Button (only in edit mode) */}
        {isEditMode && (
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
          text="SAVE"
          variant={ButtonVariant.PRIMARY}
          state={ButtonState.DEFAULT}
          size={ButtonSize.LARGE}
          onPress={handleSubmit}
          textVariant={TypographyVariant.H6_BOLD}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditAdministrator;
