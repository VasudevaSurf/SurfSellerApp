import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import ArrowLeftIcon from '../../../../../../assets/icons/ArrowLeftIcon';
import ArrowLeft from '../../../../../../assets/icons/ArrowLeft';
import BankOutlineIcon from '../../../../../../assets/icons/BankOutlineIcon';
import InfoIconPay from '../../../../../../assets/icons/InfoIconPay';
import QuestionMarkIcon from '../../../../../../assets/icons/QuestionMarkIcon';
import WalletIcon from '../../../../../../assets/icons/WalletIcon';
import { AddModal } from '../../../../../../components/MainComponents/AddModal/AddModal';
import { SlidingBar } from '../../../../../../components/MainComponents/SlidingBar/SlidingBar';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../../components/UserComponents/Button';
import { Header } from '../../../../../../components/UserComponents/Header/Header';
import { TextButton } from '../../../../../../components/UserComponents/TextButton';
import { Typography } from '../../../../../../components/UserComponents/Typography/Typography';
import { TypographyVariant } from '../../../../../../components/UserComponents/Typography/Typography.types';
import { ColorPalette } from '../../../../../../config/colorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import {
  goBack,
  navigate,
} from '../../../../../../navigation/utils/navigationRef';
import { RootState } from '../../../../../../redux/store';
import {
  fetchBalanceApi,
  BalanceItem,
  BalanceResponse,
} from '../../../../../../services/apiService';
import { styles } from './PaymentInfo.styles';
import PayPalIcon from '../../../../../../assets/icons/PaypalIcon';
import AnimatedLoader from '../../../../../../assets/icons/LoaderIcon';

const initialLayout = { width: Dimensions.get('window').width };

const PaymentInfo = () => {
  const filterOptions = [
    { id: 'All', label: 'All' },
    { id: 'Completed', label: 'Completed' },
    { id: 'Pending', label: 'Pending' },
    { id: 'Failed', label: 'Failed' },
  ];

  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'payouts', title: 'Payouts' },
    { key: 'withdrawals', title: 'Withdrawals' },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // API state
  const [balanceData, setBalanceData] = useState<BalanceResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentBalance, setCurrentBalance] = useState('€0.00');

  // Separate data for payouts and withdrawals
  const [payoutsData, setPayoutsData] = useState<BalanceItem[]>([]);
  const [withdrawalsData, setWithdrawalsData] = useState<BalanceItem[]>([]);

  // Get userId from Redux store
  const userData = useSelector((state: RootState) => state.auth.userData);
  const userId = userData?.user_id;

  // Fetch balance data from API
  const fetchBalanceData = useCallback(
    async (isRefresh = false) => {
      if (!userId) {
        console.error('No userId available');
        return;
      }

      if (!isRefresh) {
        setLoading(true);
      }
      setError(null);

      try {
        // Map filter to API status parameter
        let statusParam:
          | 'Pending'
          | 'Completed'
          | 'Declined'
          | 'Failed'
          | undefined;
        if (selectedFilter.id !== 'All') {
          statusParam = selectedFilter.id as 'Pending' | 'Completed' | 'Failed';
        }

        const response = await fetchBalanceApi(userId, 1, 50, statusParam);

        if (response.result) {
          setBalanceData(response);

          // Set current balance from totals
          if (response.totals?.income) {
            setCurrentBalance(response.totals.income);
          }

          // Separate payouts and withdrawals based on payout_type
          const payouts = response.balances.filter(
            item =>
              item.payout_type === 'order_placed' ||
              item.payout_type === 'payout',
          );
          const withdrawals = response.balances.filter(
            item => item.payout_type === 'withdrawal',
          );

          setPayoutsData(payouts);
          setWithdrawalsData(withdrawals);
        } else {
          setError(response.message || 'Failed to fetch balance data');
        }
      } catch (err) {
        console.error('Error fetching balance:', err);
        setError('Failed to load balance information');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [userId, selectedFilter],
  );

  // Load data on mount and when filter changes
  useEffect(() => {
    fetchBalanceData();
  }, [fetchBalanceData]);

  // Handle pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBalanceData(true);
  }, [fetchBalanceData]);

  const handleFilterChange = option => {
    setSelectedFilter(option);
  };

  const navigateToWithdraw = () => {
    navigate('WithdrawScreen');
  };

  const openEditModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleEditStripeConnect = () => {
    closeModal();
  };

  const getStatusColors = status => {
    const statusConfig = {
      Pending: {
        color: '#E4A951',
        bgColor: '#FFF8E7',
      },
      Completed: {
        color: '#3BB54A',
        bgColor: '#E7FFE9',
      },
      Declined: {
        color: '#E45151',
        bgColor: '#FFE7E7',
      },
      Failed: {
        color: '#E45151',
        bgColor: '#FFE7E7',
      },
      default: {
        color: ColorPalette.GREY_TEXT_500,
        bgColor: ColorPalette.GREY_200,
      },
    };

    return statusConfig[status] || statusConfig.default;
  };

  const renderHistoryItem = (item: BalanceItem) => {
    const { color: statusColor, bgColor: statusBgColor } = getStatusColors(
      item.status,
    );

    // Parse the type from description for display
    const typeDisplay =
      item.payout_type === 'order_placed'
        ? 'Payouts'
        : item.payout_type === 'withdrawal'
          ? 'Withdrawals'
          : 'Transaction';

    return (
      <View key={item.payout_id} style={styles.payoutItem}>
        <View style={styles.payoutItemLeft}>
          <View style={styles.payoutItemHeader}>
            <Typography
              text={item.description || typeDisplay}
              variant={TypographyVariant.PMEDIUM_MEDIUM}
              customTextStyles={{ color: ColorPalette.GREY_TEXT_500 }}
            />
            <InfoIconPay style={undefined} color={ColorPalette.GREY_TEXT_400} />
          </View>

          <Typography
            text={item.date}
            variant={TypographyVariant.LSMALL_REGULAR}
            customTextStyles={{ color: ColorPalette.GREY_TEXT_100 }}
          />
        </View>
        <View style={styles.payoutItemRight}>
          <Typography
            text={item.display_amount}
            variant={TypographyVariant.H6_BOLD}
            customTextStyles={{ color: ColorPalette.GREY_TEXT_500 }}
          />
          <View style={[styles.statusBadge, { backgroundColor: statusBgColor }]}>
            <Typography
              text={item.status}
              variant={TypographyVariant.LXSMALL_MEDIUM}
              customTextStyles={{ color: statusColor }}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderHistorySection = (
    title: string,
    data: BalanceItem[],
    isLoading: boolean,
  ) => {
    // Apply filter to the data if not "All"
    let filteredData = data;
    if (selectedFilter.id !== 'All') {
      filteredData = data.filter(item => item.status === selectedFilter.id);
    }

    return (
      <>
        <View style={styles.divider}></View>
        <ScrollView
          style={styles.tabContent}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={ColorPalette.PURPLE_300}
            />
          }>
          <View style={styles.tabContent}>
            <Typography
              text={`${title} History`}
              variant={TypographyVariant.H6_BOLD}
              customTextStyles={styles.sectionTitle}
            />

            <SlidingBar
              options={filterOptions}
              selectedOption={selectedFilter}
              onOptionSelect={handleFilterChange}
              customContainerStyle={styles.slidingBarContainer}
            />

            <View
              style={[
                styles.payoutsList,
                !filteredData.length && !isLoading && styles.emptyState,
              ]}>
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <AnimatedLoader size={52} />
                  <Typography
                    text="Loading"
                    variant={TypographyVariant.PSMALL_MEDIUM}
                    customTextStyles={{
                      color: ColorPalette.PRIMARY_GRADIENT_SELLER.colors[0],
                      marginTop: getScreenHeight(1),
                    }}
                  />
                </View>
              ) : // <ActivityIndicator
                //   size="large"
                //   color={ColorPalette.PURPLE_300}
                //   style={{marginTop: getScreenHeight(5)}}
                // />
                error ? (
                  <Typography
                    text={error}
                    variant={TypographyVariant.PMEDIUM_REGULAR}
                    customTextStyles={{ color: ColorPalette.RED_200 }}
                  />
                ) : filteredData.length > 0 ? (
                  filteredData.map(item => renderHistoryItem(item))
                ) : (
                  <Typography
                    text={`No ${title.toLowerCase()} ${selectedFilter.id !== 'All'
                        ? `with status "${selectedFilter.id}"`
                        : 'yet'
                      }`}
                    variant={TypographyVariant.PMEDIUM_REGULAR}
                    customTextStyles={{ color: ColorPalette.GREY_TEXT_400 }}
                  />
                )}
            </View>
          </View>
        </ScrollView>
      </>
    );
  };

  const PayoutsRoute = () =>
    renderHistorySection('Payouts', payoutsData, loading);

  const WithdrawalsRoute = () =>
    renderHistorySection('Withdrawals', withdrawalsData, loading);

  const renderScene = SceneMap({
    payouts: PayoutsRoute,
    withdrawals: WithdrawalsRoute,
  });

  const renderTabBar = props => (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabButtonWrapper}>
        {props.navigationState.routes.map((route, i) => {
          const isFocused = props.navigationState.index === i;
          console.log('props', props);

          return (
            <TouchableOpacity
              key={i}
              onPress={() => setIndex(i)}
              style={[styles.tabButton, isFocused && styles.activeTabButton]}>
              <Typography
                text={route.title}
                variant={TypographyVariant.PMEDIUM_MEDIUM}
                customTextStyles={{
                  color: isFocused
                    ? ColorPalette.ProgressLine
                    : ColorPalette.GREY_TEXT_500,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const modalButtons = [
    {
      text: 'Edit stripe connect',
      onPress: handleEditStripeConnect,
      variant: ButtonVariant.PRIMARY,
      type: ButtonType.PRIMARY,
      size: ButtonSize.MEDIUM,
      state: ButtonState.DEFAULT,
    },
    {
      text: 'Cancel',
      onPress: closeModal,
      variant: ButtonVariant.SECONDARY,
      type: ButtonType.OUTLINED,
      size: ButtonSize.MEDIUM,
      state: ButtonState.DEFAULT,
      customStyles: styles.customButton,
    },
  ];

  const headerIcons = useMemo(
    () => [
      {
        icon: QuestionMarkIcon,
        onPress: () => {
          navigate('Dashboard', {
            screen: 'Account',
            params: { screen: 'FAQScreen' },
          });
        },
        size: 24,
        color: ColorPalette.Black,
        strokeWidth: 1.5,
      },
    ],
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <Header
        name="Payments"
        variant={TypographyVariant.H6_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={<ArrowLeft style={undefined} size={22} onPress={goBack} />}
        rightIcons={headerIcons}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: getScreenHeight(1.2) },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Stripe Connect Section */}
        {/* <View style={styles.stripEditContainer}>
          <View style={styles.stripEditContainerOne}>
            <PayPalIcon style={undefined} size={32} />
            <View style={styles.connectContainer}>
              <Typography
                text="PayPal"
                variant={TypographyVariant.LMEDIUM_MEDIUM}
                customTextStyles={{
                  color: ColorPalette.GREY_TEXT_500,
                  fontSize: getScreenWidth(3.3),
                }}
              />
              <View style={styles.connectContainerOne}>
                <Typography
                  text="Connected"
                  variant={TypographyVariant.PXSMALL_REGULAR}
                  customTextStyles={{color: ColorPalette.ProgressLine}}
                />
                <Image
                  source={require('../../../../../../assets/images/elements.png')}
                  style={styles.statusIcon}
                />
              </View>
            </View>
          </View>
          <TextButton
            text="Edit"
            onPress={openEditModal}
            variant={TypographyVariant.PMEDIUM_MEDIUM}
            underline
            customContainerStyles={styles.editButton}
            customTextStyles={{color: ColorPalette.ProgressLine}}
          />
        </View> */}

        {/* Balance Section */}
        <View style={styles.withdrawContainer}>
          <View style={styles.bgContainer}>
            <View style={styles.walletBalanceContainer}>
              <WalletIcon style={undefined} size={32} />
              <View style={styles.walletBalanceContainerOne}>
                <Typography
                  text="Current balance"
                  variant={TypographyVariant.PSMALL_REGULAR}
                  customTextStyles={{ color: ColorPalette.GREY_TEXT_500 }}
                />
                <Typography
                  text={currentBalance}
                  variant={TypographyVariant.H5_BOLD}
                  customTextStyles={{ color: ColorPalette.BalanceColor }}
                />
              </View>
            </View>
            <Button
              text="Withdraw"
              onPress={navigateToWithdraw}
              variant={ButtonVariant.PRIMARY}
              size={ButtonSize.MEDIUM}
              state={ButtonState.DEFAULT}
              customStyles={styles.withdrawButton}
              textVariant={TypographyVariant.LMEDIUM_BOLD}
              customTextStyles={styles.withdrawButtonText}
            />
          </View>
        </View>

        {/* Tabs Section */}
        <View style={styles.tabsContainer}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
            style={styles.tabView}
          />
        </View>
      </ScrollView>

      {/* Modal Component */}
      <AddModal
        isVisible={isModalVisible}
        onClose={closeModal}
        showCloseIcon={false}
        buttons={modalButtons}
      />
    </SafeAreaView>
  );
};

export default PaymentInfo;
