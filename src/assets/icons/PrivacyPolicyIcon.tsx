import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PrivacyPolicyIcon = ({ size = 24, color = '#8E8E8E', strokeWidth=1.5 }) => (
  <Svg
    width={size}
    height={size} 
    viewBox="0 0 14 18"
    fill="none"
  >
    <Path
      d="M7 12.375V10.875"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Path
      d="M1.20086 14.1336C1.36952 15.3862 2.4071 16.3676 3.66974 16.4257C4.7322 16.4745 5.81148 16.5 7 16.5C8.18852 16.5 9.26779 16.4745 10.3303 16.4257C11.5929 16.3676 12.6305 15.3862 12.7991 14.1336C12.9092 13.316 13 12.4782 13 11.625C13 10.7718 12.9092 9.93399 12.7991 9.11644C12.6305 7.86377 11.5929 6.88237 10.3303 6.82432C9.26779 6.77548 8.18852 6.75 7 6.75C5.81148 6.75 4.7322 6.77548 3.66974 6.82432C2.4071 6.88237 1.36952 7.86377 1.20086 9.11644C1.09078 9.93399 0.999999 10.7718 0.999999 11.625C0.999999 12.4782 1.09078 13.316 1.20086 14.1336Z"
      stroke={color}
      strokeWidth={strokeWidth}
    />
    <Path
      d="M3.625 6.75V4.875C3.625 3.01104 5.13604 1.5 7 1.5C8.86396 1.5 10.375 3.01104 10.375 4.875V6.75"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PrivacyPolicyIcon;
