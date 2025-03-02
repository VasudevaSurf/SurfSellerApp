import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import CheckIcon from '../../../../../../assets/icons/CheckIcon';
import InfoIcon from '../../../../../../assets/icons/InfoIcon';
import ToggleButtons from '../../../../../../components/MainComponents/ToggleButtons/ToggleButtons';
import AnimatedTextInput from '../../../../../../components/UserComponents/TextInput/TextInput';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {styles} from './InventoryStep.styles';

const InventoryStep = () => {
  const [productCode, setProductCode] = useState('');
  const [qualityStock, setQualityStock] = useState('');
  const [minQuantity, setMinQuantity] = useState('');
  const [maxQuantity, setMaxQuantity] = useState('');
  const [trackInventory, setTrackInventory] = useState('yes');
  const [vatChecked, setVatChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text="Inventory"
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
          <InfoIcon
            size={16}
            color={ColorPalette.IconColor}
            style={undefined}
          />
        </View>
        <View style={styles.inputContainer}>
          <AnimatedTextInput
            label="Product code"
            value={productCode}
            onChangeText={setProductCode}
            keyboardType="default"
          />
          <AnimatedTextInput
            label="Quantity in stock"
            value={qualityStock}
            onChangeText={setQualityStock}
            keyboardType="default"
          />
          <AnimatedTextInput
            label="Minimum quantity to buy per product"
            value={minQuantity}
            onChangeText={setMinQuantity}
            keyboardType="default"
          />
          <AnimatedTextInput
            label="Maximum quantity to buy per product"
            value={maxQuantity}
            onChangeText={setMaxQuantity}
            keyboardType="default"
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
            onSelectionChange={setTrackInventory}
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
            onPress={() => setVatChecked(!vatChecked)}>
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
