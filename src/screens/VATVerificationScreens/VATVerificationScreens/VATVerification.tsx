import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {MainBanner} from '../../../components/MainComponents/MainBanner/MainBanner';
import {STATIC_TEXT} from '../../../config/staticText';
import {styles} from './VATVerification.styles';
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
  heading,
  subheading,
  termsPrefix,
  termsText,
  privacyText,
  connector,
  verifyButton,
} = STATIC_TEXT.screens.vatVerify;

const VATVerification = () => {
  const [vatNumber, setVatNumber] = useState('');

  const handleTermsPress = () => {
    console.log('Navigate to Terms of Use');
  };

  const handlePrivacyPress = () => {
    console.log('Navigate to Privacy Policy');
  };

  const handleSuccessNavigate = () => {
    navigate('VATSuccess');
  };

  const renderBanner = () => (
    <MainBanner
      surfTitle={surfTitle}
      customStyles={{
        container: styles.bannerContainer,
      }}
    />
  );

  const renderVATInput = () => (
    <View style={styles.contentWrapper}>
      <View style={styles.subCaptionContainer}>
        <Typography
          text={heading}
          variant={TypographyVariant.HEADING_SMALL}
          customTextStyles={styles.heading}
        />
        <View>
          <Typography
            text={subheading}
            variant={TypographyVariant.BODY_SMALL}
            customTextStyles={styles.subheading}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <AnimatedTextInput
          label="VAT Number"
          value={vatNumber}
          onChangeText={setVatNumber}
          keyboardType="default"
          customInputStyles={styles.inputMain}
          customLabelColorFocused={ColorPalette.TextPrimary}
          customLabelColorUnfocused={ColorPalette.TextUnfocus}
        />
      </View>
    </View>
  );

  const renderTerms = () => (
    <View style={styles.termsContainer}>
      <Typography
        text={termsPrefix}
        variant={TypographyVariant.BODY_XXSMALL}
        customTextStyles={styles.caption}
      />
      <TextButton
        text={termsText}
        onPress={handleTermsPress}
        variant={TypographyVariant.BODY_XXSMALL}
        customTextStyles={{
          ...styles.linkText,
          fontFamily: Fonts.POPPINS_REGULAR,
          color: ColorPalette.ButtonPrimary,
        }}
      />
      <Typography
        text={connector}
        variant={TypographyVariant.BODY_XXSMALL}
        customTextStyles={styles.caption}
      />
      <TextButton
        text={privacyText}
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
    <View style={styles.mainContainerTwo}>
      <Button
        text={verifyButton}
        onPress={handleSuccessNavigate}
        variant={ButtonVariant.PRIMARY}
        customTextStyles={{
          fontVariant: TypographyVariant.BODY_SMALL_LINE,
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={[globalStyles.secondaryContainer, styles.container]}>
      {renderBanner()}
      <View style={styles.containerTwo}>
        {renderVATInput()}
        {renderTerms()}
        {renderActionButtons()}
      </View>
    </SafeAreaView>
  );
};

export default VATVerification;
