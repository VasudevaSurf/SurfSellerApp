import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BellIcon from '../../../assets/icons/BellIcon';
import InfoIcon from '../../../assets/icons/InfoIcon';
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
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {navigate} from '../../../navigation/utils/navigationRef';
import {styles} from './ProductScreen.styles';
import {CustomSquircle} from '../../../components/MainComponents/CustomSquircleMain/CustomSquircle';

const ProductScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

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

  const [products, setProducts] = useState([
    {
      id: '1',
      orderImage: 'https://picsum.photos/200',
      productName: 'Nike Air Max 270 React Premium Men’s Running...',
      sellerPrice: '€495.00',
      platformFee: '€5.00',
      stock: '11',
      active: true,
    },
    {
      id: '2',
      orderImage: 'https://picsum.photos/199',
      productName: 'Nike Air Max 270 React Premium Men’s Running...',
      sellerPrice: '€299.99',
      platformFee: '€4.50',
      stock: '8',
      active: true,
    },
    {
      id: '3',
      orderImage: 'https://picsum.photos/202',
      productName: 'Nike Air Max 270 React Premium Men’s Running...',
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

  const searchBarHeight = getScreenHeight(6);

  const filterSections = [
    {
      id: 'status',
      title: 'Status',
      options: [
        {id: 'active', label: 'Active', isSelected: false},
        {id: 'inStock', label: 'In stock', isSelected: false},
        {id: 'lowStock', label: 'Low stock', isSelected: false},
        {id: 'outOfStock', label: 'Out of stock', isSelected: false},
        {id: 'hidden', label: 'Hidden', isSelected: false},
      ],
    },
  ];

  const filterOptions = [
    {id: 'all', label: 'All'},
    {id: 'inStock', label: 'In Stock'},
    {id: 'lowStock', label: 'Low in Stock'},
    {id: 'outOfStock', label: 'Out of Stock'},
    {id: 'hidden', label: 'Hidden'},
    {id: 'active', label: 'Active'},
    {id: 'pending', label: 'Pending'},
    {id: 'discontinued', label: 'Discontinued'},
    {id: 'draft', label: 'Draft'},
  ];

  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);

  const handleActiveChange = (productId: string, isActive: boolean) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? {...product, active: isActive} : product,
      ),
    );
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom']}>
      <Header
        name="Products"
        variant={TypographyVariant.H6_BOLD}
        textColor={ColorPalette.AgreeTerms}
        rightIcons={[
          {
            icon: InfoIcon,
            onPress: () => console.log('Info icon pressed'),
            size: 24,
            color: ColorPalette.IconColor,
            strokeWidth: 2,
          },
          {
            icon: BellIcon,
            onPress: () => console.log('Bell icon pressed'),
            size: 24,
            color: ColorPalette.IconColor,
            strokeWidth: 2,
          },
          // {
          //   icon: AlignCenterIcon,
          //   onPress: () => setShowModal(true),
          //   size: 24,
          //   color: ColorPalette.Black,
          //   strokeWidth: 2,
          // },
        ]}
      />

      <View style={styles.searchContainer}>
        <SearchBox
          value={searchText}
          onChangeText={setSearchText}
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
          IconComponent={() => <PlusIcon color={ColorPalette.White} />}
          iconPosition="right"
          withShadow
          onPress={() => setShowAddModal(true)}
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
        <View style={styles.ProductContainer}>
          {products.map(product => (
            <ProductInfo
              key={product.id}
              orderImage={product.orderImage}
              productName={product.productName}
              sellerPrice={product.sellerPrice}
              platformFee={product.platformFee}
              stock={product.stock}
              active={product.active}
              onActiveChange={isActive =>
                handleActiveChange(product.id, isActive)
              }
              onShare={() => console.log(`Share ${product.productName}`)}
              onMoreOptions={() =>
                console.log(`More options for ${product.productName}`)
              }
            />
          ))}
        </View>
        <AddModal
          isVisible={showAddModal}
          onClose={() => setShowAddModal(false)}
          buttons={buttons}
        />
      </ScrollView>
      <CustomSquircle
        style={styles.floatingButton}
        fillColor={ColorPalette.PURPLE_300}
        cornerRadius={16}
        cornerSmoothing={1.0} // 1.0 is 100% corner smoothing
      >
        <TouchableOpacity
          style={styles.floatingButtonInner}
          onPress={() => setShowAddModal(true)}>
          <PlusIcon size={24} color={ColorPalette.White} style={undefined} />
        </TouchableOpacity>
      </CustomSquircle>
    </SafeAreaView>
  );
};

export default ProductScreen;
