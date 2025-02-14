import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Typography} from '../Typography/Typography';
import {TypographyVariant} from '../Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {headerStyles} from './Header.styles';
import {HeaderProps} from './Header.types';

export const Header: React.FC<HeaderProps> = ({
  image,
  name,
  rightIcons,
  variant = TypographyVariant.LSMALL_BOLD,
  textColor = ColorPalette.GREY_TEXT_500,
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
        {rightIcons.map((iconProps, index) => {
          const Icon = iconProps.icon;
          return (
            <TouchableOpacity
              key={index}
              onPress={iconProps.onPress}
              style={headerStyles.iconButton}>
              <Icon
                size={iconProps.size || 24}
                color={iconProps.color || ColorPalette.GREY_TEXT_400}
                strokeWidth={iconProps.strokeWidth || 2}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
