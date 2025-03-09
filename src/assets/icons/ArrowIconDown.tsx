import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowIconDown = ({
  size = 14,
  color = '#606060',
  strokeWidth = 1,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size * (8 / 14)}
      viewBox="0 0 14 8"
      fill="none"
      style={style}>
      <Path
        d="M1 1L6.5286 6.5286C6.75082 6.75082 6.86193 6.86193 7 6.86193C7.13807 6.86193 7.24918 6.75082 7.4714 6.5286L13 1"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowIconDown;
