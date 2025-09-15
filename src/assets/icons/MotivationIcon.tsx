import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MotivationIcon = ({ size = 24, color = '#8E8E8E' }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 12 18"
    fill="none"
  >
    <Path
      d="M0.919321 8.49708L6.16801 1.75988C6.5785 1.23298 7.3479 1.56093 7.3479 2.2628V7.47746C7.3479 7.89789 7.64964 8.23873 8.02185 8.23873H10.5747C11.1547 8.23873 11.4638 9.01115 11.0807 9.50292L5.83199 16.2401C5.4215 16.767 4.6521 16.4391 4.6521 15.7372V10.5225C4.6521 10.1021 4.35036 9.76127 3.97815 9.76127H1.42526C0.845335 9.76127 0.536203 8.98885 0.919321 8.49708Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MotivationIcon;
