import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {Typography} from '../Typography/Typography';
import {TypographyVariant} from '../Typography/Typography.types';
import {headerStyles} from './Header.styles';
import {HeaderProps} from './Header.types';
import {Badge} from '../Badges/Badge';
import {BadgeType, BadgeVariant} from '../Badges/Badge.types';
import DotIcon from '../../../assets/icons/DotIcon';

export const Header: React.FC<HeaderProps> = ({
  image,
  name,
  rightIcons,
  variant = TypographyVariant.LSMALL_BOLD,
  textColor = ColorPalette.GREY_TEXT_500,
  leftIcon,
  subHeader,
  subText,
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
        {leftIcon && (
          <View style={[headerStyles.leftIconContainer]}>{leftIcon}</View>
        )}
        <View style={[headerStyles.nameContainer, !image && {marginLeft: 0}]}>
          <Typography
            variant={variant}
            text={name}
            customTextStyles={{color: textColor}}
          />
          {subHeader && (
            <View style={headerStyles.badgeWrapper}>
              <Badge
                text={subText}
                type={BadgeType.PRIMARY}
                variant={BadgeVariant.FILLED}
                onPress={() => {}}
                customContainerStyle={headerStyles.badgeContainer}
                textVariant={TypographyVariant.LXSMALL_MEDIUM}
                leftIcon={DotIcon}
                iconSize={6}
              />
            </View>
          )}
        </View>
      </View>

      <View style={headerStyles.rightSection}>
        {rightIcons &&
          rightIcons.map((item, index) => {
            // Check if the item is a badge config
            if (item.isBadge) {
              return (
                <Badge
                  key={index}
                  text={item.text || ''}
                  type={item.badgeType || BadgeType.PRIMARY}
                  variant={item.badgeVariant || BadgeVariant.FILLED}
                  onPress={item.onPress}
                  customContainerStyle={item.customContainerStyle}
                  textVariant={
                    item.textVariant || TypographyVariant.LXSMALL_MEDIUM
                  }
                  leftIcon={item.leftIcon}
                  rightIcon={item.rightIcon}
                  iconSize={item.iconSize || 16}
                  iconStrokeWidth={item.iconStrokeWidth || 2}
                  customTextColor={item.customTextColor}
                  customBorderColor={item.customBorderColor}
                  disabled={item.disabled}
                />
              );
            }
            // Regular icon case
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={index}
                onPress={item.onPress}
                style={headerStyles.iconButton}>
                <Icon
                  size={item.size || 24}
                  color={item.color || ColorPalette.GREY_TEXT_400}
                  strokeWidth={item.strokeWidth || 2}
                />
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};
