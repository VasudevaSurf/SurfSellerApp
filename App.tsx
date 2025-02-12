import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import store from './src/redux/store';
import {RootNavigator} from './src/navigation/RootNavigator';
import {navigationRef} from './src/navigation/utils/navigationRef';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
