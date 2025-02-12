import React from 'react';
import Svg, {Path} from 'react-native-svg';

const TotalSalesIcon = ({
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
        d="M14.4 7.47324C12.7115 6.87775 10.7564 7.25526 9.40591 8.60579C7.5314 10.4803 7.5314 13.5195 9.40591 15.394C10.7564 16.7445 12.7115 17.1221 14.4 16.5266M7.20002 10.3999H12.8M7.20002 13.5999H12.8M21.6 11.9999C21.6 17.3018 17.302 21.5999 12 21.5999C6.69809 21.5999 2.40002 17.3018 2.40002 11.9999C2.40002 6.69797 6.69809 2.3999 12 2.3999C17.302 2.3999 21.6 6.69797 21.6 11.9999Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default TotalSalesIcon;
