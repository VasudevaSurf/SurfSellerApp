import React from 'react';
import Svg, {Path} from 'react-native-svg';

const FlowBite = ({size = 24, color = '#4A4A4A', strokeWidth = 1.5, style}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      style={style}>
      <Path
        d="M11.7284 3.23788C12.3494 2.56507 12.6599 2.22866 12.9898 2.03244C13.7859 1.55897 14.7662 1.54424 15.5756 1.9936C15.9111 2.17983 16.2311 2.50677 16.8712 3.16063C17.5113 3.8145 17.8313 4.14144 18.0136 4.4841C18.4535 5.31093 18.4391 6.31233 17.9756 7.12559C17.7835 7.46263 17.4542 7.77981 16.7956 8.41417L8.95918 15.9619C7.71106 17.1641 7.08699 17.7651 6.30704 18.0698C5.52709 18.3744 4.66966 18.352 2.9548 18.3072L2.72147 18.3011C2.19941 18.2874 1.93838 18.2806 1.78665 18.1084C1.63491 17.9362 1.65563 17.6703 1.69706 17.1385L1.71956 16.8497C1.83617 15.353 1.89447 14.6046 2.18675 13.9318C2.47903 13.2591 2.98319 12.7129 3.99151 11.6204L11.7284 3.23788Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M10.834 3.33333L16.6673 9.16667"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M11.667 18.3333L18.3337 18.3333"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default FlowBite;
