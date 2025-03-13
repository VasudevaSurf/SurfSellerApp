import React, {useMemo, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import BellIcon from '../../../assets/icons/BellIcon';
import BookmarkNoteIcon from '../../../assets/icons/BookmarkNoteIcon';
import BrainIcon from '../../../assets/icons/BrainIcon';
import CurrencyIcon from '../../../assets/icons/CurrencyIcon';
import DownloadIcon from '../../../assets/icons/DownloadIcon';
import PackageIcon from '../../../assets/icons/PackageIcon';
import QuestionMarkIcon from '../../../assets/icons/QuestionMarkIcon';
import SearchIcon from '../../../assets/icons/SearchIcon';
import TotalSalesIcon from '../../../assets/icons/TotalSalesIcon';
import TrendIcon from '../../../assets/icons/TrendIcon';
import {MenuItem} from '../../../components/MainComponents/MenuItem/MenuItem';
import {RecentOrder} from '../../../components/MainComponents/RecentOrder/RecentOrder';
import {SlidingBar} from '../../../components/MainComponents/SlidingBar/SlidingBar';
import ToggleButtons from '../../../components/MainComponents/ToggleButtons/ToggleButtons';
import {Header} from '../../../components/UserComponents/Header/Header';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {styles} from './HomeScreen.styles';
import {navigate} from '../../../navigation/utils/navigationRef';

const HomeScreen = () => {
  const handleNewOrderPress = params => {
    navigate('Dashboard', {
      screen: 'Home',
      params: {
        screen: 'NewOrders',
        params: params,
      },
    });
  };

  const menuItems = useMemo(
    () => [
      {
        label: 'No new orders',
        leftIcon: (
          <PackageIcon style={undefined} color={ColorPalette.HomeIcon} />
        ),
        rightIcon: <ArrowRightIcon style={undefined} />,
        onPress: () => {
          handleNewOrderPress();
        },
        leftIconBackgroundColor: ColorPalette.VerySmallIconBack,
      },
      {
        label: 'No orders to ship',
        leftIcon: (
          <PackageIcon style={undefined} color={ColorPalette.PURPLE_200} />
        ),
        rightIcon: <ArrowRightIcon style={undefined} />,
        onPress: () => {
          handleNewOrderPress();
        },
        leftIconBackgroundColor: 'rgba(145, 1, 207, 0.10)',
      },
      {
        label: 'No orders delivered',
        leftIcon: (
          <PackageIcon style={undefined} color={ColorPalette.Green_200} />
        ),
        rightIcon: <ArrowRightIcon style={undefined} />,
        onPress: () => {
          handleNewOrderPress();
        },
        leftIconBackgroundColor: 'rgba(31, 193, 107, 0.10)',
      },
    ],
    [],
  );

  const statusOptions = [
    {id: 'pending', label: 'Pending'},
    {id: 'accepted', label: 'Accepted'},
    {id: 'cancelled', label: 'Cancelled'},
  ];

  const [selectedOption, setSelectedOption] = useState(statusOptions[0]);

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name="Hello, Aditya! 👋"
        image={{
          source: require('../../../assets/images/placeholder-profile.png'),
        }}
        variant={TypographyVariant.LMEDIUM_BOLD}
        textColor={ColorPalette.GREY_TEXT_500}
        rightIcons={[
          {
            icon: SearchIcon,
            onPress: () => console.log('Search pressed'),
            size: 20,
            color: ColorPalette.GREY_TEXT_400,
            strokeWidth: 2,
          },
          {
            icon: BellIcon,
            onPress: () => console.log('Bell pressed'),
            size: 20,
            color: ColorPalette.GREY_TEXT_400,
            strokeWidth: 2,
          },
          {
            icon: QuestionMarkIcon,
            onPress: () => console.log('Help pressed'),
            size: 24,
            color: ColorPalette.GREY_TEXT_400,
            strokeWidth: 2,
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
        <View style={styles.verifyContainer}>
          <View style={styles.textVerifyContainer}>
            <Typography
              variant={TypographyVariant.H6_BOLD}
              text="Complete these steps to start selling"
              customTextStyles={styles.textOne}
              numberOfLines={2}
              adjustsFontSizeToFit
            />
            <Typography
              variant={TypographyVariant.LXSMALL_REGULAR}
              text="Complete the following tasks to activate your seller account"
              customTextStyles={styles.textTwo}
              numberOfLines={2}
              adjustsFontSizeToFit
            />
          </View>
          <View style={styles.verifyStepsContainer}></View>
        </View>
        <View style={styles.OrderContainer}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              label={item.label}
              leftIcon={item.leftIcon}
              rightIcon={item.rightIcon}
              onPress={item.onPress}
              textStyle={{color: ColorPalette.GREY_TEXT_500}}
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              containerStyle={styles.menuContainer}
              contentStyle={{
                gap: getScreenWidth(4),
              }}
              leftIconBackgroundColor={item.leftIconBackgroundColor}
              leftIconContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: getScreenWidth(2),
                paddingVertical: getScreenWidth(2),
                borderRadius: getScreenWidth(2),
              }}
              showBottomBorder={true}
              isLastItem={index === menuItems.length - 1}
            />
          ))}
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.containerOne}>
            <View style={styles.totalSales}>
              <View style={styles.salesOne}>
                <View style={styles.iconBackSale}>
                  <TotalSalesIcon style={undefined} />
                </View>
                <View style={styles.countBlock}>
                  <Typography
                    variant={TypographyVariant.PXSMALL_REGULAR}
                    text="+12.8%"
                    customTextStyles={styles.countText}
                    numberOfLines={1}
                  />
                  <TrendIcon size={18} style={undefined} />
                </View>
              </View>
              <View style={styles.salesTwo}>
                <Typography
                  variant={TypographyVariant.H4_BOLD}
                  text="€47,125.34"
                  customTextStyles={styles.countValue}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                />
                <Typography
                  variant={TypographyVariant.LMEDIUM_REGULAR}
                  text="Total Sales"
                  customTextStyles={styles.countCaption}
                  numberOfLines={1}
                />
              </View>
            </View>
            <View style={styles.totalSales}>
              <View style={styles.salesOne}>
                <View style={styles.iconBackOne}>
                  <PackageIcon style={undefined} />
                </View>
                <View style={styles.countBlock}>
                  <Typography
                    variant={TypographyVariant.PXSMALL_REGULAR}
                    text="8.3%"
                    customTextStyles={styles.countText}
                    numberOfLines={1}
                  />
                  <TrendIcon size={18} style={undefined} />
                </View>
              </View>
              <View style={styles.salesTwo}>
                <Typography
                  variant={TypographyVariant.H4_BOLD}
                  text="1,592"
                  customTextStyles={styles.countValue}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                />
                <Typography
                  variant={TypographyVariant.LMEDIUM_REGULAR}
                  text="Total Orders"
                  customTextStyles={styles.countCaption}
                  numberOfLines={1}
                />
              </View>
            </View>
          </View>
          <View style={styles.containerAnother}>
            <View style={styles.containerAnotherOne}>
              <View style={styles.activeProduct}>
                <View style={styles.twoContainer}>
                  <View style={styles.iconBackOne}>
                    <BrainIcon style={undefined} />
                  </View>
                  <View style={styles.salesTwo}>
                    <Typography
                      variant={TypographyVariant.H4_BOLD}
                      text="312"
                      customTextStyles={styles.countValue}
                      numberOfLines={1}
                    />
                    <Typography
                      variant={TypographyVariant.LMEDIUM_REGULAR}
                      text="Active Products"
                      customTextStyles={styles.countCaption}
                      numberOfLines={1}
                    />
                  </View>
                </View>

                <View style={styles.countBlock}>
                  <Typography
                    variant={TypographyVariant.PXSMALL_REGULAR}
                    text="0%"
                    customTextStyles={styles.countText}
                    numberOfLines={1}
                  />
                  <TrendIcon size={18} style={undefined} />
                </View>
              </View>
              <View style={styles.activeProduct}>
                <View style={styles.twoContainer}>
                  <View style={styles.iconBack}>
                    <CurrencyIcon style={undefined} />
                  </View>
                  <View style={styles.salesTwo}>
                    <Typography
                      variant={TypographyVariant.H4_BOLD}
                      text="€13,48"
                      customTextStyles={styles.countValue}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    />
                    <Typography
                      variant={TypographyVariant.LMEDIUM_REGULAR}
                      text="Your income"
                      customTextStyles={styles.countCaption}
                      numberOfLines={1}
                    />
                  </View>
                </View>

                <View style={styles.countBlock}>
                  <Typography
                    variant={TypographyVariant.PXSMALL_REGULAR}
                    text="0%"
                    customTextStyles={styles.countText}
                    numberOfLines={1}
                  />
                  <TrendIcon size={18} style={undefined} />
                </View>
              </View>
            </View>
            <View style={styles.containerProportional}>
              <View style={styles.stockContainer}>
                <View style={styles.iconBackTwo}>
                  <DownloadIcon style={undefined} />
                </View>
                <View style={styles.salesTwo}>
                  <Typography
                    variant={TypographyVariant.LSMALL_BOLD}
                    text="18"
                    customTextStyles={styles.countValue}
                    numberOfLines={1}
                  />
                  <Typography
                    variant={TypographyVariant.LSMALL_REGULAR}
                    text="Out of Stock"
                    customTextStyles={styles.countCaption}
                    numberOfLines={1}
                  />
                </View>
              </View>
              <View style={styles.stockContainer}>
                <View style={styles.iconBackThree}>
                  <BookmarkNoteIcon style={undefined} />
                </View>
                <View style={styles.salesTwo}>
                  <Typography
                    variant={TypographyVariant.LSMALL_BOLD}
                    text="2,547.63"
                    customTextStyles={styles.countValue}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  />
                  <Typography
                    variant={TypographyVariant.LSMALL_REGULAR}
                    text="Taxes"
                    customTextStyles={styles.countCaption}
                    numberOfLines={1}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.salesOverview}>
          <View style={styles.salesHeading}>
            <View style={styles.LeftHeading}>
              <Typography
                variant={TypographyVariant.H5_BOLD}
                text="Sales Overview"
                customTextStyles={styles.countValue}
                numberOfLines={1}
              />
              <View style={styles.countCaptionContainer}>
                <Typography
                  variant={TypographyVariant.LSMALL_SEMIBOLD}
                  text="Total sales this week - "
                  customTextStyles={styles.countCaption}
                  numberOfLines={1}
                />
                <Typography
                  variant={TypographyVariant.LSMALL_BOLD}
                  text="25,000€"
                  customTextStyles={styles.countCaptionOne}
                  numberOfLines={1}
                />
              </View>
            </View>
            <View style={styles.rightHeadingButtons}>
              <ToggleButtons buttonStyle={styles.buttonStyles} />
            </View>
          </View>
          <View style={styles.salesGraph}></View>
        </View>
        <View style={styles.recentOrdersContainer}>
          <View style={styles.recentOrderTitle}>
            <Typography
              variant={TypographyVariant.H6_BOLD}
              text="Recent Orders"
              customTextStyles={styles.countValue}
              numberOfLines={1}
            />
            <View style={styles.viewAll}>
              <Typography
                variant={TypographyVariant.LSMALL_REGULAR}
                text="View All"
                customTextStyles={styles.viewAllText}
                numberOfLines={1}
              />
              <ArrowRightIcon
                style={undefined}
                color={ColorPalette.PURPLE_200}
              />
            </View>
          </View>
          <View>
            <SlidingBar
              options={statusOptions}
              selectedOption={selectedOption}
              onOptionSelect={setSelectedOption}
              customOptionStyle={{
                paddingVertical: getScreenHeight(1.5),
                paddingHorizontal: getScreenWidth(7),
              }}
            />
          </View>
          <View style={styles.recentAllOrders}>
            {[
              {
                orderImage:
                  'https://prosodylondon.com/wp-content/uploads/2024/01/perfume-bottles-ingredients.jpg',
                productName: 'Nike Air Max 270 React Premium Shoes',
                orderId: '448448',
                customerName: 'John Smith',
                orderDate: 'Oct 28, 2024',
                orderAmount: 89.9,
                status: 'Pending',
              },
              {
                orderImage:
                  'https://prosodylondon.com/wp-content/uploads/2024/01/perfume-bottles-ingredients.jpg',
                productName: 'Nike Air Max 270 React Premium Shoes',
                orderId: '448448',
                customerName: 'John Smith',
                orderDate: 'Oct 28, 2024',
                orderAmount: 89.9,
                status: 'Cancelled',
              },
              {
                orderImage:
                  'https://prosodylondon.com/wp-content/uploads/2024/01/perfume-bottles-ingredients.jpg',
                productName: 'Nike Air Max 270 React Premium Shoes',
                orderId: '448448',
                customerName: 'John Smith',
                orderDate: 'Oct 28, 2024',
                orderAmount: 89.9,
                status: 'Delivered',
              },
              {
                orderImage:
                  'https://prosodylondon.com/wp-content/uploads/2024/01/perfume-bottles-ingredients.jpg',
                productName: 'Nike Air Max 270 React Premium Shoes',
                orderId: '448448',
                customerName: 'John Smith',
                orderDate: 'Oct 28, 2024',
                orderAmount: 89.9,
                status: 'Pending',
              },
            ].map((order, index, array) => (
              <RecentOrder
                key={`${order.orderId}-${index}`}
                {...order}
                isLastItem={index === array.length - 1}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
