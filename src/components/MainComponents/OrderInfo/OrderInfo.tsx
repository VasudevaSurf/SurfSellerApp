import React, {useState} from 'react';
import {Image, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import CheckIcon from '../../../assets/icons/CheckIcon';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {Badge} from '../../UserComponents/Badges/Badge';
import {BadgeType, BadgeVariant} from '../../UserComponents/Badges/Badge.types';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {StatusModal} from '../StatusModal/StatusModal';
import {styles} from './OrderInfo.styles';
import {OrderInfoProps, OrderStatus} from './OrderInfo.types';

const getStatusBadgeType = (status: OrderStatus): BadgeType => {
  switch (status) {
    case 'Delivered':
    case 'Completed':
      return BadgeType.SUCCESS;
    case 'Cancelled':
    case 'Failed':
    case 'Declined':
      return BadgeType.DANGER;
    case 'Pending':
    case 'Processing':
      return BadgeType.WARNING;
    case 'Accepted':
    case 'Shipped':
      return BadgeType.PRIMARY;
    default:
      return BadgeType.PRIMARY;
  }
};

const getStatusColors = (
  status: OrderStatus,
): {borderColor: string; textColor: string} => {
  switch (status) {
    case 'Delivered':
    case 'Completed':
      return {
        borderColor: ColorPalette.Green_200,
        textColor: ColorPalette.Green_200,
      };
    case 'Cancelled':
    case 'Failed':
    case 'Declined':
      return {
        borderColor: ColorPalette.RED_100,
        textColor: ColorPalette.PURPLE_ROSE_300,
      };
    case 'Pending':
    case 'Processing':
      return {
        borderColor: '#FFC107', // Yellow color for pending
        textColor: '#FFC107',
      };
    case 'Accepted':
    case 'Shipped':
      return {
        borderColor: ColorPalette.PURPLE_300,
        textColor: ColorPalette.PURPLE_300,
      };
    default:
      return {
        borderColor: ColorPalette.GREY_TEXT_400,
        textColor: ColorPalette.GREY_TEXT_400,
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(orderStatus);
  const [statusUpdateSuccess, setStatusUpdateSuccess] = useState(false);

  const statusColors = getStatusColors(currentStatus);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (newStatus === currentStatus) {
      setIsModalVisible(false);
      return;
    }

    try {
      setIsUpdatingStatus(true);
      setIsModalVisible(false);

      // Call the parent's status change handler
      await onStatusChange(newStatus);

      // Update local state
      setCurrentStatus(newStatus);
      setStatusUpdateSuccess(true);

      // Show success feedback for 2 seconds
      setTimeout(() => {
        setStatusUpdateSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to update status:', error);
      // Optionally show error feedback here
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const renderStatusBadgeContent = () => {
    if (isUpdatingStatus) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: getScreenWidth(2),
          }}>
          <ActivityIndicator size="small" color={statusColors.textColor} />
          <Typography
            text="Updating..."
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            customTextStyles={{color: statusColors.textColor}}
          />
        </View>
      );
    }

    if (statusUpdateSuccess) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: getScreenWidth(2),
          }}>
          <CheckIcon
            size={16}
            backgroundColor={statusColors.textColor}
            checkColor="white"
          />
          <Typography
            text={`Updated to ${currentStatus}`}
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            customTextStyles={{color: statusColors.textColor}}
          />
        </View>
      );
    }

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: getScreenWidth(2),
        }}>
        <Typography
          text={currentStatus}
          variant={TypographyVariant.LMEDIUM_MEDIUM}
          customTextStyles={{color: statusColors.textColor}}
        />
        <ArrowDownIcon size={16} color={statusColors.textColor} />
      </View>
    );
  };

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
          orderStatus: currentStatus,
          orderQuantity,
        })
      }
      activeOpacity={0.7}>
      {/* Header with order number and date */}
      <View style={styles.headerContainer}>
        <View style={{gap: getScreenHeight(0.5)}}>
          <Typography
            text={`Order #${orderNumber}`}
            variant={TypographyVariant.H5_SEMIBOLD}
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
              text={`€${orderPrice}`}
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
        <TouchableOpacity
          style={[
            styles.statusBadge,
            {
              borderColor: statusColors.borderColor,
              borderWidth: 1,
              borderRadius: getScreenWidth(2),
              paddingHorizontal: getScreenWidth(3),
              paddingVertical: getScreenHeight(1),
              backgroundColor: 'transparent',
            },
          ]}
          onPress={e => {
            e.stopPropagation();
            if (!isUpdatingStatus && !statusUpdateSuccess) {
              setIsModalVisible(true);
            }
          }}
          disabled={isUpdatingStatus}
          activeOpacity={0.7}>
          {renderStatusBadgeContent()}
        </TouchableOpacity>

        <StatusModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleStatusChange}
          initialStatus={currentStatus}
          showSearch={false}
        />
      </View>
    </TouchableOpacity>
  );
};
