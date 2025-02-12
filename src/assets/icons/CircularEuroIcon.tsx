import React from 'react';
import Svg, {Path} from 'react-native-svg';

const CircularEuroIcon = ({
  size = 24,
  color = '#22C55E',
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
        d="M14.4 7.47324C12.7115 6.87775 10.7564 7.25526 9.40588 8.60579C7.53137 10.4803 7.53137 13.5195 9.40588 15.394C10.7564 16.7445 12.7115 17.1221 14.4 16.5266M7.19999 10.3999H12.8M7.19999 13.5999H12.8M21.6 11.9999C21.6 17.3018 17.3019 21.5999 12 21.5999C6.69806 21.5999 2.39999 17.3018 2.39999 11.9999C2.39999 6.69797 6.69806 2.3999 12 2.3999C17.3019 2.3999 21.6 6.69797 21.6 11.9999Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CircularEuroIcon;
