import React from 'react';
import {Image, View} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {styles} from './RecentOrder.styles';
import {RecentOrderProps} from './RecentOrder.types';
import {Badge} from '../../UserComponents/Badges/Badge';
import DotIcon from '../../../assets/icons/DotIcon';
import {
  getScreenWidth,
  getScreenHeight,
  getFigmaDimension,
} from '../../../helpers/screenSize';
import {Spacing, BorderRadius} from '../../../config/globalStyles';

export const RecentOrder: React.FC<RecentOrderProps> = ({
  orderImage,
  productName,
  orderId,
  customerName,
  orderDate,
  orderAmount,
  status,
  isLastItem = false,
}) => {
  const getStatusStyle = (orderStatus: string) => {
    switch (orderStatus) {
      case 'Pending':
        return {
          container: {backgroundColor: ColorPalette.YELLOW_00},
          text: ColorPalette.YELLOW_200,
        };
      case 'Delivered':
        return {
          container: {backgroundColor: ColorPalette.GREEN_00},
          text: ColorPalette.Green_200,
        };
      case 'Cancelled':
        return {
          container: {backgroundColor: ColorPalette.RED_00},
          text: ColorPalette.RED_200,
        };
      default:
        return {
          container: {backgroundColor: ColorPalette.YELLOW_00},
          text: ColorPalette.YELLOW_200,
        };
    }
  };

  const statusStyle = getStatusStyle(status);

  return (
    <View style={[styles.container, isLastItem && styles.lastItem]}>
      <View style={styles.contentSection}>
        <View style={[styles.statusMain, getStatusStyle(status).container]}>
          <Badge
            text={status}
            customContainerStyle={{
              backgroundColor: 'transparent',
              paddingHorizontal: getFigmaDimension(8),
              paddingVertical: getFigmaDimension(6),
            }}
            textVariant={TypographyVariant.LMEDIUM_MEDIUM}
            customTextColor={statusStyle.text}
          />
        </View>

        <View style={styles.textSection}>
          <Typography
            variant={TypographyVariant.LMEDIUM_BOLD}
            text={`Order #${orderId}`}
            customTextStyles={styles.orderIdText}
          />
          <Typography
            variant={TypographyVariant.PSMALL_MEDIUM}
            text={productName}
            customTextStyles={styles.productNameText}
            numberOfLines={2}
          />
        </View>
      </View>

      <View style={styles.rightSection}>
        <Image
          source={{uri: orderImage}}
          style={styles.productImage}
          resizeMode="cover"
        />

        <View style={styles.priceSection}>
          <Typography
            variant={TypographyVariant.H6_BOLD}
            text={`€${orderAmount.toFixed(2)}`}
            customTextStyles={styles.amountText}
          />

          <View style={styles.infoRow}>
            <Typography
              variant={TypographyVariant.LSMALL_SEMIBOLD}
              text={`${orderDate}  •`}
              customTextStyles={styles.dateText}
            />
            <Typography
              variant={TypographyVariant.LSMALL_SEMIBOLD}
              text={customerName}
              customTextStyles={styles.customerText}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
