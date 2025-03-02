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
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
};
