import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import store from './src/redux/store';
import { RootNavigator } from './src/navigation/RootNavigator';
import { navigationRef } from './src/navigation/utils/navigationRef';
import Toast, { ToastConfig } from 'react-native-toast-message';

import { ToastComponent } from './src/components/MainComponents/Toast/ToastComponent';
const toastConfig: ToastConfig = {
  success: (props) => <ToastComponent {...props} />,
  error: (props) => <ToastComponent {...props} />,
  info: (props) => <ToastComponent {...props} />,
};



const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
        {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

