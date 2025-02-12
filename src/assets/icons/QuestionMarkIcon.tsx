import React from 'react';
import Svg, {Path} from 'react-native-svg';

const QuestionMarkIcon = ({
  size = 24,
  color = '#4A4A4A',
  strokeWidth = 1.5,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}>
      <Path
        d="M10.0203 7.81769C11.1138 6.8609 12.8866 6.8609 13.9801 7.81769C15.0736 8.77447 15.0736 10.3257 13.9801 11.2825C13.7898 11.449 13.5789 11.5866 13.3546 11.6951C12.6586 12.032 12.0002 12.6269 12.0002 13.4001V14.1001M20.4 12.0001C20.4 16.6393 16.6392 20.4001 12 20.4001C7.36081 20.4001 3.60001 16.6393 3.60001 12.0001C3.60001 7.36091 7.36081 3.6001 12 3.6001C16.6392 3.6001 20.4 7.36091 20.4 12.0001ZM12 16.9001H12.007V16.9071H12V16.9001Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default QuestionMarkIcon;
