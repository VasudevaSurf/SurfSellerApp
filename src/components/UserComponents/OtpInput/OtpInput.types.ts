import { ColorValue, TextInputProps, TextStyle, ViewStyle } from 'react-native';

/**
 * Properties for the OtpInput component.
 *
 * @property {boolean} [autoFocus] Whether the first input should be focused on mount.
 * @property {boolean} [blurOnFilled] Whether to blur the input when the text is complete.
 * @property {boolean} [disabled] Whether the input should be disabled.
 * @property {ColorValue} [focusColor] The color of the vertical line when focused.
 * @property {number} [focusStickBlinkingDuration] The duration (in ms) of the blinking animation when a cell is focused.
 * @property {boolean} [hideStick] Whether to hide the vertical line that appears when a cell is focused.
 * @property {number} [numberOfDigits] The number of digits to render.
 * @property {(text: string) => void} [onFilled] A callback invoked when the text is complete.
 * @property {(text: string) => void} [onTextChange] A callback invoked when the text changes.
 * @property {boolean} [secureTextEntry] Whether the input should be secure text entry.
 * @property {TextInputProps} [textInputProps] Props to pass to the TextInput.
 * @property {Theme} [theme] An object containing custom styles for the component.
 * @property {'alpha' | 'numeric' | 'alphanumeric'} [type] The type of the input.
 */
export interface OtpInputProps {
  autoFocus?: boolean;
  blurOnFilled?: boolean;
  disabled?: boolean;
  focusColor?: ColorValue;
  focusStickBlinkingDuration?: number;
  hideStick?: boolean;
  numberOfDigits?: number;
  onBlur?: () => void;
  onFilled?: (text: string) => void;
  onFocus?: () => void;
  onTextChange?: (text: string) => void;
  secureTextEntry?: boolean;
  textInputProps?: TextInputProps;
  theme?: Theme;
  type?: 'alpha' | 'numeric' | 'alphanumeric';
}

/**
 * The reference returned by the OtpInput component.
 *
 * @property {() => void} clear Clear the input.
 * @property {() => void} focus Focus the input.
 * @property {(value: string) => void} setValue Set the value of the input.
 */
export interface OtpInputRef {
  clear: () => void;
  focus: () => void;
  setValue: (value: string) => void;
}

/**
 * A theme object for customizing the styles of the OtpInput component.
 *
 * @property {ViewStyle} [containerStyle] The style of the container view.
 * @property {ViewStyle} [disabledPinCodeContainerStyle] The style of the individual input when disabled.
 * @property {ViewStyle} [filledPinCodeContainerStyle] The style of the individual input when filled.
 * @property {ViewStyle} [focusStickStyle] The style of the vertical line that appears when a cell is focused.
 * @property {ViewStyle} [focusedPinCodeContainerStyle] The style of the individual input when focused.
 * @property {ViewStyle} [inputsContainerStyle] The style of the container of the individual inputs.
 * @property {ViewStyle} [pinCodeContainerStyle] The style of the individual input.
 * @property {TextStyle} [pinCodeTextStyle] The style of the text of the individual input.
 */
export interface Theme {
  containerStyle?: ViewStyle;
  disabledPinCodeContainerStyle?: ViewStyle;
  filledPinCodeContainerStyle?: ViewStyle;
  focusStickStyle?: ViewStyle;
  focusedPinCodeContainerStyle?: ViewStyle;
  inputsContainerStyle?: ViewStyle;
  pinCodeContainerStyle?: ViewStyle;
  pinCodeTextStyle?: TextStyle;
}

/**
 * Properties for the VerticalStick component.
 *
 * @property {ColorValue} [focusColor] The color of the vertical line when focused.
 * @property {number} [focusStickBlinkingDuration] The duration (in ms) of the blinking animation when a cell is focused.
 * @property {ViewStyle} [style] The style of the vertical line.
 */
export interface VerticalStickProps {
  focusColor?: ColorValue;
  focusStickBlinkingDuration?: number;
  style?: ViewStyle;
}
