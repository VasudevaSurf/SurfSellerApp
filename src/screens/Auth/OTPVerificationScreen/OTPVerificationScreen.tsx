import React, {useState, useEffect} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {STATIC_TEXT} from '../../../config/staticText';
import {styles} from './OTPVerificationScreen.styles';
import {globalStyles} from '../../../config/globalStyles';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {TextButton} from '../../../components/UserComponents/TextButton/TextButton';
import {ColorPalette} from '../../../config/colorPalette';
import {Button} from '../../../components/UserComponents/Button/Button';
import {
  ButtonSize,
  ButtonState,
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
  const [buttonState, setButtonState] = useState(ButtonState.DISABLED);

  // Effect to update button state based on OTP length
  useEffect(() => {
    if (otp.length === OTP_LENGTH) {
      setButtonState(ButtonState.DEFAULT);
    } else {
      setButtonState(ButtonState.DISABLED);
    }
  }, [otp]);

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
    <TouchableOpacity onPress={goBack} style={styles.bannerContainer}>
      <ArrowLeftIcon
        size={20}
        color={ColorPalette.GREY_TEXT_400}
        strokeWidth={2}
      />
    </TouchableOpacity>
  );

  const renderTitle = () => (
    <View style={styles.contentWrapper}>
      <Typography
        text={promptTitle}
        variant={TypographyVariant.H5_BOLD}
        customTextStyles={styles.heading}
      />
      <View style={styles.containerTwo}>
        <View style={styles.subContainer}>
          <Typography
            text={otpSent}
            variant={TypographyVariant.PSMALL_REGULAR}
            customTextStyles={styles.subCaption}
          />
          <Typography
            text={phoneNumber}
            variant={TypographyVariant.PSMALL_MEDIUM}
            customTextStyles={styles.subCaptionTwo}
          />
        </View>
        <TouchableOpacity style={styles.iconContainer}>
          <FlowBite
            size={20}
            color={ColorPalette.GREY_TEXT_400}
            strokeWidth={2}
          />
        </TouchableOpacity>
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
          variant={TypographyVariant.PSMALL_MEDIUM}
          customTextStyles={{
            ...styles.linkText,
            fontFamily: Fonts.POPPINS_REGULAR,
            color: ColorPalette.PURPLE_300,
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
        state={buttonState}
        size={ButtonSize.MEDIUM}
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
