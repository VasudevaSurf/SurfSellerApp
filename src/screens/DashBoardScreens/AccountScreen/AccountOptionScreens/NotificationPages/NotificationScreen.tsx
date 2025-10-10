import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Animated,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../../redux/store';
import ArrowLeftIcon from '../../../../../assets/icons/ArrowLeftIcon';
import ToggleSwitch from 'toggle-switch-react-native';
import ToggleButtons from '../../../../../components/MainComponents/ToggleButtons/ToggleButtons';
import {Header} from '../../../../../components/UserComponents/Header/Header';
import {Typography} from '../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../config/colorPalette';
import {
  getFigmaDimension,
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import {BorderRadius} from '../../../../../config/globalStyles';
import {goBack, navigate} from '../../../../../navigation/utils/navigationRef';
import {styles} from './NotificationScreen.styles';
import ArrowLeft from '../../../../../assets/icons/ArrowLeft';
import {TabView} from 'react-native-tab-view';
import {AddModal} from '../../../../../components/MainComponents/AddModal/AddModal';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../components/UserComponents/Button';
import AnimatedLoader from '../../../../../assets/icons/LoaderIcon';
import PlusIcon from '../../../../../assets/icons/PlusIcon';
import {
  fetchNotifications,
  deleteNotification,
  markNotificationAsRead,
  clearNotificationsError,
} from '../../../../../redux/slices/notificationsSlice';
import {NotificationItem} from '../../../../../services/apiService';

const NotificationScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector(
    (state: RootState) => state.auth.userData?.user_id,
  );
  const {notifications, loading, error, deleting} = useSelector(
    (state: RootState) => state.notifications,
  );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'all', title: 'All'},
    {key: 'administrations', title: 'Administrations'},
    {key: 'products', title: 'Products'},
  ]);
  const [refreshing, setRefreshing] = useState(false);

  // Animation references for each notification
  const animationRefs = useRef<{[key: string]: Animated.Value}>({});

  const [modalConfig, setModalConfig] = useState({
    isVisible: false,
    type: '', // 'delete' | 'clearAll'
    headerTitle: '',
    headerText: '',
    notificationId: '', // optional, single notification id
  });

  // Load notifications on mount
  useEffect(() => {
    if (userId) {
      loadNotifications();
    }
  }, [userId]);

  const loadNotifications = useCallback(
    (section?: string) => {
      if (userId) {
        dispatch(fetchNotifications({userId, section}));
      }
    },
    [dispatch, userId],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const currentSection =
      routes[index].key === 'all' ? undefined : routes[index].key;
    await dispatch(
      fetchNotifications({userId: userId!, section: currentSection}),
    );
    setRefreshing(false);
  }, [dispatch, userId, index, routes]);

  // Filter notifications by tab - FIXED KEY MAPPING
  const getNotificationsForTab = useCallback(
    (tabKey: string): NotificationItem[] => {
      if (tabKey === 'all') {
        return notifications;
      }
      // Map "administrations" to "administration" to match API
      const sectionKey =
        tabKey === 'administrations' ? 'administration' : tabKey;
      return notifications.filter(n => n.section === sectionKey);
    },
    [notifications],
  );

  // Format timestamp
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(parseInt(timestamp) * 1000);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return days === 1 ? 'Yesterday' : `${days} days ago`;
    }

    return date.toLocaleDateString();
  };

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
  const animateAndRemoveNotification = async (
    id: string,
    callback?: () => void,
  ) => {
    const animValue = getAnimationValue(id);

    Animated.timing(animValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(async () => {
      // Remove from server
      if (userId) {
        await dispatch(deleteNotification({userId, notificationId: id}));
      }

      // Clean up animation ref
      delete animationRefs.current[id];

      if (callback) callback();
    });
  };

  // Function to animate and remove all notifications
  const animateAndClearAllNotifications = async () => {
    const currentNotifications = getNotificationsForTab(routes[index].key);

    if (currentNotifications.length === 0) return;

    // Start all animations simultaneously
    const animations = currentNotifications.map((item, idx) => {
      const animValue = getAnimationValue(item.notification_id);

      return Animated.timing(animValue, {
        toValue: 1,
        duration: 300,
        delay: idx * 100, // Stagger the animations
        useNativeDriver: true,
      });
    });

    // Run all animations in parallel
    Animated.parallel(animations).start(async () => {
      // Delete all notifications from server
      if (userId) {
        for (const item of currentNotifications) {
          await dispatch(
            deleteNotification({
              userId,
              notificationId: item.notification_id,
            }),
          );
          delete animationRefs.current[item.notification_id];
        }
      }
    });
  };

  // Get current notifications based on active tab
  const getCurrentNotifications = () => {
    return getNotificationsForTab(routes[index].key);
  };

  const renderNotificationSection = (
    title: string,
    data: NotificationItem[],
    isLoading: boolean,
  ) => {
    return (
      <ScrollView
        style={{flex: 1, marginHorizontal: getScreenWidth(4)}}
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
            const animValue = getAnimationValue(item.notification_id);
            const isDeleting = deleting.includes(item.notification_id);

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
              <TouchableOpacity
                key={item.notification_id}
                onLongPress={() => openDeleteModal(item.notification_id)}
                disabled={isDeleting}
                activeOpacity={0.7}>
                <Animated.View style={[styles.notificationCard, animatedStyle]}>
                  <View style={styles.notificationHeader}>
                    <Typography
                      text={item.title}
                      variant={TypographyVariant.PSMALL_MEDIUM}
                      customTextStyles={styles.notificationTitle}
                    />
                    <Typography
                      text={formatTimestamp(item.timestamp)}
                      variant={TypographyVariant.LSMALL_REGULAR}
                      customTextStyles={styles.notificationTime}
                    />
                  </View>

                  <Typography
                    text={item.message}
                    variant={TypographyVariant.LMEDIUM_REGULAR}
                    customTextStyles={styles.notificationDescription}
                  />
                </Animated.View>
              </TouchableOpacity>
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
                  params: {screen: 'HomeScreen'},
                })
              }
              customStyles={styles.emptyButton}
            />
          </View>
        )}
      </ScrollView>
    );
  };

  const renderScene = ({route}) => {
    const tabNotifications = getNotificationsForTab(route.key);
    return renderNotificationSection(route.title, tabNotifications, loading);
  };

  const renderTabBar = props => (
    <View style={styles.tabBarContainer}>
      {props.navigationState.routes.map((route, i) => {
        const isFocused = props.navigationState.index === i;
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              setIndex(i);
              const section = route.key === 'all' ? undefined : route.key;
              loadNotifications(section);
            }}
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
          onPress: () => setModalConfig({...modalConfig, isVisible: false}),
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
            setModalConfig({...modalConfig, isVisible: false});
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
          onPress: () => setModalConfig({...modalConfig, isVisible: false}),
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
            setModalConfig({...modalConfig, isVisible: false});
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
        // rightIcons={[
        //   {
        //     icon: () => (
        //       <Typography
        //         text="Clear All"
        //         variant={TypographyVariant.LMEDIUM_MEDIUM}
        //         customTextStyles={{color: ColorPalette.RED_200, fontSize: 16}}
        //       />
        //     ),
        //     onPress: openClearAllModal,
        //   },
        // ]}
      />
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={[styles.scrollContent]}
          showsVerticalScrollIndicator={false}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: Dimensions.get('window').width}}
            renderTabBar={renderTabBar}
            swipeEnabled={false}
          />
        </ScrollView>
      </View>

      <AddModal
        isVisible={modalConfig.isVisible}
        onClose={() => setModalConfig({...modalConfig, isVisible: false})}
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
