import React from 'react';
import Svg, {Path} from 'react-native-svg';

const UnderlineIcon = ({size = 24, color = '#4A4A4A', style}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      style={style}>
      <Path
        d="M6 2.25V9C6 9.79565 6.31607 10.5587 6.87868 11.1213C7.44129 11.6839 8.20435 12 9 12C9.79565 12 10.5587 11.6839 11.1213 11.1213C11.6839 10.5587 12 9.79565 12 9V2.25H13.5V9C13.5 10.1935 13.0259 11.3381 12.182 12.182C11.3381 13.0259 10.1935 13.5 9 13.5C7.80653 13.5 6.66193 13.0259 5.81802 12.182C4.97411 11.3381 4.5 10.1935 4.5 9V2.25H6ZM3 15H15V16.5H3V15Z"
        fill={color}
      />
    </Svg>
  );
};

export default UnderlineIcon;
