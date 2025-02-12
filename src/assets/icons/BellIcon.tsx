import React from 'react';
import Svg, {Path} from 'react-native-svg';

const BellIcon = ({size = 20, color = '#4A4A4A', strokeWidth = 1.5, style}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      style={style}>
      <Path
        d="M10.0167 2.42505C7.25835 2.42505 5.01668 4.66672 5.01668 7.42505V9.83338C5.01668 10.3417 4.80001 11.1167 4.54168 11.55L3.58335 13.1417C2.99168 14.125 3.40001 15.2167 4.48335 15.5834C8.07501 16.7834 11.95 16.7834 15.5417 15.5834C16.55 15.25 16.9917 14.0584 16.4417 13.1417L15.4833 11.55C15.2333 11.1167 15.0167 10.3417 15.0167 9.83338V7.42505C15.0167 4.67505 12.7667 2.42505 10.0167 2.42505Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <Path
        d="M11.5583 2.6667C11.3 2.5917 11.0333 2.53337 10.7583 2.50003C9.95834 2.40003 9.19167 2.45837 8.47501 2.6667C8.71667 2.05003 9.31667 1.6167 10.0167 1.6167C10.7167 1.6167 11.3167 2.05003 11.5583 2.6667Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.5167 15.8833C12.5167 17.2583 11.3917 18.3833 10.0167 18.3833C9.33333 18.3833 8.7 18.1 8.25 17.65C7.8 17.2 7.51666 16.5666 7.51666 15.8833"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
      />
    </Svg>
  );
};

export default BellIcon;
