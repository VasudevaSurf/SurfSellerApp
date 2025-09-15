import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorPalette} from '../../config/colorPalette';

type EuroIconProps = {
  size?: number;
  style?: any;
  color?: string;
  strokeWidth?: number;
};

const EuroIcon: React.FC<EuroIconProps> = ({
  size = 24,
  style,
  color = ColorPalette.GREY_TEXT_400,
  strokeWidth = 1.5,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <Path
        d="M1 8H9"
        stroke="#4A4A4A"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color}
      />
      <Path
        d="M1 12H9"
        stroke="#4A4A4A"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color}
      />
      <Path
        d="M15 15.6076C13.8693 17.6404 11.812 19 9.46154 19C5.89293 19 3 15.866 3 12V8C3 4.13401 5.89293 1 9.46154 1C11.812 1 13.8693 2.35958 15 4.39241"
        stroke="#4A4A4A"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        stroke={color}
      />
    </Svg>
  );
};

export default EuroIcon;
