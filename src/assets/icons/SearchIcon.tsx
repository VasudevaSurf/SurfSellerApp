import React from 'react';
import Svg, {Path} from 'react-native-svg';

const SearchIcon = ({
  size = 20,
  color = '#4A4A4A',
  strokeWidth = 1.5,
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
        d="M9.58332 17.5001C13.9556 17.5001 17.5 13.9557 17.5 9.58341C17.5 5.21116 13.9556 1.66675 9.58332 1.66675C5.21107 1.66675 1.66666 5.21116 1.66666 9.58341C1.66666 13.9557 5.21107 17.5001 9.58332 17.5001Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.3333 18.3334L16.6667 16.6667"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SearchIcon;