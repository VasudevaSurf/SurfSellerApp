import React from 'react';
import Svg, {Path} from 'react-native-svg';

const CrossArrowsIcon = ({
  size = 24,
  color = '#4A4A4A',
  strokeWidth = 1.5,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      style={style}>
      <Path
        d="M19 1L11.5 8.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.5 11.5L1 19"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.81469 15L8.98324 11.975C9.00965 11.501 9.02285 11.264 8.88018 11.1203C8.73751 10.9766 8.50251 10.9902 8.03252 11.0174L5 11.1927"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.2166 5L11.0199 8.04523C10.9899 8.50919 10.9749 8.74118 11.1174 8.88212C11.2599 9.02307 11.4958 9.00964 11.9677 8.98277L15 8.81015"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CrossArrowsIcon;
