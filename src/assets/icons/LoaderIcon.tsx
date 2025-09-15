import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  ViewStyle,
} from 'react-native';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from 'react-native-svg';

type LoaderIconProps = SvgProps & {
  size?: number;
  style?: ViewStyle;
  startColor?: string;
  endColor?: string;
};

const LoaderIcon: React.FC<LoaderIconProps> = ({
  size = 52,
  style,
  startColor = '#A600F7',
  endColor = '#9101CF',
  ...svgProps
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      style={style}
      {...svgProps}>
      <Defs>
        <LinearGradient id="g0" x1="11.5554" y1="24.8444" x2="40.4443" y2="52" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
        <LinearGradient id="g1" x1="24.8447" y1="11.5556" x2="52.0002" y2="40.4445" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
        <LinearGradient id="g2" x1="27.1553" y1="11.5556" x2="-0.00021671" y2="40.4445" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
        <LinearGradient id="g3" x1="11.5554" y1="27.1556" x2="40.4443" y2="0.000027431" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor={startColor} />
          <Stop offset="1" stopColor={endColor} />
        </LinearGradient>
      </Defs>

      <Path
        d="M28.5838 28.2789C27.4563 26.024 26.8926 24.8965 25.9999 24.8965C25.1072 24.8965 24.5434 26.024 23.416 28.2789L15.8335 43.4439C14.0877 46.9355 13.2148 48.6813 13.9945 49.4179C14.7743 50.1545 16.4676 49.1837 19.8543 47.242L24.5632 44.5423C25.2646 44.1401 25.6154 43.9391 26.0001 43.9391C26.3848 43.9391 26.7355 44.1401 27.4369 44.5423L32.1454 47.2419C35.5321 49.1836 37.2254 50.1545 38.0052 49.4179C38.785 48.6813 37.9121 46.9354 36.1662 43.4437L28.5838 28.2789Z"
        fill="url(#g0)"
      />
      <Path
        d="M28.2791 28.5839C26.0242 27.4565 24.8968 26.8927 24.8968 26C24.8968 25.1073 26.0242 24.5436 28.2791 23.4161L43.4441 15.8336C46.9358 14.0878 48.6816 13.2149 49.4182 13.9946C50.1548 14.7744 49.1839 16.4677 47.2423 19.8544L44.5425 24.5633C44.1404 25.2647 43.9393 25.6155 43.9393 26.0002C43.9393 26.3849 44.1404 26.7356 44.5426 27.4371L47.2421 32.1455C49.1838 35.5322 50.1547 37.2256 49.4181 38.0053C48.6815 38.7851 46.9357 37.9122 43.444 36.1663L28.2791 28.5839Z"
        fill="url(#g1)"
      />
      <Path
        d="M23.7209 28.5839C25.9758 27.4565 27.1032 26.8927 27.1032 26C27.1032 25.1073 25.9758 24.5436 23.7209 23.4161L8.55588 15.8336C5.06424 14.0878 3.31841 13.2149 2.58182 13.9946C1.84523 14.7744 2.81606 16.4677 4.75772 19.8544L7.45746 24.5633C7.85962 25.2647 8.0607 25.6155 8.0607 26.0002C8.0607 26.3849 7.85961 26.7356 7.45744 27.4371L4.75788 32.1455C2.81616 35.5322 1.8453 37.2256 2.58189 38.0053C3.31849 38.7851 5.06433 37.9122 8.55603 36.1663L23.7209 28.5839Z"
        fill="url(#g2)"
      />
      <Path
        d="M28.5838 23.7211C27.4563 25.976 26.8926 27.1035 25.9999 27.1035C25.1072 27.1035 24.5434 25.976 23.416 23.7211L15.8335 8.55612C14.0877 5.06448 13.2148 3.31866 13.9945 2.58207C14.7743 1.84548 16.4676 2.81631 19.8543 4.75797L24.5632 7.4577C25.2646 7.85987 25.6154 8.06095 26.0001 8.06095C26.3848 8.06095 26.7355 7.85986 27.4369 7.45769L32.1454 4.75813C35.5321 2.81641 37.2254 1.84555 38.0052 2.58214C38.785 3.31873 37.9121 5.06458 36.1662 8.55627L28.5838 23.7211Z"
        fill="url(#g3)"
      />
    </Svg>
  );
};

// 🔹 Animated wrapper that rotates the LoaderIcon
export const AnimatedLoader: React.FC<LoaderIconProps> = (props) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <LoaderIcon {...props} />
    </Animated.View>
  );
};

export default AnimatedLoader;
