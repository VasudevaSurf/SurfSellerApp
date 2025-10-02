import React from 'react';
import Svg, { Path, Line } from 'react-native-svg';

const TermsConditionsIcon = ({ size = 24, color = '#8E8E8E', strokeWidth = 1.5 }) => {
    const topPadding = 2.5;
    const bottomPadding = 2.5;
    const linesCount = 3;
    const lineSpacing = (16 - topPadding - bottomPadding) / (linesCount + 0.5);
    const lineStartX = 3;
    const lineEndX = 10;

    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 14 18"
            fill="none"
        >
            <Path
                d="M3 0.75H10C11.2426 0.75 12.25 1.75736 12.25 3V15C12.25 16.2426 11.2426 17.25 10 17.25H3C1.75736 17.25 0.75 16.2426 0.75 15V3C0.75 1.75736 1.75736 0.75 3 0.75Z"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {Array.from({ length: linesCount }).map((_, i) => {
                const y = topPadding + lineSpacing * (i + 1);
                return (
                    <Line
                        key={i}
                        x1={lineStartX}
                        y1={y}
                        x2={lineEndX}
                        y2={y}
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                    />
                );
            })}
        </Svg>
    );
};

export default TermsConditionsIcon;
