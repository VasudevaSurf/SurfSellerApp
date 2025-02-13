import React from 'react';
import Svg, {Path} from 'react-native-svg';

const InfoIcon = ({size = 24, color = '#5A5555', strokeWidth = 1.5, style}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}>
      <Path
        d="M12.9334 15.7334H12.0001V12.0001H11.0668M12.0001 8.26676H12.0094M20.4001 12.0001C20.4001 16.6393 16.6393 20.4001 12.0001 20.4001C7.36091 20.4001 3.6001 16.6393 3.6001 12.0001C3.6001 7.36091 7.36091 3.6001 12.0001 3.6001C16.6393 3.6001 20.4001 7.36091 20.4001 12.0001Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default InfoIcon;
