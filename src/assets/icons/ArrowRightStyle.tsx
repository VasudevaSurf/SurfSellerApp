import React from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const ArrowRightStyle = ({
  size = 24,
  color,
  strokeWidth = 1.5,
  style,
  onPress,
}) => {
  // Calculate the width and height while maintaining aspect ratio
  const aspectRatio = 8 / 14;
  const calculatedWidth = size * aspectRatio;
  const calculatedHeight = size;

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Svg
        width={calculatedWidth}
        height={calculatedHeight}
        viewBox="0 0 8 14"
        fill="none"
        style={style}
      >
        <Path
          d="M1.00005 1C1.00005 1 6.99999 5.41893 7 7.00005C7.00001 8.58116 1 13 1 13"
          stroke={color ? color : "url(#paint0_linear_2545_35003)"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {!color && (
          <Defs>
            <LinearGradient
              id="paint0_linear_2545_35003"
              x1="7"
              y1="1.72"
              x2="-2.25678"
              y2="6.07069"
              gradientUnits="userSpaceOnUse"
            >
              <Stop stopColor="#A600F7" />
              <Stop offset="1" stopColor="#9101CF" />
            </LinearGradient>
          </Defs>
        )}
      </Svg>
    </TouchableOpacity>
  );
};

export default ArrowRightStyle;
