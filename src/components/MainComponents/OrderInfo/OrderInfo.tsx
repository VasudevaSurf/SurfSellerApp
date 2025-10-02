import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import { ColorPalette } from '../../../config/colorPalette';
import { getScreenHeight } from '../../../helpers/screenSize';
import { Badge } from '../../UserComponents/Badges/Badge';
import { BadgeType, BadgeVariant } from '../../UserComponents/Badges/Badge.types';
import { Typography } from '../../UserComponents/Typography/Typography';
import { TypographyVariant } from '../../UserComponents/Typography/Typography.types';
import { StatusModal } from '../StatusModal/StatusModal';
import { styles } from './OrderInfo.styles';
import { OrderInfoProps, OrderStatus } from './OrderInfo.types';

export const getStatusBadgeType = (status: OrderStatus): BadgeType => {
  switch (status) {
    case 'Delivered':
    case 'Paid':
    case 'Completed':
      return BadgeType.SUCCESS;

    case 'Pending':
    case 'Open':
    case 'Backordered':
    case 'Shipped':
      return BadgeType.WARNING;

    case 'Accepted':
    case 'Exchanged':
    case 'Returned':
      return BadgeType.PRIMARY; // Blue / active process

    case 'Cancelled':
    case 'Declined':
    case 'Failed':
      return BadgeType.DANGER;

    default:
      return BadgeType.SECONDARY; // For 'All' or unknown statuses
  }
};

export const getStatusColors = (
  status: OrderStatus,
): { borderColor: string; textColor: string } => {
  switch (status) {
    // ✅ Green statuses
    case 'Delivered':
    case 'Paid':
    case 'Completed':
      return {
        borderColor: ColorPalette.Green_200,
        textColor: ColorPalette.Green_200,
      };

    // 🟡 Yellow/Amber statuses
    case 'Pending':
    case 'Open':
    case 'Backordered':
    case 'Shipped':
      return {
        borderColor: ColorPalette.YELLOW_200,
        textColor: ColorPalette.YELLOW_200,
      };

    // 🔵 Blue / Active process statuses
    case 'Accepted':
    case 'Exchanged':
    case 'Returned':
      return {
        borderColor: ColorPalette.ProgressLine, // You can use a suitable blue from your palette
        textColor: ColorPalette.ProgressLine,
      };

    // 🔴 Red / Failure statuses
    case 'Cancelled':
    case 'Declined':
    case 'Failed':
      return {
        borderColor: ColorPalette.RED_100,
        textColor: ColorPalette.RED_100, // matches your current usage
      };

    // Default / unknown status (like 'All' or 'Processing')
    default:
      return {
        borderColor: ColorPalette.GREY_200,
        textColor: ColorPalette.GREY_100,
      };
  }
};

export const OrderInfo: React.FC<OrderInfoProps> = ({
  orderId,
  orderImage,
  orderName,
  orderPrice,
  orderNumber,
  orderEmail,
  orderPhone,
  orderDate,
  orderTime,
  orderStatus,
  orderQuantity,
  onStatusChange,
  onCardPress,
  style,
}) => {

  console.log("orderStatus in orderInfo:", orderStatus);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const statusColors = getStatusColors(orderStatus);

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() =>
        onCardPress &&
        onCardPress({
          orderId,
          orderImage,
          orderName,
          orderPrice,
          orderNumber,
          orderEmail,
          orderPhone,
          orderDate,
          orderTime,
          orderStatus,
          orderQuantity,
        })
      }
      activeOpacity={0.7}>
      {/* Header with order number and date */}
      <View style={styles.headerContainer}>
        <View style={{ gap: getScreenHeight(0.5) }}>
          <Typography
            text={`Order #${orderNumber}`}
            variant={TypographyVariant.H5_BOLD}
            customTextStyles={styles.orderNumberText}
          />
          <Typography
            text={`${orderDate} • ${orderTime}`}
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={styles.dateTimeText}
          />
        </View>
        <ArrowRightIcon
          size={24}
          color={ColorPalette.GREY_TEXT_400}
          style={undefined}
        />
      </View>

      {/* Product info section */}
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: orderImage }}
            style={styles.orderImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.productDetailsContainer}>
          <Typography
            text={orderName}
            variant={TypographyVariant.PSMALL_MEDIUM}
            customTextStyles={styles.orderName}
            numberOfLines={2}
          />
          <View
            style={{
              flexDirection: 'row',
              gap: getScreenHeight(1),
              alignItems: 'center',
            }}>
            <Typography
              text={`Quantity: `}
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={{ color: ColorPalette.GREY_TEXT_100 }}
            />
            <Typography
              text={`${orderQuantity || 1}`}
              variant={TypographyVariant.LMEDIUM_BOLD}
              customTextStyles={styles.quantityText}
            />
          </View>

          <View style={styles.priceContainer}>
            <Typography
              text="Total:"
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={{ color: ColorPalette.GREY_TEXT_100 }}
            />
            <Typography
              text={`${orderPrice}`}
              variant={TypographyVariant.LMEDIUM_BOLD}
              customTextStyles={styles.priceText}
            />
          </View>
        </View>
      </View>

      {/* Status section */}
      <View style={styles.statusSection}>
        <Typography
          text="Order status:"
          variant={TypographyVariant.PSMALL_MEDIUM}
          customTextStyles={{ color: ColorPalette.GREY_TEXT_100 }}
        />
        <Badge
          text={orderStatus}
          type={getStatusBadgeType(orderStatus)}
          variant={BadgeVariant.OUTLINE}
          rightIcon={ArrowDownIcon}
          onPress={e => {
            e.stopPropagation();
            setIsModalVisible(true);
          }}
          customBorderColor={statusColors.borderColor}
          textVariant={TypographyVariant.LMEDIUM_MEDIUM}
          customContainerStyle={styles.statusBadge}
          customTextColor={statusColors.textColor}
          iconSize={16}
        />
        <StatusModal
          isVisible={isModalVisible}
          title="Order Status"
          onClose={() => setIsModalVisible(false)}
          onSubmit={onStatusChange}
          initialStatus={orderStatus}
          showSearch={false}
        />
      </View>
    </TouchableOpacity>
  );
};
