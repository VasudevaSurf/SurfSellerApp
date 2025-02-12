import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {OnboardingStackParamList} from '../../types/navigation';
import SplashScreen from '../../screens/Onboarding/SplashScreen/SplashScreen';
import WelcomeScreen from '../../screens/Onboarding/WelcomeScreen/WelcomeScreen';

const Stack = createStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
};
