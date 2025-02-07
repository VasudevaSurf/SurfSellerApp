import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/Onboarding/SplashScreen/SplashScreen';
import WelcomeScreen from '../screens/Onboarding/WelcomeScreen/WelcomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
