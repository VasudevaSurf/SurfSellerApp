import React, {useState, useMemo, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, ScrollView, View} from 'react-native';
import {Header} from '../../../components/UserComponents/Header/Header';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight} from '../../../helpers/screenSize';
import {styles} from './AccountScreen.styles';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {MenuItem} from '../../../components/MainComponents/MenuItem/MenuItem';
import {AddModal} from '../../../components/MainComponents/AddModal/AddModal';
import {
  ButtonVariant,
  ButtonType,
  ButtonState,
  ButtonSize,
} from '../../../components/UserComponents/Button';
import {navigate} from '../../../navigation/utils/navigationRef';
import LanguageIcon from '../../../assets/icons/LanguageIcon';
import QuestionMarkIcon from '../../../assets/icons/QuestionMarkIcon';
import ProfileIcon from '../../../assets/icons/AccountIcons/ProfileIcon';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import CompanyProfile from '../../../assets/icons/AccountIcons/CompanyProfile';
import BankIcon from '../../../assets/icons/AccountIcons/BankIcon';
import PaymentIcon from '../../../assets/icons/AccountIcons/PaymentIcon';
import StripIcon from '../../../assets/icons/AccountIcons/StripIcon';
import NotificationIcon from '../../../assets/icons/AccountIcons/NotificationIcon';
import TermsIcon from '../../../assets/icons/AccountIcons/TermsIcon';
import PolicyIcon from '../../../assets/icons/AccountIcons/PolicyIcon';
import LogOutIcon from '../../../assets/icons/AccountIcons/LogOutIcon';
import DeleteIcon from '../../../assets/icons/AccountIcons/DeleteIcon';
import CircularEuroIcon from '../../../assets/icons/CircularEuroIcon';
import PackageIcon from '../../../assets/icons/PackageIcon';

const AccountScreen = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Memoize header icons configuration
  const headerIcons = useMemo(
    () => [
      {
        icon: LanguageIcon,
        onPress: () => console.log('Language icon pressed'),
        size: 24,
        color: ColorPalette.Black,
        strokeWidth: 2,
      },
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

  // Memoize modal buttons
  const logoutButtons = useMemo(
    () => [
      {
        text: 'LOGOUT',
        onPress: () => setShowLogoutModal(false),
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
    [],
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

  // Memoize menu items configuration
  const menuItems = useMemo(
    () => [
      {
        label: 'Personal Info',
        leftIcon: <ProfileIcon style={undefined} />,
        rightIcon: <ArrowRightIcon style={undefined} />,
        onPress: () => {
          navigate('Dashboard', {
            screen: 'Account',
            params: {screen: 'PersonalInfo'},
          });
        },
      },
      {
        label: 'Company Profile',
        leftIcon: <CompanyProfile style={undefined} />,
        rightIcon: <ArrowRightIcon style={undefined} />,
        onPress: () => {
          navigate('Dashboard', {
            screen: 'Account',
            params: {screen: 'CompanyProfile'},
          });
        },
      },
      {
        label: 'Bank Details',
        leftIcon: <BankIcon style={undefined} />,
        rightIcon: <ArrowRightIcon style={undefined} />,
        onPress: () => {
          navigate('Dashboard', {
            screen: 'Account',
            params: {screen: 'BankDetails'},
          });
        },
      },
      {
        label: 'Payments',
        leftIcon: <PaymentIcon style={undefined} />,
        rightIcon: <ArrowRightIcon style={undefined} />,
        onPress: () => {
          navigate('Dashboard', {
            screen: 'Account',
            params: {screen: 'PaymentInfo'},
          });
        },
      },
      {
        label: 'Strip Account',
        leftIcon: <StripIcon style={undefined} />,
        rightIcon: <ArrowRightIcon style={undefined} />,
        onPress: () => {},
      },
      {
        label: 'Notifications',
        leftIcon: <NotificationIcon style={undefined} />,
        rightIcon: <ArrowRightIcon style={undefined} />,
        onPress: () => {},
      },
      {
        label: 'Terms and Conditions',
        leftIcon: <TermsIcon style={undefined} />,
        rightIcon: <ArrowRightIcon style={undefined} />,
        onPress: () => {},
      },
      {
        label: 'Privacy Policy',
        leftIcon: <PolicyIcon style={undefined} />,
        rightIcon: <ArrowRightIcon style={undefined} />,
        onPress: () => {},
      },
      {
        label: 'Logout',
        leftIcon: <LogOutIcon style={undefined} />,
        rightIcon: null,
        onPress: () => setShowLogoutModal(true),
      },
      {
        label: 'Delete Account',
        leftIcon: <DeleteIcon style={undefined} />,
        rightIcon: null,
        onPress: () => setShowDeleteModal(true),
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
            text="Annie`s Flower Shop"
            variant={TypographyVariant.H6_BOLD}
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
    [],
  );

  // Memoize the sales section
  const SalesSection = useCallback(
    () => (
      <View style={styles.salesContainer}>
        <View style={styles.twoContainer}>
          <View style={styles.iconBack}>
            <CircularEuroIcon style={undefined} />
          </View>
          <View style={styles.salesTwo}>
            <Typography
              variant={TypographyVariant.H5_BOLD}
              text="€47,125.34"
              customTextStyles={styles.countValue}
            />
            <Typography
              variant={TypographyVariant.LSMALL_REGULAR}
              text="Total Sales"
              customTextStyles={styles.countCaption}
            />
          </View>
        </View>
        <View style={styles.twoContainer}>
          <View style={styles.iconBackOne}>
            <PackageIcon style={undefined} />
          </View>
          <View style={styles.salesTwo}>
            <Typography
              variant={TypographyVariant.H5_BOLD}
              text="1529"
              customTextStyles={styles.countValue}
            />
            <Typography
              variant={TypographyVariant.LSMALL_REGULAR}
              text="Total Orders"
              customTextStyles={styles.countCaption}
            />
          </View>
        </View>
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name="Account"
        variant={TypographyVariant.H6_BOLD}
        textColor={ColorPalette.AgreeTerms}
        rightIcons={headerIcons}
      />
      <ProfileSection />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: getScreenHeight(2)},
        ]}
        showsVerticalScrollIndicator={false}>
        <SalesSection />
        <View style={styles.profileOptionsContainer}>
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
        </View>

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
