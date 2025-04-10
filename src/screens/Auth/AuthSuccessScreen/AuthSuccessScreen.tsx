import React, {useEffect} from 'react';
import {Animated, SafeAreaView, View, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {globalStyles} from '../../../config/globalStyles';
import {STATIC_TEXT} from '../../../config/staticText';
import {styles} from './AuthSuccessScreen.styles';
import {CommonActions} from '@react-navigation/native';

const successTitle = STATIC_TEXT.screens.authSuccess.successTitle;

const AuthSuccessScreen = ({navigation}) => {
  const dispatch = useDispatch();
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
      // Complete the animation and then update login status
      setTimeout(() => {
        // Update the login status in redux
        dispatch({type: 'auth/completeLogin'});

        // Navigate to Dashboard using reset to clear history
        setTimeout(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Dashboard'}],
            }),
          );
        }, 500);
      }, 500);
    });
  }, [dispatch, navigation]);

  const animatedStyle = {
    transform: [{scale: scaleValue}],
    opacity: opacityValue,
  };

  return (
    <SafeAreaView style={[globalStyles.secondaryContainer, styles.container]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthSuccessScreen;
