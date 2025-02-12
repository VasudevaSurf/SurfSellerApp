import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ScreenWrapper = ({children, style}) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <View
        style={[
          styles.contentContainer,
          {paddingBottom: insets.bottom + 80},
          style,
        ]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
  },
});

export default ScreenWrapper;
