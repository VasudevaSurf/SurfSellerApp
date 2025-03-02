import React from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  Modal as RNModal,
} from 'react-native';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import CloseIcon from '../../../assets/icons/CloseIcon';
import {styles} from './AddModal.styles';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../UserComponents/Button';

export interface ButtonConfig {
  text: string;
  onPress: () => void;
  variant?: ButtonVariant;
  state?: ButtonState;
  type?: ButtonType;
  size?: ButtonSize;
  customStyles?: StyleProp<ViewStyle>;
  customTextStyles?: StyleProp<ViewStyle>;
  disabled?: boolean;
  bgColor?: string;
  IconComponent?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  useGradient?: boolean;
}

export interface AddModalProps {
  isVisible: boolean;
  onClose: () => void;
  headerText?: string;
  showCloseIcon?: boolean;
  buttons: ButtonConfig[];
  containerStyle?: StyleProp<ViewStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  backdropOpacity?: number;
  backdropColor?: string;
  animationIn?: string;
  animationOut?: string;
}

export const AddModal: React.FC<AddModalProps> = ({
  isVisible,
  onClose,
  headerText,
  showCloseIcon = true,
  buttons = [],
  containerStyle,
  footerStyle,
  backdropOpacity = 0.5,
  backdropColor = 'rgba(0,0,0,0.24)',
  animationIn = 'slideInUp',
  animationOut = 'slideOutDown',
}) => {
  return (
    <RNModal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: backdropColor ? backdropColor : 'rgba(0,0,0,0.24)',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onPress={onClose}
          activeOpacity={1}
        />
        <View style={[styles.modalContainer, containerStyle]}>
          <View style={styles.header}>
            {headerText ? (
              <>
                <View style={styles.headerContent}>
                  <Typography
                    variant={TypographyVariant.PMEDIUM_REGULAR}
                    text={headerText}
                    customTextStyles={styles.headerText}
                  />
                </View>

                {showCloseIcon && (
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeButton}>
                    <CloseIcon color={ColorPalette.GREY_TEXT_400} size={24} />
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <>
                <View style={styles.headerContent} />
                {showCloseIcon && (
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeButton}>
                    <CloseIcon color={ColorPalette.GREY_TEXT_400} size={24} />
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
          <View style={[styles.footer, footerStyle]}>
            {buttons.map((button, index) => (
              <Button
                key={`modal-button-${index}`}
                text={button.text}
                onPress={button.onPress}
                variant={button.variant || ButtonVariant.PRIMARY}
                state={button.state || ButtonState.DEFAULT}
                type={button.type || ButtonType.FILLED}
                size={button.size || ButtonSize.MEDIUM}
                customStyles={[
                  index > 0 && styles.buttonSpacing,
                  button.customStyles,
                ]}
                customTextStyles={button.customTextStyles}
                disabled={button.disabled}
                bgColor={button.bgColor}
                IconComponent={button.IconComponent}
                iconPosition={button.iconPosition}
                useGradient={button.useGradient}
              />
            ))}
          </View>
        </View>
      </View>
    </RNModal>
  );
};
