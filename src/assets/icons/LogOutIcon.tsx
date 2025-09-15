import React from 'react';
import Svg, {Path} from 'react-native-svg';

const LogoutIcon = ({size = 24, color = '#8E8E8E', strokeWidth = 1.5}) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M9.5 1.32126C9.15725 1.27431 8.80665 1.25 8.45 1.25C4.47355 1.25 1.25 4.27208 1.25 8C1.25 11.7279 4.47355 14.75 8.45 14.75C8.80665 14.75 9.15725 14.7257 9.5 14.6787"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Path
      d="M14.75 8L7.25 8M14.75 8C14.75 7.47483 13.2543 6.49365 12.875 6.125M14.75 8C14.75 8.52517 13.2543 9.50635 12.875 9.875"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default LogoutIcon;
