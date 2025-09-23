import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, ScrollView, View } from 'react-native';
import { Button } from '../../../components/UserComponents/Button/Button';
import {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../components/UserComponents/Button/Button.types';
import { Typography } from '../../../components/UserComponents/Typography/Typography';
import { TypographyVariant } from '../../../components/UserComponents/Typography/Typography.types';
import { STATIC_TEXT } from '../../../config/staticText';
import { navigate } from '../../../navigation/utils/navigationRef';
import { styles } from './WelcomeScreen.styles';
import { ColorPalette } from '../../../config/colorPalette';
import { Linking } from 'react-native';

const { createAccount, login } = STATIC_TEXT.screens.welcomeScreen;

// Separated pagination indicator component
const AnimatedPaginationIndicator = ({ scrollX, contentLength, width }) => {
  // Constants for dot dimensions
  const defaultWidth = 10;
  const activeWidth = 35;

  return (
    <View style={styles.paginationContainer}>
      <View style={styles.paginationTrack}>
        {Array.from({ length: contentLength }).map((_, i) => {
          // Calculate animated properties
          const animatedWidth = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [defaultWidth, activeWidth, defaultWidth],
            extrapolate: 'clamp',
          });

          const dotColor = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [
              ColorPalette.SearchBack,
              ColorPalette.PURPLE_300,
              ColorPalette.SearchBack,
            ],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.dotContainer,
                {
                  width: animatedWidth,
                },
              ]}>
              <Animated.View
                style={[
                  styles.dot,
                  {
                    opacity,
                    width: animatedWidth,
                    backgroundColor: dotColor,
                  },
                ]}
              />
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

const WelcomeScreen = () => {
  // State and refs
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const autoScrollTimer = useRef(null);

  // Screen dimensions
  const screenWidth = Dimensions.get('window').width;

  // Content for carousel
  const content = [
    {
      image: require('../../../assets/images/welcomeBanner2.jpg'),
      title: 'Zero Commission, Zero Worries: Maximize Your Profit!',
      subtitle: 'Enjoy zero commission on all sales for greater earnings.',
    },
    {
      image: require('../../../assets/images/welcomeBanner3.jpg'),
      title: 'Seamless Deliveries: We Handle It for You!',
      subtitle: 'Leave logistics to us and focus on selling your products.',
    },
    {
      image: require('../../../assets/images/welcomeBanner.jpg'),
      title: 'Boost Your Sales: Reach More Customers!',
      subtitle:
        'Expand your customer base and increase your sales effortlessly.',
    },
  ];

  // Scroll handling functions
  const scrollToIndex = index => {
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
  };

  const startAutoScroll = () => {
    autoScrollTimer.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % content.length;
      setCurrentIndex(nextIndex);
      scrollToIndex(nextIndex);
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
    }
  };

  // Scroll event handler
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: event => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / screenWidth);
        if (index !== currentIndex) {
          setCurrentIndex(index);
        }
      },
    },
  );

  // Auto-scroll effect
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [currentIndex]);

  // Navigation handlers
  const handleLogin = () => navigate('Auth', { screen: 'EmailSignIn' });
  const handleCreateNewAccount = () => {
    Linking.openURL('https://sell.surf.mt/register');
  };

  return (
    <View style={styles.mainContainer}>
      {/* Adding main ScrollView wrapper here */}
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={styles.contentContainer}>
          {/* Carousel */}
          <View style={styles.scrollViewWrapper}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              onScrollBeginDrag={stopAutoScroll}
              onScrollEndDrag={startAutoScroll}>
              {content.map((item, index) => (
                <View key={index} style={[styles.slide, { width: screenWidth }]}>
                  <Image
                    source={item.image}
                    style={styles.image}
                    resizeMode="contain"
                  />
                  <View style={styles.textContainer}>
                    <Typography
                      variant={TypographyVariant.H4_BOLD}
                      text={item.title}
                      customTextStyles={styles.title}
                    />
                    <Typography
                      variant={TypographyVariant.PSMALL_REGULAR}
                      text={item.subtitle}
                      customTextStyles={styles.subtitle}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Pagination indicator */}
          <View style={styles.paginationGap}>
            <AnimatedPaginationIndicator
              scrollX={scrollX}
              contentLength={content.length}
              width={screenWidth}
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              text={createAccount}
              onPress={handleCreateNewAccount}
              variant={ButtonVariant.PRIMARY}
              state={ButtonState.DEFAULT}
              size={ButtonSize.MEDIUM}
            />
            <Button
              text={login}
              onPress={handleLogin}
              variant={ButtonVariant.PRIMARY}
              state={ButtonState.DEFAULT}
              type={ButtonType.OUTLINED}
              customStyles={styles.buttonContainerStyle}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WelcomeScreen;
