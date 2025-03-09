import React from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const ArrowLeftIcon = ({
  size = 24,
  color = '#4A4A4A',
  strokeWidth = 2,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        style={style}>
        <Path
          d="M8.44444 15.4444L3 9.99999M3 9.99999L8.44444 4.55554M3 9.99999L17 9.99999"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default ArrowLeftIcon;
