import React, {useEffect} from 'react';
import {Animated, SafeAreaView, View} from 'react-native';
import {Button} from '../../../components/UserComponents/Button/Button';
import {
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../../components/UserComponents/Button/Button.types';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {globalStyles} from '../../../config/globalStyles';
import {STATIC_TEXT} from '../../../config/staticText';
import {styles} from './VATSuccess.styles';

const {yourSet, yourVerified, goDashboard} = STATIC_TEXT.screens.vatSuccess;

const VATSuccess = () => {
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
    ]).start();
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
          text={yourSet}
          customTextStyles={styles.title}
        />
        <Typography
          variant={TypographyVariant.LMEDIUM_REGULAR}
          text={yourVerified}
          customTextStyles={styles.subtitle}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text={goDashboard}
          onPress={() => {}}
          variant={ButtonVariant.PRIMARY}
          state={ButtonState.DEFAULT}
          size={ButtonSize.MEDIUM}
        />
      </View>
    </SafeAreaView>
  );
};

export default VATSuccess;
