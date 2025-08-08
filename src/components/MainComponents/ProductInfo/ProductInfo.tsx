// src/components/MainComponents/ProductInfo/ProductInfo.tsx

import React, {useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import MoreVerticalIcon from '../../../assets/icons/MoreVerticalIcon';
import {ColorPalette} from '../../../config/colorPalette';
import {getFigmaDimension} from '../../../helpers/screenSize';
import {
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../UserComponents/Button';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {AddModal, ButtonConfig} from '../AddModal/AddModal';
import {styles} from './ProductInfo.styles';
import {ProductInfoProps} from './ProductInfo.types';
import {navigate} from '../../../navigation/utils/navigationRef';
import {deleteProduct} from '../../../redux/slices/productsSlice';
import {AppDispatch, RootState} from '../../../redux/store';

const DefaultProduct = require('../../../assets/images/defaultProduct.png');

export const ProductInfo: React.FC<ProductInfoProps> = ({
  productId,
  orderImage,
  productName,
  sellerPrice,
  platformFee,
  stock,
  active = false,
  style,
  onActiveChange,
  onShare,
  onMoreOptions,
  onLongPress,
  productData,
  disabled = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);

  // Get userId and state from Redux
  const userId = useSelector(
    (state: RootState) => state.auth.userData?.user_id,
  );
  const {deletingProducts, deleteError, updatingStatus} = useSelector(
    (state: RootState) => state.products,
  );

  // Check if this product is being deleted or status is being updated
  const isDeleting = deletingProducts.includes(productId);
  const isUpdatingStatus = updatingStatus.includes(productId);
  const isDisabled = disabled || isDeleting || isUpdatingStatus;

  const handlePress = () => {
    if (isDisabled) return;

    // Navigate to AddProduct with pre-filled data for editing
    navigate('Dashboard', {
      screen: 'Product',
      params: {
        screen: 'AddProduct',
        params: {
          productId,
          editMode: true,
          productData: productData || {
            productId,
            productName,
            price: sellerPrice.replace('€', ''), // Remove currency symbol
            category: '', // Will be fetched from API
            subcategory: '',
            description: '',
            images: orderImage ? [orderImage] : [],
            productCode: '',
            quantity: stock,
            minQuantity: '',
            maxQuantity: '',
            trackInventory: false,
            taxType: 'VAT',
            brand: '',
            color: '',
            size: '',
            weight: '',
            manufacturer: '',
            countryOfOrigin: '',
            status: active ? 'A' : 'D',
          },
        },
      },
    });
  };

  const handlePreview = () => {
    // Navigate to ProductDetailsScreen for preview
    navigate('Dashboard', {
      screen: 'Product',
      params: {
        screen: 'ProductDetails',
        params: {productId},
      },
    });
    setShowModal(false);
  };

  const handleDelete = () => {
    setShowModal(false);

    if (!userId) {
      Alert.alert('Error', 'Unable to delete product. Please try again.');
      return;
    }

    // Show confirmation dialog
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${productName}"? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('Deleting product:', productId);

              // Dispatch delete action
              const result = await dispatch(
                deleteProduct({
                  userId,
                  productIds: productId,
                }),
              ).unwrap();

              console.log('Product deleted successfully:', result);

              // Show success message
              Alert.alert('Success', 'Product deleted successfully', [
                {text: 'OK', style: 'default'},
              ]);
            } catch (error: any) {
              console.error('Failed to delete product:', error);

              // Show error message
              Alert.alert(
                'Delete Failed',
                error.message || 'Failed to delete product. Please try again.',
                [
                  {text: 'OK', style: 'default'},
                  {
                    text: 'Retry',
                    onPress: () => handleDelete(),
                    style: 'default',
                  },
                ],
              );
            }
          },
        },
      ],
    );
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  // UPDATED: Handle toggle change with proper error handling
  const handleToggleChange = (isOn: boolean) => {
    if (isDisabled) {
      console.log('Toggle disabled, ignoring change');
      return;
    }

    console.log('Toggle changed:', {productId, isOn});

    // Call the parent handler
    if (onActiveChange) {
      onActiveChange(isOn);
    }
  };

  const buttonsTwo: ButtonConfig[] = [
    {
      text: 'Preview',
      onPress: handlePreview,
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      size: ButtonSize.MEDIUM,
      textVariant: TypographyVariant.LMEDIUM_EXTRASEMIBOLD,
    },
    {
      text: isDeleting ? 'Deleting...' : 'Delete',
      onPress: handleDelete,
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      type: ButtonType.OUTLINED,
      size: ButtonSize.MEDIUM,
      customStyles: {
        borderWidth: 1,
        borderColor: isDeleting
          ? ColorPalette.GREY_TEXT_200
          : ColorPalette.GREY_TEXT_400,
        opacity: isDeleting ? 0.6 : 1,
      },
      customTextStyles: {
        color: isDeleting
          ? ColorPalette.GREY_TEXT_200
          : ColorPalette.GREY_TEXT_400,
      },
      textVariant: TypographyVariant.LMEDIUM_EXTRASEMIBOLD,
      disabled: isDeleting,
    },
    {
      text: 'Cancel',
      onPress: handleCancel,
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      type: ButtonType.OUTLINED,
      size: ButtonSize.MEDIUM,
      customStyles: {borderWidth: 1},
      textVariant: TypographyVariant.LMEDIUM_EXTRASEMIBOLD,
    },
  ];

  const getImageSource = (): ImageSourcePropType => {
    if (!orderImage || orderImage.trim() === '' || imageLoadError) {
      return DefaultProduct;
    }
    return {uri: orderImage};
  };

  const handleImageError = () => {
    console.log('Image load error, falling back to default');
    setImageLoadError(true);
  };

  // Calculate dimensions for the toggle switch
  const trackWidth = getFigmaDimension(40);
  const trackHeight = getFigmaDimension(24);
  const thumbDiameter = getFigmaDimension(18);

  return (
    <TouchableOpacity
      onPress={handlePress}
      onLongPress={() => !isDisabled && onLongPress?.(productId)}
      style={[
        styles.container,
        style,
        // Add visual feedback for disabled states
        isDisabled && {opacity: 0.7},
      ]}
      disabled={isDisabled}
      activeOpacity={isDisabled ? 1 : 0.7}>
      <View style={styles.imageContainer}>
        <Image
          source={getImageSource()}
          style={styles.productImage}
          resizeMode="cover"
          onError={handleImageError}
        />

        {/* Show deletion indicator */}
        {isDeleting && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: getFigmaDimension(8),
            }}>
            <ActivityIndicator size="small" color={ColorPalette.White} />
            <Typography
              variant={TypographyVariant.LSMALL_MEDIUM}
              text="Deleting..."
              customTextStyles={{
                color: ColorPalette.White,
                marginTop: getFigmaDimension(4),
              }}
            />
          </View>
        )}

        {/* Show status update indicator */}
        {isUpdatingStatus && !isDeleting && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(91, 1, 207, 0.3)', // Purple overlay
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: getFigmaDimension(8),
            }}>
            <ActivityIndicator size="small" color={ColorPalette.PURPLE_300} />
            <Typography
              variant={TypographyVariant.LSMALL_MEDIUM}
              text="Updating..."
              customTextStyles={{
                color: ColorPalette.PURPLE_300,
                marginTop: getFigmaDimension(4),
              }}
            />
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoContainerOne}>
          <View style={styles.productNameWrapper}>
            <Typography
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              text={productName}
              customTextStyles={[
                styles.productNameText,
                isDisabled && {color: ColorPalette.GREY_TEXT_200},
              ]}
              numberOfLines={2}
            />
          </View>
          <View style={styles.iconContainer}>
            <MoreVerticalIcon
              onPress={() => !isDisabled && setShowModal(true)}
              style={[undefined, isDisabled && {opacity: 0.5}]}
            />
          </View>
        </View>

        <View style={styles.infoContainerTwo}>
          <View style={styles.sellerContainer}>
            <Typography
              variant={TypographyVariant.LSMALL_REGULAR}
              text="Seller Price :"
              customTextStyles={[
                styles.labelText,
                isDisabled && {color: ColorPalette.GREY_TEXT_200},
              ]}
            />
            <Typography
              variant={TypographyVariant.H5_SEMIBOLD}
              text={sellerPrice}
              customTextStyles={[
                styles.valueText,
                isDisabled && {color: ColorPalette.GREY_TEXT_200},
              ]}
            />
          </View>
          <View style={styles.platFormContainer}>
            <Typography
              variant={TypographyVariant.LSMALL_REGULAR}
              text="Platform fee :"
              customTextStyles={[
                styles.labelText,
                isDisabled && {color: ColorPalette.GREY_TEXT_200},
              ]}
            />
            <Typography
              variant={TypographyVariant.H5_SEMIBOLD}
              text={platformFee}
              customTextStyles={[
                styles.valueText,
                isDisabled && {color: ColorPalette.GREY_TEXT_200},
              ]}
            />
          </View>
        </View>

        <View style={styles.infoContainerThree}>
          <View style={styles.stockContainer}>
            <Typography
              variant={TypographyVariant.LSMALL_REGULAR}
              text="Stock :"
              customTextStyles={[
                styles.labelText,
                isDisabled && {color: ColorPalette.GREY_TEXT_200},
              ]}
            />
            <Typography
              variant={TypographyVariant.LSMALL_MEDIUM}
              text={stock}
              customTextStyles={[
                styles.valueText,
                isDisabled && {color: ColorPalette.GREY_TEXT_200},
              ]}
            />
          </View>
          <View style={styles.toggleContainer}>
            <ToggleSwitch
              isOn={active}
              onColor={
                isDisabled ? ColorPalette.GREY_300 : ColorPalette.Success
              }
              offColor={isDisabled ? ColorPalette.GREY_200 : ColorPalette.Gray}
              label={active ? 'Active' : 'Hidden'}
              labelStyle={[
                styles.toggleLabel,
                isDisabled && {color: ColorPalette.GREY_TEXT_200},
              ]}
              size="small"
              onToggle={handleToggleChange}
              disabled={isDisabled}
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
                opacity: isDisabled ? 0.7 : 1,
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
                opacity: isDisabled ? 0.7 : 1,
              }}
              trackOnStyle={{
                width: trackWidth,
                height: trackHeight,
                borderRadius: trackHeight / 2,
                padding: 0,
                opacity: isDisabled ? 0.5 : 1,
              }}
              trackOffStyle={{
                width: trackWidth,
                height: trackHeight,
                borderRadius: trackHeight / 2,
                padding: 0,
                opacity: isDisabled ? 0.5 : 1,
              }}
              containerStyle={{
                padding: 0,
                margin: 0,
              }}
            />

            {/* Show loading indicator next to toggle during status update */}
            {isUpdatingStatus && (
              <View style={{marginLeft: getFigmaDimension(8)}}>
                <ActivityIndicator
                  size="small"
                  color={ColorPalette.PURPLE_300}
                />
              </View>
            )}
          </View>
        </View>

        <AddModal
          isVisible={showModal && !isDisabled}
          onClose={() => setShowModal(false)}
          buttons={buttonsTwo}
        />
      </View>
    </TouchableOpacity>
  );
};
