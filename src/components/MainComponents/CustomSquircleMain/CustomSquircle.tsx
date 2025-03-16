import React from 'react';
import {ViewStyle} from 'react-native';
import {SquircleView, SquircleProps} from 'react-native-figma-squircle';

interface CustomSquircleProps {
  children: React.ReactNode;
  style?: ViewStyle;
  fillColor?: string;
  cornerRadius?: number;
  cornerSmoothing?: number;
}

/**
 * A reusable wrapper component for SquircleView with default styling
 * to ensure consistent squircle appearance across the app.
 */
export const CustomSquircle: React.FC<CustomSquircleProps> = ({
  children,
  style,
  fillColor = 'white',
  cornerRadius = 16,
  cornerSmoothing = 1.0,
}) => {
  // Default squircle parameters
  const defaultSquircleParams: SquircleProps['squircleParams'] = {
    cornerRadius,
    cornerSmoothing,
    fillColor,
  };

  return (
    <SquircleView style={style} squircleParams={defaultSquircleParams}>
      {children}
    </SquircleView>
  );
};
