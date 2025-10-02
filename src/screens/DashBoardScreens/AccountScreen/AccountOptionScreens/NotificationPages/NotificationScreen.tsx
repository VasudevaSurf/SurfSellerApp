import React, {useState, useRef} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Animated,
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

  // Animation references for each notification
  const animationRefs = useRef<{[key: string]: Animated.Value}>({});

  const [modalConfig, setModalConfig] = useState({
    isVisible: false,
    type: '', // 'delete' | 'clearAll'
    headerTitle: '',
    headerText: '',
    notificationId: '', // optional, single notification id
  });

  // Initialize animation value for a notification
  const getAnimationValue = (id: string) => {
    if (!animationRefs.current[id]) {
      animationRefs.current[id] = new Animated.Value(0);
    }
    return animationRefs.current[id];
  };

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

  // Function to animate and remove a single notification
  const animateAndRemoveNotification = (id: string, callback?: () => void) => {
    const animValue = getAnimationValue(id);

    Animated.timing(animValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Remove from state after animation completes
      setAllNotifications(prev => prev.filter(item => item.id !== id));
      setAdministrationNotification(prev =>
        prev.filter(item => item.id !== id),
      );
      setProductNotifications(prev => prev.filter(item => item.id !== id));

      // Clean up animation ref
      delete animationRefs.current[id];

      if (callback) callback();
    });
  };

  // Function to animate and remove all notifications
  const animateAndClearAllNotifications = () => {
    const currentNotifications = getCurrentNotifications();

    if (currentNotifications.length === 0) return;

    // Start all animations simultaneously
    const animations = currentNotifications.map((item, index) => {
      const animValue = getAnimationValue(item.id);

      return Animated.timing(animValue, {
        toValue: 1,
        duration: 300,
        delay: index * 100, // Stagger the animations
        useNativeDriver: true,
      });
    });

    // Run all animations in parallel
    Animated.parallel(animations).start(() => {
      // Clear all notifications after animations complete
      switch (index) {
        case 0: // All
          setAllNotifications([]);
          break;
        case 1: // Administrations
          setAdministrationNotification([]);
          break;
        case 2: // Products
          setProductNotifications([]);
          break;
      }

      // Clean up all animation refs
      currentNotifications.forEach(item => {
        delete animationRefs.current[item.id];
      });
    });
  };

  // Get current notifications based on active tab
  const getCurrentNotifications = () => {
    switch (index) {
      case 0:
        return allNotifications;
      case 1:
        return administrationNotification;
      case 2:
        return productNotifications;
      default:
        return [];
    }
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
          data.map(item => {
            const animValue = getAnimationValue(item.id);

            // Animation styles
            const animatedStyle = {
              transform: [
                {
                  translateX: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, getScreenWidth(100)], // Slide to right
                  }),
                },
                {
                  scale: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.8], // Slightly scale down
                  }),
                },
              ],
              opacity: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0], // Fade out
              }),
            };

            return (
              <Animated.View
                key={item.id}
                style={[styles.notificationCard, animatedStyle]}>
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
                  variant={TypographyVariant.LMEDIUM_REGULAR}
                  customTextStyles={styles.notificationDescription}
                />
              </Animated.View>
            );
          })
        ) : (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyBox}>
              <Typography
                text="List is now empty."
                variant={TypographyVariant.H5_BOLD}
                customTextStyles={styles.emptyTitle}
              />
              <Typography
                text="We'll notify you when there's something new."
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
    animateAndRemoveNotification(id);
  };

  const handleClearAllNotifications = () => {
    console.log('Clear all notifications clicked');
    animateAndClearAllNotifications();
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
          contentContainerStyle={[styles.scrollContent]}
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

export default NotificationScreen;
