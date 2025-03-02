import React, {useEffect} from 'react';
import {Animated, SafeAreaView, View} from 'react-native';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {globalStyles} from '../../../config/globalStyles';
import {STATIC_TEXT} from '../../../config/staticText';
import {navigateToMain} from '../../../navigation/utils/navigationRef';
import {styles} from './AuthSuccessScreen.styles';

const successTitle = STATIC_TEXT.screens.authSuccess.successTitle;

const AuthSuccessScreen = () => {
  const scaleValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigate to Dashboard after animation completes
      setTimeout(() => {
        navigateToMain();
      }, 500);
    });
  }, []);

  const animatedStyle = {
    transform: [{scale: scaleValue}],
    opacity: opacityValue,
  };

  return (
    <SafeAreaView style={[globalStyles.secondaryContainer, styles.container]}>
      <Animated.Image
        source={require('../../../assets/images/success.png')}
        style={[styles.successImage, animatedStyle]}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Typography
          variant={TypographyVariant.H6_BOLD}
          text={successTitle}
          customTextStyles={styles.title}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthSuccessScreen;
