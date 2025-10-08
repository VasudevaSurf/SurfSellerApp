import React, {useEffect, useMemo, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
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
import {RootState, AppDispatch} from '../../../../../../redux/store';
import {
  createWithdrawal,
  clearWithdrawalState,
  clearWithdrawalError,
} from '../../../../../../redux/slices/withdrawalSlice';
import {fetchBalanceApi} from '../../../../../../services/apiService';

const WithdrawScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const {loading, success, error} = useSelector(
    (state: RootState) => state.withdrawal,
  );

  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [currentBalance, setCurrentBalance] = useState('0.00');
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [amountError, setAmountError] = useState('');

  // Fetch current balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (userData?.user_id) {
        setLoadingBalance(true);
        try {
          const response = await fetchBalanceApi(userData.user_id);
          if (response.totals?.income) {
            // Remove currency symbol and extract number
            const balanceValue = response.totals.income.replace(/[^0-9.]/g, '');
            setCurrentBalance(balanceValue);
          }
        } catch (error) {
          console.error('Failed to fetch balance:', error);
        } finally {
          setLoadingBalance(false);
        }
      }
    };

    fetchBalance();
  }, [userData?.user_id]);

  // Handle successful withdrawal
  useEffect(() => {
    if (success) {
      Alert.alert(
        'Success',
        'Your withdrawal request has been submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch(clearWithdrawalState());
              goBack();
            },
          },
        ],
      );
    }
  }, [success, dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [
        {
          text: 'OK',
          onPress: () => dispatch(clearWithdrawalError()),
        },
      ]);
    }
  }, [error, dispatch]);

  const validateAmount = (value: string): boolean => {
    if (!value || value.trim() === '') {
      setAmountError('Amount is required');
      return false;
    }

    const numValue = parseFloat(value);

    if (isNaN(numValue)) {
      setAmountError('Please enter a valid amount');
      return false;
    }

    if (numValue <= 0) {
      setAmountError('Amount must be greater than 0');
      return false;
    }

    const balance = parseFloat(currentBalance);
    if (numValue > balance) {
      setAmountError(
        `Amount cannot exceed available balance (€${currentBalance})`,
      );
      return false;
    }

    setAmountError('');
    return true;
  };

  const handleAmountChange = (value: string) => {
    // Allow only numbers and decimal point
    const formattedValue = value.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point
    const parts = formattedValue.split('.');
    if (parts.length > 2) {
      return;
    }

    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
      return;
    }

    setAmount(formattedValue);

    if (formattedValue) {
      validateAmount(formattedValue);
    } else {
      setAmountError('');
    }
  };

  const handleWithdraw = async () => {
    if (!userData?.user_id) {
      Alert.alert('Error', 'User information not available');
      return;
    }

    if (!validateAmount(amount)) {
      return;
    }

    const numAmount = parseFloat(amount);

    Alert.alert(
      'Confirm Withdrawal',
      `Are you sure you want to withdraw €${numAmount.toFixed(2)}?${
        comment ? `\n\nComment: ${comment}` : ''
      }`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            dispatch(
              createWithdrawal({
                userId: userData.user_id,
                amount: numAmount,
                comments: comment || 'Withdrawal',
              }),
            );
          },
        },
      ],
    );
  };

  const handleCancel = () => {
    if (amount || comment) {
      Alert.alert(
        'Discard Changes',
        'Are you sure you want to discard your changes?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => goBack(),
          },
        ],
      );
    } else {
      goBack();
    }
  };

  const isSubmitDisabled = () => {
    return (
      !amount ||
      loading ||
      loadingBalance ||
      !!amountError ||
      parseFloat(amount) <= 0
    );
  };

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
        name="Withdraw"
        variant={TypographyVariant.H6_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={<ArrowLeft style={undefined} size={22} onPress={goBack} />}
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

            {/* Balance Info */}
            <View style={styles.nameContainer}>
              <Typography
                text={`Available Balance: €${currentBalance}`}
                variant={TypographyVariant.PSMALL_REGULAR}
                customTextStyles={{
                  color: loadingBalance
                    ? ColorPalette.GREY_TEXT_300
                    : ColorPalette.GREY_TEXT_500,
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <AnimatedTextInput
                label="Enter amount*"
                value={amount}
                onChangeText={handleAmountChange}
                keyboardType="decimal-pad"
                showCountrySection
                countryCode="€"
                customLabelColorFocused={ColorPalette.GREY_TEXT_400}
                customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
                error={amountError}
                editable={!loading && !loadingBalance}
              />
              <AnimatedTextInput
                label="Add a comment (Optional)"
                value={comment}
                onChangeText={setComment}
                keyboardType="default"
                customLabelColorFocused={ColorPalette.GREY_TEXT_400}
                customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
                required={false}
                editable={!loading}
                maxLength={200}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            text={loading ? 'PROCESSING...' : 'WITHDRAW'}
            variant={ButtonVariant.PRIMARY}
            state={ButtonState.DEFAULT}
            disabled={isSubmitDisabled()}
            size={ButtonSize.MEDIUM}
            onPress={handleWithdraw}
            textVariant={TypographyVariant.LMEDIUM_EXTRASEMIBOLD}
            loading={loading}
          />
          <Button
            text="Cancel"
            variant={ButtonVariant.PRIMARY}
            state={ButtonState.DEFAULT}
            size={ButtonSize.MEDIUM}
            type={ButtonType.OUTLINED}
            onPress={handleCancel}
            customStyles={{
              borderWidth: 1,
              borderColor: ColorPalette.PURPLE_300,
            }}
            customTextStyles={{color: ColorPalette.PURPLE_300}}
            textVariant={TypographyVariant.LMEDIUM_EXTRASEMIBOLD}
            disabled={loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WithdrawScreen;
