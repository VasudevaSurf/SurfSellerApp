import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, ScrollView, TouchableOpacity} from 'react-native';
import {Header} from '../../../../../components/UserComponents/Header/Header';
import {TypographyVariant} from '../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../config/colorPalette';
import ArrowLeftIcon from '../../../../../assets/icons/ArrowLeftIcon';
import {goBack, navigate} from '../../../../../navigation/utils/navigationRef';
import {getScreenHeight} from '../../../../../helpers/screenSize';
import {styles} from './PerosanlInfo.styles';
import AnimatedTextInput from '../../../../../components/UserComponents/TextInput/TextInput';

const INITIAL_COUNTRY_CODE = '+356';
const MALTA_FLAG_URL =
  'https://cdn.countryflags.com/thumbs/malta/flag-round-250.png';
const PersonalInfo = () => {
  const [fullName, setFullName] = useState('Annie Flora');
  const [email, setEmail] = useState('anniesshop@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('9864 1234');
  const [countryCode, setCountryCode] = useState(INITIAL_COUNTRY_CODE);

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name="Personal Info"
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
          <AnimatedTextInput
            label="Full name"
            value={fullName}
            onChangeText={setFullName}
            keyboardType="default"
            customLabelColorFocused={ColorPalette.GREY_TEXT_400}
            customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
            rightText="Edit"
            onRightTextPress={() => {
              navigate('Dashboard', {
                screen: 'Account',
                params: {
                  screen: 'EditName',
                },
              });
            }}
            customBorderColor={ColorPalette.GREY_TEXT_400}
            customBorderWidth={1}
            disabled={true}
          />
          <AnimatedTextInput
            label="Email ID"
            value={email}
            onChangeText={setEmail}
            keyboardType="default"
            customLabelColorFocused={ColorPalette.GREY_TEXT_400}
            customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
            rightText="Edit"
            customBorderColor={ColorPalette.GREY_TEXT_400}
            customBorderWidth={1}
            disabled={true}
          />
          <AnimatedTextInput
            label="WhatsApp number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            customLabelColorFocused={ColorPalette.GREY_TEXT_400}
            customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
            showCountrySection
            countryCode={countryCode}
            countryFlag={MALTA_FLAG_URL}
            onCountryPress={() => {}}
            rightText="Edit"
            customBorderColor={ColorPalette.GREY_TEXT_400}
            customBorderWidth={1}
            disabled={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInfo;
