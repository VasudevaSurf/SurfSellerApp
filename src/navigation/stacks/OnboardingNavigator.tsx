import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SplashScreen from '../../screens/Onboarding/SplashScreen/SplashScreen';
import WelcomeScreen from '../../screens/Onboarding/WelcomeScreen/WelcomeScreen';
import {OnboardingStackParamList} from '../../types/navigation';

const Stack = createStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false, // Disable default animations
        gestureEnabled: false, // Disable swipe gestures during onboarding
        cardStyle: {backgroundColor: 'transparent'},
      }}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          animationEnabled: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          animationEnabled: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};