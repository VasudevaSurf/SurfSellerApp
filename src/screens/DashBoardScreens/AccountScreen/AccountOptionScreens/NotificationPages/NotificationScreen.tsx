import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import ArrowLeftIcon from '../../../../../assets/icons/ArrowLeftIcon';
import ToggleButtons from '../../../../../components/MainComponents/ToggleButtons/ToggleButtons';
import { Header } from '../../../../../components/UserComponents/Header/Header';
import { Typography } from '../../../../../components/UserComponents/Typography/Typography';
import { TypographyVariant } from '../../../../../components/UserComponents/Typography/Typography.types';
import { ColorPalette } from '../../../../../config/colorPalette';
import {
  getFigmaDimension,
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import { BorderRadius } from '../../../../../config/globalStyles';
import { goBack, navigate } from '../../../../../navigation/utils/navigationRef';
import { styles } from './NotificationScreen.styles';
import ArrowLeft from '../../../../../assets/icons/ArrowLeft';
import { TabView } from 'react-native-tab-view';
import { AddModal } from '../../../../../components/MainComponents/AddModal/AddModal';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../components/UserComponents/Button';
import AnimatedLoader from '../../../../../assets/icons/LoaderIcon';
import PlusIcon from '../../../../../assets/icons/PlusIcon';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
}

const NotificationScreen: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'all', title: 'All' },
    { key: 'administrations', title: 'Administrations' },
    { key: 'products', title: 'Products' },
  ]);
  const [loading, setLoading] = useState(false);
  const [allNotifications, setAllNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Your product has been approved',
      description:
        'Abstract Fruit Trapezoidal Tote Bag" has been approved by the store administration.',
      time: '2 hours ago',
    },
    {
      id: '2',
      title: 'Your product has been approved',
      description:
        'Abstract Fruit Trapezoidal Tote Bag" has been approved by the store administration.',
      time: 'Yesterday',
    },
  ]);
  const [administrationNotification, setAdministrationNotification] = useState<
    NotificationItem[]
  >([]);
  const [productNotifications, setProductNotifications] = useState<
    NotificationItem[]
  >([]);

  const [modalConfig, setModalConfig] = useState({
    isVisible: false,
    type: '', // 'delete' | 'clearAll'
    headerTitle: '',
    headerText: '',
    notificationId: '', // optional, single notification id
  });

  const openDeleteModal = (id: string) => {
    setModalConfig({
      isVisible: true,
      type: 'delete',
      headerTitle: 'Delete Notification',
      headerText: 'This notification will be permanently deleted.',
      notificationId: id,
    });
  };

  const openClearAllModal = () => {
    setModalConfig({
      isVisible: true,
      type: 'clearAll',
      headerTitle: 'Clear All Notifications',
      headerText: 'All notifications will be cleared from your screen.',
      notificationId: '',
    });
  };

  const renderNotificationSection = (
    title: string,
    data: NotificationItem[],
    isLoading: boolean,
  ) => {
    return (
      <ScrollView
        style={{ flex: 1, marginHorizontal: getScreenWidth(4) }}
        contentContainerStyle={{ flexGrow: 1 }}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            {/* <ActivityIndicator size="large" color={ColorPalette.PURPLE_300} /> */}
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
        ) : data.length > 0 ? (
          data.map(item => (
            <View key={item.id} style={styles.notificationCard}>
              <View style={styles.notificationHeader}>
                <Typography
                  text={item.title}
                  variant={TypographyVariant.PSMALL_MEDIUM}
                  customTextStyles={styles.notificationTitle}
                />
                <Typography
                  text={item.time}
                  variant={TypographyVariant.LSMALL_REGULAR}
                  customTextStyles={styles.notificationTime}
                />
              </View>

              <Typography
                text={item.description}
                variant={TypographyVariant.LSMALL_REGULAR}
                customTextStyles={styles.notificationDescription}
              />
            </View>
          ))
        ) : (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyBox}>
              <Typography
                text="List is now empty."
                variant={TypographyVariant.H5_BOLD}
                customTextStyles={styles.emptyTitle}
              />
              <Typography
                text="We’ll notify you when there’s something new."
                variant={TypographyVariant.PSMALL_REGULAR}
                customTextStyles={styles.emptySubtitle}
              />
            </View>

            <Button
              text="Go to dashboard"
              variant={ButtonVariant.PRIMARY}
              state={ButtonState.DEFAULT}
              size={ButtonSize.LARGE}
              textVariant={TypographyVariant.H6_BOLD}
              withShadow
              onPress={() =>
                navigate('Dashboard', {
                  screen: 'Home',
                  params: { screen: 'HomeScreen' },
                })
              }
              // bgColor={ColorPalette.PURPLE_300}
              customStyles={styles.emptyButton}
            />
          </View>
        )}
      </ScrollView>
    );
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'all':
        return renderNotificationSection('All', allNotifications, loading);
      case 'administrations':
        return renderNotificationSection(
          'Administrations',
          administrationNotification,
          loading,
        );
      case 'products':
        return renderNotificationSection(
          'Products',
          productNotifications,
          loading,
        );
      default:
        return null;
    }
  };

  const renderTabBar = props => (
    <View style={styles.tabBarContainer}>
      {props.navigationState.routes.map((route, i) => {
        const isFocused = props.navigationState.index === i;
        return (
          <TouchableOpacity
            key={i}
            onPress={() => setIndex(i)}
            style={[styles.tabButton, isFocused && styles.activeTabButton]}>
            <Typography
              text={route.title}
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              customTextStyles={{
                color: isFocused
                  ? ColorPalette.White
                  : ColorPalette.GREY_TEXT_500,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const handleDeleteNotification = (id: string) => {
    console.log('Delete notification clicked with id:', id);
  };

  const handleClearAllNotifications = () => {
    console.log('Clear all notifications clicked');
  };

  const getButtons = () => {
    if (modalConfig.type === 'delete') {
      return [
        {
          text: 'Cancel',
          onPress: () => setModalConfig({ ...modalConfig, isVisible: false }),
          variant: ButtonVariant.PRIMARY,
          type: ButtonType.OUTLINED,
          size: ButtonSize.MEDIUM,
          customStyles: styles.customButton,
          customTextStyles: styles.customText,
        },
        {
          text: 'Delete Item',
          onPress: () => {
            if (modalConfig.notificationId) {
              handleDeleteNotification(modalConfig.notificationId);
            }
            setModalConfig({ ...modalConfig, isVisible: false });
          },
          variant: ButtonVariant.PRIMARY,
          type: ButtonType.PRIMARY,
          size: ButtonSize.MEDIUM,
          bgColor: ColorPalette.RED_100,
          customStyles: styles.customButton,
        },
      ];
    }

    if (modalConfig.type === 'clearAll') {
      return [
        {
          text: 'Cancel',
          onPress: () => setModalConfig({ ...modalConfig, isVisible: false }),
          variant: ButtonVariant.PRIMARY,
          type: ButtonType.OUTLINED,
          size: ButtonSize.MEDIUM,
          customStyles: styles.customButton,
          customTextStyles: styles.customText,
        },
        {
          text: 'Clear All',
          onPress: () => {
            handleClearAllNotifications();
            setModalConfig({ ...modalConfig, isVisible: false });
          },
          variant: ButtonVariant.PRIMARY,
          type: ButtonType.PRIMARY,
          size: ButtonSize.MEDIUM,
          bgColor: ColorPalette.RED_100,
          customStyles: styles.customButton,
        },
      ];
    }

    return [];
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name="Notifications"
        variant={TypographyVariant.H6_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={<ArrowLeft style={undefined} size={22} onPress={goBack} />}
        rightIcons={[
          {
            icon: () => (
              <Typography
                text="Clear All"
                variant={TypographyVariant.LMEDIUM_MEDIUM}
                customTextStyles={{ color: ColorPalette.RED_200, fontSize: 16 }}
              />
            ),
            onPress: openClearAllModal,
          },
        ]}
      />
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={[
            styles.scrollContent,
            // {paddingTop: getScreenHeight(2)},
          ]}
          showsVerticalScrollIndicator={false}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get('window').width }}
            renderTabBar={renderTabBar}
            swipeEnabled={false}
          />
        </ScrollView>
      </View>

      <AddModal
        isVisible={modalConfig.isVisible}
        onClose={() => setModalConfig({ ...modalConfig, isVisible: false })}
        headerTitle={modalConfig.headerTitle}
        headerText={modalConfig.headerText}
        buttons={getButtons()}
        showCloseIcon={false}
        footerStyle={{
          display: 'flex',
          flexDirection: 'row',
        }}
        containerStyle={{
          gap: getScreenHeight(3),
        }}
      />
    </SafeAreaView>
  );
};

// const NotificationScreen: React.FC = () => {
//   const [autoAcceptOrders, setAutoAcceptOrders] = useState('yes');
//   const [whatsappNotifications, setWhatsappNotifications] = useState(true);
//   const trackWidth = getFigmaDimension(40);
//   const trackHeight = getFigmaDimension(24);
//   const thumbDiameter = getFigmaDimension(18);

//   const handleAutoAcceptChange = (value: string) => {
//     setAutoAcceptOrders(value);
//     console.log(`Auto accept orders: ${value}`);
//   };

//   const handleWhatsappToggle = (value: boolean) => {
//     setWhatsappNotifications(value);
//     console.log(`WhatsApp notifications: ${value}`);
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={['bottom']}>
//       <Header
//         name="Notifications"
//         variant={TypographyVariant.LMEDIUM_BOLD}
//         textColor={ColorPalette.AgreeTerms}
//         leftIcon={<ArrowLeft style={undefined} size={16} onPress={goBack} />}
//         rightIcons={null}
//       />
//       <View style={styles.mainContainer}>
//         <ScrollView
//           style={styles.scrollViewContainer}
//           contentContainerStyle={[
//             styles.scrollContent,
//             {paddingTop: getScreenHeight(2)},
//           ]}
//           showsVerticalScrollIndicator={false}>
//           <View style={styles.sectionItem}>
//             <View style={styles.textContainer}>
//               <Typography
//                 text="Auto accept orders"
//                 variant={TypographyVariant.LMEDIUM_EXTRASEMIBOLD}
//                 customTextStyles={styles.primaryText}
//               />

//               <ToggleButtons
//                 leftButtonText="Yes"
//                 rightButtonText="No"
//                 leftButtonValue="yes"
//                 rightButtonValue="no"
//                 initialActiveButton={autoAcceptOrders}
//                 onSelectionChange={handleAutoAcceptChange}
//                 inactiveBackgroundColor="transparent"
//                 activeBackgroundColor={ColorPalette.toggleColor}
//                 inactiveTextColor={ColorPalette.GREY_TEXT_500}
//                 activeTextColor={ColorPalette.White}
//                 containerStyle={styles.toggleContainer}
//                 buttonStyle={styles.toggleButton}
//                 textStyle={styles.toggleButtonText}
//                 typographyVariant={TypographyVariant.LSMALL_MEDIUM}
//               />
//             </View>
//             <View
//               style={{
//                 width: getScreenWidth(50),
//               }}>
//               <Typography
//                 text="(Mark orders as Accepted automatically for the desired payment modes)"
//                 variant={TypographyVariant.LXSMALL_REGULAR}
//                 customTextStyles={styles.secondaryText}
//               />
//             </View>
//           </View>

//           <View style={styles.sectionItem}>
//             <View style={styles.textContainer}>
//               <Typography
//                 text="WhatsApp notifications"
//                 variant={TypographyVariant.LMEDIUM_EXTRASEMIBOLD}
//                 customTextStyles={styles.primaryText}
//               />
//               <ToggleSwitch
//                 isOn={whatsappNotifications}
//                 onToggle={handleWhatsappToggle}
//                 onColor={ColorPalette.Success}
//                 offColor={ColorPalette.Gray}
//                 size="small"
//                 thumbOnStyle={{
//                   backgroundColor: ColorPalette.White,
//                   elevation: 0,
//                   shadowOpacity: 0,
//                   shadowColor: 'transparent',
//                   shadowOffset: {height: 0, width: 0},
//                   shadowRadius: 0,
//                   width: thumbDiameter,
//                   height: thumbDiameter,
//                   borderRadius: thumbDiameter / 2,
//                   margin: (trackHeight - thumbDiameter) / 2,
//                 }}
//                 thumbOffStyle={{
//                   backgroundColor: ColorPalette.White,
//                   elevation: 0,
//                   shadowOpacity: 0,
//                   shadowColor: 'transparent',
//                   shadowOffset: {height: 0, width: 0},
//                   shadowRadius: 0,
//                   width: thumbDiameter,
//                   height: thumbDiameter,
//                   borderRadius: thumbDiameter / 2,
//                   margin: (trackHeight - thumbDiameter) / 2,
//                 }}
//                 trackOnStyle={{
//                   width: trackWidth,
//                   height: trackHeight,
//                   borderRadius: trackHeight / 2,
//                   padding: 0,
//                 }}
//                 trackOffStyle={{
//                   width: trackWidth,
//                   height: trackHeight,
//                   borderRadius: trackHeight / 2,
//                   padding: 0,
//                 }}
//               />
//             </View>
//             <Typography
//               text="(Send order notifications to the WhatsApp directly)"
//               variant={TypographyVariant.LXSMALL_REGULAR}
//               customTextStyles={styles.secondaryText}
//             />
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

export default NotificationScreen;
