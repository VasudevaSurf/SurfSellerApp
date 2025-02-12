import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {STATIC_TEXT} from '../../../config/staticText';
import {styles} from './OTPVerificationScreen.styles';
import {globalStyles} from '../../../config/globalStyles';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {TextButton} from '../../../components/UserComponents/TextButton/TextButton';
import {ColorPalette} from '../../../config/colorPalette';
import {Button} from '../../../components/UserComponents/Button/Button';
import {
  ButtonVariant,
  IconPosition,
} from '../../../components/UserComponents/Button/Button.types';
import {Fonts} from '../../../config/fonts';
import {goBack, navigate} from '../../../navigation/utils/navigationRef';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeft';
import FlowBite from '../../../assets/icons/FlowBite';
import {OtpInput} from '../../../components/UserComponents/OtpInput/OtpInput';

const {promptTitle, otpSent, resendText, verifyText} =
  STATIC_TEXT.screens.otpScreen;

const OTP_LENGTH = 4;

const OTPVerificationScreen = ({route}) => {
  // Get navigation params
  const {phoneNumber, flow = 'login'} = route.params;

  const [otp, setOtp] = useState('');

  // Event Handlers
  const handleOtpChange = (text: string) => setOtp(text);

  const handleOtpComplete = (text: string) => {
    console.log('OTP Completed:', text);
  };

  const handleResendOtp = () => {
    console.log('Resend OTP');
  };

  const handleNavigate = () => {
    // Navigate based on the flow
    if (flow === 'create') {
      navigate('CreateSuccess');
    } else {
      navigate('AuthSuccess');
    }
  };

  const renderHeader = () => (
    <View style={styles.bannerContainer}>
      <Button
        onPress={goBack}
        IconComponent={ArrowLeftIcon}
        iconOnly={true}
        iconProps={{
          size: 20,
          color: '#4A4A4A',
          strokeWidth: 2,
        }}
      />
    </View>
  );

  const renderTitle = () => (
    <View style={styles.contentWrapper}>
      <Typography
        text={promptTitle}
        variant={TypographyVariant.HEADING_SMALL}
        customTextStyles={styles.heading}
      />
      <View style={styles.containerTwo}>
        <View style={styles.subContainer}>
          <Typography
            text={otpSent}
            variant={TypographyVariant.BODY_SMALL}
            customTextStyles={styles.subCaption}
          />
          <Typography
            text={phoneNumber}
            variant={TypographyVariant.BODY_SMALL_HIGH}
            customTextStyles={styles.subCaptionTwo}
          />
        </View>
        <View style={styles.iconContainer}>
          <Button
            onPress={() => {}}
            IconComponent={FlowBite}
            iconOnly={true}
            iconProps={{
              size: 20,
              color: ColorPalette.BorderPrimary,
              strokeWidth: 2,
            }}
          />
        </View>
      </View>
    </View>
  );

  const renderOtpInput = () => (
    <View style={styles.mainTwoContainer}>
      <View style={styles.otpContainer}>
        <OtpInput
          numberOfDigits={OTP_LENGTH}
          onTextChange={handleOtpChange}
          onFilled={handleOtpComplete}
          autoFocus
          focusColor={ColorPalette.ButtonPrimary}
          theme={{
            containerStyle: styles.otpInputContainer,
            pinCodeContainerStyle: styles.otpBox,
            focusedPinCodeContainerStyle: styles.otpBoxFocused,
            filledPinCodeContainerStyle: styles.otpBoxFilled,
          }}
        />
      </View>
      <View style={styles.termsContainer}>
        <TextButton
          text={resendText}
          onPress={handleResendOtp}
          variant={TypographyVariant.BODY_SMALL}
          customTextStyles={{
            ...styles.linkText,
            fontFamily: Fonts.POPPINS_REGULAR,
            color: ColorPalette.ButtonPrimary,
          }}
          underline
        />
      </View>
    </View>
  );

  const renderVerifyButton = () => (
    <View style={styles.mainContainerTwo}>
      <Button
        text={verifyText}
        onPress={handleNavigate}
        variant={ButtonVariant.PRIMARY}
      />
    </View>
  );

  return (
    <SafeAreaView style={[globalStyles.secondaryContainer, styles.container]}>
      {renderHeader()}
      <View>
        {renderTitle()}
        {renderOtpInput()}
        {renderVerifyButton()}
      </View>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;
