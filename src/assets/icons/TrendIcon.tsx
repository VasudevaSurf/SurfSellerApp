import React from 'react';
import Svg, {Path} from 'react-native-svg';

const TrendIcon = ({
  size = 16,
  color = '#22C55E',
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
        d="M8.62222 4.88892H13.6M13.6 4.88892V9.86669M13.6 4.88892L8.62222 9.86669L6.13333 7.3778L2.39999 11.1111"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default TrendIcon;
