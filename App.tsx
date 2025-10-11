// App.tsx

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native'; // ✅ Fixed import
import Toast from 'react-native-toast-message';

import store from './src/redux/store';
import {RootNavigator} from './src/navigation/RootNavigator';
import {navigationRef} from './src/navigation/utils/navigationRef';
import {ToastComponent} from './src/components/MainComponents/Toast/ToastComponent';

const toastConfig = {
  success: (props: any) => <ToastComponent {...props} />,
  error: (props: any) => <ToastComponent {...props} />,
};

const App = () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 APP STARTED');
  console.log('Timestamp:', new Date().toLocaleString());
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <NavigationContainer ref={navigationRef}>
          <RootNavigator />
          <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
