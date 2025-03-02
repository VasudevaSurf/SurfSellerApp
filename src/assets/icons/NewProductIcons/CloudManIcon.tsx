import React from 'react';
import Svg, {Path} from 'react-native-svg';

const CloudManIcon = ({
  size = 62,
  color = '#3A5AFE',
  strokeWidth = 2,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size * (56 / 62)}
      viewBox="0 0 62 56"
      fill="none"
      style={style}>
      <Path
        d="M46.9769 19.2823C46.9987 19.2822 47.0205 19.2821 47.0423 19.2821C54.2911 19.2821 60.1673 25.1691 60.1673 32.4312C60.1673 39.1994 55.0631 44.7732 48.5006 45.5M46.9769 19.2823C47.0202 18.801 47.0423 18.3136 47.0423 17.8211C47.0423 8.94527 39.8602 1.75 31.0006 1.75C22.6101 1.75 15.7241 8.20362 15.0186 16.4264M46.9769 19.2823C46.6787 22.5971 45.3758 25.6218 43.3756 28.0481M15.0186 16.4264C7.62059 17.1317 1.83398 23.3739 1.83398 30.9702C1.83398 38.0384 6.84412 43.9343 13.5007 45.288M15.0186 16.4264C15.4789 16.3825 15.9455 16.3601 16.4173 16.3601C19.701 16.3601 22.7312 17.4473 25.1687 19.2821"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M31.0007 30.9167L31.0007 54.2501M31.0007 30.9167C28.9583 30.9167 25.1426 36.7335 23.709 38.2084M31.0007 30.9167C33.043 30.9167 36.8587 36.7335 38.2923 38.2084"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CloudManIcon;
