import React from 'react';
import Svg, {Path} from 'react-native-svg';

const TextSymbolIcon = ({
  size = 24,
  color = '#4A4A4A',
  strokeWidth = 1.5,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      style={style}>
      <Path
        d="M8.25 3.75H10.5M10.5 3.75H12.75M10.5 3.75L7.5 14.25M7.5 14.25H5.25M7.5 14.25H9.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default TextSymbolIcon;
