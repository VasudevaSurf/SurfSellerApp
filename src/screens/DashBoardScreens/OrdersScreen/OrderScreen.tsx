import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BellIcon from '../../../assets/icons/BellIcon';
import QuestionMarkIcon from '../../../assets/icons/QuestionMarkIcon';
import {OrderInfo} from '../../../components/MainComponents/OrderInfo/OrderInfo';
import {
  OrderDetailParams,
  OrderStatus,
} from '../../../components/MainComponents/OrderInfo/OrderInfo.types';
import {Header} from '../../../components/UserComponents/Header/Header';
import {SearchBox} from '../../../components/UserComponents/SearchBox/SearchBox';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight} from '../../../helpers/screenSize';
import {styles} from './OrderScreen.styles';
import {navigate} from '../../../navigation/utils/navigationRef';

const OrderScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [orders, setOrders] = useState([
    {
      id: '1',
      orderImage: 'https://picsum.photos/202',
      orderName: 'Lunar Whisper | 75ml | Velvet Bloom Collection',
      orderPrice: '499.00',
      orderNumber: 172,
      orderEmail: 'revanthyadav@surf.mt',
      orderPhone: 9970344320,
      orderDate: '10/15/2024',
      orderTime: '21:59',
      orderStatus: 'Cancelled' as OrderStatus,
    },
    {
      id: '2',
      orderImage: 'https://picsum.photos/202',
      orderName: 'Lunar Whisper | 75ml | Velvet Bloom Collection',
      orderPrice: '499.00',
      orderNumber: 172,
      orderEmail: 'revanthyadav@surf.mt',
      orderPhone: 9970344320,
      orderDate: '10/15/2024',
      orderTime: '21:59',
      orderStatus: 'Cancelled' as OrderStatus,
    },
    {
      id: '3',
      orderImage: 'https://picsum.photos/202',
      orderName: 'Lunar Whisper | 75ml | Velvet Bloom Collection',
      orderPrice: '10.00',
      orderNumber: 172,
      orderEmail: 'revanthyadav@surf.mt',
      orderPhone: 9970344320,
      orderDate: '10/15/2024',
      orderTime: '21:59',
      orderStatus: 'Cancelled' as OrderStatus,
    },
    {
      id: '4',
      orderImage: 'https://picsum.photos/202',
      orderName: 'Lunar Whisper | 75ml | Velvet Bloom Collection',
      orderPrice: '499.00',
      orderNumber: 172,
      orderEmail: 'revanthyadav@surf.mt',
      orderPhone: 9970344320,
      orderDate: '10/15/2024',
      orderTime: '21:59',
      orderStatus: 'Cancelled' as OrderStatus,
    },
    {
      id: '5',
      orderImage: 'https://picsum.photos/202',
      orderName: 'Lunar Whisper | 75ml | Velvet Bloom Collection',
      orderPrice: '499.00',
      orderNumber: 172,
      orderEmail: 'revanthyadav@surf.mt',
      orderPhone: 9970344320,
      orderDate: '10/15/2024',
      orderTime: '21:59',
      orderStatus: 'Cancelled' as OrderStatus,
    },
  ]);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? {...order, orderStatus: newStatus} : order,
      ),
    );
  };

  const handleCardPress = params => {
    navigate('Dashboard', {
      screen: 'Orders',
      params: {
        screen: 'OrderDetail',
        params: params,
      },
    });
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name="WOW Shop"
        image={{
          source: require('../../../assets/images/placeholder-profile.png'),
        }}
        variant={TypographyVariant.LMEDIUM_BOLD}
        textColor={ColorPalette.TextTertiary}
        rightIcons={[
          {
            icon: BellIcon,
            onPress: () => console.log('Bell icon pressed'),
            size: 24,
            color: ColorPalette.GREY_TEXT_400,
            strokeWidth: 2,
          },
          {
            icon: QuestionMarkIcon,
            onPress: () => {},
            size: 24,
            color: ColorPalette.GREY_TEXT_400,
            strokeWidth: 2,
          },
        ]}
      />

      <View style={styles.searchContainer}>
        <SearchBox
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search orders, products"
        />
      </View>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: getScreenHeight(4)},
        ]}
        showsVerticalScrollIndicator={false}>
        <Typography
          variant={TypographyVariant.LMEDIUM_REGULAR}
          text={`Total Items : ${orders.length}`}
          customTextStyles={styles.textStyle}
        />
        <View style={styles.productContainer}>
          {orders.map(order => (
            <OrderInfo
              key={order.id}
              orderId={order.id}
              orderImage={order.orderImage}
              orderName={order.orderName}
              orderPrice={order.orderPrice}
              orderNumber={order.orderNumber}
              orderEmail={order.orderEmail}
              orderPhone={order.orderPhone}
              orderDate={order.orderDate}
              orderTime={order.orderTime}
              orderStatus={order.orderStatus}
              onStatusChange={status => handleStatusChange(order.id, status)}
              onCardPress={handleCardPress}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderScreen;
