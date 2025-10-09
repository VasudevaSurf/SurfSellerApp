import React, { useState, useCallback } from 'react';
import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import CloseIcon from '../../../assets/icons/CloseIcon';
import { ColorPalette } from '../../../config/colorPalette';
import { styles } from './Tooltip.styles';
import { TooltipPosition, TooltipProps } from './Tooltip.types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const PADDING = 10;
const DEFAULT_BG = '#FFFFFF';

const Tooltip: React.FC<TooltipProps> = ({
    target,
    content,
    placement = 'bottom',
    containerStyle = {},
    arrowSize = 8,
    backgroundColor = DEFAULT_BG,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [targetLayout, setTargetLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(null);
    const targetRef = React.useRef(null);

    // --- MEASUREMENT FUNCTIONS ---
    const measureTarget = useCallback(() => {
        if (targetRef.current) {
            targetRef.current.measureInWindow((x, y, width, height) => {
                if (width > 0 && height > 0) {
                    setTargetLayout({ x, y, width, height });
                }
            });
        }
    }, []);

    const handleTargetLayout = useCallback(() => {
        measureTarget();
    }, [measureTarget]);

    // --- POSITION CALCULATION ---
    const calculatePosition = useCallback(
        (tooltipWidth: number, tooltipHeight: number): TooltipPosition => {
            const { x, y, width, height } = targetLayout;
            let finalTop = 0;
            let finalLeft = 0;
            let arrowStyle: object = {};

            const targetCenterH = x + width / 2;
            const targetCenterV = y + height / 2;
            const ARROW_COLOR = backgroundColor;

            // --- Horizontal (Left/Right) Placement ---
            if (placement === 'left' || placement === 'right') {
                finalTop = targetCenterV - tooltipHeight / 2;

                if (placement === 'right') {
                    finalLeft = x + width + arrowSize;
                    arrowStyle = {
                        borderTopWidth: arrowSize, borderBottomWidth: arrowSize, borderRightWidth: arrowSize,
                        borderTopColor: 'transparent', borderBottomColor: 'transparent', BorderleftColor: 'transparent',
                        borderRightColor: ARROW_COLOR,
                        left: -arrowSize,
                        top: tooltipHeight / 2 - arrowSize,
                    };
                } else {
                    finalLeft = x - tooltipWidth - arrowSize;
                    arrowStyle = {
                        borderTopWidth: arrowSize, borderBottomWidth: arrowSize, borderLeftWidth: arrowSize,
                        borderTopColor: 'transparent', borderBottomColor: 'transparent', borderRightColor: 'transparent',
                        borderLeftColor: ARROW_COLOR,
                        right: -arrowSize,
                        top: tooltipHeight / 2 - arrowSize,
                    };
                }
            }

            else {
                finalLeft = Math.max(
                    PADDING,
                    Math.min(
                        SCREEN_WIDTH - tooltipWidth - PADDING,
                        targetCenterH - tooltipWidth / 2
                    )
                );
                const arrowLeft = targetCenterH - finalLeft - arrowSize;

                if (placement === 'bottom') {
                    finalTop = y + height + arrowSize;
                    arrowStyle = {
                        borderLeftWidth: arrowSize, borderRightWidth: arrowSize, borderBottomWidth: arrowSize,
                        borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: 'transparent',
                        borderBottomColor: ARROW_COLOR,
                        left: arrowLeft,
                        top: -arrowSize,
                    };
                } else {
                    finalTop = y - tooltipHeight - arrowSize;
                    arrowStyle = {
                        borderLeftWidth: arrowSize, borderRightWidth: arrowSize, borderTopWidth: arrowSize,
                        borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: 'transparent',
                        borderTopColor: ARROW_COLOR,
                        left: arrowLeft,
                        bottom: -arrowSize,
                    };
                }
            }

            const finalArrowStyle = {
                ...arrowStyle,
                position: 'absolute',
                width: 0,
                height: 0,
                backgroundColor: 'transparent'
            };

            return { top: finalTop, left: finalLeft, arrowStyle: finalArrowStyle };
        },
        [targetLayout, placement, arrowSize, backgroundColor]
    );

    // --- TOOLTIP STATE & LIFECYCLE ---
    const toggleTooltip = () => {
        if (targetRef.current) {
            targetRef.current.measureInWindow((x, y, width, height) => {
                if (width > 0 && height > 0) {
                    setTargetLayout({ x, y, width, height });
                    setTooltipPosition(null);
                    setIsVisible(prev => !prev);
                }
            });
        }
    };

    const handleTooltipLayout = useCallback(
        (event) => {
            const { width, height } = event.nativeEvent.layout;
            if (width > 0 && height > 0 && isVisible) {
                const calculatedPosition = calculatePosition(width, height);
                setTooltipPosition(calculatedPosition);
            }
        },
        [calculatePosition, isVisible]
    );

    return (
        <>
            <TouchableOpacity ref={targetRef} onPress={toggleTooltip} onLayout={handleTargetLayout}>
                {target}
            </TouchableOpacity>

            <Modal
                visible={isVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={toggleTooltip}
            >
                {/* Close modal when background is pressed */}
                <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={toggleTooltip} />

                {tooltipPosition && (
                    <View
                        style={[
                            styles.tooltipContainer,
                            {
                                top: tooltipPosition.top,
                                left: tooltipPosition.left,
                                backgroundColor: backgroundColor,
                            },
                            containerStyle,
                        ]}
                    >
                        {/* Arrow Element - Fix: Arrow relies on parent shadow */}
                        <View style={tooltipPosition.arrowStyle} />

                        {/* Content and Close Button */}
                        <View style={styles.contentWrapper}>
                            <View style={styles.content}>
                                {content}
                            </View>
                            <TouchableOpacity onPress={toggleTooltip}>
                                <CloseIcon size={16} color={ColorPalette.GREY_TEXT_200} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* Hidden view for measuring the tooltip box size on first render */}
                {/* This is essential for getting `tooltipWidth` and `tooltipHeight` */}
                {!tooltipPosition && isVisible && (
                    <View
                        style={[
                            styles.tooltipContainer,
                            { opacity: 0, position: 'absolute', backgroundColor: backgroundColor },
                            containerStyle,
                        ]}
                        onLayout={handleTooltipLayout}
                    >
                        {/* Render content temporarily to measure its dimensions */}
                        <View style={styles.contentWrapper}>
                            <View style={styles.content}>
                                {content}
                            </View>
                            <TouchableOpacity onPress={toggleTooltip}>
                                <CloseIcon size={16} color={ColorPalette.GREY_TEXT_200} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Modal>
        </>
    );
};

export default Tooltip;
