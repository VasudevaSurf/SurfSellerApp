import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const TrashIcon2 = ({ size = 18, color = "#FB3748" }) => (
  <Svg width={size} height={size} viewBox="0 0 15 18" fill="none">
    <Path
      d="M13.125 4.125L12.6602 11.6438C12.5415 13.5648 12.4821 14.5253 12.0006 15.2159C11.7625 15.5573 11.456 15.8455 11.1005 16.062C10.3816 16.5 9.41924 16.5 7.49456 16.5C5.56734 16.5 4.60373 16.5 3.88429 16.0612C3.5286 15.8443 3.222 15.5556 2.98401 15.2136C2.50266 14.5219 2.44459 13.5601 2.32846 11.6364L1.875 4.125"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
    />
    <Path
      d="M0.75 4.125H14.25M10.5418 4.125L10.0298 3.0688C9.68968 2.36719 9.51963 2.01639 9.22628 1.7976C9.16122 1.74907 9.09232 1.70591 9.02027 1.66853C8.69543 1.5 8.30559 1.5 7.5259 1.5C6.72662 1.5 6.32699 1.5 5.99676 1.67559C5.92357 1.71451 5.85374 1.75942 5.78797 1.80988C5.49123 2.03753 5.32547 2.40116 4.99395 3.12844L4.53969 4.125"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
    />
    <Path
      d="M5.625 12.375L5.625 7.875"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
    />
    <Path
      d="M9.375 12.375L9.375 7.875"
      stroke={color}
      strokeWidth={1.125}
      strokeLinecap="round"
    />
  </Svg>
);
