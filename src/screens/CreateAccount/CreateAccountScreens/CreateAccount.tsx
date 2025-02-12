import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {MainBanner} from '../../../components/MainComponents/MainBanner/MainBanner';
import {STATIC_TEXT} from '../../../config/staticText';
import {styles} from './CreateAccount.styles';
import {globalStyles} from '../../../config/globalStyles';
import AnimatedTextInput from '../../../components/UserComponents/TextInput/TextInput';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {TextButton} from '../../../components/UserComponents/TextButton/TextButton';
import {ColorPalette} from '../../../config/colorPalette';
import {Button} from '../../../components/UserComponents/Button/Button';
import {ButtonVariant} from '../../../components/UserComponents/Button/Button.types';
import {Fonts} from '../../../config/fonts';
import {navigate} from '../../../navigation/utils/navigationRef';

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

  // Component Sections
  const renderBanner = () => (
    <MainBanner
      surfTitle={surfTitle}
      customStyles={{
        container: styles.bannerContainer,
      }}
    />
  );

  const renderPhoneInput = () => (
    <View style={styles.contentWrapper}>
      <View style={styles.subCaptionContainer}>
        <Typography
          text="Create your seller account"
          variant={TypographyVariant.HEADING_SMALL}
          customTextStyles={styles.heading}
        />
        <View>
          <Typography
            text="Please provide below details to help us with your"
            variant={TypographyVariant.BODY_SMALL}
            customTextStyles={styles.subheading}
          />
          <Typography
            text="onboarding."
            variant={TypographyVariant.BODY_SMALL}
            customTextStyles={styles.subheading}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <AnimatedTextInput
          label="Seller Name"
          value={sellerName}
          onChangeText={setSellerName}
          keyboardType="default"
          customLabelColorFocused={ColorPalette.TextPrimary}
          customLabelColorUnfocused={ColorPalette.TextUnfocus}
        />
        <AnimatedTextInput
          label="Business Name"
          value={businessName}
          onChangeText={setBusinessName}
          keyboardType="default"
          customLabelColorFocused={ColorPalette.TextPrimary}
          customLabelColorUnfocused={ColorPalette.TextUnfocus}
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
          customLabelColorFocused={ColorPalette.TextPrimary}
          customLabelColorUnfocused={ColorPalette.TextUnfocus}
        />
      </View>
    </View>
  );

  const renderTerms = () => (
    <View style={styles.termsContainer}>
      <Typography
        text="By continuing you agree to the Surf's "
        variant={TypographyVariant.BODY_XXSMALL}
        customTextStyles={styles.caption}
      />
      <TextButton
        text="Terms of Use"
        onPress={handleTermsPress}
        variant={TypographyVariant.BODY_XXSMALL}
        customTextStyles={{
          ...styles.linkText,
          fontFamily: Fonts.POPPINS_REGULAR,
          color: ColorPalette.ButtonPrimary,
        }}
      />
      <Typography
        text=" and "
        variant={TypographyVariant.BODY_XXSMALL}
        customTextStyles={styles.caption}
      />
      <TextButton
        text="Privacy Policy"
        onPress={handlePrivacyPress}
        variant={TypographyVariant.BODY_XXSMALL}
        customTextStyles={{
          ...styles.linkText,
          fontFamily: Fonts.POPPINS_REGULAR,
          color: ColorPalette.ButtonPrimary,
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
        />
      </View>
      <View style={styles.termsContainerTwo}>
        <Typography
          text="Already have an account? "
          variant={TypographyVariant.BODY_SMALL}
          customTextStyles={styles.captionTwo}
        />
        <TextButton
          text="Login"
          onPress={handleCreateAccount}
          variant={TypographyVariant.BODY_SMALL_LINE}
          underline
          customTextStyles={{
            color: ColorPalette.ButtonPrimary,
            fontFamily: Fonts.POPPINS_BOLD,
          }}
        />
      </View>
    </>
  );

  return (
    <SafeAreaView style={[globalStyles.secondaryContainer, styles.container]}>
      {renderBanner()}
      <View style={styles.containerTwo}>
        {renderPhoneInput()}
        {renderTerms()}
        {renderActionButtons()}
      </View>
    </SafeAreaView>
  );
};

export default CreateAccount;
