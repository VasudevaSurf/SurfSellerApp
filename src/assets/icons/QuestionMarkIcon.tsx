import React from 'react';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

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
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} />

      <Path
        d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      <Path
        d="M11.992 17H12.001"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default QuestionMarkIcon;
