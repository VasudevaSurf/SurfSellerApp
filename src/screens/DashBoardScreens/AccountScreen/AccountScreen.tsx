import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Image, ScrollView, Share, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import QuestionMarkIcon from '../../../assets/icons/QuestionMarkIcon';
import { AddModal } from '../../../components/MainComponents/AddModal/AddModal';
import { MenuItem } from '../../../components/MainComponents/MenuItem/MenuItem';
import {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../components/UserComponents/Button';
import { Header } from '../../../components/UserComponents/Header/Header';
import { Typography } from '../../../components/UserComponents/Typography/Typography';
import { TypographyVariant } from '../../../components/UserComponents/Typography/Typography.types';
import { ColorPalette } from '../../../config/colorPalette';
import { getScreenHeight, getScreenWidth } from '../../../helpers/screenSize';
import {
  navigate,
  navigateToAuth,
} from '../../../navigation/utils/navigationRef';
import { logoutUser } from '../../../redux/slices/authSlice';
import { fetchProfile } from '../../../redux/slices/profileSlice';
import { styles } from './AccountScreen.styles';
import { RootState, AppDispatch } from '../../../redux/store';
import BusinessProfileIcon from '../../../assets/icons/BusinessProfileIcon';
import { BorderRadius } from '../../../config/globalStyles';
import BusinessAdministrationIcon from '../../../assets/icons/BusinessAdministratorsIcon';
import BankDetailsIcon from '../../../assets/icons/BankDetailsIcon';
import PaymentsIcon from '../../../assets/icons/PaymentsIcon';
import BellIcon from '../../../assets/icons/BellIcon';
import FaqIcon from '../../../assets/icons/FaqIcon';
import PrivacyPolicyIcon from '../../../assets/icons/PrivacyPolicyIcon';
import ShareAppIcon from '../../../assets/icons/ShareAppIcon';
import ChatIcon from '../../../assets/icons/ChatIcon';
import LogoutIcon from '../../../assets/icons/LogOutIcon';
import { TrashIcon2 } from '../../../assets/icons/NewProductIcons/TrashIcon2';
import TermsConditionsIcon from '../../../assets/icons/TermsAndConditionIcon';

const AccountScreen = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const { profileData, loading, error } = useSelector(
    (state: RootState) => state.profile,
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

  const headerIcons = useMemo(
    () => [
      // {
      //   icon: LanguageIcon,
      //   onPress: () => console.log('Language icon pressed'),
      //   size: 22,
      //   color: ColorPalette.IconColor,
      //   strokeWidth: 1.5,
      // },
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
    ],
    [],
  );

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
        text: 'Delete Account',
        onPress: () => setShowDeleteModal(false),
        variant: ButtonVariant.PRIMARY,
        type: ButtonType.PRIMARY,
        state: ButtonState.DEFAULT,
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
    [],
  );

  // Share the app using inbuilt React Native Share
  const onShare = async () => {
    try {
      const result = await Share.share({
        // title: 'Surf Seller App', - only supported if we use react-native-share library
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

  // Menu grouped config
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
                params: { screen: 'PersonalInfo' },
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
                params: { screen: 'CompanyProfile' },
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
                params: { screen: 'BankDetails' },
              }),
            leftIconBackgroundColor: ColorPalette.VerySmallIconBack,
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
                params: { screen: 'PaymentInfo' },
              }),
            leftIconBackgroundColor: ColorPalette.VerySmallIconBack,
            leftIconBackgroundColor: ColorPalette.SearchBack,
            leftIconStyles: {
              borderRadius: BorderRadius.Full,
            },
          },
          // {
          //   label: 'Motivation',
          //   leftIcon: (
          //     <MotivationIcon
          //       style={undefined}
          //       color={ColorPalette.GREY_TEXT_100}
          //     />
          //   ),
          //   rightIcon: (
          //     <ArrowRightIcon
          //       style={undefined}
          //       color={ColorPalette.GREY_TEXT_100}
          //     />
          //   ),
          //   onPress: () => {},
          //   leftIconBackgroundColor: ColorPalette.VerySmallIconBack,
          //   leftIconBackgroundColor: ColorPalette.SearchBack,
          //   leftIconStyles: {
          //     borderRadius: BorderRadius.Full,
          //   },
          // },
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
                params: { screen: 'NotificationScreen' },
              }),
            leftIconBackgroundColor: ColorPalette.SearchBack,
            leftIconStyles: {
              borderRadius: BorderRadius.Full,
            },
          },
          // {
          //   label: 'Change Language',
          //   leftIcon: (
          //     <LanguageIcon
          //       style={undefined}
          //       color={ColorPalette.GREY_TEXT_100}
          //       strokeWidth={2}
          //     />
          //   ),
          //   leftIconBackgroundColor: ColorPalette.SearchBack,
          //   leftIconStyles: {
          //     borderRadius: BorderRadius.Full,
          //   },
          //   rightIcon: (
          //     <ArrowRightIcon
          //       style={undefined}
          //       color={ColorPalette.GREY_TEXT_100}
          //     />
          //   ),
          //   onPress: () => { },
          // },
          // {
          //   label: 'Change Currency',
          //   leftIcon: (
          //     <EuroIcon
          //       style={undefined}
          //       color={ColorPalette.GREY_TEXT_100}
          //       size={20}
          //       strokeWidth={2}
          //     />
          //   ),
          //   leftIconBackgroundColor: ColorPalette.SearchBack,
          //   leftIconStyles: {
          //     borderRadius: BorderRadius.Full,
          //   },
          //   rightIcon: (
          //     <ArrowRightIcon
          //       style={undefined}
          //       color={ColorPalette.GREY_TEXT_100}
          //     />
          //   ),
          //   onPress: () => { },
          // },
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
            onPress: onShare
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
            onPress: () => { },
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
                params: { screen: 'FAQScreen' },
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
            onPress: () => { },
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
            onPress: () => { },
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
    [],
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

  // Memoize the sales section
  // const SalesSection = useCallback(
  //   () => (
  //     <View style={styles.salesContainer}>
  //       <View style={styles.twoContainer}>
  //         <View style={styles.iconBack}>
  //           <CircularEuroIcon style={undefined} />
  //         </View>
  //         <View style={styles.salesTwo}>
  //           <Typography
  //             variant={TypographyVariant.H5_SEMIBOLD}
  //             text="€47,125.34"
  //             customTextStyles={styles.countValue}
  //           />
  //           <Typography
  //             variant={TypographyVariant.LSMALL_REGULAR}
  //             text="Total Sales"
  //             customTextStyles={styles.countCaption}
  //           />
  //         </View>
  //       </View>
  //       <View style={styles.twoContainer}>
  //         <View style={styles.iconBackOne}>
  //           <PackageIcon style={undefined} />
  //         </View>
  //         <View style={styles.salesTwo}>
  //           <Typography
  //             variant={TypographyVariant.H5_SEMIBOLD}
  //             text="1529"
  //             customTextStyles={styles.countValue}
  //           />
  //           <Typography
  //             variant={TypographyVariant.LSMALL_REGULAR}
  //             text="Total Orders"
  //             customTextStyles={styles.countCaption}
  //           />
  //         </View>
  //       </View>
  //     </View>
  //   ),
  //   [],
  // );

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
        rightIcons={headerIcons}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: getScreenHeight(4) },
        ]}
        showsVerticalScrollIndicator={false}>
        <ProfileSection />
        {/* <SalesSection /> */}

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
                  textStyle={{ color: ColorPalette.GREY_TEXT_500 }}
                  variant={TypographyVariant.PMEDIUM_MEDIUM}
                  containerStyle={styles.menuContainer}
                  contentStyle={{ gap: getScreenWidth(4) }}
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
        {/* <View style={styles.profileOptionsContainer}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              label={item.label}
              leftIcon={item.leftIcon}
              rightIcon={item.rightIcon}
              onPress={item.onPress}
              textStyle={{color: ColorPalette.GREY_TEXT_500}}
              variant={TypographyVariant.LMEDIUM_MEDIUM}
            />
          ))}
        </View> */}

        <AddModal
          isVisible={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          headerText="Are you sure you want to logout?"
          buttons={logoutButtons}
          showCloseIcon={false}
        />

        <AddModal
          isVisible={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          headerText="Are you sure? Deleting your account is permanent."
          buttons={deleteButtons}
          showCloseIcon={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;
