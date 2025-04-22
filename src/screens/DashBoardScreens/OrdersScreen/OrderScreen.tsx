import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BellIcon from '../../../assets/icons/BellIcon';
import QuestionMarkIcon from '../../../assets/icons/QuestionMarkIcon';
import {OrderInfo} from '../../../components/MainComponents/OrderInfo/OrderInfo';
import {OrderStatus} from '../../../components/MainComponents/OrderInfo/OrderInfo.types';
import {Header} from '../../../components/UserComponents/Header/Header';
import {SearchBox} from '../../../components/UserComponents/SearchBox/SearchBox';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight} from '../../../helpers/screenSize';
import {navigate} from '../../../navigation/utils/navigationRef';
import {styles} from './OrderScreen.styles';
import {SlidingBar} from '../../../components/MainComponents/SlidingBar/SlidingBar';

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

  const filterOptions = [
    {id: 'all', label: 'All'},
    {id: 'active', label: 'Active'},
    {id: 'inStock', label: 'In Stock'},
    {id: 'hidden', label: 'Hidden'},
    {id: 'lowStock', label: 'Low in Stock'},
    {id: 'outOfStock', label: 'Out of Stock'},
    {id: 'pending', label: 'Pending'},
    {id: 'discontinued', label: 'Discontinued'},
    {id: 'draft', label: 'Draft'},
  ];

  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);

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
        name="Orders"
        variant={TypographyVariant.LMEDIUM_BOLD}
        textColor={ColorPalette.GREY_TEXT_500}
        rightIcons={[
          {
            icon: BellIcon,
            onPress: () => console.log('Bell icon pressed'),
            size: 20,
            color: ColorPalette.IconColor,
            strokeWidth: 1.5,
          },
          {
            icon: QuestionMarkIcon,
            onPress: () => console.log('Info icon pressed'),
            size: 24,
            color: ColorPalette.IconColor,
            strokeWidth: 1.5,
          },
        ]}
      />

      <View style={styles.searchContainer}>
        <SearchBox
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search Products"
        />
      </View>
      <View style={styles.slidingBarsContainer}>
        <SlidingBar
          options={filterOptions}
          selectedOption={selectedFilter}
          onOptionSelect={setSelectedFilter}
        />
      </View>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: getScreenHeight(4)},
        ]}
        showsVerticalScrollIndicator={false}>
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
