import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  LayoutChangeEvent,
  Pressable,
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import { ColorPalette } from '../../../config/colorPalette';
import { Spacing } from '../../../config/globalStyles';
import { getScreenHeight } from '../../../helpers/screenSize';
import { Typography } from '../Typography/Typography';
import { TypographyVariant } from '../Typography/Typography.types';
import { createStyles } from './TextInput.styles';
import { TextInputProps } from './TextInput.types';
import { validateInput } from './TextInput.utils';
import EyeClose from '../../../assets/icons/EyeClose';
import EyeOpen from '../../../assets/icons/EyeOpen';
import EuroIcon from '../../../assets/icons/EuroIcon';

// Add these imports at the top of your file
// You can replace these with your actual eye icons
// const EyeOpenIcon = () => (
//   <View
//     style={{
//       width: 24,
//       height: 24,
//       justifyContent: 'center',
//       alignItems: 'center',
//     }}>
//     <Typography variant={TypographyVariant.PSMALL_REGULAR} text="👁️" />
//   </View>
// );

// const EyeCloseIcon = () => (
//   <View
//     style={{
//       width: 24,
//       height: 24,
//       justifyContent: 'center',
//       alignItems: 'center',
//     }}>
//     <Typography variant={TypographyVariant.PSMALL_REGULAR} text="👁️‍🗨️" />
//   </View>
// );

const AnimatedTextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  autoFocus = false,
  autoCapitalize = 'none',
  customContainerStyles,
  customInputStyles,
  customPlaceholderStyles,
  customLabelStyles,
  customLabelColorFocused,
  customLabelColorUnfocused,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  showCountrySection = false,
  countryCode,
  countryFlag,
  onCountryPress,
  leftIcons = [],
  leftText,
  rightIcons = [],
  rightText,
  onRightTextPress,
  type = 'default',
  height,
  width,
  customBorderColor,
  customFocusedBorderColor,
  customErrorBorderColor,
  customBorderWidth = 1,
  customFocusedBorderWidth = 2,
  customErrorBorderWidth = 2,
  disabled = false,
  required = true, //new 
  multiline = false, //new 
  numberOfLines = 1 //new 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [countrySectionWidth, setCountrySectionWidth] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const inputRef = useRef<RNTextInput>(null);

  // Check if we have a value to determine initial animation state
  const hasValue = value && value.length > 0;

  // Initialize animation values based on whether we already have a value
  const animatedLabelPosition = useRef(
    new Animated.Value(hasValue ? 1 : 0),
  ).current;
  const animatedLabelSize = useRef(
    new Animated.Value(hasValue ? 1 : 0),
  ).current;

  const styles = createStyles(
    isFocused,
    Boolean(error || localError),
    Boolean(value),
    height,
    width,
    customBorderColor,
    customFocusedBorderColor,
    customErrorBorderColor,
    customBorderWidth,
    customFocusedBorderWidth,
    customErrorBorderWidth,
  );

  // Handle focus events with smoother animations
  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true);
      animateLabel(1);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);

    if (!required && !value) {
      setLocalError(null);
    } else {
      const validationError = validateInput(value, type);
      setLocalError(validationError);
    }

    if (!value) {
      animateLabel(0);
    }
  };

  const handleCountrySectionLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setCountrySectionWidth(width);
  };

  // Smoother animation with proper easing
  const animateLabel = (toValue: number) => {
    Animated.parallel([
      Animated.timing(animatedLabelPosition, {
        toValue,
        duration: 150, // Slightly faster animation
        useNativeDriver: false,
      }),
      Animated.timing(animatedLabelSize, {
        toValue,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Fix the useEffect to properly handle value changes
  useEffect(() => {
    const currentHasValue = value && value.length > 0;

    // Only animate if the state actually changes
    if (currentHasValue && animatedLabelPosition._value === 0) {
      // Value exists but label is down - animate up
      animateLabel(1);
    } else if (
      !currentHasValue &&
      !isFocused &&
      animatedLabelPosition._value === 1
    ) {
      // No value and not focused but label is up - animate down
      animateLabel(0);
    }
  }, [value, isFocused]); // Keep both dependencies but with proper logic

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleContainerPress = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const baseLabelPosition = showCountrySection
    ? countrySectionWidth + Spacing.Small
    : Spacing.Large;

  const getLabelColor = () => {
    if (isFocused) {
      return customLabelColorFocused || ColorPalette.GREY_TEXT_400;
    }
    return customLabelColorUnfocused || ColorPalette.GREY_TEXT_400;
  };

  // Refined label positioning to prevent jumping
  const labelStyle = {
    ...styles.label,
    transform: [
      {
        translateX: animatedLabelPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [baseLabelPosition, Spacing.Medium],
        }),
      },
      {
        translateY: animatedLabelPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [getScreenHeight(2.2), -getScreenHeight(1.1)],
        }),
      },
    ],
    fontSize: animatedLabelSize.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [
        customLabelColorUnfocused || ColorPalette.GREY_TEXT_00,
        getLabelColor(),
      ],
    }),
    ...customLabelStyles,
  };

  const renderLeftSection = () => {
    if (showCountrySection) {
      return (
        <View
          style={styles.countrySection}
          onLayout={handleCountrySectionLayout}>
          <TouchableOpacity
            style={styles.countryButton}
            onPress={onCountryPress}
            disabled={!onCountryPress}>
            {countryFlag && (
              <>
                <Image
                  source={{ uri: countryFlag }}
                  style={styles.countryFlag}
                  resizeMode="contain"
                />
                <ArrowDownIcon style={styles.dropdownSymbol} />
              </>
            )}
            {leftText ? (
              <Typography
                variant={TypographyVariant.PSMALL_REGULAR}
                customTextStyles={styles.countryCode}
                text={leftText}
              />
            ) : (
              countryCode && (
                <>
                  {typeof countryCode === 'string' ? (
                    <Typography
                      variant={TypographyVariant.PSMALL_REGULAR}
                      customTextStyles={styles.countryCode}
                      text={countryCode}
                    />
                  ) : (
                    countryCode
                  )}
                </>
              )
            )}
          </TouchableOpacity>
        </View>
      );
    }
    if (leftIcons?.length > 0) {
      return (
        <View style={styles.leftSection}>
          {leftIcons.map((iconConfig, index) => (
            <TouchableOpacity
              key={index}
              style={styles.iconContainer}
              onPress={iconConfig.onPress}
              disabled={!iconConfig.onPress}>
              {typeof iconConfig.icon === 'string' ? (
                <Image
                  source={{ uri: iconConfig.icon }}
                  style={styles.iconSize}
                  resizeMode="contain"
                />
              ) : (
                React.isValidElement(iconConfig.icon) && iconConfig.icon
              )}
            </TouchableOpacity>
          ))}
          {leftText && (
            <Typography
              variant={TypographyVariant.PSMALL_REGULAR}
              customTextStyles={styles.leftText}
              text={leftText}
            />
          )}
        </View>
      );
    }

    return null;
  };

  // Create a combined array of rightIcons that includes the password toggle if needed
  const allRightIcons = React.useMemo(() => {
    if (type === 'password') {
      // Check if password toggle already exists in the rightIcons array
      const hasPasswordToggleIcon = rightIcons.some(
        icon => icon.id === 'password-toggle',
      );

      if (!hasPasswordToggleIcon) {
        // Create a new array with the password toggle icon added
        return [
          ...rightIcons,
          {
            id: 'password-toggle',
            icon: passwordVisible ? <EyeOpen /> : <EyeClose />,
            onPress: togglePasswordVisibility,
          },
        ];
      }
    }
    return rightIcons;
  }, [type, passwordVisible, rightIcons]);

  const renderRightSection = () => {
    if (allRightIcons?.length > 0 || rightText) {
      return (
        <View style={styles.rightSection}>
          {rightText && (
            <TouchableOpacity onPress={onRightTextPress}>
              <Typography
                variant={TypographyVariant.PSMALL_REGULAR}
                customTextStyles={styles.rightText}
                text={rightText}
              />
            </TouchableOpacity>
          )}
          {allRightIcons.map((iconConfig, index) => (
            <TouchableOpacity
              key={index}
              style={styles.iconContainer}
              onPress={iconConfig.onPress}
              disabled={!iconConfig.onPress}>
              {typeof iconConfig.icon === 'string' ? (
                <Image
                  source={{ uri: iconConfig.icon }}
                  style={styles.iconSize}
                  resizeMode="contain"
                />
              ) : (
                React.isValidElement(iconConfig.icon) && iconConfig.icon
              )}
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return null;
  };

  const getInputContainerStyle = () => {
    const hasLeftSection =
      showCountrySection || (leftIcons && leftIcons.length > 0) || leftText;
    return {
      ...styles.inputContainer,
      paddingLeft: hasLeftSection ? 0 : Spacing.XSmall,
      backgroundColor: disabled ? ColorPalette.GREY_50 : undefined,
    };
  };

  // Determine if we need to use secureTextEntry based on the type and visibility state
  const isSecureTextEntry =
    type === 'password' ? !passwordVisible : secureTextEntry;

  return (
    <Pressable
      onPress={handleContainerPress}
      style={[styles.container, customContainerStyles]}>
      <View
        style={[
          getInputContainerStyle(),
          {
            borderColor:
              error || localError
                ? customErrorBorderColor || ColorPalette.RED_100
                : isFocused
                  ? customFocusedBorderColor || ColorPalette.GREY_TEXT_400
                  : customBorderColor || ColorPalette.GREY_100,
            borderWidth:
              error || localError
                ? customErrorBorderWidth
                : isFocused
                  ? customFocusedBorderWidth
                  : customBorderWidth,
          },
        ]}>
        {renderLeftSection()}
        <View style={styles.inputWrapper}>
          <RNTextInput
            ref={inputRef}
            style={[styles.input, customInputStyles]}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoCapitalize={autoCapitalize}
            secureTextEntry={isSecureTextEntry}
            keyboardType={keyboardType}
            placeholder={isFocused || value ? placeholder : ''}
            editable={!disabled}
            multiline={multiline}
            numberOfLines={numberOfLines}
          />
        </View>
        {renderRightSection()}
      </View>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      {(error || localError) && (
        <Typography
          variant={TypographyVariant.PSMALL_REGULAR}
          customTextStyles={styles.error}
          text={error || localError || ''}
        />
      )}
    </Pressable>
  );
};

export default AnimatedTextInput;
