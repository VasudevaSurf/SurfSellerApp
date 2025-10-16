import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, ScrollView, Share, View, Linking, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import QuestionMarkIcon from '../../../assets/icons/QuestionMarkIcon';
import {AddModal} from '../../../components/MainComponents/AddModal/AddModal';
import {MenuItem} from '../../../components/MainComponents/MenuItem/MenuItem';
import {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../components/UserComponents/Button';
import {Header} from '../../../components/UserComponents/Header/Header';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {
  navigate,
  navigateToAuth,
} from '../../../navigation/utils/navigationRef';
import {logoutUser} from '../../../redux/slices/authSlice';
import {
  fetchProfile,
  deleteAccount,
  clearDeleteAccountSuccess,
} from '../../../redux/slices/profileSlice';
import {styles} from './AccountScreen.styles';
import {RootState, AppDispatch} from '../../../redux/store';
import BusinessProfileIcon from '../../../assets/icons/BusinessProfileIcon';
import {BorderRadius} from '../../../config/globalStyles';
import BusinessAdministrationIcon from '../../../assets/icons/BusinessAdministratorsIcon';
import BankDetailsIcon from '../../../assets/icons/BankDetailsIcon';
import PaymentsIcon from '../../../assets/icons/PaymentsIcon';
import BellIcon from '../../../assets/icons/BellIcon';
import FaqIcon from '../../../assets/icons/FaqIcon';
import PrivacyPolicyIcon from '../../../assets/icons/PrivacyPolicyIcon';
import ShareAppIcon from '../../../assets/icons/ShareAppIcon';
import ChatIcon from '../../../assets/icons/ChatIcon';
import LogoutIcon from '../../../assets/icons/LogOutIcon';
import {TrashIcon2} from '../../../assets/icons/NewProductIcons/TrashIcon2';
import TermsConditionsIcon from '../../../assets/icons/TermsAndConditionIcon';
import {fetchInitializer} from '../../../redux/slices/initializerSlice';

const AccountScreen = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const {
    profileData,
    loading,
    error,
    deletingAccount, // ✅ Add this
    deleteAccountError, // ✅ Add this
    deleteAccountSuccess, // ✅ Add this
  } = useSelector((state: RootState) => state.profile);

  // ✅ Get initializer data for Privacy Policy and Terms URLs
  const initializerData = useSelector(
    (state: RootState) => state.initializer.data,
  );

  useEffect(() => {
    if (deleteAccountSuccess) {
      Alert.alert(
        'Account Deleted',
        'Your account deletion request has been successfully submitted.',
        [
          {
            text: 'OK',
            onPress: async () => {
              dispatch(clearDeleteAccountSuccess());
              setShowDeleteModal(false);
              // Logout and navigate to auth
              await dispatch(logoutUser());
              navigateToAuth();
            },
          },
        ],
        {cancelable: false},
      );
    }
  }, [deleteAccountSuccess, dispatch]);

  useEffect(() => {
    if (deleteAccountError) {
      Alert.alert('Error', deleteAccountError, [
        {
          text: 'OK',
          onPress: () => {
            dispatch(clearDeleteAccountSuccess());
          },
        },
      ]);
    }
  }, [deleteAccountError, dispatch]);

  const handleDeleteAccount = useCallback(async () => {
    if (!userData?.user_id) {
      Alert.alert('Error', 'User ID not found');
      return;
    }

    console.log('🗑️ User confirmed account deletion');

    try {
      await dispatch(deleteAccount(userData.user_id)).unwrap();
      // Success is handled by useEffect above
    } catch (error) {
      // Error is handled by useEffect above
      console.error('Delete account error:', error);
    }
  }, [dispatch, userData]);

  // ✅ Debug: Log initializer data when component mounts or data changes
  useEffect(() => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 [ACCOUNT SCREEN] Initializer Data Check');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Has Initializer Data?', !!initializerData);

    if (initializerData) {
      console.log('📊 Available URLs:');
      console.log(
        '├─ Privacy Policy URL:',
        initializerData.privacy_policy_page,
      );
      console.log('├─ Terms of Use URL:', initializerData.terms_of_use_page);
      console.log('├─ WhatsApp URL:', initializerData.whatsapp_url);
      console.log('└─ Default Language:', initializerData.default_language);

      console.log('\n🔍 URL Details:');
      console.log('Privacy Policy:');
      console.log('├─ Type:', typeof initializerData.privacy_policy_page);
      console.log(
        '├─ Length:',
        initializerData.privacy_policy_page?.length || 0,
      );
      console.log('└─ Value:', initializerData.privacy_policy_page);

      console.log('\nTerms of Use:');
      console.log('├─ Type:', typeof initializerData.terms_of_use_page);
      console.log('├─ Length:', initializerData.terms_of_use_page?.length || 0);
      console.log('└─ Value:', initializerData.terms_of_use_page);
    } else {
      console.warn('⚠️ No initializer data available yet');
      console.log('Attempting to fetch initializer data...');

      // ✅ Try to fetch initializer data if not available
      dispatch(fetchInitializer());
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }, [initializerData, dispatch]);

  // Update the handleOpenLink function to check for data
  const handleOpenLink = useCallback(
    async (url: string, linkName: string) => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🔗 [OPEN LINK] Attempting to open: ${linkName}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      try {
        console.log('📊 Link Details:');
        console.log('├─ Link Name:', linkName);
        console.log('├─ URL (RAW from API):', url);
        console.log('├─ URL Length:', url?.length || 0);
        console.log('└─ Is Empty?', !url || url.trim() === '');

        // ✅ Check if initializer data is available
        if (!initializerData) {
          console.error('❌ Initializer data not loaded');
          Alert.alert(
            'Loading',
            'App configuration is still loading. Please try again in a moment.',
            [
              {
                text: 'Retry',
                onPress: () => {
                  dispatch(fetchInitializer());
                },
              },
              {text: 'Cancel', style: 'cancel'},
            ],
          );
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
          return;
        }

        if (!url || url.trim() === '') {
          console.error('❌ URL is empty or undefined');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
          Alert.alert('Error', `${linkName} link is not available`);
          return;
        }

        console.log('\n🚀 Opening URL directly (no modifications)...');

        await Linking.openURL(url);
        console.log('✅ [OPEN LINK] Successfully opened:', linkName);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      } catch (error) {
        console.error('\n💥 [OPEN LINK] Failed to open URL');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('Error Details:', {
          linkName,
          url,
          errorMessage: error?.message,
          errorType: error?.name,
        });
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        Alert.alert(
          'Unable to Open Link',
          `Failed to open ${linkName}\n\nURL: ${url}\n\nError: ${error?.message}`,
        );
      }
    },
    [initializerData, dispatch],
  );

  // Fetch profile data when component mounts
  useEffect(() => {
    if (userData?.user_id) {
      dispatch(fetchProfile(userData.user_id));
    }
  }, [dispatch, userData?.user_id]);

  // Get display name from profile data or fallback to auth data
  const fullName = useMemo(() => {
    if (profileData?.firstname && profileData?.lastname) {
      return `${profileData.firstname} ${profileData.lastname}`.trim();
    }
    if (userData?.firstname && userData?.lastname) {
      return `${userData.firstname} ${userData.lastname}`.trim();
    }
    return 'User Profile';
  }, [profileData, userData]);

  // Handle logout functionality
  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logoutUser());
      setShowLogoutModal(false);
      navigateToAuth();
    } catch (error) {
      console.error('Logout failed:', error);
      setShowLogoutModal(false);
    }
  }, [dispatch]);

  // ✅ Handle opening external links - use URL exactly as provided by API
  // const handleOpenLink = useCallback(async (url: string, linkName: string) => {
  //   console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  //   console.log(`🔗 [OPEN LINK] Attempting to open: ${linkName}`);
  //   console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  //   try {
  //     console.log('📊 Link Details:');
  //     console.log('├─ Link Name:', linkName);
  //     console.log('├─ URL (RAW from API):', url);
  //     console.log('├─ URL Length:', url?.length || 0);
  //     console.log('└─ Is Empty?', !url || url.trim() === '');

  //     if (!url || url.trim() === '') {
  //       console.error('❌ URL is empty or undefined');
  //       console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  //       Alert.alert('Error', `${linkName} link is not available`);
  //       return;
  //     }

  //     console.log('\n🚀 Opening URL directly (no modifications)...');

  //     // Just open the URL directly without any canOpenURL check or modifications
  //     await Linking.openURL(url);
  //     console.log('✅ [OPEN LINK] Successfully opened:', linkName);
  //     console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  //   } catch (error) {
  //     console.error('\n💥 [OPEN LINK] Failed to open URL');
  //     console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  //     console.error('Error Details:', {
  //       linkName,
  //       url,
  //       errorMessage: error?.message,
  //       errorType: error?.name,
  //     });
  //     console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  //     Alert.alert(
  //       'Unable to Open Link',
  //       `Failed to open ${linkName}\n\nURL: ${url}\n\nError: ${error?.message}`,
  //     );
  //   }
  // }, []);

  // Memoize modal buttons with updated logout functionality
  const logoutButtons = useMemo(
    () => [
      {
        text: 'LOGOUT',
        onPress: handleLogout,
        variant: ButtonVariant.PRIMARY,
        type: ButtonType.PRIMARY,
        state: ButtonState.DEFAULT,
        size: ButtonSize.MEDIUM,
        bgColor: ColorPalette.RED_100,
        customStyles: styles.customButton,
      },
      {
        text: 'Cancel',
        onPress: () => setShowLogoutModal(false),
        variant: ButtonVariant.PRIMARY,
        type: ButtonType.OUTLINED,
        state: ButtonState.DEFAULT,
        size: ButtonSize.MEDIUM,
        customStyles: styles.customButton,
        customTextStyles: styles.customText,
      },
    ],
    [handleLogout],
  );

  const deleteButtons = useMemo(
    () => [
      {
        text: deletingAccount ? 'Deleting...' : 'Delete Account',
        onPress: handleDeleteAccount, // ✅ Now calls API
        variant: ButtonVariant.PRIMARY,
        type: ButtonType.PRIMARY,
        state: deletingAccount ? ButtonState.DISABLED : ButtonState.DEFAULT,
        size: ButtonSize.MEDIUM,
        bgColor: ColorPalette.RED_100,
        customStyles: styles.customButton,
      },
      {
        text: 'Cancel',
        onPress: () => setShowDeleteModal(false),
        variant: ButtonVariant.PRIMARY,
        type: ButtonType.OUTLINED,
        state: ButtonState.DEFAULT,
        size: ButtonSize.MEDIUM,
        customStyles: styles.customButton,
        customTextStyles: styles.customText,
      },
    ],
    [handleDeleteAccount, deletingAccount], // ✅ Add dependencies
  );

  // Share the app using inbuilt React Native Share
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Manage your business anytime, anywhere with the Surf Seller App. \nDownload now and start selling smarter with Surf.`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('App link shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed by user');
      }
    } catch (error: any) {
      console.log('Share error:', error.message);
    }
  };

  // ✅ Menu grouped config with dynamic Privacy Policy and Terms URLs
  const menuSections = useMemo(
    () => [
      {
        heading: 'Account Details',
        items: [
          {
            label: 'Business Profile',
            leftIcon: (
              <BusinessProfileIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
              />
            ),
            rightIcon: (
              <ArrowRightIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
              />
            ),
            onPress: () =>
              navigate('Dashboard', {
                screen: 'Account',
                params: {screen: 'PersonalInfo'},
              }),
            leftIconBackgroundColor: ColorPalette.SearchBack,
            leftIconStyles: {
              borderRadius: BorderRadius.Full,
            },
          },
          {
            label: 'Business Administrators',
            leftIcon: (
              <BusinessAdministrationIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
              />
            ),
            rightIcon: (
              <ArrowRightIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
              />
            ),
            onPress: () =>
              navigate('Dashboard', {
                screen: 'Account',
                params: {screen: 'BusinessAdministrators'},
              }),
            leftIconBackgroundColor: ColorPalette.SearchBack,
            leftIconStyles: {
              borderRadius: BorderRadius.Full,
            },
          },
          {
            label: 'Bank Details',
            leftIcon: (
              <BankDetailsIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
              />
            ),
            rightIcon: (
              <ArrowRightIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
              />
            ),
            onPress: () =>
              navigate('Dashboard', {
                screen: 'Account',
                params: {screen: 'BankDetails'},
              }),
            leftIconBackgroundColor: ColorPalette.SearchBack,
            leftIconStyles: {
              borderRadius: BorderRadius.Full,
            },
          },
          {
            label: 'Payments',
            leftIcon: (
              <PaymentsIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
              />
            ),
            rightIcon: (
              <ArrowRightIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
              />
            ),
            onPress: () =>
              navigate('Dashboard', {
                screen: 'Account',
                params: {screen: 'PaymentInfo'},
              }),
            leftIconBackgroundColor: ColorPalette.SearchBack,
            leftIconStyles: {
              borderRadius: BorderRadius.Full,
            },
          },
        ],
      },
      {
        heading: 'Settings & Preferences',
        items: [
          {
            label: 'Notification Controls',
            leftIcon: (
              <BellIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
                strokeWidth={2}
              />
            ),
            rightIcon: (
              <ArrowRightIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
              />
            ),
            onPress: () =>
              navigate('Dashboard', {
                screen: 'Account',
                params: {screen: 'NotificationScreen'},
              }),
            leftIconBackgroundColor: ColorPalette.SearchBack,
            leftIconStyles: {
              borderRadius: BorderRadius.Full,
            },
          },
        ],
      },
      {
        heading: 'Support & Info',
        items: [
          {
            label: 'Share the app',
            leftIcon: (
              <ShareAppIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
              />
            ),
            leftIconBackgroundColor: ColorPalette.SearchBack,
            leftIconStyles: {
              borderRadius: BorderRadius.Full,
            },
            rightIcon: (
              <ArrowRightIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
              />
            ),
            onPress: onShare,
          },
          {
            label: 'Surf Chatbot',
            leftIcon: (
              <ChatIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
                strokeWidth={2}
              />
            ),
            leftIconBackgroundColor: ColorPalette.SearchBack,
            leftIconStyles: {
              borderRadius: BorderRadius.Full,
            },
            rightIcon: (
              <ArrowRightIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
              />
            ),
            onPress: () => {
              navigate('Dashboard', {
                screen: 'Account',
                params: {screen: 'ChatScreen'},
              });
            },
          },
          {
            label: 'FAQ',
            leftIcon: (
              <FaqIcon style={undefined} color={ColorPalette.GREY_TEXT_100} />
            ),
            leftIconBackgroundColor: ColorPalette.SearchBack,
            leftIconStyles: {
              borderRadius: BorderRadius.Full,
            },
            rightIcon: (
              <ArrowRightIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
              />
            ),
            onPress: () => {
              navigate('Dashboard', {
                screen: 'Account',
                params: {screen: 'FAQ'},
              });
            },
          },
          {
            label: 'Privacy Policy',
            leftIcon: (
              <PrivacyPolicyIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
                size={25}
              />
            ),
            leftIconBackgroundColor: ColorPalette.SearchBack,
            leftIconStyles: {
              borderRadius: BorderRadius.Full,
            },
            rightIcon: (
              <ArrowRightIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
              />
            ),
            // ✅ Open Privacy Policy URL from Initializer API
            onPress: () => {
              console.log('🔘 Privacy Policy menu item pressed');
              console.log(
                'Privacy Policy URL:',
                initializerData?.privacy_policy_page,
              );
              handleOpenLink(
                initializerData?.privacy_policy_page || '',
                'Privacy Policy',
              );
            },
          },
          {
            label: 'Terms & Conditions',
            leftIcon: (
              <TermsConditionsIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
                size={24}
              />
            ),
            leftIconBackgroundColor: ColorPalette.SearchBack,
            leftIconStyles: {
              borderRadius: BorderRadius.Full,
            },
            rightIcon: (
              <ArrowRightIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
              />
            ),
            // ✅ Open Terms of Use URL from Initializer API
            onPress: () => {
              console.log('🔘 Terms & Conditions menu item pressed');
              console.log(
                'Terms of Use URL:',
                initializerData?.terms_of_use_page,
              );
              handleOpenLink(
                initializerData?.terms_of_use_page || '',
                'Terms & Conditions',
              );
            },
          },
        ],
      },
      {
        heading: null,
        items: [
          {
            label: 'Log out',
            leftIcon: (
              <LogoutIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
                strokeWidth={1.4}
                size={21}
              />
            ),
            leftIconBackgroundColor: ColorPalette.SearchBack,
            leftIconStyles: {
              borderRadius: BorderRadius.Full,
            },
            rightIcon: (
              <ArrowRightIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
              />
            ),
            onPress: () => setShowLogoutModal(true),
          },
          {
            label: 'Delete Account',
            leftIcon: (
              <TrashIcon2
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
                strokeWidth={2}
                size={21}
              />
            ),
            leftIconBackgroundColor: ColorPalette.SearchBack,
            leftIconStyles: {
              borderRadius: BorderRadius.Full,
            },
            rightIcon: (
              <ArrowRightIcon
                style={undefined}
                color={ColorPalette.GREY_TEXT_100}
              />
            ),
            onPress: () => setShowDeleteModal(true),
          },
        ],
      },
    ],
    [initializerData, handleOpenLink], // ✅ Dependencies include initializerData
  );

  // Memoize the profile section
  const ProfileSection = useCallback(
    () => (
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/564x/93/d3/e3/93d3e31639a4d07613de9dccdc8bd5e8.jpg',
            }}
            style={styles.orderImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.dataContainer}>
          <Typography
            text={fullName}
            variant={TypographyVariant.H6_SEMIBOLD}
            customTextStyles={styles.profileName}
          />
          <Typography
            text="Triq San Pawl, Valett, Malta"
            variant={TypographyVariant.LSMALL_REGULAR}
            customTextStyles={styles.profileCaption}
          />
        </View>
      </View>
    ),
    [fullName],
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: ColorPalette.SearchBack,
      }}
      edges={['bottom']}>
      <Header
        name="Account"
        variant={TypographyVariant.H6_BOLD}
        textColor={ColorPalette.AgreeTerms}
        rightIcons={[
          {
            icon: QuestionMarkIcon,
            onPress: () => {
              navigate('Dashboard', {
                screen: 'Account',
                params: {screen: 'FAQ'},
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
          {paddingBottom: getScreenHeight(4)},
        ]}
        showsVerticalScrollIndicator={false}>
        <ProfileSection />

        {menuSections.map((section, sectionIndex) => (
          <View
            key={sectionIndex}
            style={{
              marginTop: section.heading ? getScreenHeight(1) : 0,
            }}>
            {/* Section Heading */}
            {section.heading && (
              <Typography
                variant={TypographyVariant.PMEDIUM_MEDIUM}
                text={section.heading}
                customTextStyles={{
                  marginBottom: getScreenHeight(1),
                  color: ColorPalette.GREY_TEXT_300,
                  paddingLeft: getScreenWidth(3),
                }}
              />
            )}

            {/* Section Container */}
            <View style={styles.containerStyle}>
              {section.items.map((item, index) => (
                <MenuItem
                  key={index}
                  label={item.label}
                  leftIcon={item.leftIcon}
                  rightIcon={item.rightIcon}
                  onPress={item.onPress}
                  textStyle={{color: ColorPalette.GREY_TEXT_500}}
                  variant={TypographyVariant.PMEDIUM_MEDIUM}
                  containerStyle={styles.menuContainer}
                  contentStyle={{gap: getScreenWidth(4)}}
                  leftIconBackgroundColor={item.leftIconBackgroundColor}
                  leftIconContainerStyle={{
                    width: 44,
                    height: 44,
                    borderRadius: BorderRadius.Full,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  showBottomBorder={true}
                  isLastItem={index === section.items.length - 1}
                />
              ))}
            </View>
          </View>
        ))}

        <AddModal
          isVisible={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          headerText="Are you sure you want to logout?"
          buttons={logoutButtons}
          showCloseIcon={false}
        />

        <AddModal
          isVisible={showDeleteModal}
          onClose={() => !deletingAccount && setShowDeleteModal(false)} // ✅ Prevent closing while deleting
          headerText="Are you sure? Deleting your account is permanent."
          buttons={deleteButtons}
          showCloseIcon={!deletingAccount} // ✅ Hide close icon while deleting
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;
