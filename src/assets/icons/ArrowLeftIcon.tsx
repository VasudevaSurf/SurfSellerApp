import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorPalette} from '../../config/colorPalette';
import {TouchableOpacity} from 'react-native';

const ArrowLeftIcon = ({
  size = 24,
  color = ColorPalette.GREY_TEXT_500,
  strokeWidth = 1.5,
  style,
  onPress,
}) => {
  const scaleFactor = 24 / 14;

  const pathData = `M${0.775969 * scaleFactor} ${6.99972 * scaleFactor}L${
    7.27791 * scaleFactor
  } ${13.5033 * scaleFactor}L${8.47266 * scaleFactor} ${
    12.3103 * scaleFactor
  }L${3.16209 * scaleFactor} ${6.99972 * scaleFactor}L${
    8.47266 * scaleFactor
  } ${1.69084 * scaleFactor}L${7.27791 * scaleFactor} ${
    0.496094 * scaleFactor
  }L${0.775969 * scaleFactor} ${6.99972 * scaleFactor}Z`;

  return (
    <TouchableOpacity onPress={onPress}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        style={style}>
        <Path fillRule="evenodd" clipRule="evenodd" d={pathData} fill={color} />
      </Svg>
    </TouchableOpacity>
  );
};

export default ArrowLeftIcon;
