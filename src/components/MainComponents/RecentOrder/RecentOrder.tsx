import React from 'react';
import {View, Image} from 'react-native';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {styles} from './RecentOrder.styles';
import {RecentOrderProps} from './RecentOrder.types';

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
          text: {color: ColorPalette.YELLOW_200},
        };
      case 'Delivered':
        return {
          container: {backgroundColor: ColorPalette.GREEN_00},
          text: {color: ColorPalette.Green_200},
        };
      case 'Cancelled':
        return {
          container: {backgroundColor: ColorPalette.RED_00},
          text: {color: ColorPalette.RED_200},
        };
      default:
        return {
          container: {backgroundColor: ColorPalette.YELLOW_00},
          text: {color: ColorPalette.YELLOW_200},
        };
    }
  };

  return (
    <View style={[styles.container, isLastItem && styles.lastItem]}>
      <View style={styles.containerOne}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: orderImage}}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.contentContainer}>
          <Typography
            variant={TypographyVariant.LMEDIUM_BOLD}
            text={productName}
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
          <Typography
            variant={TypographyVariant.LSMALL_REGULAR}
            text={`Order ID - ${orderId}`}
            customTextStyles={styles.orderIdText}
          />
          <View style={styles.seperateContent}>
            <Typography
              variant={TypographyVariant.LSMALL_REGULAR}
              text={customerName}
              customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
            />
            <View style={styles.separatorDot} />
            <Typography
              variant={TypographyVariant.LSMALL_REGULAR}
              text={orderDate}
              customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
            />
          </View>
        </View>

        <View style={styles.customerRow}>
          <Typography
            variant={TypographyVariant.LMEDIUM_BOLD}
            text={`€${orderAmount.toFixed(1)}`}
            customTextStyles={styles.amountText}
          />
          <View
            style={[styles.statusContainer, getStatusStyle(status).container]}>
            <Typography
              variant={TypographyVariant.LSMALL_MEDIUM}
              text={status}
              customTextStyles={getStatusStyle(status).text}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
