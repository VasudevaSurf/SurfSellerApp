import React, {useEffect} from 'react';
import {Animated, Image, SafeAreaView, View} from 'react-native';
import {Text} from 'react-native-gesture-handler';
import {styles} from './CreateSuccess.styles';
import {globalStyles} from '../../../config/globalStyles';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ButtonVariant} from '../../../components/UserComponents/Button/Button.types';
import {Button} from '../../../components/UserComponents/Button/Button';
import {navigate} from '../../../navigation/utils/navigationRef';

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
      <Animated.Image
        source={require('../../../assets/images/success.png')}
        style={[styles.successImage, animatedStyle]}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Typography
          variant={TypographyVariant.HEADING_MEDIUM_SUCCESS}
          text="Welcome to Surf! 🎉"
          customTextStyles={styles.title}
        />
        <Typography
          variant={TypographyVariant.BODY_MEDIUM}
          text="Your account is created. Before you start selling, please verify your VAT number."
          customTextStyles={styles.subtitle}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="Verify Now"
          onPress={handleVATScreen}
          variant={ButtonVariant.PRIMARY}
        />
        <Button
          text="Verify Later"
          onPress={() => {}}
          variant={ButtonVariant.SECONDARY}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateSuccess;
