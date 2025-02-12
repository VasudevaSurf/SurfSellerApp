import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../../components/UserComponents/Header/Header';
import SearchIcon from '../../../assets/icons/SearchIcon';
import BellIcon from '../../../assets/icons/BellIcon';
import QuestionMarkIcon from '../../../assets/icons/QuestionMarkIcon';
import {ColorPalette} from '../../../config/colorPalette';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';

const ProductScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name="Products"
        variant={TypographyVariant.BODY_LARGE_PAGE}
        textColor={ColorPalette.TextTertiary}
        rightIcons={[
          {
            icon: SearchIcon,
            onPress: () => console.log('Arrow left pressed'),
            size: 20,
            color: ColorPalette.BorderPrimary,
            strokeWidth: 2,
          },
          {
            icon: BellIcon,
            onPress: () => console.log('Arrow left pressed'),
            size: 20,
            color: ColorPalette.BorderPrimary,
            strokeWidth: 2,
          },
          {
            icon: QuestionMarkIcon,
            onPress: () => console.log('Arrow left pressed'),
            size: 24,
            color: ColorPalette.BorderPrimary,
            strokeWidth: 2,
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default ProductScreen;
