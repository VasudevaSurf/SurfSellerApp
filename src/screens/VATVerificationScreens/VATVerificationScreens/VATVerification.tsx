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
import {globalStyles} from '../../../config/globalStyles';
import {STATIC_TEXT} from '../../../config/staticText';
import {navigate} from '../../../navigation/utils/navigationRef';
import {styles} from './VATVerification.styles';

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
  const [buttonState, setButtonState] = useState(ButtonState.DISABLED);

  useEffect(() => {
    if (vatNumber.trim() !== '') {
      setButtonState(ButtonState.DEFAULT);
    } else {
      setButtonState(ButtonState.DISABLED);
    }
  }, [vatNumber]);

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
          variant={TypographyVariant.H6_BOLD}
          customTextStyles={styles.heading}
        />
        <View>
          <Typography
            text={subheading}
            variant={TypographyVariant.PXSMALL_REGULAR}
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
        variant={TypographyVariant.LXSMALL_REGULAR}
        customTextStyles={styles.caption}
      />
      <TextButton
        text={termsText}
        onPress={handleTermsPress}
        variant={TypographyVariant.LXSMALL_REGULAR}
        customTextStyles={{
          ...styles.linkText,
          color: ColorPalette.PURPLE_300,
        }}
      />
      <Typography
        text={connector}
        variant={TypographyVariant.LXSMALL_REGULAR}
        customTextStyles={styles.caption}
      />
      <TextButton
        text={privacyText}
        onPress={handlePrivacyPress}
        variant={TypographyVariant.LXSMALL_REGULAR}
        customTextStyles={{
          ...styles.linkText,
          color: ColorPalette.PURPLE_300,
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
        state={buttonState}
        size={ButtonSize.MEDIUM}
        withShadow
      />
    </View>
  );

  return (
    <SafeAreaView style={[globalStyles.secondaryContainer, styles.container]}>
      {renderBanner()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        bounces={false}>
        <View style={styles.containerTwo}>
          {renderVATInput()}
          {renderTerms()}
          {renderActionButtons()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VATVerification;
