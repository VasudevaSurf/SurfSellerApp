import React, {useEffect, useRef} from 'react';
import {View, Image, Animated} from 'react-native';
import {Typography} from '../../../components/Typography/Typography';
import {TypographyVariant} from '../../../components/Typography/Typography.types';
import {STATIC_TEXT} from '../../../config/staticText';
import {globalStyles} from '../../../config/globalStyles';
import {styles} from './SplashScreen.styles';

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
      <View style={styles.primaryContainer}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.imgOne}
          resizeMode="contain"
        />
        <Image
          source={require('../../../assets/images/surfName.png')}
          style={styles.imgTwo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.secondaryContainer}>
        <Typography
          variant={TypographyVariant.HEADING_SMALL}
          text="|"
          customTextStyles={styles.separator}
        />
        <Typography
          variant={TypographyVariant.HEADING_SMALL}
          text={surfTitle}
          customTextStyles={styles.modalHeading}
        />
      </View>
      <View style={styles.footerContainer}>
        <Typography
          variant={TypographyVariant.BODY_MEDIUM}
          text={surfCaption}
          customTextStyles={styles.footerText}
        />
      </View>
    </Animated.View>
  );
};

export default SplashScreen;
