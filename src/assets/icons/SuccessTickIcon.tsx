import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

interface SuccessTickIconProps {
  size?: number;
  backgroundColor?: string;
  tickColor?: string;
  style?: StyleProp<ViewStyle>;
}

const SuccessTickIcon: React.FC<SuccessTickIconProps> = ({
  size = 24,
  backgroundColor = '#4CAF50', // ✅ Green background
  tickColor = '#FFFFFF',        // ✅ White tick
  style,
}) => {
  const radius = size / 2;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
    >
      {/* Background Circle */}
      <Circle cx="12" cy="12" r={radius} fill={backgroundColor} />

      {/* White Tick Path */}
      <Path
        d="M7 12.5L10.2 15.7L17 8.5"
        stroke={tickColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SuccessTickIcon;
