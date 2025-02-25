import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const StockHomeIcon = ({
  size = 5,
  circleColor = 'white',
  crossColor = '#D00416',
  style,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 5 5" fill="none" style={style}>
      <Circle cx="2.5" cy="2.5" r="2" fill={circleColor} />
      <Path
        d="M3.03496 3.39504C2.93996 3.39504 2.84496 3.36005 2.76996 3.28505L1.71495 2.23006C1.56995 2.08506 1.56995 1.84506 1.71495 1.70006C1.85995 1.55506 2.09995 1.55506 2.24495 1.70006L3.29996 2.75505C3.44496 2.90005 3.44496 3.14005 3.29996 3.28505C3.22496 3.36005 3.12996 3.39504 3.03496 3.39504Z"
        fill={crossColor}
      />
      <Path
        d="M1.96506 3.4102C1.87006 3.4102 1.77506 3.37519 1.70006 3.30019C1.55506 3.15519 1.55506 2.91519 1.70006 2.77019L2.75507 1.7152C2.90007 1.5702 3.14007 1.5702 3.28507 1.7152C3.43007 1.8602 3.43007 2.10019 3.28507 2.24519L2.23006 3.30019C2.15506 3.37519 2.06006 3.4102 1.96506 3.4102Z"
        fill={crossColor}
      />
    </Svg>
  );
};

export default StockHomeIcon;
