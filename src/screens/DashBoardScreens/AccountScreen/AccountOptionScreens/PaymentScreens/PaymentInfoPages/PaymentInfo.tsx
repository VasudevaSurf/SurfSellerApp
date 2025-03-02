import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ArrowLeftIcon from '../../../../../../assets/icons/ArrowLeftIcon';
import {
  goBack,
  navigate,
} from '../../../../../../navigation/utils/navigationRef';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {Header} from '../../../../../../components/UserComponents/Header/Header';
import {
  getFigmaDimension,
  getScreenHeight,
} from '../../../../../../helpers/screenSize';
import BankOutlineIcon from '../../../../../../assets/icons/BankOutlineIcon';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TextButton} from '../../../../../../components/UserComponents/TextButton';
import WalletIcon from '../../../../../../assets/icons/WalletIcon';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../../components/UserComponents/Button';
import InfoIconPay from '../../../../../../assets/icons/InfoIconPay';
import {styles} from './PaymentInfo.styles';
import {SlidingBar} from '../../../../../../components/MainComponents/SlidingBar/SlidingBar';
import {AddModal} from '../../../../../../components/MainComponents/AddModal/AddModal';

const initialLayout = {width: Dimensions.get('window').width};

const PaymentInfo = () => {
  const filterOptions = [
    {id: 'All', label: 'All'},
    {id: 'Completed', label: 'Completed'},
    {id: 'Pending', label: 'Pending'},
    {id: 'Failed', label: 'Failed'},
  ];

  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'payouts', title: 'Payouts'},
    {key: 'withdrawals', title: 'Withdrawals'},
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      default: {
        color: ColorPalette.GREY_TEXT_500,
        bgColor: ColorPalette.GREY_200,
      },
    };

    return statusConfig[status] || statusConfig.default;
  };

  const renderHistoryItem = (type, status, amount) => {
    const {color: statusColor, bgColor: statusBgColor} =
      getStatusColors(status);

    return (
      <View style={styles.payoutItem}>
        <View style={styles.payoutItemLeft}>
          <View style={styles.payoutItemHeader}>
            <Typography
              text={type}
              variant={TypographyVariant.PMEDIUM_MEDIUM}
              customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
            />
            <InfoIconPay style={undefined} />
          </View>

          <Typography
            text="28/09/2024, 14:25"
            variant={TypographyVariant.LSMALL_REGULAR}
            customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
          />
        </View>
        <View style={styles.payoutItemRight}>
          <Typography
            text={`€${amount}`}
            variant={TypographyVariant.H6_BOLD}
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
          <View style={[styles.statusBadge, {backgroundColor: statusBgColor}]}>
            <Typography
              text={status}
              variant={TypographyVariant.LXSMALL_MEDIUM}
              customTextStyles={{color: statusColor}}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderHistorySection = (title, type, hasData = true) => {
    return (
      <>
        <View style={styles.divider}></View>
        <ScrollView
          style={styles.tabContent}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.tabContent}>
            <Typography
              text={`${title} History`}
              variant={TypographyVariant.LMEDIUM_BOLD}
              customTextStyles={styles.sectionTitle}
            />

            <SlidingBar
              options={filterOptions}
              selectedOption={selectedFilter}
              onOptionSelect={handleFilterChange}
              customContainerStyle={styles.slidingBarContainer}
            />

            <View style={[styles.payoutsList, !hasData && styles.emptyState]}>
              {hasData ? (
                <>
                  {renderHistoryItem(type, 'Pending', '89.9')}
                  {renderHistoryItem(type, 'Declined', '89.9')}
                  {renderHistoryItem(type, 'Completed', '89.9')}
                  {renderHistoryItem(type, 'Pending', '89.9')}
                </>
              ) : (
                <Typography
                  text={`No ${title.toLowerCase()} yet`}
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_400}}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </>
    );
  };

  const PayoutsRoute = () => renderHistorySection('Payouts', 'Payouts', true);
  const WithdrawalsRoute = () =>
    renderHistorySection('Withdrawals', 'Withdrawals', false);

  const renderScene = SceneMap({
    payouts: PayoutsRoute,
    withdrawals: WithdrawalsRoute,
  });

  const renderTabBar = props => (
    <View style={styles.tabBarContainer}>
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: 'transparent'}}
        style={styles.tabBar}
        tabStyle={styles.tab}
        renderTabBarItem={({route}) => {
          const isFocused =
            props.navigationState.index ===
            props.navigationState.routes.findIndex(r => r.key === route.key);

          return (
            <TouchableOpacity
              onPress={() => {
                const routeIndex = props.navigationState.routes.findIndex(
                  r => r.key === route.key,
                );
                setIndex(routeIndex);
              }}
              style={[styles.tabButton, isFocused && styles.activeTabButton]}>
              <Typography
                text={route.title}
                variant={TypographyVariant.PMEDIUM_MEDIUM}
                customTextStyles={{
                  color: isFocused
                    ? ColorPalette.White
                    : ColorPalette.GREY_TEXT_500,
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
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

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <Header
        name="Payments"
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
        {/* Stripe Connect Section */}
        <View style={styles.stripEditContainer}>
          <View style={styles.stripEditContainerOne}>
            <BankOutlineIcon style={undefined} size={32} />
            <View style={styles.connectContainer}>
              <Typography
                text="Stripe connect"
                variant={TypographyVariant.LMEDIUM_BOLD}
                customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
              />
              <View style={styles.connectContainerOne}>
                <Typography
                  text="Connected"
                  variant={TypographyVariant.PXSMALL_REGULAR}
                  customTextStyles={{color: ColorPalette.ConnectColor}}
                />
                <Image
                  source={require('../../../../../../assets/images/success.png')}
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
            customTextStyles={{color: ColorPalette.PURPLE_300}}
          />
        </View>

        {/* Balance Section */}
        <View style={styles.withdrawContainer}>
          <View style={styles.bgContainer}>
            <View style={styles.walletBalanceContainer}>
              <WalletIcon style={undefined} size={32} />
              <View style={styles.walletBalanceContainerOne}>
                <Typography
                  text="Current balance"
                  variant={TypographyVariant.PSMALL_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
                />
                <Typography
                  text="€12.50"
                  variant={TypographyVariant.H5_BOLD}
                  customTextStyles={{color: ColorPalette.BalanceColor}}
                />
              </View>
            </View>
            <Button
              text="WITHDRAW"
              onPress={navigateToWithdraw}
              variant={ButtonVariant.PRIMARY}
              size={ButtonSize.MEDIUM}
              state={ButtonState.DEFAULT}
              customStyles={styles.withdrawButton}
              customTextStyles={styles.withdrawButtonText}
            />
          </View>
        </View>

        {/* Tabs Section */}
        <View style={styles.tabsContainer}>
          <TabView
            navigationState={{index, routes}}
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
