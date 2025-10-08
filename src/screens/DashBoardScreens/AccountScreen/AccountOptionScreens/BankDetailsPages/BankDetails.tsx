import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import ArrowLeftIcon from '../../../../../assets/icons/ArrowLeftIcon';
import { Header } from '../../../../../components/UserComponents/Header/Header';
import AnimatedTextInput from '../../../../../components/UserComponents/TextInput/TextInput';
import { TypographyVariant } from '../../../../../components/UserComponents/Typography/Typography.types';
import { ColorPalette } from '../../../../../config/colorPalette';
import { getScreenHeight } from '../../../../../helpers/screenSize';
import { goBack, navigate } from '../../../../../navigation/utils/navigationRef';
import { styles } from './BankDetails.styles';
import ArrowLeft from '../../../../../assets/icons/ArrowLeft';
import QuestionMarkIcon from '../../../../../assets/icons/QuestionMarkIcon';

const BankDetails = () => {
  const route = useRoute();
  const [accountName, setAccountName] = useState('Annie Flora');
  const [IBAN, setIBAN] = useState('MT84');
  const [bicCode, setBicCode] = useState('APSBMTMT123');
  const [bankName, setBankName] = useState('Malta Bank');
  const [accountType, setAccountType] = useState('Business');

  useFocusEffect(
    React.useCallback(() => {
      if (route.params) {
        const {
          updatedAccountName,
          updatedIBAN,
          updatedBicCode,
          updatedBankName,
          updatedAccountType,
        } = route.params;

        if (updatedAccountName) setAccountName(updatedAccountName);
        if (updatedIBAN) setIBAN(updatedIBAN);
        if (updatedBicCode) setBicCode(updatedBicCode);
        if (updatedBankName) setBankName(updatedBankName);
        if (updatedAccountType) setAccountType(updatedAccountType);
      }
    }, [route.params])
  );

  const handleEditAccountName = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditField',
        params: {
          fieldType: 'accountName',
          initialValue: accountName,
          headerTitle: 'Update your full name',
          label: 'Account holder full name',
          description:
            'Please update your account holder full name as it appears on your bank records for accuracy.',
          keyboardType: 'default',
          validationType: 'accountName',
          onSubmitActionType: 'updateAccountName',
          originScreen: 'BankDetails',
        },
      },
    });
  };

  const handleEditIBAN = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditField',
        params: {
          fieldType: 'IBAN',
          initialValue: IBAN,
          headerTitle: 'Update your IBAN',
          label: 'IBAN',
          description:
            'Please enter your IBAN exactly as shown in your bank records to ensure successful transactions.',
          keyboardType: 'default',
          validationType: 'IBAN',
          onSubmitActionType: 'updateIBAN',
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
          label: 'Swift/BIC code',
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

  const handleEditBankName = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditField',
        params: {
          fieldType: 'bankName',
          initialValue: bankName,
          headerTitle: 'Update your bank name',
          label: 'Bank name',
          description:
            'Please provide the full name of your bank as registered on your account.',
          keyboardType: 'default',
          validationType: 'bankName',
          onSubmitActionType: 'updateBankName',
          size: 24,
          originScreen: 'BankDetails',
        },
      },
    });
  };

  const handleEditAccountType = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditField',
        params: {
          fieldType: 'accountType',
          initialValue: accountType,
          headerTitle: 'Update your account type',
          label: 'Bank name',
          description:
            'Please select the type of account you hold with your bank.',
          keyboardType: 'default',
          validationType: 'accountType',
          onSubmitActionType: 'updateAccountType',
          size: 24,
          originScreen: 'BankDetails',
        },
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <Header
        name="Bank Details"
        variant={TypographyVariant.H6_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={<ArrowLeft style={undefined} size={22} onPress={goBack} />}
        rightIcons={[
          {
            icon: QuestionMarkIcon,
            onPress: () => {
              navigate('Dashboard', {
                screen: 'Account',
                params: { screen: 'FAQScreen' },
              });
            },
            size: 24,
            color: ColorPalette.IconColor,
            strokeWidth: 1.5,
          },
        ]}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: getScreenHeight(1.2) },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainerTwo}>
          <AnimatedTextInput
            label="Account holder full name"
            value={accountName}
            onChangeText={setAccountName}
            keyboardType="default"
            customLabelColorFocused={ColorPalette.GREY_TEXT_400}
            customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
            rightText="Edit"
            onRightTextPress={handleEditAccountName}
            customBorderColor={ColorPalette.GREY_TEXT_400}
            customBorderWidth={1}
            disabled={true}
          />
          <AnimatedTextInput
            label="IBAN"
            value={IBAN}
            onChangeText={setIBAN}
            keyboardType="default"
            customLabelColorFocused={ColorPalette.GREY_TEXT_400}
            customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
            rightText="Edit"
            onRightTextPress={handleEditIBAN}
            customBorderColor={ColorPalette.GREY_TEXT_400}
            customBorderWidth={1}
            disabled={true}
          />
          <AnimatedTextInput
            label="Swift/BIC code"
            value={bicCode}
            onChangeText={setBicCode}
            keyboardType="default"
            customLabelColorFocused={ColorPalette.GREY_TEXT_400}
            customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
            rightText="Edit"
            onRightTextPress={handleEditBicCode}
            customBorderColor={ColorPalette.GREY_TEXT_400}
            customBorderWidth={1}
            disabled={true}
          />
          <AnimatedTextInput
            label="Bank name"
            value={bankName}
            onChangeText={setBankName}
            customLabelColorFocused={ColorPalette.GREY_TEXT_400}
            customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
            rightText="Edit"
            onRightTextPress={handleEditBankName}
            customBorderColor={ColorPalette.GREY_TEXT_400}
            customBorderWidth={1}
            disabled={true}
          />
          <AnimatedTextInput
            label="Account Type"
            value={accountType}
            onChangeText={setAccountType}
            customLabelColorFocused={ColorPalette.GREY_TEXT_400}
            customLabelColorUnfocused={ColorPalette.GREY_TEXT_400}
            rightText="Edit"
            onRightTextPress={handleEditAccountType}
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
