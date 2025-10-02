// SuccessTickIcon.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface SuccessTickIconProps {
  size?: number;
}

const SuccessTickIcon: React.FC<SuccessTickIconProps> = ({ size = 120 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 135 134" fill="none">
      {/* Outer Circle */}
      <Path
        d="M134.5 67C134.5 29.9969 104.503 0 67.5 0C30.4969 0 0.5 29.9969 0.5 67C0.5 104.003 30.4969 134 67.5 134C104.503 134 134.5 104.003 134.5 67Z"
        fill="#E9F9F1"
      />

      {/* Inner Circle + Tick */}
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40.5 0C29.8913 0 19.7172 4.2143 12.2157 11.7157C4.7143 19.2172 0.5 29.3913 0.5 40C0.5 50.6087 4.7143 60.7828 12.2157 68.2843C19.7172 75.786 29.8913 80 40.5 80C51.1087 80 61.2828 75.786 68.7843 68.2843C76.286 60.7828 80.5 50.6087 80.5 40C80.5 29.3913 76.286 19.2172 68.7843 11.7157C61.2828 4.2143 51.1087 0 40.5 0ZM38.2173 57.12L61.2467 28.3307L57.0867 25.0027L37.4493 49.5413L23.54 37.952L20.1267 42.048L38.2173 57.12Z"
        fill="#1FC16B"
        transform="translate(27, 27)" // centers the inner tick
      />
    </Svg>
  );
};

export default SuccessTickIcon;
