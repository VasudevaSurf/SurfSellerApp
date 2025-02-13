import React from 'react';
import {View, Image} from 'react-native';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import ShareIcon from '../../../assets/icons/ShareIcon';
import MoreVerticalIcon from '../../../assets/icons/MoreVerticalIcon';
import {ProductInfoProps} from './ProductInfo.types';
import {styles} from './ProductInfo.styles';
import ToggleSwitch from 'toggle-switch-react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {getFigmaDimension} from '../../../helpers/screenSize';

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
  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: orderImage}}
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoContainerOne}>
          <View style={styles.productNameWrapper}>
            <Typography
              variant={TypographyVariant.BODY_MEDIUM_MAIN}
              text={productName}
              customTextStyles={styles.productNameText}
              numberOfLines={2}
            />
          </View>
          <View style={styles.iconContainer}>
            <ShareIcon onPress={onShare} />
            <MoreVerticalIcon onPress={onMoreOptions} />
          </View>
        </View>

        <View style={styles.infoContainerTwo}>
          <View style={styles.sellerContainer}>
            <Typography
              variant={TypographyVariant.BODY_XXSMALL}
              text="Seller Price :"
              customTextStyles={styles.labelText}
            />
            <Typography
              variant={TypographyVariant.BODY_SMALL_CAPTION}
              text={sellerPrice}
              customTextStyles={styles.valueText}
            />
          </View>
          <View style={styles.platFormContainer}>
            <Typography
              variant={TypographyVariant.BODY_XXSMALL}
              text="Platform fee :"
              customTextStyles={styles.labelText}
            />
            <Typography
              variant={TypographyVariant.BODY_SMALL_CAPTION}
              text={platformFee}
              customTextStyles={styles.valueText}
            />
          </View>
        </View>

        <View style={styles.infoContainerThree}>
          <View style={styles.stockContainer}>
            <Typography
              variant={TypographyVariant.BODY_XSMALLLINE}
              text="Stock :"
              customTextStyles={styles.labelText}
            />
            <Typography
              variant={TypographyVariant.BODY_MEDIUM_MAIN}
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
              thumbOnStyle={{backgroundColor: ColorPalette.White}}
              thumbOffStyle={{backgroundColor: ColorPalette.White}}
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
    </View>
  );
};
