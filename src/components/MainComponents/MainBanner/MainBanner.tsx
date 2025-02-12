import React from 'react';
import {View, Image} from 'react-native';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {styles} from './MainBanner.styles';
import {MainBannerProps} from './MainBanner.types';

export const MainBanner: React.FC<MainBannerProps> = ({
  surfTitle,
  logoImage = require('../../../assets/images/logo.png'),
  surfNameImage = require('../../../assets/images/surfName.png'),
  customStyles = {},
}) => {
  return (
    <View style={[styles.container, customStyles.container]}>
      <Image
        source={logoImage}
        style={[styles.logoImage, customStyles.logoImage]}
        resizeMode="contain"
      />
      <Image
        source={surfNameImage}
        style={[styles.surfNameImage, customStyles.surfNameImage]}
        resizeMode="contain"
      />
      <View style={[styles.separator, customStyles.separator]} />
      <Typography
        variant={TypographyVariant.HEADING_SMALL}
        text={surfTitle}
        customTextStyles={[styles.heading, customStyles.heading]}
      />
    </View>
  );
};
