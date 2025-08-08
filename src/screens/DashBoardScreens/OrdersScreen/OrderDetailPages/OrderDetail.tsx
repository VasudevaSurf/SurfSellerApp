import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
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
import {goBack} from '../../../../navigation/utils/navigationRef';
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

  console.log('OrderDetail - Mounted with params:', {
    orderId,
    userId,
    hasRouteParams: !!route?.params,
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
      console.log('OrderDetail - Updating local state with API data');

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

      // Update order data - prefer route params for consistency with OrderScreen
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
      await dispatch(
        updateOrderStatusDetails({
          userId,
          orderId: orderId!,
          status: apiStatus,
        }),
      ).unwrap();

      setCurrentStatus(newStatus);
      console.log('OrderDetail - Status updated successfully');
    } catch (error: any) {
      console.error('OrderDetail - Failed to update status:', error);
      // Error handling is managed by Redux state
    }
  };

  // Handle print invoice action
  const handlePrintInvoice = () => {
    console.log('OrderDetail - Print invoice clicked');
    // Add your print functionality here
  };

  // Define accordion sections data
  const SECTIONS = [
    {
      title: 'Customer Information',
      content: (
        <View style={styles.accordionContent}>
          <Typography
            text={`Name: ${customerInfo.name || 'N/A'}`}
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={{
              color: ColorPalette.GREY_TEXT_300,
              marginBottom: 8,
            }}
          />
          <Typography
            text={`Email: ${customerInfo.email || 'N/A'}`}
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={{
              color: ColorPalette.GREY_TEXT_300,
              marginBottom: 8,
            }}
          />
          <Typography
            text={`Phone: ${customerInfo.phone || 'N/A'}`}
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
          />
        </View>
      ),
    },
    {
      title: 'Billing Address',
      content: (
        <View style={styles.accordionContent}>
          <Typography
            text="Address information not available in current API response"
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
          />
        </View>
      ),
    },
    {
      title: 'Payment Information',
      content: (
        <View style={styles.accordionContent}>
          <Typography
            text="Payment information not available in current API response"
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
      Completed: '#97cf4d',
      Failed: '#ff5215',
      Cancelled: '#c2c2c2',
      Declined: '#ff5215',
      Shipped: '#28abf6',
    };

    return statusColorMap[status] || ColorPalette.PURPLE_300;
  };

  // Show loading spinner while initial data fetching completes
  if (loading && !orderData.orderNumber) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <Header
          name="Order summary"
          variant={TypographyVariant.LMEDIUM_BOLD}
          textColor={ColorPalette.AgreeTerms}
          leftIcon={<ArrowLeft style={undefined} size={16} onPress={goBack} />}
        />
        <View
          style={[
            styles.mainContainer,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <ActivityIndicator size="large" color={ColorPalette.PURPLE_300} />
          <Typography
            text="Loading order details..."
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={{
              color: ColorPalette.GREY_TEXT_300,
              marginTop: 16,
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
        leftIcon={<ArrowLeft style={undefined} size={16} onPress={goBack} />}
        rightIcons={[
          {
            isBadge: true,
            text: 'Print Invoice',
            badgeType: BadgeType.PRIMARY,
            badgeVariant: BadgeVariant.OUTLINE,
            onPress: handlePrintInvoice,
            customContainerStyle: {
              borderColor: ColorPalette.ProgressLine,
              borderRadius: Spacing.XXXLarge,
              paddingVertical: getScreenHeight(1.5),
              paddingHorizontal: getScreenWidth(3),
            },
            textVariant: TypographyVariant.LMEDIUM_MEDIUM,
            customTextColor: ColorPalette.PURPLE_300,
            leftIcon: PrintIcon,
            iconSize: 16,
          },
        ]}
      />

      {/* Show warning for API errors while still displaying data */}
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

      {/* Show status update error if any */}
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
            {paddingTop: getScreenHeight(2)},
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.productCard}>
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
                    variant={TypographyVariant.PSMALL_REGULAR}
                    customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
                  />
                  <Typography
                    text={productInfo.quantity.toString()}
                    variant={TypographyVariant.LSMALL_BOLD}
                    customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
                  />
                </View>
              </View>
            </View>

            <View style={styles.dataContainer}>
              <View style={styles.totalRow}>
                <Typography
                  text="Sub Total:"
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
                />
                <Typography
                  text={priceInfo.subtotal}
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
                />
              </View>

              <View style={styles.totalRow}>
                <Typography
                  text="Shipping Cost:"
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
                />
                <Typography
                  text={priceInfo.shipping}
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
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
              expandMultiple={false}
              underlayColor="transparent"
              containerStyle={styles.accordionContainer}
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Typography
            text="Order Status:"
            variant={TypographyVariant.PSMALL_MEDIUM}
            customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
          />
          <Badge
            text={updatingStatus ? 'Updating...' : currentStatus}
            variant={BadgeVariant.FILLED}
            type={BadgeType.PRIMARY}
            onPress={() => !updatingStatus && setIsModalVisible(true)}
            customContainerStyle={{
              paddingVertical: getScreenHeight(1.5),
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
