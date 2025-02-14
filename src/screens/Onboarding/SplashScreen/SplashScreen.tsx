import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {STATIC_TEXT} from '../../../config/staticText';
import {globalStyles} from '../../../config/globalStyles';
import {styles} from './SplashScreen.styles';
import {MainBanner} from '../../../components/MainComponents/MainBanner/MainBanner';

const {surfTitle, surfCaption} = STATIC_TEXT.screens.onboarding;

const SplashScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('Welcome');
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim]);

  return (
    <Animated.View
      style={[
        {...globalStyles.primaryContainer, ...styles.mainContainer},
          {opacity: fadeAnim},
      ]}>
      <MainBanner
        surfTitle={surfTitle}
        customStyles={{
          primaryContainer: styles.primaryContainer,
          secondaryContainer: styles.secondaryContainer,
          logoImage: styles.imgOne,
          surfNameImage: styles.imgTwo,
          separator: styles.separator,
          heading: styles.modalHeading,
        }}
      />
      <View style={styles.footerContainer}>
        <Typography
          variant={TypographyVariant.PXSMALL_MEDIUM}
          text={surfCaption}
          customTextStyles={styles.footerText}
        />
      </View>
    </Animated.View>
  );
};

export default SplashScreen;
