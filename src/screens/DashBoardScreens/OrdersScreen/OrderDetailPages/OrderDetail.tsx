import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  getFigmaDimension,
  getScreenHeight,
} from '../../../../helpers/screenSize';
import ArrowLeftIcon from '../../../../assets/icons/ArrowLeftIcon';
import {goBack} from '../../../../navigation/utils/navigationRef';
import {TypographyVariant} from '../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../config/colorPalette';
import {Header} from '../../../../components/UserComponents/Header/Header';
import {Typography} from '../../../../components/UserComponents/Typography/Typography';
import ChevronDownIcon from '../../../../assets/icons/ArrowDownIcon';
import {OrderDetailProps} from './OrderDetail.types';
import {styles} from './OrderDetail.styles';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
} from '../../../../components/UserComponents/Button';
import Accordion from 'react-native-collapsible/Accordion';

const OrderDetail: React.FC<OrderDetailProps> = ({route}) => {
  const orderData = route?.params || {
    orderName: 'Lunar Whisper | 75ml | Velvet Bloom Collection',
    orderImage: 'https://picsum.photos/202',
    orderPrice: '495.00',
    orderNumber: 172,
    orderDate: '10 Jul 2024',
    orderStatus: 'Completed',
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
          {/* Customer information content would go here */}
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

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name="Order details"
        variant={TypographyVariant.LMEDIUM_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={
          <ArrowLeftIcon style={undefined} size={15} onPress={goBack} />
        }
        rightIcons={null}
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
                  variant={TypographyVariant.LMEDIUM_BOLD}
                  customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
                  numberOfLines={2}
                />
                <View style={styles.priceContainer}>
                  <View style={styles.priceContainerOne}>
                    <Typography
                      text="Your Price:"
                      variant={TypographyVariant.LXSMALL_REGULAR}
                      customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
                    />
                    <Typography
                      text={`€${orderData.orderPrice}`}
                      variant={TypographyVariant.LMEDIUM_BOLD}
                      customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
                    />
                  </View>
                  <View style={styles.priceContainerOne}>
                    <Typography
                      text="Surf Price:"
                      variant={TypographyVariant.LXSMALL_REGULAR}
                      customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
                    />
                    <Typography
                      text={`€${orderData.orderPrice}`}
                      variant={TypographyVariant.LMEDIUM_BOLD}
                      customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
                    />
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: getFigmaDimension(4),
                  }}>
                  <Typography
                    text="Inventory: "
                    variant={TypographyVariant.LSMALL_REGULAR}
                    customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
                  />
                  <Typography
                    text={inventory}
                    variant={TypographyVariant.LSMALL_BOLD}
                    customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
                  />
                </View>
              </View>
            </View>

            <View style={styles.dataContainer}>
              <View style={styles.totalRow}>
                <Typography
                  text="Date:"
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.DataText}}
                />
                <Typography
                  text={orderData.orderDate}
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.DataText}}
                />
              </View>

              <View style={styles.totalRow}>
                <Typography
                  text="Sub Total:"
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.DataText}}
                />
                <Typography
                  text={subTotal}
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.DataText}}
                />
              </View>

              <View style={styles.totalRow}>
                <Typography
                  text="Shipping Cost:"
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.DataText}}
                />
                <Typography
                  text={shippingCost}
                  variant={TypographyVariant.PMEDIUM_REGULAR}
                  customTextStyles={{color: ColorPalette.DataText}}
                />
              </View>

              <View style={styles.totalRow}>
                <Typography
                  text="Total:"
                  variant={TypographyVariant.H6_BOLD}
                  customTextStyles={{color: ColorPalette.Black}}
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
            <Button
              text="Print Invoice"
              state={ButtonState.DEFAULT}
              size={ButtonSize.MEDIUM}
              type={ButtonType.OUTLINED}
              customStyles={{
                borderWidth: 1,
                borderColor: ColorPalette.GREY_TEXT_400,
              }}
              customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
            />
            <Button
              text="Completed"
              state={ButtonState.DEFAULT}
              size={ButtonSize.MEDIUM}
              type={ButtonType.PRIMARY}
              bgColor={ColorPalette.Green_200}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrderDetail;
