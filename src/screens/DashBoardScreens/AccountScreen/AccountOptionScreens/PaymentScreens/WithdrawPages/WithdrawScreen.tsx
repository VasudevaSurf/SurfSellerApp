import React, {useMemo, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import ArrowLeftIcon from '../../../../../../assets/icons/ArrowLeftIcon';
import InfoIconOutline from '../../../../../../assets/icons/InfoIconOutline';
import {Button} from '../../../../../../components/UserComponents/Button/Button';
import {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../../components/UserComponents/Button/Button.types';
import {Header} from '../../../../../../components/UserComponents/Header/Header';
import AnimatedTextInput from '../../../../../../components/UserComponents/TextInput/TextInput';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {getScreenHeight} from '../../../../../../helpers/screenSize';
import {goBack} from '../../../../../../navigation/utils/navigationRef';
import {styles} from './WithdrawScreen.styles';
import ArrowLeft from '../../../../../../assets/icons/ArrowLeft';
import InfoIconPay from '../../../../../../assets/icons/InfoIconPay';
import QuestionMarkIcon from '../../../../../../assets/icons/QuestionMarkIcon';

const WithdrawScreen = () => {
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');

  const headerIcons = useMemo(
    () => [
      {
        icon: QuestionMarkIcon,
        onPress: () => console.log('Question mark pressed'),
        size: 24,
        color: ColorPalette.Black,
        strokeWidth: 2,
      },
    ],
    [],
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name="Payments"
        variant={TypographyVariant.LMEDIUM_EXTRASEMIBOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={
          <ArrowLeftIcon style={undefined} size={16} onPress={goBack} />
        }
        // rightIcons={headerIcons}
      />
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingTop: getScreenHeight(2)},
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.mainInputContainer}>
            <View style={styles.nameContainer}>
              <Typography
                text="Withdraw"
                variant={TypographyVariant.PMEDIUM_SEMIBOLD}
                customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
              />
              <InfoIconPay
                style={undefined}
                color={ColorPalette.GREY_TEXT_400}
              />
            </View>
            <View style={styles.inputContainer}>
              <AnimatedTextInput
                label="Enter amount*"
                value={amount}
                onChangeText={setAmount}
                keyboardType="phone-pad"
                showCountrySection
                countryCode="€"
                customLabelColorFocused={ColorPalette.GREY_TEXT_400}
                customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
              />
              <AnimatedTextInput
                label="Add a comment (Optional)"
                value={comment}
                onChangeText={setComment}
                keyboardType="default"
                customLabelColorFocused={ColorPalette.GREY_TEXT_400}
                customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            text="Withdraw"
            variant={ButtonVariant.PRIMARY}
            state={ButtonState.DEFAULT}
            disabled
            size={ButtonSize.MEDIUM}
            onPress={() => {}}
            textVariant={TypographyVariant.LMEDIUM_EXTRASEMIBOLD}
          />
          <Button
            text="Cancel"
            variant={ButtonVariant.PRIMARY}
            state={ButtonState.DEFAULT}
            size={ButtonSize.MEDIUM}
            type={ButtonType.OUTLINED}
            onPress={() => {}}
            customStyles={{
              borderWidth: 1,
              borderColor: ColorPalette.PURPLE_300,
            }}
            customTextStyles={{color: ColorPalette.PURPLE_300}}
            textVariant={TypographyVariant.LMEDIUM_EXTRASEMIBOLD}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WithdrawScreen;
