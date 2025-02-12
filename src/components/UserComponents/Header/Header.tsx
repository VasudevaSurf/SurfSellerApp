import React from 'react';
import {View, Image} from 'react-native';
import {Button} from '../Button/Button';
import {Typography} from '../Typography/Typography';
import {TypographyVariant} from '../Typography/Typography.types';
import {ButtonVariant} from '../Button/Button.types';
import {ColorPalette} from '../../../config/colorPalette';
import {headerStyles} from './Header.styles';
import {HeaderProps} from './Header.types';

export const Header: React.FC<HeaderProps> = ({
  image,
  name,
  rightIcons,
  variant = TypographyVariant.BODY_MEDIUM,
  textColor = ColorPalette.TextPrimary,
}) => {
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.leftSection}>
        {image && (
          <Image
            source={image.source || {uri: image.uri}}
            style={[headerStyles.profileImage, image.style]}
          />
        )}
        <View style={[headerStyles.nameContainer, !image && {marginLeft: 0}]}>
          <Typography
            variant={variant}
            text={name}
            customTextStyles={{color: textColor}}
          />
        </View>
      </View>

      <View style={headerStyles.rightSection}>
        {rightIcons.map((iconProps, index) => (
          <Button
            key={index}
            variant={ButtonVariant.TERTIARY}
            IconComponent={iconProps.icon}
            iconOnly
            onPress={iconProps.onPress}
            iconProps={{
              size: iconProps.size || 24,
              color: iconProps.color || ColorPalette.BorderPrimary,
              strokeWidth: iconProps.strokeWidth || 2,
            }}
            customButtonStyles={headerStyles.iconButton}
          />
        ))}
      </View>
    </View>
  );
};
