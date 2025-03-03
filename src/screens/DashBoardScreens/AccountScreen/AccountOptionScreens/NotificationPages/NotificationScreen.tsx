import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import ArrowLeftIcon from '../../../../../assets/icons/ArrowLeftIcon';
import ToggleButtons from '../../../../../components/MainComponents/ToggleButtons/ToggleButtons';
import {Header} from '../../../../../components/UserComponents/Header/Header';
import {Typography} from '../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../config/colorPalette';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../helpers/screenSize';
import {BorderRadius} from '../../../../../config/globalStyles';
import {goBack} from '../../../../../navigation/utils/navigationRef';
import {styles} from './NotificationScreen.styles';

const NotificationScreen: React.FC = () => {
  const [autoAcceptOrders, setAutoAcceptOrders] = useState('yes');
  const [whatsappNotifications, setWhatsappNotifications] = useState(true);

  const handleAutoAcceptChange = (value: string) => {
    setAutoAcceptOrders(value);
    console.log(`Auto accept orders: ${value}`);
  };

  const handleWhatsappToggle = (value: boolean) => {
    setWhatsappNotifications(value);
    console.log(`WhatsApp notifications: ${value}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name="Notifications"
        variant={TypographyVariant.LMEDIUM_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={
          <ArrowLeftIcon style={undefined} size={15} onPress={goBack} />
        }
        rightIcons={null}
      />
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingTop: getScreenHeight(2)},
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.sectionItem}>
            <View style={styles.textContainer}>
              <Typography
                text="Auto accept orders"
                variant={TypographyVariant.H6_BOLD}
                customTextStyles={styles.primaryText}
              />
              <Typography
                text="(Mark orders as Accepted automatically for the desired payment modes)"
                variant={TypographyVariant.LXSMALL_REGULAR}
                customTextStyles={styles.secondaryText}
              />
            </View>

            <ToggleButtons
              leftButtonText="Yes"
              rightButtonText="No"
              leftButtonValue="yes"
              rightButtonValue="no"
              initialActiveButton={autoAcceptOrders}
              onSelectionChange={handleAutoAcceptChange}
              inactiveBackgroundColor="transparent"
              activeBackgroundColor={ColorPalette.toggleColor}
              inactiveTextColor={ColorPalette.GREY_TEXT_500}
              activeTextColor={ColorPalette.White}
              containerStyle={styles.toggleContainer}
              buttonStyle={styles.toggleButton}
              textStyle={styles.toggleButtonText}
              typographyVariant={TypographyVariant.LSMALL_MEDIUM}
            />
          </View>

          <View style={styles.sectionItem}>
            <View style={styles.textContainer}>
              <Typography
                text="WhatsApp notifications"
                variant={TypographyVariant.H6_BOLD}
                customTextStyles={styles.primaryText}
              />
              <Typography
                text="(Send order notifications to the WhatsApp directly)"
                variant={TypographyVariant.LXSMALL_REGULAR}
                customTextStyles={styles.secondaryText}
              />
            </View>

            <ToggleSwitch
              isOn={whatsappNotifications}
              onToggle={handleWhatsappToggle}
              onColor={ColorPalette.Success}
              offColor={ColorPalette.Gray}
              size="small"
              thumbOnStyle={{
                backgroundColor: ColorPalette.White,
                elevation: 0,
                shadowOpacity: 0,
                shadowColor: 'transparent',
                shadowOffset: {height: 0, width: 0},
                shadowRadius: 0,
              }}
              thumbOffStyle={{
                backgroundColor: ColorPalette.White,
                elevation: 0,
                shadowOpacity: 0,
                shadowColor: 'transparent',
                shadowOffset: {height: 0, width: 0},
                shadowRadius: 0,
              }}
              trackOnStyle={{
                width: getScreenWidth(10),
                height: getScreenHeight(3),
                borderRadius: BorderRadius.Medium,
              }}
              trackOffStyle={{
                width: getScreenWidth(10),
                height: getScreenHeight(3),
                borderRadius: BorderRadius.Medium,
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
