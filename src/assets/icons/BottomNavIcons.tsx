import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheet';

export const HomeIcon = ({
  size = 24,
  color = '#777777' as ColorValue,
  strokeWidth = 1.5,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      style={style}>
      <Path
        d="M14.0002 16C13.2007 16.6224 12.1505 17 11.0002 17C9.85 17 8.79977 16.6224 8.00024 16"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Path
        d="M1.35164 12.2135C0.998615 9.91624 0.822105 8.76763 1.25641 7.74938C1.69071 6.73112 2.65427 6.03443 4.58138 4.64106L6.02123 3.6C8.41853 1.86667 9.61718 1 11.0002 1C12.3833 1 13.582 1.86667 15.9793 3.6L17.4191 4.64106C19.3462 6.03443 20.3098 6.73112 20.7441 7.74938C21.1784 8.76763 21.0019 9.91624 20.6489 12.2135L20.3478 14.1724C19.8474 17.4289 19.5972 19.0572 18.4292 20.0286C17.2613 21 15.5539 21 12.1391 21H9.86143C6.44658 21 4.73915 21 3.57124 20.0286C2.40333 19.0572 2.15311 17.4289 1.65267 14.1724L1.35164 12.2135Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const ProductIcon = ({
  size = 24,
  color = '#777777' as ColorValue,
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
        d="M3.17001 7.43994L12 12.5499L20.77 7.46991"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 21.61V12.54"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.92999 2.48L4.59 5.45003C3.38 6.12003 2.39001 7.80001 2.39001 9.18001V14.83C2.39001 16.21 3.38 17.89 4.59 18.56L9.92999 21.53C11.07 22.16 12.94 22.16 14.08 21.53L19.42 18.56C20.63 17.89 21.62 16.21 21.62 14.83V9.18001C21.62 7.80001 20.63 6.12003 19.42 5.45003L14.08 2.48C12.93 1.84 11.07 1.84 9.92999 2.48Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 13.2401V9.58014L7.51001 4.1001"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const OrdersIcon = ({
  size = 24,
  color = '#777777' as ColorValue,
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
        d="M11.3495 3.83619C11.2848 4.04602 11.25 4.26894 11.25 4.5C11.25 4.91421 11.5858 5.25 12 5.25H16.5C16.9142 5.25 17.25 4.91421 17.25 4.5C17.25 4.26894 17.2152 4.04602 17.1505 3.83619M11.3495 3.83619C11.6328 2.91757 12.4884 2.25 13.5 2.25H15C16.0116 2.25 16.8672 2.91757 17.1505 3.83619M11.3495 3.83619C10.9739 3.85858 10.5994 3.88529 10.2261 3.91627C9.09499 4.01015 8.25 4.97324 8.25 6.10822V8.25M17.1505 3.83619C17.5261 3.85858 17.9006 3.88529 18.2739 3.91627C19.405 4.01015 20.25 4.97324 20.25 6.10822V16.5C20.25 17.7426 19.2426 18.75 18 18.75H15.75M8.25 8.25H4.875C4.25368 8.25 3.75 8.75368 3.75 9.375V20.625C3.75 21.2463 4.25368 21.75 4.875 21.75H14.625C15.2463 21.75 15.75 21.2463 15.75 20.625V18.75M8.25 8.25H14.625C15.2463 8.25 15.75 8.75368 15.75 9.375V18.75M7.5 15.75L9 17.25L12 13.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const AccountIcon = ({
  size = 24,
  color = '#777777' as ColorValue,
  strokeWidth = 1.5,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      style={style}>
      <Path
        d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M6.5 16C8.8317 13.5578 13.1432 13.4428 15.5 16M13.4951 8.5C13.4951 9.88071 12.3742 11 10.9915 11C9.60885 11 8.48797 9.88071 8.48797 8.5C8.48797 7.11929 9.60885 6 10.9915 6C12.3742 6 13.4951 7.11929 13.4951 8.5Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
};
