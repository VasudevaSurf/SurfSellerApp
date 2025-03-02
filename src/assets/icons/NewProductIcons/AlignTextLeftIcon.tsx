import React from 'react';
import Svg, {Path} from 'react-native-svg';

const AlignTextLeftIcon = ({
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
        d="M2.25 7.5H11.25M2.25 4.5H15.75M2.25 10.5H15.75M2.25 13.5H11.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default AlignTextLeftIcon;
