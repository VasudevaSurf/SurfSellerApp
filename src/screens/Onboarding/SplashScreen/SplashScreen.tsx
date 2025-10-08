import React, {useEffect, useRef} from 'react';
import {Animated, View, Image, StatusBar} from 'react-native';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {globalStyles} from '../../../config/globalStyles';
import {STATIC_TEXT} from '../../../config/staticText';
import {styles} from './SplashScreen.styles';
import LinearGradient from 'react-native-linear-gradient';

const {surfTitle, surfCaption} = STATIC_TEXT.screens.onboarding;

const SplashScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const contentFadeOut = useRef(new Animated.Value(1)).current;
  const surfNameFadeIn = useRef(new Animated.Value(0)).current;
  const surfNameRotateAnim = useRef(new Animated.Value(-180)).current;
  const [statusBarColor, setStatusBarColor] = React.useState('transparent');

  useEffect(() => {
    // Set initial status bar
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);

    // Start horizontal flip animation from right to left
    Animated.timing(rotateAnim, {
      toValue: -180,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Handle navigation after animation with gradient overlay expansion
    const timer = setTimeout(() => {
      // Fade out logo and footer
      Animated.timing(contentFadeOut, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Expand gradient background and change status bar
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        // Change status bar to match gradient
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('#4B0082');
        setStatusBarColor('#4B0082');

        // Fade in and flip Surf name image and tagline (starts reversed, flips to normal)
        Animated.parallel([
          Animated.timing(surfNameFadeIn, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(surfNameRotateAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Navigate to Welcome screen after showing Surf name
          setTimeout(() => {
            navigation.replace('Welcome');
          }, 1000);
        });
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    navigation,
    fadeAnim,
    rotateAnim,
    scaleAnim,
    contentFadeOut,
    surfNameFadeIn,
    surfNameRotateAnim,
  ]);

  const rotateY = rotateAnim.interpolate({
    inputRange: [-180, 0],
    outputRange: ['-180deg', '0deg'],
  });

  const surfNameRotateY = surfNameRotateAnim.interpolate({
    inputRange: [-180, 0],
    outputRange: ['-180deg', '0deg'],
  });

  const scale = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  return (
    <View style={[{...globalStyles.primaryContainer, ...styles.mainContainer}]}>
      <StatusBar
        barStyle={
          statusBarColor === 'transparent' ? 'dark-content' : 'light-content'
        }
        backgroundColor={statusBarColor}
        translucent={true}
      />

      {/* Gradient overlay that expands from center */}
      <Animated.View
        style={{
          position: 'absolute',
          width: 100,
          height: 100,
          borderRadius: 50,
          overflow: 'hidden',
          transform: [{scale}],
        }}>
        <LinearGradient
          colors={['#4B0082', '#9400D3']}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Animated.View>

      {/* Big centered logo with tilt animation - fades out */}
      <Animated.View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{rotateY}],
          opacity: contentFadeOut,
        }}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.bigLogoImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Footer text - fades out */}
      <Animated.View
        style={[styles.footerContainer, {opacity: contentFadeOut}]}>
        <Typography
          variant={TypographyVariant.PXSMALL_MEDIUM}
          text={surfCaption}
          customTextStyles={styles.footerText}
        />
      </Animated.View>

      {/* Surf name image and tagline - starts reversed, fades in and flips to normal after gradient background expansion */}
      <Animated.View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: surfNameFadeIn,
        }}>
        {/* TransSurf image in center with ShapeSurf overlaid - with flip animation */}
        <Animated.View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            transform: [{rotateY: surfNameRotateY}],
          }}>
          {/* TransSurf background image - larger size */}
          <Image
            source={require('../../../assets/images/transSurf.png')}
            style={{
              width: 350,
              height: 140,
            }}
            resizeMode="contain"
          />

          {/* ShapeSurf overlaid in the middle with top spacing */}
          <Image
            source={require('../../../assets/images/ShapeSurf.png')}
            style={{
              position: 'absolute',
              top: 75,
              width: 50,
              height: 50,
            }}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Tagline at bottom */}
        <View
          style={{
            position: 'absolute',
            bottom: 40,
            width: '100%',
            alignItems: 'center',
          }}>
          <Typography
            variant={TypographyVariant.PXSMALL_MEDIUM}
            text="Malta's Local Commerce network"
            customTextStyles={{
              color: '#FFFFFF',
              fontSize: 16,
              textAlign: 'center',
            }}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
