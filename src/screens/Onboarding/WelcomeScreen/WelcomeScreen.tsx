import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, ScrollView, View } from 'react-native';
import { Button } from '../../../components/Button/Button';
import { ButtonVariant } from '../../../components/Button/Button.types';
import { Typography } from '../../../components/Typography/Typography';
import { TypographyVariant } from '../../../components/Typography/Typography.types';
import { styles } from './WelcomeScreen.styles';

const AnimatedPaginationIndicator = ({scrollX, contentLength, width}) => {
  return (
    <View style={styles.paginationContainer}>
      <View style={styles.paginationTrack}>
        {Array.from({length: contentLength}).map((_, i) => {
          const animatedWidth = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [10, 20, 10],
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
                  styles.activeDot,
                  {
                    opacity,
                    width: animatedWidth,
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;
  const autoScrollTimer = useRef(null);

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

  const scrollToIndex = index => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * screenWidth,
        animated: true,
      });
    }
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

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [currentIndex]);

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
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

  const handleScrollBeginDrag = () => {
    stopAutoScroll();
  };

  const handleScrollEndDrag = () => {
    startAutoScroll();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.scrollViewWrapper}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            onScrollBeginDrag={handleScrollBeginDrag}
            onScrollEndDrag={handleScrollEndDrag}>
            {content.map((item, index) => (
              <View key={index} style={[styles.slide, {width: screenWidth}]}>
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="contain"
                />
                <View style={styles.textContainer}>
                  <Typography
                    variant={TypographyVariant.HEADING_MEDIUM}
                    text={item.title}
                    customTextStyles={styles.title}
                  />
                  <Typography
                    variant={TypographyVariant.BODY_MEDIUM}
                    text={item.subtitle}
                    customTextStyles={styles.subtitle}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.paginationGap}>
          <AnimatedPaginationIndicator
            scrollX={scrollX}
            contentLength={content.length}
            width={screenWidth}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            text="Create New Account"
            onPress={() => {
              /* handle account creation */
            }}
            variant={ButtonVariant.PRIMARY}
          />
          <Button
            text="Login"
            onPress={() => {
              /* handle login */
            }}
            variant={ButtonVariant.SECONDARY}
          />
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
