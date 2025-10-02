import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
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
import {getScreenHeight} from '../../../../../helpers/screenSize';
import CloseCircleIcon from '../../../../../assets/icons/CloseCircleIcon';
import {styles} from './EditAdministrator.styles';
import LockIcon from '../../../../../assets/icons/LockIcon';
import {SlidingBar} from '../../../../../components/MainComponents/SlidingBar/SlidingBar';
import {SlidingBarOption} from '../../../../../components/MainComponents/SlidingBar/SlidingBar.types';

const INITIAL_COUNTRY_CODE = '+356';
const MALTA_FLAG_URL =
  'https://cdn.countryflags.com/thumbs/malta/flag-round-250.png';

const InfoIcon = () => (
  <Typography
    text="ⓘ"
    variant={TypographyVariant.PMEDIUM_REGULAR}
    customTextStyles={{color: ColorPalette.GREY_TEXT_400, fontSize: 20}}
  />
);

// Role options
const roleOptions: SlidingBarOption[] = [
  {id: 'admin', label: 'Admin'},
  {id: 'guest', label: 'Guest'},
  {id: 'owner', label: 'Owner'},
];

// Permission options
const permissionOptions = [
  {id: 'viewDashboard', label: 'View Dashboard'},
  {id: 'manageInventory', label: 'Manage Inventory'},
  {id: 'editStoreSettings', label: 'Edit Store Settings'},
  {id: 'accessPayoutReports', label: 'Access Payout Reports'},
  {id: 'addEditDiscounts', label: 'Add/Edit Discounts'},
  {id: 'addRemoveUsers', label: 'Add/Remove Users'},
];

const AddAdministrator = () => {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [cityName, setCityName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Malta');

  // Role and Permissions state
  const [selectedRole, setSelectedRole] = useState<SlidingBarOption>(
    roleOptions[0],
  );
  const [permissions, setPermissions] = useState<{[key: string]: boolean}>({
    viewDashboard: true,
    manageInventory: true,
    editStoreSettings: true,
    accessPayoutReports: false,
    addEditDiscounts: true,
    addRemoveUsers: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePermission = (permissionId: string) => {
    setPermissions(prev => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }));
  };

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
          originScreen: 'AddAdministrator',
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
          originScreen: 'AddAdministrator',
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
          originScreen: 'AddAdministrator',
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
          originScreen: 'AddAdministrator',
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
          originScreen: 'AddAdministrator',
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
          originScreen: 'AddAdministrator',
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
          originScreen: 'AddAdministrator',
        },
      },
    });
  };

  const handleSubmit = () => {
    // Simple validation
    if (!email || !password || !confirmPassword || !fullName) {
      Alert.alert(
        'Required Fields',
        'Please fill in all required fields (Email, Password, Confirm Password, and Full Name).',
        [{text: 'OK'}],
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Password Mismatch',
        'Password and Confirm Password do not match.',
        [{text: 'OK'}],
      );
      return;
    }

    // Show success message and navigate back
    Alert.alert(
      'Success',
      `Administrator details saved successfully!\nRole: ${
        selectedRole.label
      }\nPermissions: ${
        Object.keys(permissions).filter(k => permissions[k]).length
      } enabled`,
      [
        {
          text: 'OK',
          onPress: () => {
            goBack();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name="Add Administrator"
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
              value={password}
              onChangeText={setPassword}
              keyboardType="default"
              type="password"
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
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              keyboardType="default"
              type="password"
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

        {/* Role Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography
              text="Role"
              variant={TypographyVariant.LMEDIUM_EXTRABOLD}
              customTextStyles={styles.sectionTitle}
            />
            {/* <TouchableOpacity>
              <InfoIcon />
            </TouchableOpacity> */}
          </View>

          <View style={styles.roleContainer}>
            <SlidingBar
              options={roleOptions}
              selectedOption={selectedRole}
              onOptionSelect={setSelectedRole}
              customContainerStyle={styles.slidingBarContainer}
            />
          </View>
        </View>

        {/* Permissions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography
              text="Permissions"
              variant={TypographyVariant.LMEDIUM_EXTRABOLD}
              customTextStyles={styles.sectionTitle}
            />
            {/* <TouchableOpacity>
              <InfoIcon />
            </TouchableOpacity> */}
          </View>

          <View style={styles.permissionsContainer}>
            {permissionOptions.map(permission => (
              <TouchableOpacity
                key={permission.id}
                style={styles.permissionItem}
                onPress={() => togglePermission(permission.id)}
                activeOpacity={0.7}>
                <View
                  style={[
                    styles.checkbox,
                    permissions[permission.id] && styles.checkboxChecked,
                  ]}>
                  {permissions[permission.id] && (
                    <Typography
                      text="✓"
                      variant={TypographyVariant.LMEDIUM_BOLD}
                      customTextStyles={styles.checkmark}
                    />
                  )}
                </View>
                <Typography
                  text={permission.label}
                  variant={TypographyVariant.LMEDIUM_REGULAR}
                  customTextStyles={styles.permissionLabel}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <Button
          text={isSubmitting ? 'ADDING...' : 'ADD ADMINISTRATOR'}
          variant={ButtonVariant.PRIMARY}
          state={ButtonState.DEFAULT}
          size={ButtonSize.MEDIUM}
          onPress={handleSubmit}
          loading={isSubmitting}
          textVariant={TypographyVariant.H6_BOLD}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddAdministrator;
