import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput as RNTextInput,
  Image,
  TouchableOpacity,
  Animated,
  Pressable,
  LayoutChangeEvent,
} from 'react-native';
import {TextInputProps} from './TextInput.types';
import {createStyles} from './TextInput.styles';
import {validateInput} from './TextInput.utils';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight} from '../../../helpers/screenSize';
import {Spacing} from '../../../config/globalStyles';
import {Typography} from '../Typography/Typography';
import {TypographyVariant} from '../Typography/Typography.types';

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
  type = 'default',
  height,
  width,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [countrySectionWidth, setCountrySectionWidth] = useState(0);
  const inputRef = useRef<RNTextInput>(null);
  const animatedLabelPosition = useRef(
    new Animated.Value(value ? 1 : 0),
  ).current;
  const animatedLabelSize = useRef(new Animated.Value(value ? 1 : 0)).current;

  const styles = createStyles(
    isFocused,
    Boolean(error || localError),
    Boolean(value),
    height,
    width,
  );

  const handleFocus = () => {
    setIsFocused(true);
    animateLabel(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    const validationError = validateInput(value, type);
    setLocalError(validationError);
    if (!value) {
      animateLabel(0);
    }
  };

  const handleCountrySectionLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setCountrySectionWidth(width);
  };

  const animateLabel = (toValue: number) => {
    Animated.parallel([
      Animated.timing(animatedLabelPosition, {
        toValue,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(animatedLabelSize, {
        toValue,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleContainerPress = () => {
    inputRef.current?.focus();
  };

  const baseLabelPosition = showCountrySection
    ? countrySectionWidth + Spacing.Small
    : Spacing.Large;

  const getLabelColor = () => {
    if (isFocused) {
      return customLabelColorFocused || ColorPalette.TextAction;
    }
    return customLabelColorUnfocused || ColorPalette.TextSecondary;
  };

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
        customLabelColorUnfocused || ColorPalette.TextSecondary,
        customLabelColorFocused || ColorPalette.TextAction,
      ],
    }),
    ...customLabelStyles,
  };

  const getInputContainerStyle = () => ({
    ...styles.inputContainer,
    paddingLeft: showCountrySection ? 0 : Spacing.Small,
  });

  return (
    <View style={[styles.container, customContainerStyles]}>
      <Pressable onPress={handleContainerPress}>
        <View style={getInputContainerStyle()}>
          {showCountrySection && (
            <View
              style={styles.countrySection}
              onLayout={handleCountrySectionLayout}>
              <TouchableOpacity
                style={styles.countryButton}
                onPress={onCountryPress}
                disabled={!onCountryPress}>
                {countryFlag && (
                  <View style={styles.flagContainer}>
                    <Image
                      source={{uri: countryFlag}}
                      style={styles.countryFlag}
                      resizeMode="contain"
                    />
                    <Typography
                      variant={TypographyVariant.BODY_SMALL}
                      customTextStyles={styles.dropdownSymbol}
                      text="▼"
                    />
                  </View>
                )}
                {countryCode && (
                  <Typography
                    variant={TypographyVariant.BODY_SMALL}
                    customTextStyles={styles.countryCode}
                    text={countryCode}
                  />
                )}
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.inputWrapper}>
            <RNTextInput
              ref={inputRef}
              style={[styles.input, customInputStyles]}
              value={value}
              onChangeText={onChangeText}
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoCapitalize={autoCapitalize}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
            />
          </View>
        </View>
      </Pressable>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      {(error || localError) && (
        <Typography
          variant={TypographyVariant.BODY_SMALL}
          customTextStyles={styles.error}
          text={error || localError || ''}
        />
      )}
    </View>
  );
};

export default AnimatedTextInput;
