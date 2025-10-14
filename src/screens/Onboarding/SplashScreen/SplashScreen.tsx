import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';
import {MainBanner} from '../../../components/MainComponents/MainBanner/MainBanner';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {globalStyles} from '../../../config/globalStyles';
import {STATIC_TEXT} from '../../../config/staticText';
import {styles} from './SplashScreen.styles';

const {surfTitle, surfCaption} = STATIC_TEXT.screens.onboarding;

const SplashScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Just handle the animation, don't check auth here since RootNavigator handles it
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
