import React from 'react';
import Svg, { Path } from 'react-native-svg';

const BusinessAdministrationIcon = ({ size = 24, color = '#8E8E8E' }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 16 18"
    fill="none"
  >
    <Path
      d="M7.99865 1.5C5.74282 1.5 4.28014 3.01424 2.55029 3.56618C1.84692 3.7906 1.49523 3.90281 1.3529 4.06099C1.21057 4.21917 1.1689 4.45031 1.08554 4.9126C0.193576 9.8595 2.14317 14.433 6.79272 16.2131C7.29229 16.4044 7.54207 16.5 8.00111 16.5C8.46015 16.5 8.70992 16.4044 9.20946 16.2131C13.8587 14.433 15.8065 9.85948 14.9142 4.91259C14.8308 4.45023 14.7891 4.21905 14.6468 4.06086C14.5044 3.90268 14.1528 3.79054 13.4494 3.56624C11.7189 3.01436 10.2546 1.5 7.99865 1.5Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 1.5V16.5M14.75 9H1.25"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

export default BusinessAdministrationIcon;
