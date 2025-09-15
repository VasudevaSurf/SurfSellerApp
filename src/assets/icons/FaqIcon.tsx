import React from 'react';
import Svg, { Path } from 'react-native-svg';

const FaqIcon = ({ size = 24, color = '#8E8E8E', strokeWidth=1.5 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
  >
    <Path
      d="M16.5 8.67504C16.5 12.6374 13.1417 15.8501 9 15.8501C8.51302 15.8507 8.02743 15.8057 7.54906 15.7158C7.20474 15.6512 7.03259 15.6188 6.9124 15.6372C6.79221 15.6556 6.62188 15.7461 6.28124 15.9273C5.3176 16.4398 4.19396 16.6207 3.11333 16.4197C3.52406 15.9145 3.80456 15.3084 3.92833 14.6586C4.00333 14.2611 3.8175 13.875 3.53917 13.5923C2.275 12.3086 1.5 10.5788 1.5 8.67504C1.5 4.71268 4.85833 1.5 9 1.5C13.1417 1.5 16.5 4.71268 16.5 8.67504Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <Path
      d="M7.5 7.38462C7.5 6.61991 8.17157 6 9 6C9.82843 6 10.5 6.61991 10.5 7.38462C10.5 7.66026 10.4127 7.91709 10.2623 8.13286C9.81405 8.77593 9 9.38914 9 10.1538V10.5"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    <Path
      d="M9 12.375H9.00674"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default FaqIcon;
