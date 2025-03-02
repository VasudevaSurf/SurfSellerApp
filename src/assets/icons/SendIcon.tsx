import React from 'react';
import Svg, {Path} from 'react-native-svg';

const SendIcon = ({size = 24, color = 'white', style}) => {
  const aspectRatio = 20 / 23;
  const height = size * aspectRatio;

  return (
    <Svg
      width={size}
      height={height}
      viewBox="0 0 23 20"
      fill="none"
      style={style}>
      <Path
        d="M21.7846 10.9226C22.6051 10.5807 22.6051 9.41834 21.7846 9.07648L2.11719 0.88212C1.31113 0.546279 0.492019 1.33244 0.794504 2.1516L3.09381 8.37838C3.23885 8.77114 3.61321 9.03198 4.0319 9.03198H9.87098C10.4053 9.03198 10.8385 9.46516 10.8385 9.99952C10.8385 10.5339 10.4053 10.9671 9.87097 10.9671H4.03192C3.61322 10.9671 3.23885 11.2279 3.09383 11.6207L0.794428 17.8484C0.491972 18.6675 1.31111 19.4537 2.11716 19.1178L21.7846 10.9226Z"
        fill={color}
      />
    </Svg>
  );
};

export default SendIcon;
