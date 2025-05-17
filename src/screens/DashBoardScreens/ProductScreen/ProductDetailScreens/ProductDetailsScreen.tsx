import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import ArrowLeftIcon from '../../../../assets/icons/ArrowLeft';
import {Header} from '../../../../components/UserComponents/Header/Header';
import {Typography} from '../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../config/colorPalette';
import {
  getFigmaDimension,
  getScreenWidth,
} from '../../../../helpers/screenSize';
import {fetchProductDetails} from '../../../../redux/slices/productDetailsSlice';
import {AppDispatch, RootState} from '../../../../redux/store';
import {
  extractProductDetailsFromSections,
  getProductCategories,
  getProductImages,
  renderHtmlContent,
} from './ProductDetailsHelpers';
import {styles} from './ProductDetailsScreen.styles';

type ProductDetailsParams = {
  productId: string;
};

type ProductDetailsRouteProp = RouteProp<
  {
    ProductDetails: ProductDetailsParams;
  },
  'ProductDetails'
>;

const DefaultProduct = require('../../../../assets/images/defaultProduct.png');

const ProductDetailsScreen = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const {productId} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [imageLoadError, setImageLoadError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const screenWidth = Dimensions.get('window').width;

  const userId = useSelector(
    (state: RootState) => state.auth.userData?.user_id,
  );

  const {data, loading, error} = useSelector(
    (state: RootState) => state.productDetails,
  );

  const trackWidth = getFigmaDimension(40);
  const trackHeight = getFigmaDimension(24);
  const thumbDiameter = getFigmaDimension(18);

  useEffect(() => {
    if (productId && userId) {
      dispatch(fetchProductDetails({userId: userId.toString(), productId}));
    }
  }, [dispatch, userId, productId]);

  const handleImageError = () => {
    console.log('Image load error, falling back to default');
    setImageLoadError(true);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleToggleStatus = (isActive: boolean) => {
    console.log(`Product status changed to ${isActive ? 'Active' : 'Hidden'}`);
  };

  const renderLeftIcon = () => {
    return (
      <ArrowLeftIcon
        size={24}
        color={ColorPalette.IconColor}
        strokeWidth={1.5}
        onPress={handleGoBack}
        style={undefined}
      />
    );
  };

  const renderImageItem = ({item, index}) => {
    return (
      <View style={[styles.carouselImageContainer, {width: screenWidth}]}>
        <Image
          source={
            typeof item.image === 'string' ? {uri: item.image} : item.image
          }
          style={styles.carouselImage}
          resizeMode="contain"
          onError={handleImageError}
        />
      </View>
    );
  };

  const handlePressIndicator = index => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index, animated: true});
    }
  };

  const renderImageIndicator = () => {
    const images = getProductImages(data, DefaultProduct);
    if (images.length <= 1) return null;

    return (
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePressIndicator(index)}
            activeOpacity={0.7}>
            <View
              style={[
                styles.indicator,
                activeImageIndex === index && styles.activeIndicator,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    setActiveImageIndex(newIndex);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={ColorPalette.WHITE_100}
        />
        <Header
          name="Product Details"
          variant={TypographyVariant.H6_SMALL_SEMIBOLD}
          textColor={ColorPalette.AgreeTerms}
          leftIconComponent={renderLeftIcon()}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={ColorPalette.Primary} />
          <Typography
            text="Loading product details..."
            variant={TypographyVariant.LSMALL_REGULAR}
            customTextStyles={{marginTop: 10}}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={ColorPalette.WHITE_100}
        />
        <Header
          name="Product Details"
          variant={TypographyVariant.H6_SMALL_SEMIBOLD}
          textColor={ColorPalette.AgreeTerms}
          leftIconComponent={renderLeftIcon()}
        />
        <View style={styles.errorContainer}>
          <Typography
            text={`Error: ${error}`}
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={{color: ColorPalette.RED_100}}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (!data) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={ColorPalette.WHITE_100}
        />
        <Header
          name="Product Details"
          variant={TypographyVariant.H6_SMALL_SEMIBOLD}
          textColor={ColorPalette.AgreeTerms}
          leftIconComponent={renderLeftIcon()}
        />
        <View style={styles.errorContainer}>
          <Typography
            text="No product data available"
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={{color: ColorPalette.RED_100}}
          />
        </View>
      </SafeAreaView>
    );
  }

  const {
    productName,
    price,
    status,
    stockAmount,
    description,
    productCode,
    minQty,
    maxQty,
    qtyStep,
    shortDescription,
    promoText,
  } = extractProductDetailsFromSections(data);

  // Get categories and images
  const categories = getProductCategories(data);
  const images = getProductImages(data, DefaultProduct);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={ColorPalette.WHITE_100}
      />
      <Header
        name="Product Details"
        variant={TypographyVariant.H6_SMALL_SEMIBOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIconComponent={renderLeftIcon()}
      />

      <Animated.View
        style={[styles.floatingProductNameContainer, {opacity: headerOpacity}]}>
        <Typography
          text={productName}
          variant={TypographyVariant.LMEDIUM_SEMIBOLD}
          customTextStyles={styles.floatingProductName}
          numberOfLines={1}
        />
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}>
        <View style={styles.imageSection}>
          <FlatList
            ref={flatListRef}
            data={images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={renderImageItem}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
          {renderImageIndicator()}
        </View>

        <View style={styles.infoSection}>
          <View style={styles.productHeader}>
            <View style={styles.nameAndPrice}>
              <Typography
                text={productName}
                variant={TypographyVariant.H5_SEMIBOLD}
                customTextStyles={styles.productNameText}
              />
              <Typography
                text={price}
                variant={TypographyVariant.H5_SEMIBOLD}
                customTextStyles={styles.priceText}
              />
            </View>

            <View style={styles.statusContainer}>
              <Typography
                text="Status"
                variant={TypographyVariant.LSMALL_REGULAR}
                customTextStyles={styles.labelText}
              />
              <ToggleSwitch
                isOn={status === 'A'}
                onColor={ColorPalette.Success}
                offColor={ColorPalette.Gray}
                label={status === 'A' ? 'Active' : 'Hidden'}
                labelStyle={styles.toggleLabel}
                size="small"
                onToggle={isOn => handleToggleStatus(isOn)}
                thumbOnStyle={{
                  backgroundColor: ColorPalette.White,
                  elevation: 0,
                  shadowOpacity: 0,
                  shadowColor: 'transparent',
                  shadowOffset: {height: 0, width: 0},
                  shadowRadius: 0,
                  width: thumbDiameter,
                  height: thumbDiameter,
                  borderRadius: thumbDiameter / 2,
                  margin: (trackHeight - thumbDiameter) / 2,
                }}
                thumbOffStyle={{
                  backgroundColor: ColorPalette.White,
                  elevation: 0,
                  shadowOpacity: 0,
                  shadowColor: 'transparent',
                  shadowOffset: {height: 0, width: 0},
                  shadowRadius: 0,
                  width: thumbDiameter,
                  height: thumbDiameter,
                  borderRadius: thumbDiameter / 2,
                  margin: (trackHeight - thumbDiameter) / 2,
                }}
                trackOnStyle={{
                  width: trackWidth,
                  height: trackHeight,
                  borderRadius: trackHeight / 2,
                  padding: 0,
                }}
                trackOffStyle={{
                  width: trackWidth,
                  height: trackHeight,
                  borderRadius: trackHeight / 2,
                  padding: 0,
                }}
                containerStyle={{
                  padding: 0,
                  margin: 0,
                }}
              />
            </View>
          </View>

          <View style={styles.categoriesWrapper}>
            <Typography
              text="Categories"
              variant={TypographyVariant.LSMALL_REGULAR}
              customTextStyles={styles.labelText}
            />
            <View style={styles.categoriesContainer}>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <View key={category.id} style={styles.categoryTag}>
                    <Typography
                      text={category.name}
                      variant={TypographyVariant.LSMALL_REGULAR}
                      customTextStyles={styles.categoryText}
                    />
                  </View>
                ))
              ) : (
                <Typography
                  text="No categories"
                  variant={TypographyVariant.LSMALL_REGULAR}
                  customTextStyles={styles.valueText}
                />
              )}
            </View>
          </View>

          <View style={styles.infoCards}>
            <View style={styles.infoCard}>
              <View style={styles.infoCardIconContainer}>
                <Typography
                  text="📦"
                  variant={TypographyVariant.H6_SMALL_SEMIBOLD}
                />
              </View>
              <Typography
                text="Stock"
                variant={TypographyVariant.LSMALL_REGULAR}
                customTextStyles={styles.infoCardLabel}
              />
              <Typography
                text={stockAmount}
                variant={TypographyVariant.LMEDIUM_SEMIBOLD}
                customTextStyles={styles.infoCardValue}
              />
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoCardIconContainer}>
                <Typography
                  text="🔢"
                  variant={TypographyVariant.H6_SMALL_SEMIBOLD}
                />
              </View>
              <Typography
                text="Product Code"
                variant={TypographyVariant.LSMALL_REGULAR}
                customTextStyles={styles.infoCardLabel}
              />
              <Typography
                text={productCode || 'N/A'}
                variant={TypographyVariant.LMEDIUM_SEMIBOLD}
                customTextStyles={styles.infoCardValue}
              />
            </View>
          </View>
        </View>

        {/* Inventory Section */}
        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Typography
              text="Inventory Details"
              variant={TypographyVariant.LMEDIUM_SEMIBOLD}
              customTextStyles={styles.sectionHeaderText}
            />
            <View style={styles.divider} />
          </View>

          <View style={styles.inventoryDetails}>
            <View style={styles.inventoryCard}>
              <Typography
                text="Min Qty"
                variant={TypographyVariant.LSMALL_REGULAR}
                customTextStyles={styles.inventoryLabel}
              />
              <Typography
                text={minQty || '0'}
                variant={TypographyVariant.LMEDIUM_SEMIBOLD}
                customTextStyles={styles.inventoryValue}
              />
            </View>

            <View style={styles.inventoryCard}>
              <Typography
                text="Max Qty"
                variant={TypographyVariant.LSMALL_REGULAR}
                customTextStyles={styles.inventoryLabel}
              />
              <Typography
                text={maxQty || 'No limit'}
                variant={TypographyVariant.LMEDIUM_SEMIBOLD}
                customTextStyles={styles.inventoryValue}
              />
            </View>

            <View style={styles.inventoryCard}>
              <Typography
                text="Qty Step"
                variant={TypographyVariant.LSMALL_REGULAR}
                customTextStyles={styles.inventoryLabel}
              />
              <Typography
                text={qtyStep || '1'}
                variant={TypographyVariant.LMEDIUM_SEMIBOLD}
                customTextStyles={styles.inventoryValue}
              />
            </View>
          </View>

          <View style={styles.platformFeeContainer}>
            <Typography
              text="Platform Fee"
              variant={TypographyVariant.LSMALL_REGULAR}
              customTextStyles={styles.labelText}
            />
            <Typography
              text="€0.00"
              variant={TypographyVariant.LMEDIUM_SEMIBOLD}
              customTextStyles={[styles.valueText, styles.platformFeeValue]}
            />
          </View>
        </View>

        {(shortDescription || promoText) && (
          <View style={styles.infoSection}>
            <View style={styles.sectionHeader}>
              <Typography
                text="Additional Information"
                variant={TypographyVariant.LMEDIUM_SEMIBOLD}
                customTextStyles={styles.sectionHeaderText}
              />
              <View style={styles.divider} />
            </View>

            {shortDescription && (
              <View style={styles.detailItem}>
                <Typography
                  text="Short Description"
                  variant={TypographyVariant.LSMALL_REGULAR}
                  customTextStyles={[
                    styles.labelText,
                    styles.additionalInfoLabel,
                  ]}
                />
                <View style={styles.htmlContentWrapper}>
                  {renderHtmlContent(
                    shortDescription,
                    screenWidth - getScreenWidth(10),
                  )}
                </View>
              </View>
            )}

            {promoText && (
              <View style={styles.detailItem}>
                <Typography
                  text="Promotional Text"
                  variant={TypographyVariant.LSMALL_REGULAR}
                  customTextStyles={[
                    styles.labelText,
                    styles.additionalInfoLabel,
                  ]}
                />
                <View style={styles.promoTextContainer}>
                  <Typography
                    text={promoText}
                    variant={TypographyVariant.LSMALL_REGULAR}
                    customTextStyles={styles.promoTextValue}
                  />
                </View>
              </View>
            )}
          </View>
        )}

        {description && (
          <View style={styles.infoSection}>
            <View style={styles.sectionHeader}>
              <Typography
                text="Product Description"
                variant={TypographyVariant.LMEDIUM_SEMIBOLD}
                customTextStyles={styles.sectionHeaderText}
              />
              <View style={styles.divider} />
            </View>
            <View style={styles.descriptionContainer}>
              {renderHtmlContent(description, screenWidth - getScreenWidth(10))}
            </View>
          </View>
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;
