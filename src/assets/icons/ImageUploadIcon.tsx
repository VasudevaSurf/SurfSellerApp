import React from 'react';
import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

const ImageUploadIcon = ({
  size = 16,
  color = '#606060',
  strokeWidth = 1,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      style={style}>
      <G clipPath="url(#clip0_1735_32866)">
        <Path
          d="M14.6666 7.99967C14.6666 11.1423 14.6666 12.7137 13.6899 13.6897C12.7146 14.6663 11.1426 14.6663 7.99992 14.6663C4.85725 14.6663 3.28592 14.6663 2.30925 13.6897C1.33325 12.7143 1.33325 11.1423 1.33325 7.99967C1.33325 4.85701 1.33325 3.28567 2.30925 2.30901C3.28659 1.33301 4.85725 1.33301 7.99992 1.33301"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <Path
          d="M1.33325 8.33261L2.50125 7.31061C2.79401 7.05466 3.17308 6.9195 3.56173 6.9325C3.95038 6.94549 4.31958 7.10567 4.59459 7.38061L7.45459 10.2406C7.67652 10.4625 7.96962 10.599 8.28229 10.6261C8.59495 10.6531 8.90715 10.5691 9.16392 10.3886L9.36325 10.2486C9.73365 9.98847 10.1813 9.86166 10.6331 9.8889C11.0849 9.91615 11.5141 10.0958 11.8506 10.3986L13.9999 12.3326"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <Path
          d="M11.3333 1.33301V7.33301M11.3333 1.33301L13.3333 3.33301M11.3333 1.33301L9.33325 3.33301"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1735_32866">
          <Rect width="16" height="16" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default ImageUploadIcon;
