// src/screens/DashBoardScreens/OrdersScreen/OrderDetailPages/OrderDetail.tsx
// SELF-CONTAINED VERSION - No external imports needed!

import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  Alert,
  Share,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import ChevronDownIcon from '../../../../assets/icons/ArrowDownIcon';
import ArrowLeft from '../../../../assets/icons/ArrowLeft';
import PrintIcon from '../../../../assets/icons/PrintIcon';
import {
  BadgeType,
  BadgeVariant,
} from '../../../../components/UserComponents/Badges/Badge.types';
import {Header} from '../../../../components/UserComponents/Header/Header';
import {Typography} from '../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../config/colorPalette';
import {Spacing} from '../../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../../helpers/screenSize';
import {goBack, navigate} from '../../../../navigation/utils/navigationRef';
import {styles} from './OrderDetail.styles';
import {OrderDetailProps} from './OrderDetail.types';
import {Badge} from '../../../../components/UserComponents/Badges/Badge';
import ArrowDownIcon from '../../../../assets/icons/ArrowDownIcon';
import {StatusModal} from '../../../../components/MainComponents/StatusModal/StatusModal';
import {OrderStatus} from '../../../../components/MainComponents/OrderInfo/OrderInfo.types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../../../redux/store';
import {
  fetchOrderDetails,
  updateOrderStatusDetails,
  clearStatusUpdateError,
  resetOrderDetails,
} from '../../../../redux/slices/orderDetailsSlice';
import ChatIcon from '../../../../assets/icons/ChatIcon';
import AnimatedLoader from '../../../../assets/icons/LoaderIcon';
import { convertOrderStatus, showStatusToast } from '../OrderScreen';

// Map API status codes to display status
const mapStatusToDisplay = (apiStatus: string): OrderStatus => {
  const statusMap: {[key: string]: OrderStatus} = {
    O: 'Pending',
    P: 'Processing',
    C: 'Completed',
    F: 'Failed',
    I: 'Cancelled',
    D: 'Declined',
    B: 'Shipped',
    Y: 'Processing',
    A: 'Processing',
  };

  return statusMap[apiStatus] || 'Processing';
};

// Map display status back to API status codes
const mapStatusToApi = (displayStatus: OrderStatus): string => {
  const statusMap: {[key: string]: string} = {
    Pending: 'O',
    Processing: 'P',
    Completed: 'C',
    Failed: 'F',
    Cancelled: 'I',
    Declined: 'D',
    Shipped: 'B',
  };

  return statusMap[displayStatus] || 'P';
};

const OrderDetail: React.FC<OrderDetailProps> = ({route}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeSections, setActiveSections] = useState([]);
  const [printingInvoice, setPrintingInvoice] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    method: 'N/A',
    address: 'N/A',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: 'N/A',
  });

  const {orderDetails, loading, error, updatingStatus, statusUpdateError} =
    useSelector((state: RootState) => state.orderDetails);

  const userId = useSelector(
    (state: RootState) => state.auth.userData?.user_id,
  );

  // Get data from route params
  const params = route?.params || {};
  const orderId = params.orderId;

  // Local state for UI data with fallbacks
  const [orderData, setOrderData] = useState({
    orderNumber: params.orderNumber || orderId || 'N/A',
    orderDate: params.orderDate || new Date().toLocaleDateString(),
    orderTime: params.orderTime || new Date().toLocaleTimeString(),
    orderImage: params.orderImage || 'https://picsum.photos/202',
    orderName: params.orderName || 'Product',
    orderStatus: params.orderStatus || 'Pending',
  });

  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(
    params.orderStatus || 'Pending',
  );

  const [customerInfo, setCustomerInfo] = useState({
    name: params.orderName || '',
    email: params.orderEmail || '',
    phone: params.orderPhone?.toString() || '',
  });

  const [productInfo, setProductInfo] = useState({
    name: params.orderName || 'Product',
    image: params.orderImage || 'https://picsum.photos/202',
    quantity: params.orderQuantity || 1,
  });

  const [priceInfo, setPriceInfo] = useState({
    total: params.orderPrice || '€0.00',
    subtotal: params.orderPrice || '€0.00',
    shipping: '€0.00',
  });

  // Reset state when component mounts
  useEffect(() => {
    dispatch(resetOrderDetails());
  }, [dispatch]);

  // Fetch order details when component mounts
  useEffect(() => {
    if (userId && orderId) {
      console.log('OrderDetail - Fetching order details:', {userId, orderId});
      dispatch(fetchOrderDetails({userId, orderId}));
    }
  }, [dispatch, userId, orderId]);

  // Update local state when orderDetails changes
  useEffect(() => {
    if (orderDetails) {
      // Get the first product information if available
      const firstProduct =
        orderDetails.products && orderDetails.products.length > 0
          ? orderDetails.products[0]
          : null;

      // Update product info
      setProductInfo({
        name: firstProduct?.product || params.orderName || 'Product',
        image:
          firstProduct?.image_url ||
          params.orderImage ||
          'https://picsum.photos/202',
        quantity: firstProduct?.amount || params.orderQuantity || 1,
      });

      // Update order data
      setOrderData({
        orderNumber:
          orderDetails.order_number ||
          orderDetails.order_id ||
          orderId ||
          'N/A',
        orderDate:
          params.orderDate ||
          orderDetails.formattedDate ||
          new Date().toLocaleDateString(),
        orderTime:
          params.orderTime ||
          orderDetails.formattedTime ||
          new Date().toLocaleTimeString(),
        orderImage:
          firstProduct?.image_url ||
          params.orderImage ||
          'https://picsum.photos/202',
        orderName: firstProduct?.product || params.orderName || 'Product',
        orderStatus:
          mapStatusToDisplay(orderDetails.status) ||
          params.orderStatus ||
          'Pending',
      });

      // Update customer information
      setCustomerInfo({
        name:
          `${orderDetails.firstname || ''} ${
            orderDetails.lastname || ''
          }`.trim() ||
          orderDetails.customer?.name ||
          params.orderName ||
          'Customer',
        email:
          orderDetails.email ||
          orderDetails.customer?.email ||
          params.orderEmail ||
          '',
        phone:
          orderDetails.phone ||
          orderDetails.customer?.phone ||
          params.orderPhone?.toString() ||
          '',
      });

      // Update pricing information
      setPriceInfo({
        total: orderDetails.total || params.orderPrice || '€0.00',
        subtotal:
          orderDetails.subtotal ||
          orderDetails.total ||
          params.orderPrice ||
          '€0.00',
        shipping: orderDetails.shipping_cost
          ? `€${orderDetails.shipping_cost}`
          : '€0.00',
      });

      // Extract shipping information
      let shippingMethod = 'N/A';
      let shippingAddress = 'N/A';

      // Get shipping method
      if (orderDetails.shipping_name) {
        shippingMethod = orderDetails.shipping_name;
      } else if (
        orderDetails.shipping &&
        Array.isArray(orderDetails.shipping) &&
        orderDetails.shipping.length > 0
      ) {
        const firstShipping = orderDetails.shipping[0];
        shippingMethod = firstShipping.shipping || 'N/A';
        if (firstShipping.delivery_time) {
          shippingMethod += ` (${firstShipping.delivery_time})`;
        }
      }

      // Get shipping address
      if (orderDetails.customer_address) {
        const addressLines = [
          orderDetails.customer_address.line_1,
          orderDetails.customer_address.line_2,
          orderDetails.customer_address.line_3,
          orderDetails.customer_address.line_4,
        ].filter(line => line && line.trim() !== '');

        if (addressLines.length > 0) {
          shippingAddress = addressLines.join('\n');
        }
      } else {
        const addressParts = [];
        if (orderDetails.s_address) addressParts.push(orderDetails.s_address);
        if (orderDetails.s_address_2)
          addressParts.push(orderDetails.s_address_2);
        if (orderDetails.s_city) addressParts.push(orderDetails.s_city);
        if (orderDetails.s_zipcode) addressParts.push(orderDetails.s_zipcode);
        if (orderDetails.s_country_descr)
          addressParts.push(orderDetails.s_country_descr);

        if (addressParts.length > 0) {
          shippingAddress = addressParts.join(', ');
        }
      }

      setShippingInfo({
        method: shippingMethod,
        address: shippingAddress,
      });

      // Extract payment information
      let paymentMethod = 'N/A';

      if (orderDetails.payment_name) {
        paymentMethod = orderDetails.payment_name
          .replace('.tpl', '')
          .replace(/_/g, ' ')
          .toUpperCase();
      } else if (
        orderDetails.payment_method &&
        orderDetails.payment_method.payment
      ) {
        paymentMethod = orderDetails.payment_method.payment
          .replace('.tpl', '')
          .replace(/_/g, ' ')
          .toUpperCase();
      }

      setPaymentInfo({
        method: paymentMethod,
      });

      // Update current status
      setCurrentStatus(
        mapStatusToDisplay(orderDetails.status) ||
          params.orderStatus ||
          'Pending',
      );
    }
  }, [orderDetails, params]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      if (statusUpdateError) {
        dispatch(clearStatusUpdateError());
      }
    };
  }, [statusUpdateError, dispatch]);

  // Handle status change
  const handleStatusChange = async (newStatus: OrderStatus) => {
    try {
      console.log('OrderDetail - Status change to:', newStatus);

      if (!userId) {
        console.error('No userId available for status update');
        return;
      }

      const apiStatus = mapStatusToApi(newStatus);
      const res = await dispatch(
        updateOrderStatusDetails({
          userId,
          orderId: orderId!,
          status: apiStatus,
        }),
      ).unwrap();

      const updatedStatus = convertOrderStatus(res.newStatus);
      showStatusToast(updatedStatus);

      setCurrentStatus(newStatus);
      console.log('OrderDetail - Status updated successfully');
    } catch (error: any) {
      console.error('OrderDetail - Failed to update status:', error);
    }
  };

  // SELF-CONTAINED INVOICE FUNCTION - No external dependencies!
  const handlePrintInvoice = async () => {
    console.log('Print Invoice button pressed');

    // Validate data
    if (!orderData.orderNumber || orderData.orderNumber === 'N/A') {
      Alert.alert(
        'Error',
        'Order information is not available yet. Please wait.',
        [{text: 'OK'}],
      );
      return;
    }

    setPrintingInvoice(true);

    try {
      // Create invoice text - Simple format without special characters
      const invoiceText = `
========================================
         INVOICE - SELLER HUB
========================================

Order Number: ${orderData.orderNumber}
Date: ${orderData.orderDate}
Time: ${orderData.orderTime}

========================================
CUSTOMER DETAILS
========================================

Name: ${customerInfo.name}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone}

========================================
SHIPPING DETAILS
========================================

Method: ${shippingInfo.method}
Address: ${shippingInfo.address}

========================================
ORDER ITEMS
========================================

Product: ${productInfo.name}
Quantity: ${productInfo.quantity}
Unit Price: ${priceInfo.subtotal}

========================================
PAYMENT SUMMARY
========================================

Subtotal:          ${priceInfo.subtotal}
Shipping:          ${priceInfo.shipping}
Order Discount:    EUR 0.00
VAT (12%):         EUR 0.00
Payment Surcharge: EUR 0.00

----------------------------------------
TOTAL:             ${priceInfo.total}
========================================

PAYMENT METHOD
${paymentInfo.method}

========================================

Thank you for your business!

Surf Seller Hub
Made in Malta
Copyright ${new Date().getFullYear()}

For queries: support@surf.mt
Phone: +356 9282 9128

========================================
      `.trim();

      console.log('Invoice text prepared');

      // Show share dialog
      await Share.share({
        title: `Invoice ${orderData.orderNumber}`,
        message: invoiceText,
      });

      console.log('Share completed');
    } catch (error: any) {
      console.error('Error sharing invoice:', error);

      // Only show error if user didn't cancel
      if (error.message && !error.message.toLowerCase().includes('cancel')) {
        Alert.alert('Error', 'Failed to share invoice. Please try again.', [
          {text: 'OK'},
        ]);
      }
    } finally {
      setPrintingInvoice(false);
    }
  };

  // Define accordion sections data
  const SECTIONS = [
    {
      title: 'Customer details',
      content: (
        <View style={styles.accordionContent}>
          <View style={styles.row}>
            <Typography
              text="Name"
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={styles.label}
            />
            <Typography
              text={customerInfo.name || 'N/A'}
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={styles.value}
            />
          </View>
          <View style={styles.row}>
            <Typography
              text="Email"
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={styles.label}
            />
            <Typography
              text={customerInfo.email || 'N/A'}
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={styles.value}
            />
          </View>
          <View style={styles.row}>
            <Typography
              text="Phone"
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={styles.label}
            />
            <Typography
              text={customerInfo.phone || 'N/A'}
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={styles.value}
            />
          </View>
        </View>
      ),
    },
    {
      title: 'Shipping details',
      content: (
        <View style={styles.accordionContent}>
          <View style={styles.row}>
            <Typography
              text="Method"
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={styles.label}
            />
            <Typography
              text={shippingInfo.method}
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={styles.value}
            />
          </View>
          <View style={styles.row}>
            <Typography
              text="Address"
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={styles.label}
            />
            <Typography
              text={shippingInfo.address}
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={[styles.value, {flexShrink: 1}]}
              numberOfLines={0}
            />
          </View>
        </View>
      ),
    },
    {
      title: 'Payment details',
      content: (
        <View style={styles.accordionContent}>
          <View style={styles.row}>
            <Typography
              text="Method"
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={styles.label}
            />
            <Typography
              text={paymentInfo.method}
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={styles.value}
            />
          </View>
        </View>
      ),
    },
    {
      title: 'Coupon code',
      content: (
        <View style={styles.accordionContent}>
          <Typography
            text="AO877AW"
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
          />
        </View>
      ),
    },
  ];

  const _renderHeader = (section: any, index: number, isActive: boolean) => {
    return (
      <View>
        {index > 0 && (
          <View
            style={{
              height: 1,
              backgroundColor: ColorPalette.GREY_200,
            }}
          />
        )}
        <View style={styles.accordionHeader}>
          <Typography
            text={section.title}
            variant={TypographyVariant.LMEDIUM_BOLD}
          />
          <ChevronDownIcon
            style={{
              transform: [{rotate: isActive ? '180deg' : '0deg'}],
            }}
            size={24}
          />
        </View>
      </View>
    );
  };

  const _renderContent = (section: any) => {
    return section.content;
  };

  const _updateSections = (activeSections: any) => {
    setActiveSections(activeSections);
  };

  // Helper function to determine status color
  const getStatusColor = (status: OrderStatus): string => {
    const statusColorMap: {[key: string]: string} = {
      Pending: '#ff9522',
      Processing: '#97cf4d',
      Completed: '#1FC16B',
      Failed: '#ff5215',
      Cancelled: '#c2c2c2',
      Declined: '#ff5215',
      Shipped: '#28abf6',
    };

    return statusColorMap[status] || ColorPalette.PURPLE_300;
  };

  // Show loading spinner
  if (loading && !orderData.orderNumber) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <Header
          name="Order summary"
          variant={TypographyVariant.LMEDIUM_BOLD}
          textColor={ColorPalette.AgreeTerms}
          leftIcon={<ArrowLeft style={undefined} size={18} onPress={goBack} />}
          rightIcons={[
            {
              isBadge: true,
              text: 'Chat With Us',
              badgeType: BadgeType.PRIMARY,
              badgeVariant: BadgeVariant.FILLED,
              onPress: () => {
                navigate('Dashboard', {
                  screen: 'Account',
                  params: {screen: 'ChatScreen'},
                });
              },
              customContainerStyle: {
                borderRadius: Spacing.Small,
                paddingVertical: getScreenHeight(1.2),
                paddingHorizontal: getScreenWidth(3),
                shadowColor: '#101828',
                shadowOffset: {width: 0, height: 6},
                shadowOpacity: 0.08,
                shadowRadius: 15,
                elevation: 6,
              },
              textVariant: TypographyVariant.PMEDIUM_SEMIBOLD,
              leftIcon: ChatIcon,
              iconSize: 24,
            },
          ]}
        />
        <View
          style={[
            styles.mainContainer,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <AnimatedLoader size={52} />
          <Typography
            text="Loading Order Details..."
            variant={TypographyVariant.PSMALL_MEDIUM}
            customTextStyles={{
              color: ColorPalette.PRIMARY_GRADIENT_SELLER.colors[0],
              marginTop: getScreenHeight(1),
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name="Order summary"
        variant={TypographyVariant.LMEDIUM_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={<ArrowLeft style={undefined} size={18} onPress={goBack} />}
        rightIcons={[
          {
            isBadge: true,
            text: 'Chat With Us',
            badgeType: BadgeType.PRIMARY,
            badgeVariant: BadgeVariant.FILLED,
            onPress: () => {
              navigate('Dashboard', {
                screen: 'Account',
                params: {screen: 'ChatScreen'},
              });
            },
            customContainerStyle: {
              borderRadius: Spacing.Small,
              paddingVertical: getScreenHeight(1.5),
              paddingHorizontal: getScreenWidth(3),
              shadowColor: '#101828',
              shadowOffset: {width: 0, height: 6},
              shadowOpacity: 0.08,
              shadowRadius: 15,
              elevation: 6,
            },
            textVariant: TypographyVariant.PMEDIUM_SEMIBOLD,
            leftIcon: ChatIcon,
            iconSize: 24,
          },
        ]}
      />

      {error && (
        <View
          style={{
            backgroundColor: '#FFECB3',
            padding: 12,
            marginHorizontal: 16,
            marginTop: 8,
            borderRadius: 8,
          }}>
          <Typography
            text={`Note: ${error}. Showing available data.`}
            variant={TypographyVariant.PSMALL_MEDIUM}
            customTextStyles={{color: '#856404'}}
          />
        </View>
      )}

      {statusUpdateError && (
        <View
          style={{
            backgroundColor: '#FFEBEE',
            padding: 12,
            marginHorizontal: 16,
            marginTop: 8,
            borderRadius: 8,
          }}>
          <Typography
            text={`Error updating status: ${statusUpdateError}`}
            variant={TypographyVariant.PSMALL_MEDIUM}
            customTextStyles={{color: '#C62828'}}
          />
        </View>
      )}

      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingTop: getScreenHeight(1.2)},
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.orderCard}>
            <View style={styles.headerContainer}>
              <View style={{gap: getScreenHeight(0.5)}}>
                <Typography
                  text={`Order #${orderData.orderNumber}`}
                  variant={TypographyVariant.H5_BOLD}
                  customTextStyles={styles.orderNumberText}
                />
                <Typography
                  text={`${orderData.orderDate} • ${orderData.orderTime}`}
                  variant={TypographyVariant.LMEDIUM_REGULAR}
                  customTextStyles={styles.dateTimeText}
                />
              </View>
            </View>

            <View style={styles.totalRow}>
              <Typography
                text="Admin"
                variant={TypographyVariant.LMEDIUM_MEDIUM}
                customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
              />
              <Typography
                text={'+356 9282 9128'}
                variant={TypographyVariant.LMEDIUM_REGULAR}
                customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
              />
            </View>
          </View>

          <View style={styles.productCard}>
            <View style={styles.productRow}>
              <View style={styles.imageContainer}>
                <Image
                  source={{uri: productInfo.image}}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.productInfo}>
                <Typography
                  text={productInfo.name}
                  variant={TypographyVariant.PSMALL_MEDIUM}
                  customTextStyles={{
                    color: ColorPalette.GREY_TEXT_500,
                    flexWrap: 'wrap',
                    width: '100%',
                  }}
                  numberOfLines={0}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: getScreenWidth(1),
                    width: '100%',
                  }}>
                  <Typography
                    text="Quantity: "
                    variant={TypographyVariant.LMEDIUM_MEDIUM}
                    customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
                  />
                  <Typography
                    text={productInfo.quantity.toString()}
                    variant={TypographyVariant.LSMALL_BOLD}
                    customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: getScreenWidth(1),
                    width: '100%',
                  }}>
                  <Typography
                    text="Price: "
                    variant={TypographyVariant.PSMALL_REGULAR}
                    customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
                  />
                  <Typography
                    text={priceInfo.subtotal}
                    variant={TypographyVariant.LSMALL_BOLD}
                    customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
                  />
                </View>
              </View>
            </View>

            <View style={styles.dataContainer}>
              <View style={styles.totalRow}>
                <Typography
                  text="Sub Total"
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
                />
                <Typography
                  text={priceInfo.subtotal}
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
                />
              </View>

              <View style={styles.totalRow}>
                <Typography
                  text="Shipping"
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
                />
                <Typography
                  text={priceInfo.shipping}
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
                />
              </View>

              <View style={styles.totalRow}>
                <Typography
                  text="Order Discount"
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
                />
                <Typography
                  text={'0'}
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
                />
              </View>

              <View style={styles.totalRow}>
                <Typography
                  text="VAT (12% included)"
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
                />
                <Typography
                  text={'0'}
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
                />
              </View>

              <View style={styles.totalRow}>
                <Typography
                  text="Payment Surcharge"
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
                />
                <Typography
                  text={'0'}
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
                />
              </View>

              <View style={styles.totalRow}>
                <Typography
                  text="Total:"
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
                />
                <Typography
                  text={priceInfo.total}
                  variant={TypographyVariant.H6_BOLD}
                  customTextStyles={{color: ColorPalette.Black}}
                />
              </View>
            </View>
          </View>

          <View style={styles.downContainer}>
            <Accordion
              sections={SECTIONS}
              activeSections={activeSections}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={_updateSections}
              expandMultiple={true}
              underlayColor="transparent"
              containerStyle={styles.accordionContainer}
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Badge
            text={printingInvoice ? 'Generating...' : 'Print Invoice'}
            type={BadgeType.PRIMARY}
            variant={BadgeVariant.OUTLINE}
            onPress={handlePrintInvoice}
            disabled={printingInvoice}
            customContainerStyle={{
              borderColor: ColorPalette.ProgressLine,
              borderRadius: Spacing.XSmall,
              paddingVertical: getScreenHeight(2),
              paddingHorizontal: getScreenWidth(3),
              width: '100%',
              opacity: printingInvoice ? 0.6 : 1,
            }}
            textVariant={TypographyVariant.LMEDIUM_MEDIUM}
            customTextColor={ColorPalette.ProgressLine}
            leftIcon={PrintIcon}
            iconSize={16}
          />

          <Badge
            text={updatingStatus ? 'Updating...' : currentStatus}
            variant={BadgeVariant.FILLED}
            type={BadgeType.PRIMARY}
            onPress={() => !updatingStatus && setIsModalVisible(true)}
            customContainerStyle={{
              width: '100%',
              paddingVertical: getScreenHeight(2),
              paddingHorizontal: getScreenHeight(2),
              backgroundColor: updatingStatus
                ? ColorPalette.GREY_300
                : getStatusColor(currentStatus),
              opacity: updatingStatus ? 0.7 : 1,
            }}
            textVariant={TypographyVariant.LMEDIUM_MEDIUM}
            rightIcon={!updatingStatus ? ArrowDownIcon : undefined}
            disabled={updatingStatus}
          />
        </View>

        <StatusModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSubmit={status => {
            handleStatusChange(status as OrderStatus);
            setIsModalVisible(false);
          }}
          showSearch={false}
          initialStatus={currentStatus}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderDetail;
