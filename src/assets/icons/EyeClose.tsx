import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface EyeCloseProps {
  size?: number;
  color?: string;
  style?: any;
}

const EyeClose: React.FC<EyeCloseProps> = ({
  size = 24,
  color = '#4A4A4A',
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
    >
      <Path
        d="M3 10C3.85907 11.041 4.87049 11.9462 6 12.685M6 12.685C7.2165 13.4787 8.57462 14.0305 10 14.31C11.3213 14.5639 12.6787 14.5639 14 14.31C15.4254 14.0305 16.7835 13.4787 18 12.685M6 12.685L4.5 14.5M21 10C20.1409 11.041 19.1295 11.9462 18 12.685M18 12.685L19.5 14.5M10 14.309L9.5 16.5M14 14.309L14.5 16.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default EyeClose;
