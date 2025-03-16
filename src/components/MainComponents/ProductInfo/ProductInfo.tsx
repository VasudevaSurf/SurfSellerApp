import React, {useState} from 'react';
import {Image, View} from 'react-native';
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
import {CustomSquircle} from '../CustomSquircleMain/CustomSquircle';

export const ProductInfo: React.FC<ProductInfoProps> = ({
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
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleUploadCsv = () => {
    console.log('Upload CSV pressed');
  };

  const handleAddManually = () => {
    console.log('Add manually pressed');
  };

  const buttonsTwo: ButtonConfig[] = [
    {
      text: 'Preview',
      onPress: () => handleUploadCsv(),
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      size: ButtonSize.MEDIUM,
    },
    {
      text: 'Delete',
      onPress: () => handleAddManually(),
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      type: ButtonType.OUTLINED,
      size: ButtonSize.MEDIUM,
      customStyles: {borderWidth: 1, borderColor: ColorPalette.GREY_TEXT_400},
      customTextStyles: {color: ColorPalette.GREY_TEXT_400},
    },
    {
      text: 'Cancel',
      onPress: () => handleAddManually(),
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      type: ButtonType.OUTLINED,
      size: ButtonSize.MEDIUM,
      customStyles: {borderWidth: 1},
    },
  ];

  return (
    <CustomSquircle
      style={[styles.container, style]}
      cornerRadius={24}
      cornerSmoothing={1.0}
      fillColor={ColorPalette.White}>
      <View style={styles.contentContainer}>
        <CustomSquircle
          style={styles.imageContainer}
          cornerRadius={16}
          cornerSmoothing={1.0}>
          <Image
            source={{uri: orderImage}}
            style={styles.productImage}
            resizeMode="cover"
          />
        </CustomSquircle>

        <View style={styles.infoContainer}>
          <View style={styles.infoContainerOne}>
            <View style={styles.productNameWrapper}>
              <Typography
                variant={TypographyVariant.LMEDIUM_MEDIUM}
                text={productName}
                customTextStyles={styles.productNameText}
                numberOfLines={2}
              />
            </View>
            <View style={styles.iconContainer}>
              <MoreVerticalIcon
                onPress={() => setShowModal(true)}
                style={undefined}
              />
            </View>
          </View>

          <View style={styles.infoContainerTwo}>
            <View style={styles.sellerContainer}>
              <Typography
                variant={TypographyVariant.LSMALL_REGULAR}
                text="Seller Price :"
                customTextStyles={styles.labelText}
              />
              <Typography
                variant={TypographyVariant.H5_BOLD}
                text={sellerPrice}
                customTextStyles={styles.valueText}
              />
            </View>
            <View style={styles.platFormContainer}>
              <Typography
                variant={TypographyVariant.LSMALL_REGULAR}
                text="Platform fee :"
                customTextStyles={styles.labelText}
              />
              <Typography
                variant={TypographyVariant.H5_BOLD}
                text={platformFee}
                customTextStyles={styles.valueText}
              />
            </View>
          </View>

          <View style={styles.infoContainerThree}>
            <View style={styles.stockContainer}>
              <Typography
                variant={TypographyVariant.LSMALL_REGULAR}
                text="Stock :"
                customTextStyles={styles.labelText}
              />
              <Typography
                variant={TypographyVariant.LSMALL_MEDIUM}
                text={stock}
                customTextStyles={styles.valueText}
              />
            </View>
            <View style={styles.toggleContainer}>
              <ToggleSwitch
                isOn={active}
                onColor={ColorPalette.Success}
                offColor={ColorPalette.Gray}
                label={active ? 'Active' : 'Hidden'}
                labelStyle={styles.toggleLabel}
                size="small"
                onToggle={isOn => onActiveChange?.(isOn)}
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
                  width: getFigmaDimension(40),
                  height: getFigmaDimension(24),
                  borderRadius: getFigmaDimension(12),
                }}
                trackOffStyle={{
                  width: getFigmaDimension(40),
                  height: getFigmaDimension(24),
                  borderRadius: getFigmaDimension(12),
                }}
              />
            </View>
          </View>
        </View>

        <AddModal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          buttons={buttonsTwo}
        />
      </View>
    </CustomSquircle>
  );
};
