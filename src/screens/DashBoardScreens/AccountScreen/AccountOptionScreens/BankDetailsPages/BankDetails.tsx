import React, {useState} from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {Header} from '../../../../../components/UserComponents/Header/Header';
import {TypographyVariant} from '../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../config/colorPalette';
import ArrowLeftIcon from '../../../../../assets/icons/ArrowLeftIcon';
import {goBack, navigate} from '../../../../../navigation/utils/navigationRef';
import {getScreenHeight} from '../../../../../helpers/screenSize';
import {styles} from './BankDetails.styles';
import AnimatedTextInput from '../../../../../components/UserComponents/TextInput/TextInput';
import {useFocusEffect, useRoute} from '@react-navigation/native';

const BankDetails = () => {
  const route = useRoute();
  const [accountName, setAccountName] = useState('Annie Flora');
  const [accountNumber, setAccountNumber] = useState('MT84APSB1234567890');
  const [bicCode, setBicCode] = useState('APSBMTMT123');

  useFocusEffect(
    React.useCallback(() => {
      if (route.params) {
        const {updatedAccountName, updatedAccountNumber, updatedBicCode} =
          route.params;
        if (updatedAccountName) setAccountName(updatedAccountName);
        if (updatedAccountNumber) setAccountNumber(updatedAccountNumber);
        if (updatedBicCode) setBicCode(updatedBicCode);
      }
    }, [route.params]),
  );

  const handleEditAccountName = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditField',
        params: {
          fieldType: 'accountName',
          initialValue: accountName,
          headerTitle: 'Update your account holder name',
          label: 'Account holder name',
          description:
            'Please update your account holder name as it appears on your passbook for accuracy.',
          keyboardType: 'default',
          validationType: 'accountName',
          onSubmitActionType: 'updateAccountName',
          originScreen: 'BankDetails',
        },
      },
    });
  };

  const handleEditAccountNumber = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditField',
        params: {
          fieldType: 'accountNumber',
          initialValue: accountNumber,
          headerTitle: 'Update your account number',
          label: 'Account number',
          description:
            'Please update your account number for accurate transaction processing.',
          keyboardType: 'default',
          validationType: 'accountNumber',
          onSubmitActionType: 'updateAccountNumber',
          size: 24,
          originScreen: 'BankDetails',
        },
      },
    });
  };

  const handleEditBicCode = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditField',
        params: {
          fieldType: 'bicCode',
          initialValue: bicCode,
          headerTitle: 'Update your SWIFT/BIC code',
          label: 'SWIFT/BIC code',
          description:
            'Please update your SWIFT/BIC code for accurate transaction processing.',
          keyboardType: 'default',
          validationType: 'bicCode',
          onSubmitActionType: 'updateBicCode',
          size: 24,
          originScreen: 'BankDetails',
        },
      },
    });
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name="Bank Details"
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
            label="Account holder name"
            value={accountName}
            onChangeText={setAccountName}
            keyboardType="default"
            customLabelColorFocused={ColorPalette.GREY_TEXT_400}
            customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
            rightText="Edit"
            onRightTextPress={handleEditAccountName}
            customBorderColor={ColorPalette.GREY_TEXT_400}
            customBorderWidth={1}
            disabled={true}
          />
          <AnimatedTextInput
            label="Account number"
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="numeric"
            customLabelColorFocused={ColorPalette.GREY_TEXT_400}
            customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
            rightText="Edit"
            onRightTextPress={handleEditAccountNumber}
            customBorderColor={ColorPalette.GREY_TEXT_400}
            customBorderWidth={1}
            disabled={true}
          />
          <AnimatedTextInput
            label="SWIFT/BIC code"
            value={bicCode}
            onChangeText={setBicCode}
            keyboardType="default"
            customLabelColorFocused={ColorPalette.GREY_TEXT_400}
            customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
            rightText="Edit"
            onRightTextPress={handleEditBicCode}
            customBorderColor={ColorPalette.GREY_TEXT_400}
            customBorderWidth={1}
            disabled={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankDetails;
