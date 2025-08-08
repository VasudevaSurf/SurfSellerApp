import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import CheckIcon from '../../../../../../assets/icons/CheckIcon';
import InfoIconPay from '../../../../../../assets/icons/InfoIconPay';
import ToggleButtons from '../../../../../../components/MainComponents/ToggleButtons/ToggleButtons';
import AnimatedTextInput from '../../../../../../components/UserComponents/TextInput/TextInput';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {styles} from './InventoryStep.styles';

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
  const [trackInventory, setTrackInventory] = useState('yes');
  const [vatChecked, setVatChecked] = useState(false);

  // Pre-fill data if in edit mode
  useEffect(() => {
    if (editMode && formData) {
      setProductCode(formData.productCode || '');
      setQualityStock(formData.quantity || '');
      setMinQuantity(formData.minQuantity || '');
      setMaxQuantity(formData.maxQuantity || '');
      setTrackInventory(formData.trackInventory ? 'yes' : 'no');
      setVatChecked(formData.taxType === 'VAT');
    }
  }, [editMode, formData]);

  // Update form data when values change
  const handleProductCodeChange = (text: string) => {
    setProductCode(text);
    updateFormData({productCode: text});
  };

  const handleQualityStockChange = (text: string) => {
    setQualityStock(text);
    updateFormData({quantity: text});
  };

  const handleMinQuantityChange = (text: string) => {
    setMinQuantity(text);
    updateFormData({minQuantity: text});
  };

  const handleMaxQuantityChange = (text: string) => {
    setMaxQuantity(text);
    updateFormData({maxQuantity: text});
  };

  const handleTrackInventoryChange = (value: string) => {
    setTrackInventory(value);
    updateFormData({trackInventory: value === 'yes'});
  };

  const handleVatChange = (checked: boolean) => {
    setVatChecked(checked);
    updateFormData({taxType: checked ? 'VAT' : ''});
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text="Inventory"
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
          <InfoIconPay
            size={16}
            color={ColorPalette.GREY_TEXT_400}
            style={undefined}
          />
        </View>
        <View style={styles.inputContainer}>
          <AnimatedTextInput
            label="Product code"
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
            label="Minimum quantity to buy per product"
            value={minQuantity}
            onChangeText={handleMinQuantityChange}
            keyboardType="numeric"
          />
          <AnimatedTextInput
            label="Maximum quantity to buy per product"
            value={maxQuantity}
            onChangeText={handleMaxQuantityChange}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.sectionItem}>
        <View style={styles.textContainer}>
          <Typography
            text="Track Inventory"
            variant={TypographyVariant.H6_BOLD}
            customTextStyles={styles.primaryText}
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
            typographyVariant={TypographyVariant.LSMALL_MEDIUM}
          />
        </View>
        <Typography
          text="(When inventory is tracked, the number of products in stock will decrease after each purchase)"
          variant={TypographyVariant.LXSMALL_REGULAR}
          customTextStyles={styles.secondaryText}
        />
      </View>
      <View style={styles.taxCheckContainer}>
        <Typography
          text="Tax"
          variant={TypographyVariant.LMEDIUM_EXTRABOLD}
          customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
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
              customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InventoryStep;
