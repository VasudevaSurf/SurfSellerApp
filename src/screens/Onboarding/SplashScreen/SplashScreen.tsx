import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainBanner} from '../../../components/MainComponents/MainBanner/MainBanner';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {globalStyles} from '../../../config/globalStyles';
import {STATIC_TEXT} from '../../../config/staticText';
import {styles} from './SplashScreen.styles';
import {checkAuthStatus} from '../../../redux/slices/authSlice';
import type {AppDispatch, RootState} from '../../../redux/store';

const {surfTitle, surfCaption} = STATIC_TEXT.screens.onboarding;

const SplashScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const dispatch = useDispatch<AppDispatch>();
  const {isLoggedIn} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(checkAuthStatus());

      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          if (isLoggedIn) {
            navigation.replace('Dashboard');
          } else {
            navigation.replace('Welcome');
          }
        });
      }, 2000);
    };

    checkAuth();
  }, [dispatch, navigation, fadeAnim, isLoggedIn]);

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
