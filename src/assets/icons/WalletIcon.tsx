import React from 'react';
import Svg, {Path} from 'react-native-svg';

const WalletIcon = ({size = 26, color = '#4A4A4A', style}) => {
  return (
    <Svg
      width={size}
      height={size * (30 / 26)}
      viewBox="0 0 26 30"
      fill="none"
      style={style}>
      <Path
        d="M17 18.999C17 20.1036 17.8954 20.999 19 20.999C20.1046 20.999 21 20.1036 21 18.999C21 17.8945 20.1046 16.999 19 16.999C17.8954 16.999 17 17.8945 17 18.999Z"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M17.005 9.40277C9.76826 8.90131 3.80627 7.82747 1 6.99902V19.0809C1 21.7402 1 23.0698 1.82611 24.1542C2.65222 25.2386 3.78564 25.5448 6.05249 26.1573C9.71497 27.1469 13.5647 27.7363 17.0142 28.0734C20.5892 28.4227 22.3767 28.5973 23.6884 27.3987C25 26.2 25 24.2745 25 20.4234V17.7385C25 13.9987 25 12.1288 23.9239 10.9682C22.8478 9.80764 20.9002 9.67268 17.005 9.40277Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.5011 9.66602C21.0046 7.76832 21.4604 4.31697 20.1027 2.60324C19.2421 1.51704 17.9631 1.6214 16.709 1.73169C10.1172 2.31143 5.46059 3.48909 2.85735 4.28918C1.73797 4.63321 1 5.7263 1 6.9466"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default WalletIcon;
