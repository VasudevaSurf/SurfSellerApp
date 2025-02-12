import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowRightIcon = ({
  size = 24,
  color = '#BB20FE',
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
        d="M9 6.75L14.25 12L9 17.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowRightIcon;
