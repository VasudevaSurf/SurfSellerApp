import {forwardRef, useImperativeHandle} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {Typography} from '../Typography/Typography';
import {TypographyVariant} from '../Typography/Typography.types';
import {styles} from './OtpInput.styles';
import {OtpInputProps, OtpInputRef} from './OtpInput.types';
import {VerticalStick} from './VerticalStick';
import {useOtpInput} from './useOtpInput';

/**
 * A component for entering a sequence of digits (like an OTP).
 *
 * @prop {number} numberOfDigits - The number of digits to render.
 * @prop {boolean} autoFocus - Whether the first input should be focused on mount.
 * @prop {boolean} hideStick - Whether to hide the vertical line that appears when a cell is focused.
 * @prop {string} focusColor - The color of the vertical line when focused.
 * @prop {number} focusStickBlinkingDuration - The duration (in ms) of the blinking animation when a cell is focused.
 * @prop {boolean} secureTextEntry - Whether the input should be secure text entry.
 * @prop {OtpInputTheme} theme - An object containing custom styles for the component.
 * @prop {(text: string) => void} onTextChange - A callback invoked when the text changes.
 * @prop {(text: string) => void} onFilled - A callback invoked when the text is complete.
 * @prop {boolean} disabled - Whether the input should be disabled.
 * @prop {OtpInputRef} ref - A reference to the component.
 *
 * @example
 * <OtpInput numberOfDigits={6} onTextChange={(text) => console.log(text)} />
 */
export const OtpInput = forwardRef<OtpInputRef, OtpInputProps>((props, ref) => {
  const {
    models: {text, inputRef, focusedInputIndex, isFocused},
    actions: {
      clear,
      handlePress,
      handleTextChange,
      focus,
      handleFocus,
      handleBlur,
    },
    forms: {setTextWithRef},
  } = useOtpInput(props);

  const {
    disabled,
    numberOfDigits = 6,
    autoFocus = true,
    hideStick = false,
    focusColor = ColorPalette.BorderAction,
    focusStickBlinkingDuration,
    secureTextEntry = false,
    theme = {},
    textInputProps,
    type = 'numeric',
  } = props;

  const {
    containerStyle,
    pinCodeContainerStyle,
    focusStickStyle,
    focusedPinCodeContainerStyle,
    filledPinCodeContainerStyle,
    disabledPinCodeContainerStyle,
  } = theme;

  useImperativeHandle(ref, () => ({clear, focus, setValue: setTextWithRef}));

  const generatePinCodeContainerStyle = (
    isFocusedContainer: boolean,
    char: string,
  ) => {
    const stylesArray = [styles.codeContainer, pinCodeContainerStyle];
    if (focusColor && isFocusedContainer) {
      stylesArray.push({borderColor: focusColor});
    }
    if (focusedPinCodeContainerStyle && isFocusedContainer) {
      stylesArray.push(focusedPinCodeContainerStyle);
    }
    if (filledPinCodeContainerStyle && Boolean(char)) {
      stylesArray.push(filledPinCodeContainerStyle);
    }
    if (disabledPinCodeContainerStyle && disabled) {
      stylesArray.push(disabledPinCodeContainerStyle);
    }
    return stylesArray;
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < numberOfDigits; i++) {
      const char = text[i];
      const isFocusedInput =
        i === focusedInputIndex && !disabled && Boolean(isFocused);
      const isFilledLastInput =
        text.length === numberOfDigits && i === text.length - 1;
      const isFocusedContainer =
        isFocusedInput || (isFilledLastInput && Boolean(isFocused));

      inputs.push(
        <Pressable
          key={`${char}-${i}`}
          disabled={disabled}
          onPress={handlePress}
          style={generatePinCodeContainerStyle(isFocusedContainer, char)}
          testID="otp-input">
          {isFocusedInput && !hideStick ? (
            <VerticalStick
              focusColor={focusColor}
              style={focusStickStyle}
              focusStickBlinkingDuration={focusStickBlinkingDuration}
            />
          ) : (
            <Typography
              variant={TypographyVariant.H1_MEDIUM}
              text={char && secureTextEntry ? '•' : char}
              customTextStyles={styles.codeText}
            />
          )}
        </Pressable>,
      );

      if (numberOfDigits === 6 && i === 2) {
        inputs.push(
          <View key={'dash'} style={styles.dash}>
            <Typography
              variant={TypographyVariant.H5_BOLD}
              text="–"
              customTextStyles={styles.dashText}
            />
          </View>,
        );
      }
    }
    return inputs;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {renderInputs()}
      <TextInput
        value={text}
        onChangeText={handleTextChange}
        maxLength={numberOfDigits}
        inputMode={type === 'numeric' ? type : 'text'}
        textContentType="oneTimeCode"
        ref={inputRef}
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        autoComplete="one-time-code"
        aria-disabled={disabled}
        editable={!disabled}
        testID="otp-input-hidden"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...textInputProps}
        style={[styles.hiddenInput, textInputProps?.style]}
      />
    </View>
  );
});
