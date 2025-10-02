import React, {useMemo, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Header} from '../../../../../components/UserComponents/Header/Header';
import {TypographyVariant} from '../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../config/colorPalette';
import {goBack, navigate} from '../../../../../navigation/utils/navigationRef';
import {styles} from './BusinessAdministrators.styles';
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

const BusinessAdministrators = () => {
  // Mock data - replace with actual data from Redux/API
  const [administrators] = useState<Administrator[]>([
    {
      id: '1',
      name: 'John',
      fullName: 'John Zoo',
      email: 'john@gmail.com',
      phone: '+356 9900 1234',
      role: 'Owner',
      registeredDate: '08 Feb 2025',
      type: 'Business Administrators',
    },
    {
      id: '2',
      name: 'Anthony',
      fullName: 'Anthony Dizu',
      email: 'john@gmail.com',
      phone: '+356 9900 1234',
      role: 'Admin',
      registeredDate: '08 Feb 2025',
      type: 'Business Administrators',
    },
  ]);

  const handleEditAdministrator = (administrator: Administrator) => {
    console.log('Edit administrator:', administrator);
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditAdministrator',
        params: {
          administrator,
        },
      },
    });
  };

  const handleAddAdministrator = () => {
    navigate('Dashboard', {
      screen: 'Account',
      params: {
        screen: 'EditAdministrator',
        params: {
          administrator: null, // null means creating new
        },
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
            params: {screen: 'FAQScreen'},
          });
        },
        size: 24,
        color: ColorPalette.IconColor,
        strokeWidth: 1.5,
      },
    ],
    [],
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name="Business Administrators"
        variant={TypographyVariant.H6_BOLD}
        textColor={ColorPalette.AgreeTerms}
        rightIcons={headerIcons}
      />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {administrators.map(admin => (
          <AdministratorCard
            key={admin.id}
            administrator={admin}
            onEdit={handleEditAdministrator}
          />
        ))}

        {/* Add Administrator Button */}
        <View style={styles.buttonContainer}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessAdministrators;
