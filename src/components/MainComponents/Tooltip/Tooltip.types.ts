import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
    target: ReactNode;
    content: ReactNode;
    placement?: TooltipPlacement;
    onClose?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    arrowSize?: number;
    backgroundColor?: string;
}

export interface TooltipPosition {
    top: number;
    left: number;
    arrowStyle: object;
}