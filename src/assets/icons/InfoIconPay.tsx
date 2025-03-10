import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const InfoIconPay = ({size = 18, color = '#4A4A4A', style}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      style={style}>
      <Circle cx="9" cy="9" r="7.5" stroke={color} strokeWidth="1.125" />
      <Path
        d="M8.994 11.25H9.00073"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 9L9 6"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default InfoIconPay;
