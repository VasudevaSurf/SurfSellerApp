import React, {useEffect, useRef} from 'react';
import {View, TouchableOpacity, Animated} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import HomeScreen from '../../../screens/DashBoardScreens/HomeScreen/HomeScreen';
import {
  AccountIcon,
  HomeIcon,
  OrdersIcon,
  ProductIcon,
} from '../../../assets/icons/BottomNavIcons';
import ProductScreen from '../../../screens/DashBoardScreens/ProductScreen/ProductScreen';
import OrderScreen from '../../../screens/DashBoardScreens/OrdersScreen/OrderScreen';
import AccountScreen from '../../../screens/DashBoardScreens/AccountScreen/AccountScreen';
import {styles} from './BottomTabNavigator.styles';

const Tab = createBottomTabNavigator();

const TAB_CONFIG = {
  DashBoard: {
    component: HomeScreen,
    icon: HomeIcon,
    title: 'Dashboard',
  },
  Product: {
    component: ProductScreen,
    icon: ProductIcon,
    title: 'Product',
  },
  Orders: {
    component: OrderScreen,
    icon: OrdersIcon,
    title: 'Orders',
  },
  Account: {
    component: AccountScreen,
    icon: AccountIcon,
    title: 'Account',
  },
} as const;

function AnimatedTabBarIcon({Icon, isFocused, color, scaleAnim}) {
  return (
    <Animated.View
      style={{
        transform: [{scale: scaleAnim}],
      }}>
      <Icon
        color={color}
        width={getScreenWidth(6)}
        height={getScreenWidth(6)}
      />
    </Animated.View>
  );
}

function CustomTabBar({state, descriptors, navigation}) {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnims = useRef(
    state.routes.map(() => new Animated.Value(1)),
  ).current;

  const totalTabs = state.routes.length;
  const tabWidth = getScreenWidth(100) / totalTabs;

  useEffect(() => {
    // Animate slider
    Animated.spring(slideAnim, {
      toValue: state.index * tabWidth,
      friction: 10,
      tension: 50,
      useNativeDriver: true,
    }).start();

    // Animate icons
    state.routes.forEach((_, index) => {
      Animated.spring(scaleAnims[index], {
        toValue: state.index === index ? 1.2 : 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start();
    });
  }, [state.index, tabWidth]);

  return (
    <View style={styles.tabBarWrapper}>
      {/* Top Slider Indicator */}
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [{translateX: slideAnim}],
            width: tabWidth,
          },
        ]}
      />

      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const Icon = TAB_CONFIG[route.name]?.icon;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.tabItem]}
              activeOpacity={0.7}>
              <AnimatedTabBarIcon
                Icon={Icon}
                isFocused={isFocused}
                scaleAnim={scaleAnims[index]}
                color={
                  isFocused
                    ? ColorPalette.PURPLE_300
                    : ColorPalette.GREY_TEXT_200
                }
              />
              <Animated.View
                style={{
                  opacity: scaleAnims[index].interpolate({
                    inputRange: [1, 1.2],
                    outputRange: [0.7, 1],
                  }),
                }}>
                <Typography
                  variant={TypographyVariant.LXSMALL_MEDIUM}
                  customTextStyles={[
                    styles.tabText,
                    isFocused ? styles.focusedTabText : styles.unfocusedTabText,
                  ]}>
                  {TAB_CONFIG[route.name]?.title}
                </Typography>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      {Object.entries(TAB_CONFIG).map(([name, {component, title}]) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{title}}
        />
      ))}
    </Tab.Navigator>
  );
}
