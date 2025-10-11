// src/screens/DashBoardScreens/AccountScreen/AccountOptionScreens/BankDetailsPages/BankDetails.tsx

import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ArrowLeftIcon from '../../../../../assets/icons/ArrowLeftIcon';
import {Header} from '../../../../../components/UserComponents/Header/Header';
import AnimatedTextInput from '../../../../../components/UserComponents/TextInput/TextInput';
import {TypographyVariant} from '../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../config/colorPalette';
import {getScreenHeight} from '../../../../../helpers/screenSize';
import {goBack, navigate} from '../../../../../navigation/utils/navigationRef';
import {styles} from './BankDetails.styles';
import ArrowLeft from '../../../../../assets/icons/ArrowLeft';
import QuestionMarkIcon from '../../../../../assets/icons/QuestionMarkIcon';
import {RootState, AppDispatch} from '../../../../../redux/store';
import {fetchProfile} from '../../../../../redux/slices/profileSlice';
import {Typography} from '../../../../../components/UserComponents/Typography/Typography';

const BankDetails = () => {
  const route = useRoute();
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const {profileData, loading, error, rawProfileData} = useSelector(
    (state: RootState) => state.profile,
  );

  const [accountName, setAccountName] = useState('');
  const [IBAN, setIBAN] = useState('');
  const [bicCode, setBicCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [isInitializing, setIsInitializing] = useState(true);

  // Fetch profile data when component mounts
  useFocusEffect(
    React.useCallback(() => {
      console.log('🔄 BankDetails - Fetching profile data');
      if (userData?.user_id) {
        dispatch(fetchProfile(userData.user_id));
      }
    }, [dispatch, userData?.user_id]),
  );

  // Helper function to get field value from raw profile data
  const getFieldValue = (fieldName: string): string => {
    if (!rawProfileData?.sections) {
      console.warn('⚠️ No rawProfileData sections available');
      return '';
    }

    for (const section of rawProfileData.sections) {
      for (const block of section.blocks) {
        const field = block.fields.find(f => f.field_name === fieldName);
        if (field) {
          console.log(`✅ Found ${fieldName}:`, field.value || '(empty)');
          return field.value || '';
        }
      }
    }

    console.warn(`⚠️ Field not found: ${fieldName}`);
    return '';
  };

  // Update state when profile data changes
  useEffect(() => {
    if (rawProfileData) {
      console.log('📊 Bank details - Profile data updated');

      // Use the CORRECT field names from the API
      const holderName = getFieldValue('fields_53'); // Account Holder Full Name
      const iban = getFieldValue('fields_54'); // IBAN
      const bic = getFieldValue('fields_56'); // BIC
      const bank = getFieldValue('fields_57'); // Bank Name

      console.log('💳 Extracted bank details:', {
        holderName,
        iban,
        bic,
        bank,
      });

      setAccountName(holderName);
      setIBAN(iban);
      setBicCode(bic);
      setBankName(bank);
      setIsInitializing(false);
    }
  }, [rawProfileData]);

  // Handle updates from EditFieldScreen
  useFocusEffect(
    React.useCallback(() => {
      if (route.params) {
        const {
          updatedAccountName,
          updatedIBAN,
          updatedBicCode,
          updatedBankName,
        } = route.params;

        if (updatedAccountName) setAccountName(updatedAccountName);
        if (updatedIBAN) setIBAN(updatedIBAN);
        if (updatedBicCode) setBicCode(updatedBicCode);
        if (updatedBankName) setBankName(updatedBankName);
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
          headerTitle: 'Update account holder name',
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

  if (loading || isInitializing) {
    return (
      <SafeAreaView style={{flex: 1}} edges={['bottom']}>
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
                  params: {screen: 'FAQScreen'},
                });
              },
              size: 24,
              color: ColorPalette.IconColor,
              strokeWidth: 1.5,
            },
          ]}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={ColorPalette.PURPLE_300} />
          <Typography
            text="Loading bank details..."
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={{
              marginTop: 16,
              color: ColorPalette.GREY_TEXT_400,
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{flex: 1}} edges={['bottom']}>
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
                  params: {screen: 'FAQScreen'},
                });
              },
              size: 24,
              color: ColorPalette.IconColor,
              strokeWidth: 1.5,
            },
          ]}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <Typography
            text="Failed to load bank details"
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={{color: ColorPalette.RED_200}}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
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
                params: {screen: 'FAQScreen'},
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
          {paddingTop: getScreenHeight(1.2)},
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankDetails;
