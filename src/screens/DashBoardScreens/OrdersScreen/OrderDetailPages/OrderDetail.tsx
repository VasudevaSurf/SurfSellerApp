import React, {useState} from 'react';
import {Image, SafeAreaView, ScrollView, View} from 'react-native';
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

const OrderDetail: React.FC<OrderDetailProps> = ({route}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('Completed');
  const orderData = route?.params || {
    orderName: 'Lunar Whisper | 75ml | Velvet Bloom Collection',
    orderImage: 'https://picsum.photos/202',
    orderPrice: '495.00',
    orderNumber: 172,
    orderDate: '10 Jul 2024',
    orderStatus: 'Completed',
    orderTime: '10:30 AM',
  };

  const [activeSections, setActiveSections] = useState([]);

  // Calculated values for the example
  const subTotal = '€1,996.00';
  const shippingCost = '€2.50';
  const totalPrice = '€1,998.50';
  const inventory = 11;

  // Define accordion sections data
  const SECTIONS = [
    {
      title: 'Customer Information',
      content: (
        <View style={styles.accordionContent}>
          <Typography
            text="This is customer information section"
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
          {/* Billing address content would go here */}
          <Typography
            text="This is billing address section"
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
          {/* Payment information content would go here */}
          <Typography
            text="This is payment information section"
            variant={TypographyVariant.PMEDIUM_REGULAR}
            customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
          />
        </View>
      ),
    },
  ];

  // Render header for accordion
  const _renderHeader = (section, _, isActive) => {
    return (
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
  };

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
                  source={{uri: orderData.orderImage}}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.productInfo}>
                <Typography
                  text={orderData.orderName}
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
                    text="Inventory: "
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
                backgroundColor: ColorPalette.Green_200,
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

export default OrderDetail;
