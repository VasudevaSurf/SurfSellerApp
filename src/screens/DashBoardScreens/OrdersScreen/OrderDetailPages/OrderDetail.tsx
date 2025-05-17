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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {
  fetchOrderDetails,
  updateOrderStatus,
} from '../../../../redux/slices/orderDetailsSlice';

const OrderDetail: React.FC<OrderDetailProps> = ({route}) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {orderDetails, loading, error} = useSelector(
    (state: RootState) => state.orderDetails,
  );

  const userId = useSelector(
    (state: RootState) => state.auth.userData?.user_id,
  );

  // Get data from route params
  const params = route?.params || {};
  const orderId = params.orderId;

  // Local state for UI while data is loading
  const [currentStatus, setCurrentStatus] = useState(
    params.orderStatus || 'Pending',
  );
  const [inventory, setInventory] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    name: params.orderName || '',
    email: params.orderEmail || '',
    phone: params.orderPhone || '',
  });
  const [productName, setProductName] = useState(params.orderName || 'Product');
  const [productImage, setProductImage] = useState(
    params.orderImage || 'https://picsum.photos/202',
  );
  const [subTotal, setSubTotal] = useState(params.orderPrice || '€0.00');
  const [shippingCost, setShippingCost] = useState('€0.00');
  const [totalPrice, setTotalPrice] = useState(params.orderPrice || '€0.00');
  const [orderData, setOrderData] = useState({
    orderNumber: params.orderNumber || orderId,
    orderDate: params.orderDate || new Date().toLocaleDateString(),
    orderTime: params.orderTime || new Date().toLocaleTimeString(),
    orderImage: params.orderImage || 'https://picsum.photos/202',
    orderName: params.orderName || 'Product',
    orderStatus: params.orderStatus || 'Pending',
  });

  // Log for debugging
  useEffect(() => {
    console.log(
      'OrderDetail - Mounted with params:',
      JSON.stringify(params, null, 2),
    );
    console.log('OrderDetail - User ID:', userId);
    console.log('OrderDetail - Order ID:', orderId);
  }, [params, userId, orderId]);

  // Format price consistently
  const formatPrice = (price: any): string => {
    if (!price) return '€0.00';

    // If it's already a string with Euro symbol
    if (typeof price === 'string' && price.startsWith('€')) {
      return price;
    }

    // If it's a number or a string number
    return `€${price}`;
  };

  useEffect(() => {
    // Only fetch if we have both userID and orderID
    if (userId && orderId) {
      dispatch(fetchOrderDetails({userId, orderId}) as any);
    }
  }, [dispatch, userId, orderId]);

  // Update local state when orderDetails changes
  useEffect(() => {
    if (orderDetails) {
      // Get the first product information if available
      let firstProduct = null;
      if (orderDetails.products && orderDetails.products.length > 0) {
        firstProduct = orderDetails.products[0];
        setProductName(firstProduct.product || params.orderName || 'Product');
        setProductImage(
          firstProduct.image_url ||
            params.orderImage ||
            'https://picsum.photos/202',
        );
        setInventory(firstProduct.amount || 1);
      }

      // Important - use the date/time that came from the route params if available
      // This ensures consistency with the OrderScreen
      const orderDate =
        params.orderDate ||
        orderDetails.formattedDate ||
        orderDetails.timestamp;
      const orderTime = params.orderTime || orderDetails.formattedTime;

      // Set order data with preference for the route params (for consistency)
      setOrderData({
        orderNumber:
          orderDetails.order_number || orderDetails.order_id || orderId,
        orderDate: orderDate,
        orderTime: orderTime,
        orderImage: productImage,
        orderName: productName,
        orderStatus:
          mapStatusToDisplay(orderDetails.status) ||
          params.orderStatus ||
          'Pending',
      });

      // Set customer information
      setCustomerInfo({
        name:
          `${orderDetails.firstname || ''} ${
            orderDetails.lastname || ''
          }`.trim() ||
          orderDetails.customer?.name ||
          params.orderName ||
          '',
        email:
          orderDetails.email ||
          orderDetails.customer?.email ||
          params.orderEmail ||
          '',
        phone:
          orderDetails.phone ||
          orderDetails.customer?.phone ||
          params.orderPhone ||
          '',
      });

      // Set pricing information, ensuring consistent format
      setTotalPrice(formatPrice(orderDetails.total));
      setSubTotal(formatPrice(orderDetails.subtotal || orderDetails.total));
      setShippingCost(formatPrice(orderDetails.shipping_cost || '0.00'));

      // Set current status using the same mapping as OrderScreen
      setCurrentStatus(
        mapStatusToDisplay(
          orderDetails.status || params.orderStatus || 'Pending',
        ),
      );
    }
  }, [orderDetails, params]);

  const mapStatusToDisplay = (apiStatus: string): string => {
    // Use the same mapping as in OrderScreen for consistency
    const statusMap: {[key: string]: string} = {
      O: 'Pending',
      P: 'Processing',
      C: 'Completed',
      F: 'Failed',
      I: 'Cancelled',
      D: 'Declined',
      B: 'Shipping',
      Y: 'Processing',
      A: 'Processing',
    };

    return statusMap[apiStatus] || apiStatus || 'Processing';
  };

  const [activeSections, setActiveSections] = useState([]);

  // Define accordion sections data using real customer data
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

  const _renderHeader = (section, index, isActive) => {
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

  // Render content for accordion
  const _renderContent = section => {
    return section.content;
  };

  // Handle change of accordion sections
  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  // Handle print invoice action
  const handlePrintInvoice = () => {
    console.log('Print invoice clicked');
    // Add your print functionality here
  };

  // Handle status change
  const handleStatusChange = newStatus => {
    setCurrentStatus(newStatus);
    console.log('Status changed to:', newStatus);

    // Update the status in Redux
    if (orderDetails) {
      // Convert display status back to API status code
      const apiStatusCode =
        Object.keys(statusMap).find(key => statusMap[key] === newStatus) || 'P'; // Default to Processing if not found

      dispatch(updateOrderStatus(apiStatusCode));

      // Here you would add an API call to update the status in the backend
    }
  };

  // Status mapping for conversion between display and API values
  const statusMap = {
    O: 'Pending',
    P: 'Processing',
    C: 'Completed',
    F: 'Failed',
    I: 'Cancelled',
    D: 'Declined',
    B: 'Shipping',
    Y: 'Processing',
    A: 'Processing',
  };

  // Show loading spinner while initial data fetching completes
  if (loading && !orderData) {
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
          <ActivityIndicator size="large" color={ColorPalette.PRIMARY_500} />
        </View>
      </SafeAreaView>
    );
  }

  // Only show error screen if there is no data at all to display
  if (error && !orderData) {
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
            {justifyContent: 'center', alignItems: 'center', padding: 20},
          ]}>
          <Typography
            text={error || 'Could not load order details'}
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={{color: ColorPalette.ERROR}}
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
            customTextColor: ColorPalette.PRIMARY_500,
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
            text={`Note: Using limited data. ${error}`}
            variant={TypographyVariant.PSMALL_MEDIUM}
            customTextStyles={{color: '#856404'}}
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
                  source={{uri: productImage}}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.productInfo}>
                <Typography
                  text={productName}
                  variant={TypographyVariant.PSMALL_MEDIUM}
                  customTextStyles={{
                    color: ColorPalette.GREY_TEXT_500,
                    flexWrap: 'wrap',
                    width: '100%',
                  }}
                  numberOfLines={0} // Force text to break regardless of width
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
                    text={inventory.toString()}
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
                  text={subTotal}
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
                  text={shippingCost}
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
                  text={totalPrice}
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

          <View style={styles.buttonContainer}>
            <Typography
              text="Order Status:"
              variant={TypographyVariant.PSMALL_MEDIUM}
              customTextStyles={ColorPalette.GREY_TEXT_100}
            />
            <Badge
              text={currentStatus}
              variant={BadgeVariant.FILLED}
              type={BadgeType.PRIMARY}
              onPress={() => setIsModalVisible(true)}
              customContainerStyle={{
                paddingVertical: getScreenHeight(1.5),
                paddingHorizontal: getScreenHeight(2),
                backgroundColor: getStatusColor(currentStatus),
              }}
              textVariant={TypographyVariant.LMEDIUM_MEDIUM}
              rightIcon={ArrowDownIcon}
            />
          </View>
        </ScrollView>
        <StatusModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleStatusChange}
          showSearch={false}
          initialStatus={currentStatus}
        />
      </View>
    </SafeAreaView>
  );
};

// Helper function to determine status color based on status
const getStatusColor = (status: string): string => {
  const statusColorMap: {[key: string]: string} = {
    O: '#ff9522', // Pending
    P: '#97cf4d', // Processing
    C: '#97cf4d', // Completed
    F: '#ff5215', // Failed
    I: '#c2c2c2', // Cancelled
    D: '#ff5215', // Declined
    B: '#28abf6', // Shipping
    Y: '#cc4125', // Awaiting call
    A: '#dcdcdc', // Fraud checking
    Pending: '#ff9522',
    Processing: '#97cf4d',
    Completed: '#97cf4d',
    Failed: '#ff5215',
    Cancelled: '#c2c2c2',
    Declined: '#ff5215',
    Shipping: '#28abf6',
  };

  return statusColorMap[status] || ColorPalette.Green_200;
};

export default OrderDetail;
