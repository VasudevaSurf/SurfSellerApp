import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';

interface SuccessTickSquareIconProps {
    size?: number;
    backgroundColor?: string;
    tickColor?: string;
    borderRadius?: number;
    style?: StyleProp<ViewStyle>;
}

const SuccessTickSquareIcon: React.FC<SuccessTickSquareIconProps> = ({
    size = 24,
    backgroundColor = '#4CAF50',
    tickColor = '#FFFFFF',
    borderRadius = 4,
    style,
}) => {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            style={style}
        >
            {/* ✅ Rounded Square Background */}
            <Rect
                x="0"
                y="0"
                width="24"
                height="24"
                rx={borderRadius}
                fill={backgroundColor}
            />

            {/* ✅ White Tick Path */}
            <Path
                d="M7 12.5L10.2 15.7L17 8.5"
                stroke={tickColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default SuccessTickSquareIcon;
