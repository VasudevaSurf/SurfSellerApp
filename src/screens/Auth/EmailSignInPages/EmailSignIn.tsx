import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Alert, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
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
import {getScreenWidth} from '../../../helpers/screenSize';
import {styles} from './EmailSignIn.styles';
import {loginUser, clearError} from '../../../redux/slices/authSlice';
import type {AppDispatch, RootState} from '../../../redux/store';

const {surfTitle} = STATIC_TEXT.screens.onboarding;

const EmailSignIn = ({navigation}) => {
  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading, error} = useSelector((state: RootState) => state.auth);

  // State
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [buttonState, setButtonState] = useState(ButtonState.DISABLED);

  // Update button state based on form inputs and loading state
  useEffect(() => {
    if (isLoading) {
      setButtonState(ButtonState.FOCUSED);
    } else if (emailId.trim() && password.trim()) {
      setButtonState(ButtonState.DEFAULT);
    } else {
      setButtonState(ButtonState.DISABLED);
    }
  }, [emailId, password, isLoading]);

  // Show error alert if login failed
  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleTermsPress = () => {
    console.log('Navigate to Terms of Use');
  };

  const handlePrivacyPress = () => {
    console.log('Navigate to Privacy Policy');
  };

  const handleCreateAccount = () => {
    navigation.navigate('PhoneNumber');
  };

  const handleSignIn = async () => {
    if (
      buttonState === ButtonState.DISABLED ||
      buttonState === ButtonState.FOCUSED
    )
      return;

    // We'll let the isLoading state from Redux control the button state through the useEffect

    // Dispatch login action
    const resultAction = await dispatch(
      loginUser({
        email: emailId,
        password: password,
      }),
    );

    if (loginUser.fulfilled.match(resultAction)) {
      // Navigate to AuthSuccess but don't update isLoggedIn yet
      navigation.navigate('AuthSuccess');
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
        text="Login to your seller account"
        variant={TypographyVariant.H5_BOLD}
        customTextStyles={styles.heading}
      />
    </View>
  );

  const renderEmailInput = () => (
    <View style={styles.inputContainer}>
      <AnimatedTextInput
        label="Email ID"
        value={emailId}
        onChangeText={setEmailId}
        type="email"
        customLabelColorFocused={ColorPalette.GREY_TEXT_400}
        customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
        editable={!isLoading}
      />
      <AnimatedTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        type="password"
        customLabelColorFocused={ColorPalette.GREY_TEXT_400}
        customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
        editable={!isLoading}
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
        disabled={isLoading}
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
        disabled={isLoading}
      />
    </View>
  );

  const renderActionButtons = () => (
    <>
      <View style={styles.mainContainerTwo}>
        <Button
          text={isLoading ? 'Signing In...' : 'Sign In'}
          onPress={handleSignIn}
          variant={ButtonVariant.PRIMARY}
          state={buttonState}
          size={ButtonSize.MEDIUM}
          withShadow
        />
      </View>
    </>
  );

  const renderSignup = () => (
    <View style={styles.termsContainerTwo}>
      <Typography
        text="Want to Sign in Phone? "
        variant={TypographyVariant.LMEDIUM_REGULAR}
        customTextStyles={styles.captionTwo}
      />
      <TextButton
        text="SignIn"
        onPress={handleCreateAccount}
        variant={TypographyVariant.PMEDIUM_SEMIBOLD}
        underline
        customTextStyles={{
          color: ColorPalette.PURPLE_300,
          fontFamily: Fonts.POPPINS_BOLD,
        }}
        disabled={isLoading}
      />
    </View>
  );

  return (
    <SafeAreaView style={[globalStyles.secondaryContainer, styles.container]}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled">
        {renderBanner()}
        <View style={styles.containerTwo}>
          {renderHeading()}
          <View style={{gap: getScreenWidth(4)}}>
            {renderEmailInput()}
            {renderTerms()}
          </View>
          {renderActionButtons()}
          {renderSignup()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmailSignIn;
