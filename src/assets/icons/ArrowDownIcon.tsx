import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowDownIcon = ({
  size = 16,
  color = '#4A4A4A',
  strokeWidth = 1.5,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      style={style}>
      <Path
        d="M12 6.40002L8 10.4L4 6.40002"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowDownIcon;
