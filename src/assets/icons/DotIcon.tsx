import React from 'react';
import Svg, {Path} from 'react-native-svg';

const DotIcon = ({size = 6, color = 'white', style}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 6 6" fill="none" style={style}>
      <Path
        d="M6 3C6 1.34315 4.65685 0 3 0C1.34315 0 0 1.34315 0 3C0 4.65685 1.34315 6 3 6C4.65685 6 6 4.65685 6 3Z"
        fill={color}
      />
    </Svg>
  );
};

export default DotIcon;
