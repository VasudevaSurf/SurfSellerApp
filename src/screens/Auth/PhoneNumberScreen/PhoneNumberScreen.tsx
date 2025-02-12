import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {MainBanner} from '../../../components/MainComponents/MainBanner/MainBanner';
import {STATIC_TEXT} from '../../../config/staticText';
import {styles} from './PhoneNumberScreen.styles';
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
const {
  loginText,
  whatsapp,
  termsText,
  termsText2,
  and,
  privacyPolicy,
  getOtp,
  dontAccount,
  createOne,
} = STATIC_TEXT.screens.phoneNumberScreen;

const INITIAL_COUNTRY_CODE = '+356';
const MALTA_FLAG_URL =
  'https://cdn.countryflags.com/thumbs/malta/flag-round-250.png';

const PhoneNumberScreen = () => {
  // State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(INITIAL_COUNTRY_CODE);

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
        flow: 'login',
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
      <Typography
        text={loginText}
        variant={TypographyVariant.HEADING_SMALL}
        customTextStyles={styles.heading}
      />
      <AnimatedTextInput
        label={whatsapp}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        showCountrySection
        countryCode={countryCode}
        countryFlag={MALTA_FLAG_URL}
        onCountryPress={handleCountryPress}
        customLabelColorFocused={ColorPalette.TextPrimary}
        customLabelColorUnfocused={ColorPalette.TextUnfocus}
        autoFocus
      />
    </View>
  );

  const renderTerms = () => (
    <View style={styles.termsContainer}>
      <Typography
        text={termsText}
        variant={TypographyVariant.BODY_XXSMALL}
        customTextStyles={styles.caption}
      />
      <TextButton
        text={termsText2}
        onPress={handleTermsPress}
        variant={TypographyVariant.BODY_XXSMALL}
        customTextStyles={{
          ...styles.linkText,
          fontFamily: Fonts.POPPINS_REGULAR,
          color: ColorPalette.ButtonPrimary,
        }}
      />
      <Typography
        text={and}
        variant={TypographyVariant.BODY_XXSMALL}
        customTextStyles={styles.caption}
      />
      <TextButton
        text={privacyPolicy}
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
          text={getOtp}
          onPress={handleGetOtp}
          variant={ButtonVariant.PRIMARY}
        />
      </View>
      <View style={styles.termsContainerTwo}>
        <Typography
          text={dontAccount}
          variant={TypographyVariant.BODY_SMALL}
          customTextStyles={styles.captionTwo}
        />
        <TextButton
          text={createOne}
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
      <View>
        <View style={styles.twoContainer}>
          {renderPhoneInput()}
          {renderTerms()}
        </View>
        {renderActionButtons()}
      </View>
    </SafeAreaView>
  );
};

export default PhoneNumberScreen;
