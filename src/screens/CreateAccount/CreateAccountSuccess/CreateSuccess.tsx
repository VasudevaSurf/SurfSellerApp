import React, {useEffect} from 'react';
import {Animated, SafeAreaView, View, ScrollView} from 'react-native';
import {Button} from '../../../components/UserComponents/Button/Button';
import {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../components/UserComponents/Button/Button.types';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {globalStyles} from '../../../config/globalStyles';
import {navigate} from '../../../navigation/utils/navigationRef';
import {styles} from './CreateSuccess.styles';

const CreateSuccess = () => {
  const scaleValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animatedStyle = {
    transform: [{scale: scaleValue}],
    opacity: opacityValue,
  };

  const handleVATScreen = () => {
    navigate('VAT', {screen: 'VATVerification'});
  };

  return (
    <SafeAreaView style={[globalStyles.secondaryContainer, styles.container]}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Animated.Image
            source={require('../../../assets/images/success.png')}
            style={[styles.successImage, animatedStyle]}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Typography
              variant={TypographyVariant.H6_BOLD}
              text="Welcome to Surf! 🎉"
              customTextStyles={styles.title}
            />
            <Typography
              variant={TypographyVariant.LMEDIUM_REGULAR}
              text="Your account is created. Before you start selling, please verify your VAT number."
              customTextStyles={styles.subtitle}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              text="Verify Now"
              onPress={handleVATScreen}
              variant={ButtonVariant.PRIMARY}
              size={ButtonSize.MEDIUM}
              state={ButtonState.DEFAULT}
            />
            <Button
              text="Verify Later"
              onPress={() => {}}
              variant={ButtonVariant.PRIMARY}
              type={ButtonType.OUTLINED}
              size={ButtonSize.MEDIUM}
              state={ButtonState.DEFAULT}
              customStyles={styles.buttonContainerStyle}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateSuccess;
