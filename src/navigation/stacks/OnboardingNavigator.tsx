import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
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
        // Remove all transition animations
        animationEnabled: false,
        cardStyleInterpolator: ({current}) => ({
          cardStyle: {
            opacity: current.progress,
          },
        }),
      }}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
