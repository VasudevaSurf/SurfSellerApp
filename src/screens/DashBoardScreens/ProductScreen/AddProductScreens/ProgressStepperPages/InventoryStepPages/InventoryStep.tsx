import React, { useState, useEffect, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import CheckIcon from '../../../../../../assets/icons/CheckIcon';
import InfoIconPay from '../../../../../../assets/icons/InfoIconPay';
import ToggleButtons from '../../../../../../components/MainComponents/ToggleButtons/ToggleButtons';
import AnimatedTextInput from '../../../../../../components/UserComponents/TextInput/TextInput';
import { Typography } from '../../../../../../components/UserComponents/Typography/Typography';
import { TypographyVariant } from '../../../../../../components/UserComponents/Typography/Typography.types';
import { ColorPalette } from '../../../../../../config/colorPalette';
import { styles } from './InventoryStep.styles';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../../components/UserComponents/Button';
import PlusIcon from '../../../../../../assets/icons/PlusIcon';
import { BorderRadius, Spacing } from '../../../../../../config/globalStyles';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import {
  BadgeType,
  BadgeVariant,
} from '../../../../../../components/UserComponents/Badges/Badge.types';
import { Badge } from '../../../../../../components/UserComponents/Badges/Badge';
import { TrashIcon2 } from '../../../../../../assets/icons/NewProductIcons/TrashIcon2';
import { AddModal } from '../../../../../../components/MainComponents/AddModal/AddModal';
import Dropdown from '../../../../../../components/MainComponents/DropdownModal/Dropdown';
import Tooltip from '../../../../../../components/MainComponents/Tooltip/Tooltip';

interface InventoryStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  editMode?: boolean;
}

const InventoryStep: React.FC<InventoryStepProps> = ({
  formData,
  updateFormData,
  editMode = false,
}) => {
  const [productCode, setProductCode] = useState('');
  const [qualityStock, setQualityStock] = useState('');
  const [minQuantity, setMinQuantity] = useState('');
  const [maxQuantity, setMaxQuantity] = useState('');
  const [availableQuantity, setAvailableQuantity] = useState('');
  const [trackInventory, setTrackInventory] = useState('yes');
  const [vatChecked, setVatChecked] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<boolean | null>(false);

  const [discounts, setDiscounts] = useState<
    Array<{
      id: number;
      minQty: string;
      maxQty: string;
      discountValue: string;
      discountType: '' | 'Percentage' | 'Absolute';
    }>
  >([]);

  const [nextId, setNextId] = useState(1);
  const [deleteDiscountId, setDeleteDiscountId] = useState<number | null>(null);

  // Pre-fill data if in edit mode
  useEffect(() => {
    if (editMode && formData) {
      setProductCode(formData.productCode || '');
      setQualityStock(formData.quantity || '');
      setMinQuantity(formData.minQuantity || '');
      setMaxQuantity(formData.maxQuantity || '');
      setAvailableQuantity(formData.availableQuantity || '');
      setTrackInventory(formData.trackInventory ? 'yes' : 'no');
      setVatChecked(formData.taxType === 'VAT');
    }
  }, [editMode, formData]);

  // Update form data when values change
  const handleProductCodeChange = (text: string) => {
    setProductCode(text);
    updateFormData({ productCode: text });
  };

  const handleQualityStockChange = (text: string) => {
    setQualityStock(text);
    updateFormData({ quantity: text });
  };

  const handleMinQuantityChange = (text: string) => {
    setMinQuantity(text);
    updateFormData({ minQuantity: text });
  };

  const handleMaxQuantityChange = (text: string) => {
    setMaxQuantity(text);
    updateFormData({ maxQuantity: text });
  };

  const handleAvailableQuantityChange = (text: string) => {
    setAvailableQuantity(text);
    updateFormData({ availableQuantity: text });
  };

  const handleTrackInventoryChange = (value: string) => {
    setTrackInventory(value);
    updateFormData({ trackInventory: value === 'yes' });
  };

  const handleVatChange = (checked: boolean) => {
    setVatChecked(checked);
    updateFormData({ taxType: checked ? 'VAT' : '' });
  };

  const handleAddDiscount = () => {
    setDiscounts(prev => [
      ...prev,
      {
        id: nextId,
        minQty: '',
        maxQty: '',
        discountValue: '',
        discountType: '',
      },
    ]);
    setNextId(prev => prev + 1);
  };

  const handleChangeDiscount = (
    id: number,
    field: 'minQty' | 'maxQty' | 'discountValue',
    value: string,
  ) => {
    setDiscounts(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleDropdownToggle = (isOpen: boolean) => {
    if (isOpen) setActiveDropdown(true);
    else setActiveDropdown(false);
  };

  const handleChangeDiscountType = (
    id: number,
    value: 'Percentage' | 'Absolute',
  ) => {
    setDiscounts(prev =>
      prev.map(d => (d.id === id ? { ...d, discountType: value } : d)),
    );
  };

  const handleDeleteDiscount = (id: number) => {
    setDiscounts(prev => prev.filter(item => item.id !== id));
  };

  const deleteButtons = useMemo(
    () => [
      {
        text: 'Cancel',
        onPress: () => setShowDeleteModal(false),
        variant: ButtonVariant.PRIMARY,
        type: ButtonType.OUTLINED,
        state: ButtonState.DEFAULT,
        size: ButtonSize.MEDIUM,
        customStyles: styles.customButton,
        customTextStyles: styles.customText,
        // textVariant:TypographyVariant.LMEDIUM_SEMIBOLD
      },
      {
        text: 'Delete Item',
        onPress: () => {
          if (deleteDiscountId) {
            handleDeleteDiscount(deleteDiscountId);
            setDeleteDiscountId(null);
          }
          setShowDeleteModal(false);
        },
        variant: ButtonVariant.PRIMARY,
        type: ButtonType.PRIMARY,
        state: ButtonState.DEFAULT,
        size: ButtonSize.MEDIUM,
        bgColor: ColorPalette.RED_100,
        customStyles: styles.customButton,
      },
    ],
    [deleteDiscountId],
  );

  const DISCOUNT_TYPE_OPTIONS = [
    { value: 'Percentage', label: 'Percentage (%)' },
    { value: 'Absolute', label: 'Absolute (€)' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text="Inventory"
            customTextStyles={{ color: ColorPalette.GREY_TEXT_500 }}
          />
          <Tooltip
            target={
              <InfoIconPay
                size={22}
                color={ColorPalette.GREY_TEXT_400}
                style={undefined}
              />
            }
            content={
              <Typography customTextStyles={{
                color: ColorPalette.GREY_TEXT_200,
                paddingVertical: getScreenHeight(0.1)
              }} variant={TypographyVariant.LSMALL_MEDIUM}>
                Quantity of the product currently in stock.              </Typography>
            }
            placement="right"
            containerStyle={{
              width: getScreenWidth(60)
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <AnimatedTextInput
            label="Product code / SKU ID"
            value={productCode}
            onChangeText={handleProductCodeChange}
            keyboardType="default"
          />
          <AnimatedTextInput
            label="Quantity in stock"
            value={qualityStock}
            onChangeText={handleQualityStockChange}
            keyboardType="numeric"
          />
          <AnimatedTextInput
            label="Minimum quantity to buy (Optional)"
            value={minQuantity}
            onChangeText={handleMinQuantityChange}
            keyboardType="numeric"
            required={false}
          />
          <AnimatedTextInput
            label="Maximum quantity to buy (Optional)"
            value={maxQuantity}
            onChangeText={handleMaxQuantityChange}
            keyboardType="numeric"
            required={false}
          />
          <AnimatedTextInput
            label="Number of available quantities"
            value={availableQuantity}
            onChangeText={handleAvailableQuantityChange}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.sectionItem}>
        {/* <View style={styles.textContainer}> */}
        <Typography
          text="Track Inventory"
          variant={TypographyVariant.LMEDIUM_EXTRABOLD}
          customTextStyles={styles.primaryText}
        />
        <Typography
          text="When inventory is tracked, the number of products in stock will decrease after each purchase"
          variant={TypographyVariant.LXSMALL_REGULAR}
          customTextStyles={styles.secondaryText}
        />
        <ToggleButtons
          leftButtonText="Yes"
          rightButtonText="No"
          leftButtonValue="yes"
          rightButtonValue="no"
          initialActiveButton={trackInventory}
          onSelectionChange={handleTrackInventoryChange}
          inactiveBackgroundColor="transparent"
          activeBackgroundColor={ColorPalette.toggleColor}
          inactiveTextColor={ColorPalette.GREY_TEXT_500}
          activeTextColor={ColorPalette.White}
          containerStyle={styles.toggleContainer}
          buttonStyle={styles.toggleButton}
          textStyle={styles.toggleButtonText}
          typographyVariant={TypographyVariant.LMEDIUM_MEDIUM}
        />
        {/* </View> */}
      </View>
      <View style={styles.taxCheckContainer}>
        <Typography
          text="Tax"
          variant={TypographyVariant.LMEDIUM_EXTRABOLD}
          customTextStyles={{ color: ColorPalette.GREY_TEXT_500 }}
        />
        <View style={styles.checkBoxContainer}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => handleVatChange(!vatChecked)}>
            <View
              style={[
                styles.checkbox,
                vatChecked && {
                  backgroundColor: ColorPalette.PURPLE_300,
                },
              ]}>
              {vatChecked && (
                <View style={styles.checkmark}>
                  <CheckIcon size={24} />
                </View>
              )}
            </View>
            <Typography
              text="VAT"
              variant={TypographyVariant.PMEDIUM_REGULAR}
              customTextStyles={{ color: ColorPalette.GREY_TEXT_500 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quantity Discount Section */}
      <View style={styles.section}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: Spacing.Medium,
          }}>
          <View style={styles.sectionHeaderDiscount}>
            <Typography
              variant={TypographyVariant.LMEDIUM_EXTRABOLD}
              text="Quantity Discount"
              customTextStyles={{ color: ColorPalette.GREY_TEXT_500 }}
            />
            <Tooltip
              target={
                <InfoIconPay
                  size={22}
                  color={ColorPalette.GREY_TEXT_400}
                  style={undefined}
                />
              }
              content={
                <Typography customTextStyles={{
                  color: ColorPalette.GREY_TEXT_200,
                  paddingVertical: getScreenHeight(0.1)
                }} variant={TypographyVariant.LSMALL_MEDIUM}>
                  Price reduction offered for bulk purchases.             </Typography>
              }
              placement="bottom"
            />
          </View>
          <Button
            text={discounts.length === 0 ? 'Add' : 'Add More'}
            textVariant={TypographyVariant.H6_MEDIUM}
            customTextStyles={{
              color: ColorPalette.GREY_TEXT_500,
              // paddingLeft: 16,
              // width:
              //   discounts.length === 0
              //     ? getScreenWidth(20)
              //     : getScreenWidth(30),
            }}
            onPress={handleAddDiscount}
            activeOpacity={0.7}
            type={ButtonType.OUTLINED}
            customStyles={{
              // width:
              //   discounts.length === 0
              //     ? getScreenWidth(36)
              //     : getScreenWidth(46),
              height: getScreenWidth(12),
              borderRadius: BorderRadius.Small,
              // justifyContent: 'center',
              // alignItems: 'center',
              borderWidth: 1,
              borderColor: ColorPalette.GREY_TEXT_500,
              ...(discounts.length === 0
                ? {
                  paddingLeft: getScreenWidth(8),
                  paddingRight: getScreenWidth(6),
                }
                : {
                  paddingLeft: getScreenWidth(6),
                  paddingRight: getScreenWidth(4),
                }),

            }}
            IconComponent={PlusIcon}
            iconProps={{
              size: 28,
              color: ColorPalette.GREY_TEXT_400,
              strokeWidth: 1.5,
            }}
            iconPosition="right"
          />
        </View>

        {/* Render input fields */}

        {discounts.length > 0 &&
          discounts.map((discount, index) => (
            <View
              key={discount.id}
              style={[
                styles.inputContainer,
                {
                  borderWidth: 1,
                  paddingTop: Spacing.Medium,
                  marginHorizontal: Spacing.Medium,
                  borderRadius: BorderRadius.Small,
                  borderColor: ColorPalette.GREY_100,
                  // marginTop: index > 0 ? Spacing.Medium : 0,
                },
              ]}>
              <AnimatedTextInput
                label="Enter Minimum Quantity (e.g. 5)"
                value={discount.minQty}
                onChangeText={value =>
                  handleChangeDiscount(discount.id, 'minQty', value)
                }
                keyboardType="phone-pad"
              />
              <AnimatedTextInput
                label="Enter Maximum Quantity (Optional)"
                value={discount.maxQty}
                onChangeText={value =>
                  handleChangeDiscount(discount.id, 'maxQty', value)
                }
                keyboardType="phone-pad"
                required={false}
              />
              <AnimatedTextInput
                label="Enter Discount Value (e.g. 5)"
                value={discount.discountValue}
                onChangeText={value =>
                  handleChangeDiscount(discount.id, 'discountValue', value)
                }
                keyboardType="phone-pad"
              />

              <View
                style={{
                  // flex: 1,
                  zIndex: activeDropdown ? 3 : 1,
                  marginHorizontal: Spacing.Medium,
                }}>
                <Dropdown
                  options={DISCOUNT_TYPE_OPTIONS}
                  selectedValue={discount.discountType}
                  onSelect={value =>
                    handleChangeDiscountType(
                      discount.id,
                      value as 'Percentage' | 'Absolute',
                    )
                  }
                  placeholder="Select discount type"
                  selectionType="radio"
                  showSearch={false} // No need to search for two options
                  onDropdownToggle={isOpen => handleDropdownToggle(isOpen)}
                />
              </View>

              <Badge
                text="Delete"
                type={BadgeType.DANGER}
                variant={BadgeVariant.OUTLINE}
                onPress={() => {
                  setDeleteDiscountId(discount.id);
                  setShowDeleteModal(true);
                }}
                customContainerStyle={{
                  borderRadius: Spacing.XSmall,
                  paddingVertical: getScreenHeight(2),
                  marginHorizontal: Spacing.Medium,
                }}
                textVariant={TypographyVariant.LMEDIUM_MEDIUM}
                rightIcon={TrashIcon2}
                iconSize={18}
              />
              <View style={styles.selectContainer}>
                {/* Always visible select category row */}
                {/* <TouchableOpacity
              style={[styles.inputContainer, styles.selectBtn]}
              activeOpacity={0.7}
              onPress={navigateToCategorySelection}>
              <Typography
                variant={TypographyVariant.PSMALL_REGULAR}
                text={getCategoryPlaceholderText()}
                customTextStyles={{color: ColorPalette.GREY_TEXT_300}}
              />
              <ArrowRightIcon color={ColorPalette.GREY_TEXT_400} 
              style={undefined}
              />
            </TouchableOpacity> */}

                {/* Selected categories list (only when available) */}
                {/* {safeFormData.categoryPath &&
              safeFormData.categoryPath.length > 0 &&
              safeFormData.categoryPath.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#3A5AFE0D',
                    paddingVertical: getScreenHeight(1.5),
                    paddingHorizontal: getScreenWidth(4),
                    borderRadius: BorderRadius.Small,
                    marginTop: getScreenHeight(1),
                  }}>
                  <Typography
                    text={item}
                    variant={TypographyVariant.PMEDIUM_REGULAR}
                    customTextStyles={{
                      color: ColorPalette.ProgressLine,
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      const updatedPath = safeFormData.categoryPath.slice(
                        0,
                        index,
                      );
                      updateFormData({
                        ...safeFormData,
                        categoryPath: updatedPath,
                        category: updatedPath[0] || '',
                        subcategory:
                          updatedPath.length > 1
                            ? updatedPath[updatedPath.length - 1]
                            : undefined,
                        categoryDisplay: updatedPath.join(' > '),
                      });
                    }}>
                    <CrossCircleIcon size={24} />
                  </TouchableOpacity>
                </View>
              ))} */}
              </View>
            </View>
          ))}
      </View>
      <AddModal
        isVisible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        headerTitle="Delete Item"
        headerText="Are you sure you want to delete this option?."
        buttons={deleteButtons}
        showCloseIcon={false}
        footerStyle={{
          display: 'flex',
          flexDirection: 'row',
        }}
        containerStyle={{
          gap: getScreenHeight(3),
        }}
      />
    </View>
  );
};

export default InventoryStep;
