import React from 'react';
import Svg, {Path} from 'react-native-svg';

const BankOutlineIcon = ({size = 32, color = '#606060', style}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      style={style}>
      <Path
        d="M8.66669 13.333H6.00002V22.6663H8.66669V13.333ZM16.6667 13.333H14V22.6663H16.6667V13.333ZM28 25.333H2.66669V27.9997H28V25.333ZM24.6667 13.333H22V22.6663H24.6667V13.333ZM15.3334 4.34634L22.28 7.99967H8.38669L15.3334 4.34634ZM15.3334 1.33301L2.66669 7.99967V10.6663H28V7.99967L15.3334 1.33301Z"
        fill={color}
      />
    </Svg>
  );
};

export default BankOutlineIcon;
