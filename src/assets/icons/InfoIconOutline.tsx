import React from 'react';
import Svg, {Path} from 'react-native-svg';

const InfoIconOutline = ({
  size = 20,
  color = '#4A4A4A',
  strokeWidth = 1.25,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      style={style}>
      <Path
        d="M10.7775 13.1111H9.99976V10H9.22198M9.99976 6.88889H10.0075M16.9998 10C16.9998 13.866 13.8657 17 9.99976 17C6.13376 17 2.99976 13.866 2.99976 10C2.99976 6.13401 6.13376 3 9.99976 3C13.8657 3 16.9998 6.13401 16.9998 10Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default InfoIconOutline;
