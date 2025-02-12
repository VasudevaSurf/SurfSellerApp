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
          container: {backgroundColor: ColorPalette.Warning50},
          text: {color: ColorPalette.Warning500},
        };
      case 'Completed':
        return {
          container: {backgroundColor: ColorPalette.Success50},
          text: {color: ColorPalette.Success500},
        };
      case 'Cancelled':
        return {
          container: {backgroundColor: ColorPalette.Error50},
          text: {color: ColorPalette.Error500},
        };
      default:
        return {
          container: {backgroundColor: ColorPalette.Warning50},
          text: {color: ColorPalette.Warning500},
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
            variant={TypographyVariant.BODY_SMALL_CAPTION}
            text={productName}
            customTextStyles={{color: ColorPalette.TextPrimary}}
          />
          <Typography
            variant={TypographyVariant.BODY_XSMALLLINE}
            text={`Order ID - ${orderId}`}
            customTextStyles={styles.orderIdText}
          />
          <View style={styles.seperateContent}>
            <Typography
              variant={TypographyVariant.BODY_XSMALLLINE}
              text={customerName}
              customTextStyles={{color: ColorPalette.TextName}}
            />
            <View style={styles.separatorDot} />
            <Typography
              variant={TypographyVariant.BODY_SMALL}
              text={orderDate}
              customTextStyles={{color: ColorPalette.TextName}}
            />
          </View>
        </View>

        <View style={styles.customerRow}>
          <Typography
            variant={TypographyVariant.BODY_SMALL_BOLD}
            text={`€${orderAmount.toFixed(1)}`}
            customTextStyles={styles.amountText}
          />
          <View
            style={[styles.statusContainer, getStatusStyle(status).container]}>
            <Typography
              variant={TypographyVariant.BODY_XSMALL_PRICE}
              text={status}
              customTextStyles={getStatusStyle(status).text}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
