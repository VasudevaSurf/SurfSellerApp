import React, {useState} from 'react';
import {SafeAreaView, View, ScrollView, TouchableOpacity} from 'react-native';
import {Header} from '../../../../../../components/UserComponents/Header/Header';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import ArrowLeftIcon from '../../../../../../assets/icons/ArrowLeftIcon';
import {goBack} from '../../../../../../navigation/utils/navigationRef';
import {
  getFigmaDimension,
  getScreenHeight,
} from '../../../../../../helpers/screenSize';
import {styles} from './EditNameScreen.styles';
import AnimatedTextInput from '../../../../../../components/UserComponents/TextInput/TextInput';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import CloseCircleIcon from '../../../../../../assets/icons/CloseCircleIcon';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../../../../../components/UserComponents/Button';

const EditNameScreen = () => {
  const [firstName, setFirstName] = useState('Annie');
  const [lastName, setLastName] = useState('Flora');

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name="Update your name"
        variant={TypographyVariant.LMEDIUM_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={
          <ArrowLeftIcon style={undefined} size={15} onPress={goBack} />
        }
        rightIcons={null}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingTop: getScreenHeight(2)},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainerTwo}>
          <View style={{paddingHorizontal: getFigmaDimension(16)}}>
            <Typography
              variant={TypographyVariant.PSMALL_REGULAR}
              text="Please enter your name exactly as it appears on your ID or passport."
            />
          </View>
          <View style={{gap: getFigmaDimension(16)}}>
            <AnimatedTextInput
              label="First name"
              value={firstName}
              onChangeText={setFirstName}
              keyboardType="default"
              customLabelColorFocused={ColorPalette.GREY_TEXT_400}
              customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
              customBorderColor={ColorPalette.GREY_TEXT_400}
              customBorderWidth={1} // Default border width
              customFocusedBorderWidth={2} // Border width when focused
              customErrorBorderWidth={2}
              rightIcons={[
                {
                  icon: <CloseCircleIcon style={undefined} />,
                  onPress: () => {},
                },
              ]}
              customBorderWidth={1}
            />
            <AnimatedTextInput
              label="Last name"
              value={lastName}
              onChangeText={setLastName}
              keyboardType="default"
              customLabelColorFocused={ColorPalette.GREY_TEXT_400}
              customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
              customBorderColor={ColorPalette.GREY_TEXT_400}
              customBorderWidth={1} // Default border width
              customFocusedBorderWidth={2} // Border width when focused
              customErrorBorderWidth={2}
              rightIcons={[
                {
                  icon: <CloseCircleIcon style={undefined} />,
                  onPress: () => {},
                },
              ]}
              customBorderWidth={1}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="SUBMIT"
            variant={ButtonVariant.PRIMARY}
            state={ButtonState.DEFAULT}
            size={ButtonSize.MEDIUM}
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditNameScreen;
