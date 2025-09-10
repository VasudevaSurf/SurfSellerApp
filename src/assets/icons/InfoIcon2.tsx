import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

interface InfoIconProps {
  size?: number;
  color?: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({size = 20, color = '#4A4A4A'}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle
        cx="10.0001"
        cy="10"
        r="8.33333"
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M9.99325 12.5H10.0007"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 10L10 6.66667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default InfoIcon;
