import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {OrderInfoProps, OrderStatus} from './OrderInfo.types';
import {styles} from './OrderInfo.styles';
import {Badge} from '../../UserComponents/Badges/Badge';
import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import {BadgeType, BadgeVariant} from '../../UserComponents/Badges/Badge.types';
import {ColorPalette} from '../../../config/colorPalette';
import {StatusModal} from '../StatusModal/StatusModal';

const getStatusBadgeType = (status: OrderStatus): BadgeType => {
  switch (status) {
    case 'Delivered':
      return BadgeType.SUCCESS;
    case 'Cancelled':
      return BadgeType.DANGER;
    case 'Pending':
      return BadgeType.WARNING;
    default:
      return BadgeType.PRIMARY;
  }
};

const getStatusColors = (
  status: OrderStatus,
): {borderColor: string; textColor: string} => {
  switch (status) {
    case 'Delivered':
      return {
        borderColor: ColorPalette.Green_200,
        textColor: ColorPalette.Green_200,
      };
    case 'Cancelled':
      return {
        borderColor: ColorPalette.RED_100,
        textColor: ColorPalette.PURPLE_ROSE_300,
      };
    default:
      return {
        borderColor: ColorPalette.RED_100,
        textColor: ColorPalette.PURPLE_ROSE_300,
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
        })
      }
      activeOpacity={0.7}>
      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: orderImage}}
            style={styles.orderImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.contentContainer}>
          <Typography
            text={orderName}
            variant={TypographyVariant.LMEDIUM_BOLD}
            customTextStyles={styles.orderName}
            numberOfLines={2}
          />
          <View style={styles.priceContainer}>
            <Typography
              text="Total :"
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={styles.totalText}
            />
            <Typography
              text={`€${orderPrice}`}
              variant={TypographyVariant.LMEDIUM_BOLD}
              customTextStyles={styles.priceText}
            />
          </View>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.orderEmailContaienr}>
          <View style={styles.infoRow}>
            <Typography
              text={`Order #${orderNumber}`}
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              customTextStyles={styles.value}
            />
            <Typography
              text={orderEmail}
              variant={TypographyVariant.LSMALL_REGULAR}
              customTextStyles={styles.valueAbove}
            />
          </View>
          <View style={styles.infoRowTwo}>
            <Typography
              text="Phone"
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              customTextStyles={styles.value}
            />
            <Typography
              text={orderPhone?.toString()}
              variant={TypographyVariant.LSMALL_REGULAR}
              customTextStyles={styles.valueAbove}
            />
          </View>
        </View>

        <View style={styles.dateStatusContainer}>
          <View style={styles.dateContainer}>
            <Typography
              text="Date and Time"
              variant={TypographyVariant.LMEDIUM_MEDIUM}
              customTextStyles={styles.value}
            />
            {orderPhone && (
              <Typography
                text={`${orderDate}, ${orderTime}`}
                variant={TypographyVariant.LSMALL_REGULAR}
                customTextStyles={styles.valueAbove}
              />
            )}
          </View>
          <View style={styles.infoRow}>
            <Badge
              text={orderStatus}
              type={getStatusBadgeType(orderStatus)}
              variant={BadgeVariant.OUTLINE}
              rightIcon={ArrowDownIcon}
              onPress={e => {
                e.stopPropagation(); // Prevent triggering card press
                setIsModalVisible(true);
              }}
              customBorderColor={statusColors.borderColor}
              textVariant={TypographyVariant.LMEDIUM_BOLD}
              customContainerStyle={styles.containerStyle}
              customTextColor={statusColors.textColor}
              iconSize={24}
            />
          </View>
        </View>
        <StatusModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSubmit={onStatusChange}
          initialStatus={orderStatus}
          showSearch={false}
        />
      </View>
    </TouchableOpacity>
  );
};
