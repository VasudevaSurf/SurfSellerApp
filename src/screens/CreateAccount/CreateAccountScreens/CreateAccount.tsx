import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {MainBanner} from '../../../components/MainComponents/MainBanner/MainBanner';
import {Button} from '../../../components/UserComponents/Button/Button';
import {
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../../components/UserComponents/Button/Button.types';
import {TextButton} from '../../../components/UserComponents/TextButton/TextButton';
import AnimatedTextInput from '../../../components/UserComponents/TextInput/TextInput';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {Fonts} from '../../../config/fonts';
import {globalStyles} from '../../../config/globalStyles';
import {STATIC_TEXT} from '../../../config/staticText';
import {navigate} from '../../../navigation/utils/navigationRef';
import {styles} from './CreateAccount.styles';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';

const {surfTitle} = STATIC_TEXT.screens.onboarding;

const INITIAL_COUNTRY_CODE = '+356';
const MALTA_FLAG_URL =
  'https://cdn.countryflags.com/thumbs/malta/flag-round-250.png';

const CreateAccount = () => {
  // State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(INITIAL_COUNTRY_CODE);
  const [sellerName, setSellerName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [buttonState, setButtonState] = useState(ButtonState.DISABLED);

  useEffect(() => {
    if (phoneNumber && sellerName && businessName) {
      setButtonState(ButtonState.DEFAULT);
    } else {
      setButtonState(ButtonState.DISABLED);
    }
  }, [phoneNumber, sellerName, businessName]);

  // Event Handlers
  const handleCountryPress = () => {
    console.log('Open country picker');
  };

  const handleTermsPress = () => {
    console.log('Navigate to Terms of Use');
  };

  const handlePrivacyPress = () => {
    console.log('Navigate to Privacy Policy');
  };

  const handleCreateAccount = () => {
    console.log('Navigate to Learn More');
  };

  const handleGetOtp = () => {
    if (phoneNumber) {
      navigate('OTPVerification', {
        phoneNumber: `${countryCode}${phoneNumber}`,
        flow: 'create',
      });
    }
  };

  const renderBanner = () => (
    <MainBanner
      surfTitle={surfTitle}
      customStyles={{
        container: styles.bannerContainer,
      }}
    />
  );

  const renderHeading = () => (
    <View style={styles.subCaptionContainer}>
      <Typography
        text="Create your seller account"
        variant={TypographyVariant.H5_BOLD}
        customTextStyles={styles.heading}
      />
      <View>
        <Typography
          text="Please provide below details to help us with your onboarding"
          variant={TypographyVariant.PXSMALL_REGULAR}
          customTextStyles={styles.subheading}
        />
      </View>
    </View>
  );

  const renderPhoneInput = () => (
    <View style={styles.inputContainer}>
      <AnimatedTextInput
        label="Seller Name"
        value={sellerName}
        onChangeText={setSellerName}
        keyboardType="default"
        customLabelColorFocused={ColorPalette.GREY_TEXT_400}
        customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
      />
      <AnimatedTextInput
        label="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
        keyboardType="default"
        customLabelColorFocused={ColorPalette.GREY_TEXT_400}
        customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
      />
      <AnimatedTextInput
        label="Whatsapp Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        showCountrySection
        countryCode={countryCode}
        countryFlag={MALTA_FLAG_URL}
        onCountryPress={handleCountryPress}
        customLabelColorFocused={ColorPalette.GREY_TEXT_400}
        customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
      />
    </View>
  );

  const renderTerms = () => (
    <View style={styles.termsContainer}>
      <Typography
        text="By continuing you agree to the Surf's "
        variant={TypographyVariant.LXSMALL_REGULAR}
        customTextStyles={styles.caption}
      />
      <TextButton
        text="Terms of Use"
        onPress={handleTermsPress}
        variant={TypographyVariant.LXSMALL_REGULAR}
        customTextStyles={{
          ...styles.linkText,
          fontFamily: Fonts.POPPINS_REGULAR,
          color: ColorPalette.PURPLE_300,
        }}
      />
      <Typography
        text=" and "
        variant={TypographyVariant.LXSMALL_REGULAR}
        customTextStyles={styles.caption}
      />
      <TextButton
        text="Privacy Policy."
        onPress={handlePrivacyPress}
        variant={TypographyVariant.LXSMALL_REGULAR}
        customTextStyles={{
          ...styles.linkText,
          fontFamily: Fonts.POPPINS_REGULAR,
          color: ColorPalette.PURPLE_300,
        }}
      />
    </View>
  );

  const renderActionButtons = () => (
    <>
      <View style={styles.mainContainerTwo}>
        <Button
          text="GET OTP"
          onPress={handleGetOtp}
          variant={ButtonVariant.PRIMARY}
          state={buttonState}
          size={ButtonSize.MEDIUM}
          withShadow
        />
      </View>
    </>
  );

  const renderLogin = () => (
    <View style={styles.termsContainerTwo}>
      <Typography
        text="Already have an account? "
        variant={TypographyVariant.LMEDIUM_REGULAR}
        customTextStyles={styles.captionTwo}
      />
      <TextButton
        text="Login"
        onPress={handleCreateAccount}
        variant={TypographyVariant.PMEDIUM_SEMIBOLD}
        underline
        customTextStyles={{
          color: ColorPalette.PURPLE_300,
          fontFamily: Fonts.POPPINS_BOLD,
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={[globalStyles.secondaryContainer, styles.container]}>
      {renderBanner()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.containerTwo}>
          {renderHeading()}
          <View style={{gap: getScreenWidth(4)}}>
            {renderPhoneInput()}
            {renderTerms()}
          </View>
          {renderActionButtons()}
          {renderLogin()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccount;
