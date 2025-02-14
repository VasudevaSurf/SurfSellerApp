import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SearchBox} from '../../../components/UserComponents/SearchBox/SearchBox';
import {Header} from '../../../components/UserComponents/Header/Header';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import InfoIcon from '../../../assets/icons/InfoIcon';
import BellIcon from '../../../assets/icons/BellIcon';
import {getScreenHeight} from '../../../helpers/screenSize';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './OrderScreen.styles';
import QuestionMarkIcon from '../../../assets/icons/QuestionMarkIcon';
import {Typography} from '../../../components/UserComponents/Typography/Typography';

const OrderScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([
    {
      id: '1',
      orderImage: 'https://picsum.photos/200',
      productName: 'Lunar whisper luna waha the rtua nahi...',
      sellerPrice: '€495.00',
      platformFee: '€5.00',
      stock: '11',
      active: true,
    },
    {
      id: '2',
      orderImage: 'https://picsum.photos/200',
      productName: 'Solar Eclipse Watch',
      sellerPrice: '€299.99',
      platformFee: '€4.50',
      stock: '8',
      active: true,
    },
    {
      id: '3',
      orderImage: 'https://picsum.photos/202',
      productName: 'Celestial Dream Catcher',
      sellerPrice: '€149.99',
      platformFee: '€3.00',
      stock: '15',
      active: false,
    },
    {
      id: '4',
      orderImage: 'https://picsum.photos/203',
      productName: 'Moonstone Pendant',
      sellerPrice: '€199.99',
      platformFee: '€3.50',
      stock: '5',
      active: true,
    },
    {
      id: '5',
      orderImage: 'https://picsum.photos/204',
      productName: 'Starlight Bracelet Collection',
      sellerPrice: '€259.99',
      platformFee: '€4.00',
      stock: '7',
      active: false,
    },
  ]);

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name="WOW Shop"
        image={{
          source: require('../../../assets/images/placeholder-profile.png'),
        }}
        variant={TypographyVariant.BODY_LARGE_PAGE}
        textColor={ColorPalette.TextTertiary}
        rightIcons={[
          {
            icon: BellIcon,
            onPress: () => console.log('Bell icon pressed'),
            size: 24,
            color: ColorPalette.IconProduct,
            strokeWidth: 2,
          },
          {
            icon: QuestionMarkIcon,
            onPress: () => {},
            size: 24,
            color: ColorPalette.Black,
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
          text={`Total Items : ${products.length}`}
          customTextStyles={styles.textStyle}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderScreen;
