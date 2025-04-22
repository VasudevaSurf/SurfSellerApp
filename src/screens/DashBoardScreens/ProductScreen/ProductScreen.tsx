import QuestionMarkIcon from '../../../assets/icons/QuestionMarkIcon';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import BellIcon from '../../../assets/icons/BellIcon';
import PlusIcon from '../../../assets/icons/PlusIcon';
import {
  AddModal,
  ButtonConfig,
} from '../../../components/MainComponents/AddModal/AddModal';
import {ProductInfo} from '../../../components/MainComponents/ProductInfo/ProductInfo';
import {SlidingBar} from '../../../components/MainComponents/SlidingBar/SlidingBar';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../components/UserComponents/Button';
import {Header} from '../../../components/UserComponents/Header/Header';
import {SearchBox} from '../../../components/UserComponents/SearchBox/SearchBox';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {navigate} from '../../../navigation/utils/navigationRef';
import {fetchProducts} from '../../../redux/slices/productsSlice';
import {AppDispatch, RootState} from '../../../redux/store';
import {styles} from './ProductScreen.styles';

// Demo product data for testing
const demoProducts = [
  {
    product_id: 'demo1',
    product: 'Premium Leather Wallet',
    format_price: '€129.99',
    image_url: 'https://example.com/wallet.jpg',
    amount: 45,
    status: 'A',
  },
  {
    product_id: 'demo2',
    product: 'Stainless Steel Water Bottle - Eco-Friendly & BPA Free',
    format_price: '€24.95',
    image_url: 'https://example.com/bottle.jpg',
    amount: 230,
    status: '',
  },
  {
    product_id: 'demo3',
    product: 'Wireless Noise-Cancelling Headphones',
    format_price: '€199.99',
    image_url: 'https://example.com/headphones.jpg',
    amount: 15,
    status: 'A',
  },
  {
    product_id: 'demo4',
    product: 'Organic Cotton T-Shirt',
    format_price: '€29.95',
    image_url: '',
    amount: 0,
    status: 'H',
  },
  {
    product_id: 'demo5',
    product: 'Handmade Ceramic Mug Set',
    format_price: '€39.99',
    image_url: 'https://example.com/mugs.jpg',
    amount: 8,
    status: 'A',
  },
  {
    product_id: 'demo6',
    product: 'Smart Watch with Health Tracking',
    format_price: '€249.99',
    image_url: 'https://example.com/smartwatch.jpg',
    amount: 2,
    status: 'A',
  },
];

const ProductScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchText] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const [useTestData, setUseTestData] = useState(false);

  const userId = useSelector(
    (state: RootState) => state.auth.userData?.user_id,
  );

  console.log('User ID for Products:', userId);

  const {
    products = [],
    loading,
    error,
    totalItems,
  } = useSelector((state: RootState) => state.products);

  // Combined products array (API data or demo data)
  const displayProducts =
    useTestData || !products || products.length === 0 ? demoProducts : products;

  useEffect(() => {
    if (userId) {
      dispatch(fetchProducts({userId})).catch(() => {
        console.log('Failed to fetch products, using demo data');
        setUseTestData(true);
      });
    } else {
      // If no userId available, use demo data
      setUseTestData(true);
    }
  }, [dispatch, userId]);

  const handleAddManually = () => {
    setShowAddModal(false);
    setTimeout(() => {
      navigate('Dashboard', {
        screen: 'Product',
        params: {screen: 'AddProduct'},
      });
    }, 300);
  };

  const handleUploadCsv = () => {
    setShowAddModal(false);
    console.log('Upload CSV pressed');
  };

  const buttons: ButtonConfig[] = [
    {
      text: 'Upload CSV file',
      onPress: () => handleUploadCsv(),
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      size: ButtonSize.MEDIUM,
    },
    {
      text: 'Add product Manually',
      onPress: () => handleAddManually(),
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      type: ButtonType.OUTLINED,
      size: ButtonSize.MEDIUM,
      customStyles: {borderWidth: 1},
    },
  ];

  const filterOptions = [
    {id: 'all', label: `All ${displayProducts.length}`},
    {id: 'active', label: 'Active'},
    {id: 'lowStock', label: 'Low in Stock'},
    {id: 'hidden', label: 'Hidden'},
    {id: 'outOfStock', label: 'Out of Stock'},
    {id: 'pending', label: 'Pending'},
    {id: 'discontinued', label: 'Discontinued'},
    {id: 'draft', label: 'Draft'},
  ];

  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);

  const searchBarHeight = getScreenHeight(6);

  const handleToggleProductStatus = (productId, isActive) => {
    console.log(
      `Product ${productId} status changed to ${
        isActive ? 'Active' : 'Hidden'
      }`,
    );
    // Here you would implement the actual status change logic
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name="Products"
        variant={TypographyVariant.H6_SMALL_SEMIBOLD}
        textColor={ColorPalette.AgreeTerms}
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
          onChangeText={() => {}} // Placeholder for future implementation
          placeholder="Search products..."
          customContainerStyle={{
            flex: 1,
            height: searchBarHeight,
          }}
        />
        <Button
          text="Add"
          type={ButtonType.PRIMARY}
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.MEDIUM}
          state={ButtonState.DEFAULT}
          customStyles={{
            height: searchBarHeight,
            paddingHorizontal: getScreenWidth(3),
          }}
          IconComponent={() => (
            <PlusIcon color={ColorPalette.White} strokeWidth={2} size={24} />
          )}
          iconPosition="right"
          withShadow
          onPress={() => setShowAddModal(true)}
          textVariant={TypographyVariant.PMEDIUM_SEMIBOLD}
        />
      </View>

      <View style={styles.slidingBarsContainer}>
        <SlidingBar
          options={filterOptions}
          selectedOption={selectedFilter}
          onOptionSelect={setSelectedFilter}
        />
      </View>

      {loading && !useTestData ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={ColorPalette.Primary} />
        </View>
      ) : error && !useTestData ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Typography
            text={error}
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={{color: ColorPalette.RED_100}}
          />
          <TouchableOpacity
            style={{marginTop: 16, padding: 8}}
            onPress={() => setUseTestData(true)}>
            <Typography
              text="Use demo data instead"
              variant={TypographyVariant.LMEDIUM_REGULAR}
              customTextStyles={{color: ColorPalette.Primary}}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingBottom: getScreenHeight(4)},
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.ProductContainer}>
            {displayProducts && displayProducts.length > 0 ? (
              displayProducts.map(product => (
                <ProductInfo
                  key={product.product_id}
                  orderImage={product.image_url}
                  productName={product.product}
                  sellerPrice={product.format_price}
                  platformFee="€0.00"
                  stock={product.amount.toString()}
                  active={product.status === 'A'}
                  onActiveChange={isActive =>
                    handleToggleProductStatus(product.product_id, isActive)
                  }
                  onShare={() => console.log(`Share ${product.product}`)}
                  onMoreOptions={() =>
                    console.log(`More options for ${product.product}`)
                  }
                />
              ))
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                }}>
                <Typography
                  text="No products found"
                  variant={TypographyVariant.LMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.AgreeTerms}}
                />
              </View>
            )}
          </View>
        </ScrollView>
      )}

      <AddModal
        isVisible={showAddModal}
        onClose={() => setShowAddModal(false)}
        buttons={buttons}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setShowAddModal(true)}>
        <PlusIcon
          size={24}
          color={ColorPalette.White}
          style={undefined}
          strokeWidth={2.5}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProductScreen;
