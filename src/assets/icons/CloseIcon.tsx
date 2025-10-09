import React from 'react';
import Svg, { Path } from 'react-native-svg';

type CloseIconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: any
};

const CloseIcon: React.FC<CloseIconProps> = ({
  size = 24,
  color = '#4A4A4A',
  strokeWidth = 1.5,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}>
      <Path
        d="M6 18L18 6M6 6L18 18"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CloseIcon;
