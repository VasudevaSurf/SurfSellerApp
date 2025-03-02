import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Typography} from '../Typography/Typography';
import {TypographyVariant} from '../Typography/Typography.types';
import {createBadgeStyles, getTextColor} from './Badge.styles';
import {BadgeProps, BadgeType, BadgeVariant} from './Badge.types';

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = BadgeVariant.FILLED,
  type = BadgeType.PRIMARY,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  iconSize = 16,
  iconStrokeWidth = 2,
  customContainerStyle,
  onPress,
  disabled = false,
  textVariant = TypographyVariant.LSMALL_BOLD,
  customTextColor,
  customBorderColor,
}) => {
  const styles = createBadgeStyles(
    type,
    variant,
    customTextColor,
    customBorderColor,
  );
  const Container = onPress ? TouchableOpacity : View;
  const iconColor = getTextColor(type, variant, customTextColor);

  const containerProps = {
    style: [
      styles.container,
      disabled && styles.disabled,
      customContainerStyle,
    ],
    ...(onPress && {
      onPress: disabled ? undefined : onPress,
      activeOpacity: 0.7,
    }),
  };

  return (
    <Container {...containerProps}>
      {LeftIcon && (
        <View style={styles.icon}>
          <LeftIcon
            size={iconSize}
            color={iconColor}
            strokeWidth={iconStrokeWidth}
          />
        </View>
      )}
      <Typography variant={textVariant} customTextStyles={styles.text}>
        {text}
      </Typography>
      {RightIcon && (
        <View style={styles.icon}>
          <RightIcon
            size={iconSize}
            color={iconColor}
            strokeWidth={iconStrokeWidth}
          />
        </View>
      )}
    </Container>
  );
};
