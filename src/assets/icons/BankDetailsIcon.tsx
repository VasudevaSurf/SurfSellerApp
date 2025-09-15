import React from 'react';
import Svg, {Path} from 'react-native-svg';

const BankDetailsIcon = ({size = 24, color = '#8E8E8E'}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none">
    <Path
      d="M1.5 6.4268C1.5 5.52967 1.86179 4.97987 2.61047 4.56321L5.6924 2.84808C7.30733 1.94936 8.11479 1.5 9 1.5C9.88521 1.5 10.6927 1.94936 12.3076 2.84808L15.3895 4.56321C16.1382 4.97986 16.5 5.52967 16.5 6.4268C16.5 6.67007 16.5 6.79171 16.4734 6.89171C16.3339 7.41708 15.8578 7.5 15.398 7.5H2.60196C2.1422 7.5 1.66614 7.41708 1.52657 6.89171C1.5 6.79171 1.5 6.67007 1.5 6.4268Z"
      stroke={color}
      strokeWidth={1.5}
    />
    <Path
      d="M8.99693 5.24988H9.00366"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M3 7.5V13.875M6 7.5V13.875" stroke={color} strokeWidth={1.5} />
    <Path
      d="M12 7.49994V13.8749M15 7.49994V13.8749"
      stroke={color}
      strokeWidth={1.5}
    />
    <Path
      d="M14.25 13.875H3.75C2.50736 13.875 1.5 14.8824 1.5 16.125C1.5 16.3321 1.66789 16.5 1.875 16.5H16.125C16.3321 16.5 16.5 16.3321 16.5 16.125C16.5 14.8824 15.4926 13.875 14.25 13.875Z"
      stroke={color}
      strokeWidth={1.5}
    />
  </Svg>
);

export default BankDetailsIcon;
