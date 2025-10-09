import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import Toast, { BaseToastProps } from 'react-native-toast-message';
import CrossArrowsIcon from '../../../assets/icons/NewProductIcons/CrossArrowsIcon';
import { Typography } from '../../UserComponents/Typography/Typography';
import { TypographyVariant } from '../../UserComponents/Typography/Typography.types';
import { ColorPalette } from '../../../config/colorPalette';
import { Spacing } from '../../../config/globalStyles';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';

interface DynamicToastProps extends BaseToastProps {
  props?: {
    iconComponent?: ReactNode;
    customText?: string;
  };
}

export const ToastComponent = (props: DynamicToastProps) => {
  const message = props.props?.customText || props.text1;
  const Icon = props.props?.iconComponent;

  console.log('Toast Props:', props);

  return (
    <View style={styles.customToastContainer}>
      {Icon && Icon}

      <Typography
        variant={TypographyVariant.LSMALL_MEDIUM}
        text={message}
        customTextStyles={styles.customToastText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  customToastContainer: {
    // width: getScreenWidth(80),
    minHeight: getScreenHeight(6),
    borderRadius: Spacing.Small,
    backgroundColor: ColorPalette.White,
    paddingHorizontal: getScreenWidth(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(2),
    elevation: 8,
    shadowColor: ColorPalette.GREY_TEXT_200,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    marginBottom: getScreenHeight(3.5),
  },
  customToastText: {
    color: ColorPalette.GREY_TEXT_500,
    flexShrink: 1,
    paddingVertical: getScreenHeight(0.1)
  },
});


export const showCustomToast = (message: string, iconComponent: ReactNode) => {
  Toast.show({
    type: 'success',
    text1: message,
    props: {
      iconComponent,
      customText: message,
    },
    position: 'bottom',
    visibilityTime: 3000,
  });
};
