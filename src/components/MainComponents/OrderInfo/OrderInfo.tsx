import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight} from '../../../helpers/screenSize';
import {Badge} from '../../UserComponents/Badges/Badge';
import {BadgeType, BadgeVariant} from '../../UserComponents/Badges/Badge.types';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {StatusModal} from '../StatusModal/StatusModal';
import {styles} from './OrderInfo.styles';
import {OrderInfoProps, OrderStatus} from './OrderInfo.types';

// ✅ UPDATED: Direct mapping of API status codes to display labels
export const getStatusLabel = (status: OrderStatus): string => {
  const statusMap: {[key: string]: string} = {
    O: 'Pending',
    P: 'Accepted',
    C: 'Completed',
    F: 'Failed',
    I: 'Canceled',
    D: 'Declined',
    B: 'Backordered',
    Y: 'Awaiting call',
    A: 'Fraud checking',
  };
  return statusMap[status] || 'Unknown';
};

// ✅ UPDATED: Use exact colors from API
export const getStatusColors = (
  status: OrderStatus,
): {borderColor: string; textColor: string} => {
  const colorMap: {[key: string]: string} = {
    O: '#ff9522', // Pending - Orange
    P: '#97cf4d', // Accepted - Green
    C: '#97cf4d', // Completed - Green
    F: '#ff5215', // Failed - Red
    I: '#c2c2c2', // Canceled - Gray
    D: '#ff5215', // Declined - Red
    B: '#28abf6', // Backordered - Blue
    Y: '#cc4125', // Awaiting call - Dark Red
    A: '#dcdcdc', // Fraud checking - Light Gray
  };

  const color = colorMap[status] || ColorPalette.GREY_200;
  return {
    borderColor: color,
    textColor: color,
  };
};

// ✅ UPDATED: Badge type based on status
export const getStatusBadgeType = (status: OrderStatus): BadgeType => {
  switch (status) {
    case 'C': // Completed
    case 'P': // Accepted
      return BadgeType.SUCCESS;

    case 'O': // Pending
    case 'B': // Backordered
      return BadgeType.WARNING;

    case 'Y': // Awaiting call
    case 'A': // Fraud checking
      return BadgeType.PRIMARY;

    case 'F': // Failed
    case 'D': // Declined
    case 'I': // Canceled
      return BadgeType.DANGER;

    default:
      return BadgeType.SECONDARY;
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
        <View style={{gap: getScreenHeight(0.5)}}>
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
            source={{uri: orderImage}}
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
              customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
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
              customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
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
          customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
        />
        <Badge
          text={getStatusLabel(orderStatus)}
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
