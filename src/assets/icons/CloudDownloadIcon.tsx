import React from 'react';
import Svg, {Path} from 'react-native-svg';

const CloudDownloadIcon = ({
  size = 18,
  color = '#3A5AFE',
  strokeWidth = 1.125,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size * (16 / 18)} // Maintain aspect ratio (18x16)
      viewBox="0 0 18 16"
      fill="none"
      style={style}>
      <Path
        d="M13.1082 5.7583C13.1138 5.75827 13.1194 5.75825 13.125 5.75825C14.989 5.75825 16.5 7.27207 16.5 9.13945C16.5 10.8798 15.1875 12.3131 13.5 12.5M13.1082 5.7583C13.1193 5.63454 13.125 5.50922 13.125 5.38257C13.125 3.10021 11.2782 1.25 9 1.25C6.84243 1.25 5.07175 2.9095 4.89032 5.02394M13.1082 5.7583C13.0315 6.61069 12.6965 7.38845 12.1821 8.01238M4.89032 5.02394C2.98799 5.2053 1.5 6.81044 1.5 8.76376C1.5 10.5813 2.78832 12.0974 4.5 12.4455M4.89032 5.02394C5.00869 5.01265 5.12867 5.00688 5.25 5.00688C6.09437 5.00688 6.87356 5.28646 7.50037 5.75825"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 8.75L9 14.75M9 8.75C8.47483 8.75 7.49365 10.2457 7.125 10.625M9 8.75C9.52517 8.75 10.5064 10.2457 10.875 10.625"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CloudDownloadIcon;
