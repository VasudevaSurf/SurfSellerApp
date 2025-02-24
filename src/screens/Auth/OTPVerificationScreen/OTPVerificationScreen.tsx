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
} from '../../../components/UserComponents/Button/Button.types';
import {Fonts} from '../../../config/fonts';
import {goBack} from '../../../navigation/utils/navigationRef';
import ArrowLeftIcon from '../../../assets/icons/ArrowLeft';
import FlowBite from '../../../assets/icons/FlowBite';
import {OtpInput} from '../../../components/UserComponents/OtpInput/OtpInput';

const {promptTitle, otpSent, resendText, verifyText} =
  STATIC_TEXT.screens.otpScreen;
const OTP_LENGTH = 4;

const OTPVerificationScreen = ({route, navigation}) => {
  const {
    phoneNumber,
    flow = 'login',
    returnData = {},
    returnScreen = '',
  } = route.params;
  const [otp, setOtp] = useState('');
  const [buttonState, setButtonState] = useState(ButtonState.DISABLED);

  useEffect(() => {
    setButtonState(
      otp.length === OTP_LENGTH ? ButtonState.DEFAULT : ButtonState.DISABLED,
    );
  }, [otp]);

  const handleOtpChange = (text: string) => setOtp(text);
  const handleOtpComplete = (text: string) => {};
  const handleResendOtp = () => {};

  const handleNavigate = () => {
    const {flow, returnData, returnScreen} = route.params;

    switch (flow) {
      case 'create':
        navigation.navigate('CreateSuccess');
        break;
      case 'update':
        navigation.replace('Dashboard', {
          screen: 'Account',
          params: {
            screen: returnScreen,
            params: returnData,
          },
        });
        break;
      default:
        navigation.navigate('AuthSuccess');
        break;
    }
  };

  return (
    <SafeAreaView style={[globalStyles.secondaryContainer, styles.container]}>
      <TouchableOpacity onPress={goBack} style={styles.bannerContainer}>
        <ArrowLeftIcon
          size={20}
          color={ColorPalette.GREY_TEXT_400}
          strokeWidth={2}
        />
      </TouchableOpacity>
      <View>
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
        <View style={styles.mainTwoContainer}>
          <View style={styles.otpContainer}>
            <OtpInput
              numberOfDigits={OTP_LENGTH}
              onTextChange={handleOtpChange}
              onFilled={handleOtpComplete}
              autoFocus
              focusColor={ColorPalette.GREY_TEXT_400}
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
        <View style={styles.mainContainerTwo}>
          <Button
            text={verifyText}
            onPress={handleNavigate}
            variant={ButtonVariant.PRIMARY}
            state={buttonState}
            size={ButtonSize.MEDIUM}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;
