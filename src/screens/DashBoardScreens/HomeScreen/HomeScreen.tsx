import React from 'react';
import {View} from 'react-native';
import {Header} from '../../../components/UserComponents/Header/Header';
import SearchIcon from '../../../assets/icons/SearchIcon';
import BellIcon from '../../../assets/icons/BellIcon';
import QuestionMarkIcon from '../../../assets/icons/QuestionMarkIcon';
import {ColorPalette} from '../../../config/colorPalette';
import {styles} from './HomeScreen.styles';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ScrollView} from 'react-native-gesture-handler';
import TotalSalesIcon from '../../../assets/icons/TotalSalesIcon';
import TrendIcon from '../../../assets/icons/TrendIcon';
import PackageIcon from '../../../assets/icons/PackageIcon';
import DownloadIcon from '../../../assets/icons/DownloadIcon';
import BookmarkNoteIcon from '../../../assets/icons/BookmarkNoteIcon';
import ToggleButtons from '../../../components/MainComponents/ToggleButtons/ToggleButtons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getScreenHeight} from '../../../helpers/screenSize';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import {RecentOrder} from '../../../components/MainComponents/RecentOrder/RecentOrder';
import CircularEuroIcon from '../../../assets/icons/CircularEuroIcon';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name="WOW Shop"
        rightIcons={[
          {
            icon: SearchIcon,
            onPress: () => console.log('Arrow left pressed'),
            size: 20,
            color: ColorPalette.BorderPrimary,
            strokeWidth: 2,
          },
          {
            icon: BellIcon,
            onPress: () => console.log('Arrow left pressed'),
            size: 20,
            color: ColorPalette.BorderPrimary,
            strokeWidth: 2,
          },
          {
            icon: QuestionMarkIcon,
            onPress: () => console.log('Arrow left pressed'),
            size: 24,
            color: ColorPalette.BorderPrimary,
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
              variant={TypographyVariant.BODY_SMALL_BOLD}
              text="Complete these steps to start selling"
            />
            <Typography
              variant={TypographyVariant.BODY_XSMALLLINE}
              text="Complete the following tasks to activate your seller account"
              customTextStyles={styles.textTwo}
            />
          </View>
          <View style={styles.verifyStepsContainer}></View>
        </View>
        <View style={styles.OrderContainer}></View>
        <View style={styles.statsContainer}>
          <View style={styles.containerOne}>
            <View style={styles.totalSales}>
              <View style={styles.salesOne}>
                <View style={styles.iconBack}>
                  <TotalSalesIcon style={undefined} />
                </View>
                <View style={styles.countBlock}>
                  <Typography
                    variant={TypographyVariant.BODY_SMALL_BOLD}
                    text="+12.8%"
                    customTextStyles={styles.countText}
                  />
                  <TrendIcon size={18} style={undefined} />
                </View>
              </View>
              <View style={styles.salesTwo}>
                <Typography
                  variant={TypographyVariant.HEADING_MEDIUM_COUNT}
                  text="€47,125.34"
                  customTextStyles={styles.countValue}
                />
                <Typography
                  variant={TypographyVariant.BODY_SMALL}
                  text="Total Sales"
                  customTextStyles={styles.countCaption}
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
                    variant={TypographyVariant.BODY_SMALL_BOLD}
                    text="8.3%"
                    customTextStyles={styles.countText}
                  />
                  <TrendIcon size={18} style={undefined} />
                </View>
              </View>
              <View style={styles.salesTwo}>
                <Typography
                  variant={TypographyVariant.HEADING_MEDIUM_COUNT}
                  text="1,592"
                  customTextStyles={styles.countValue}
                />
                <Typography
                  variant={TypographyVariant.BODY_SMALL}
                  text="Total Orders"
                  customTextStyles={styles.countCaption}
                />
              </View>
            </View>
          </View>
          <View style={styles.containerTwo}>
            <View style={styles.activeProduct}>
              <View style={styles.twoContainer}>
                <View style={styles.iconBackOne}>
                  <PackageIcon style={undefined} />
                </View>
                <View style={styles.salesTwo}>
                  <Typography
                    variant={TypographyVariant.HEADING_MEDIUM_COUNT}
                    text="1312"
                    customTextStyles={styles.countValue}
                  />
                  <Typography
                    variant={TypographyVariant.BODY_SMALL}
                    text="Active Products"
                    customTextStyles={styles.countCaption}
                  />
                </View>
              </View>

              <View style={styles.countBlock}>
                <Typography
                  variant={TypographyVariant.BODY_SMALL_BOLD}
                  text="0%"
                  customTextStyles={styles.countText}
                />
                <TrendIcon size={18} style={undefined} />
              </View>
            </View>
            <View style={styles.stockContainer}>
              <View style={styles.iconBackTwo}>
                <DownloadIcon style={undefined} />
              </View>
              <View style={styles.salesTwo}>
                <Typography
                  variant={TypographyVariant.BODY_SMALL_CAPTION}
                  text="18"
                  customTextStyles={styles.countValue}
                />
                <Typography
                  variant={TypographyVariant.BODY_XXSMALL}
                  text="Out of Stock"
                  customTextStyles={styles.countCaption}
                />
              </View>
            </View>
          </View>
          <View style={styles.containerTwo}>
            <View style={styles.activeProduct}>
              <View style={styles.twoContainer}>
                <View style={styles.iconBack}>
                  <CircularEuroIcon style={undefined} />
                </View>
                <View style={styles.salesTwo}>
                  <Typography
                    variant={TypographyVariant.HEADING_MEDIUM_COUNT}
                    text="€13,482"
                    customTextStyles={styles.countValue}
                  />
                  <Typography
                    variant={TypographyVariant.BODY_SMALL}
                    text="Your income"
                    customTextStyles={styles.countCaption}
                  />
                </View>
              </View>

              <View style={styles.countBlock}>
                <Typography
                  variant={TypographyVariant.BODY_SMALL_BOLD}
                  text="0%"
                  customTextStyles={styles.countText}
                />
                <TrendIcon size={18} style={undefined} />
              </View>
            </View>
            <View style={styles.stockContainer}>
              <View style={styles.iconBackThree}>
                <BookmarkNoteIcon style={undefined} />
              </View>
              <View style={styles.salesTwo}>
                <Typography
                  variant={TypographyVariant.BODY_SMALL_CAPTION}
                  text="2,547.63"
                  customTextStyles={styles.countValue}
                />
                <Typography
                  variant={TypographyVariant.BODY_XXSMALL}
                  text="Taxes"
                  customTextStyles={styles.countCaption}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.salesOverview}>
          <View style={styles.salesHeading}>
            <View style={styles.LeftHeading}>
              <Typography
                variant={TypographyVariant.HEADING_SMALL}
                text="Sales Overview"
                customTextStyles={styles.countValue}
              />
              <Typography
                variant={TypographyVariant.BODY_XXSMALL}
                text="Total sales this week - 25,000€"
                customTextStyles={styles.countCaption}
              />
            </View>
            <View style={styles.rightHeadingButtons}>
              <ToggleButtons />
            </View>
          </View>
          <View style={styles.salesGraph}></View>
        </View>
        <View style={styles.recentOrdersContainer}>
          <View style={styles.recentOrderTitle}>
            <Typography
              variant={TypographyVariant.BODY_SMALL_BOLD}
              text="Recent Orders"
              customTextStyles={styles.countValue}
            />
            <View style={styles.viewAll}>
              <Typography
                variant={TypographyVariant.BODY_XSMALLLINE}
                text="View All"
                customTextStyles={styles.viewAllText}
              />
              <ArrowRightIcon style={undefined} />
            </View>
          </View>
          <View style={styles.recentAllOrders}>
            {[
              {
                orderImage:
                  'https://prosodylondon.com/wp-content/uploads/2024/01/perfume-bottles-ingredients.jpg',
                productName: 'Perfume Z',
                orderId: '448448',
                customerName: 'John Smith',
                orderDate: 'Oct 28, 2024',
                orderAmount: 89.9,
                status: 'Pending',
              },
              {
                orderImage:
                  'https://prosodylondon.com/wp-content/uploads/2024/01/perfume-bottles-ingredients.jpg',
                productName: 'Perfume Z',
                orderId: '448448',
                customerName: 'John Smith',
                orderDate: 'Oct 28, 2024',
                orderAmount: 89.9,
                status: 'Cancelled',
              },
              {
                orderImage:
                  'https://prosodylondon.com/wp-content/uploads/2024/01/perfume-bottles-ingredients.jpg',
                productName: 'Perfume Z',
                orderId: '448448',
                customerName: 'John Smith',
                orderDate: 'Oct 28, 2024',
                orderAmount: 89.9,
                status: 'Delivered',
              },
              {
                orderImage:
                  'https://prosodylondon.com/wp-content/uploads/2024/01/perfume-bottles-ingredients.jpg',
                productName: 'Perfume Z',
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
