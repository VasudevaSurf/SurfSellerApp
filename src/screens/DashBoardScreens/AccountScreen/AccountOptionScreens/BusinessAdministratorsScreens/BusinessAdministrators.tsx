import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '../../../../../components/UserComponents/Header/Header';
import { TypographyVariant } from '../../../../../components/UserComponents/Typography/Typography.types';
import { ColorPalette } from '../../../../../config/colorPalette';
import { goBack, navigate } from '../../../../../navigation/utils/navigationRef';
import { styles } from './BusinessAdministrators.styles';
import ArrowLeft from '../../../../../assets/icons/ArrowLeft';
import {
  AdministratorCard,
  Administrator,
} from '../../../../../components/MainComponents/AdministratorCard/AdministratorCard';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../components/UserComponents/Button';
import PlusIcon from '../../../../../assets/icons/PlusIcon';
import QuestionMarkIcon from '../../../../../assets/icons/QuestionMarkIcon';
import { RootState, AppDispatch } from '../../../../../redux/store';
import { fetchProfile } from '../../../../../redux/slices/profileSlice';
import { Typography } from '../../../../../components/UserComponents/Typography/Typography';

const BusinessAdministrators = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const { profileData, loading, error } = useSelector(
    (state: RootState) => state.profile,
  );

  // Fetch profile data when component mounts or when returning to screen
  useFocusEffect(
    React.useCallback(() => {
      if (userData?.user_id) {
        dispatch(fetchProfile(userData.user_id));
      }
    }, [dispatch, userData?.user_id]),
  );

  // Create administrators list with current user from profile data
  const administrators = useMemo(() => {
    const currentUserAdmin: Administrator = {
      id: userData?.user_id || '1',
      name: profileData?.firstname || 'Current User',
      fullName:
        `${profileData?.firstname || ''} ${profileData?.lastname || ''
          }`.trim() || 'User Name',
      email: profileData?.email || userData?.email || 'user@example.com',
      phone: profileData?.phone || '+356 9900 1234',
      role: 'Owner', // Current user is owner
      registeredDate: '08 Feb 2025', // You can format this from userData if available
      type: 'Business Administrators',
    };

    // Mock data for other administrators - replace with actual API call later
    // const otherAdmins: Administrator[] = [
    //   {
    //     id: '2',
    //     name: 'Anthony',
    //     fullName: 'Anthony Dizu',
    //     email: 'anthony@gmail.com',
    //     phone: '+356 9900 5678',
    //     role: 'Admin',
    //     registeredDate: '08 Feb 2025',
    //     type: 'Business Administrators',
    //   },
    // ];

    return currentUserAdmin;
  }, [profileData, userData]);

  const handleEditAdministrator = (administrator: Administrator) => {
    console.log('Edit administrator:', administrator);

    // Check if this is the current user
    const isCurrentUser = administrator.id === userData?.user_id;

    if (isCurrentUser) {
      // For current user, navigate to EditFieldScreen pattern
      navigate('Dashboard', {
        screen: 'Account',
        params: {
          screen: 'EditAdministrator',
          params: {
            administrator,
            isCurrentUser: true,
          },
        },
      });
    } else {
      // For other admins, navigate to standard edit
      navigate('Dashboard', {
        screen: 'Account',
        params: {
          screen: 'EditAdministrator',
          params: {
            administrator,
            isCurrentUser: false,
          },
        },
      });
    }
  };

  const handleAddAdministrator = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'AddAdministrator',
      },
    });
  };

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
        color: ColorPalette.IconColor,
        strokeWidth: 1.5,
      },
    ],
    [],
  );

  if (loading && !profileData) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <Header
          name="Business Administrators"
          variant={TypographyVariant.H6_BOLD}
          textColor={ColorPalette.AgreeTerms}
          leftIcon={<ArrowLeft style={undefined} size={22} onPress={goBack} />}
          rightIcons={headerIcons}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={ColorPalette.PURPLE_300} />
          <Typography
            text="Loading administrators..."
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
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <Header
          name="Business Administrators"
          variant={TypographyVariant.H6_BOLD}
          textColor={ColorPalette.AgreeTerms}
          leftIcon={<ArrowLeft style={undefined} size={22} onPress={goBack} />}
          rightIcons={headerIcons}
        />
        <View style={styles.errorContainer}>
          <Typography
            text="Failed to load administrator data"
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={{ color: ColorPalette.RED_200 }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name="Business Administrators"
        variant={TypographyVariant.H6_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={<ArrowLeft style={undefined} size={22} onPress={goBack} />}
        rightIcons={headerIcons}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* {administrators.map((admin, index) => ( */}
          <AdministratorCard
            key={administrators.id}
            administrator={administrators}
            onEdit={handleEditAdministrator}
            // isCurrentUser={index === 0} // First card is always current user
          />
        {/* ))} */}

        {/* Add Administrator Button */}
        {/* <View style={styles.buttonContainer}>
          <Button
            text="Add Administrator"
            variant={ButtonVariant.PRIMARY}
            state={ButtonState.DEFAULT}
            size={ButtonSize.LARGE}
            type={ButtonType.OUTLINED}
            onPress={handleAddAdministrator}
            IconComponent={PlusIcon}
            iconPosition="left"
            customStyles={styles.addButton}
            customTextStyles={styles.addButtonText}
            textVariant={TypographyVariant.H6_BOLD}
            iconProps={{
              size: 24,
              color: ColorPalette.PURPLE_300,
            }}
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessAdministrators;
