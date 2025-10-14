// src/screens/DashBoardScreens/ProductScreen/AddProduct/ProgressStepperPages/InventoryStepPages/InventoryStep.tsx

import React, {useState, useEffect, useMemo, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import CheckIcon from '../../../../../../assets/icons/CheckIcon';
import InfoIconPay from '../../../../../../assets/icons/InfoIconPay';
import ToggleButtons from '../../../../../../components/MainComponents/ToggleButtons/ToggleButtons';
import AnimatedTextInput from '../../../../../../components/UserComponents/TextInput/TextInput';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {styles} from './InventoryStep.styles';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../../components/UserComponents/Button';
import PlusIcon from '../../../../../../assets/icons/PlusIcon';
import {BorderRadius, Spacing} from '../../../../../../config/globalStyles';
import {
  getScreenHeight,
  getScreenWidth,
} from '../../../../../../helpers/screenSize';
import {
  BadgeType,
  BadgeVariant,
} from '../../../../../../components/UserComponents/Badges/Badge.types';
import {Badge} from '../../../../../../components/UserComponents/Badges/Badge';
import {TrashIcon2} from '../../../../../../assets/icons/NewProductIcons/TrashIcon2';
import {AddModal} from '../../../../../../components/MainComponents/AddModal/AddModal';
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
  const [qtyStep, setQtyStep] = useState('');
  const [listQtyCount, setListQtyCount] = useState('');
  const [trackInventory, setTrackInventory] = useState('yes');
  const [vatChecked, setVatChecked] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<boolean | null>(false);

  // ✅ NEW: Track if initial data has been loaded
  const initialLoadDone = useRef(false);

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

  // Pre-fill data if in edit mode - ONLY RUN ONCE
  useEffect(() => {
    // ✅ CRITICAL: Only run this effect once during initial load
    if (initialLoadDone.current) {
      console.log('⏭️ Skipping useEffect - initial load already done');
      return;
    }

    console.log('🔄 InventoryStep useEffect triggered');
    console.log('📦 Edit Mode:', editMode);
    console.log('📦 FormData received:', JSON.stringify(formData, null, 2));

    if (editMode && formData) {
      console.log('='.repeat(80));
      console.log('📦 INVENTORY STEP - LOADING FORM DATA');
      console.log('='.repeat(80));

      // Log ALL formData keys
      console.log('📋 All formData keys:', Object.keys(formData));

      // Detailed tax_ids logging
      console.log('💰 TAX DATA ANALYSIS:');
      console.log('  - formData.tax_ids:', formData.tax_ids);
      console.log('  - Type:', typeof formData.tax_ids);
      console.log('  - Is Array:', Array.isArray(formData.tax_ids));
      console.log('  - Array length:', formData.tax_ids?.length);
      console.log('  - JSON stringified:', JSON.stringify(formData.tax_ids));

      // ✅ ALSO check apiResponse.product_data.tax_ids
      console.log(
        '  - formData.apiResponse.product_data.tax_ids:',
        formData.apiResponse?.product_data?.tax_ids,
      );

      if (formData.tax_ids && Array.isArray(formData.tax_ids)) {
        formData.tax_ids.forEach((id: any, index: number) => {
          console.log(`  - tax_ids[${index}]:`, {
            value: id,
            type: typeof id,
            stringValue: String(id),
            equals6String: String(id) === '6',
            equals6Number: id === 6,
            equalsStrict: id === '6',
          });
        });
      }

      console.log('  - formData.taxType:', formData.taxType);
      console.log('='.repeat(80));

      setProductCode(formData.productCode || '');
      setQualityStock(formData.quantity || '');
      setMinQuantity(formData.minQuantity || '');
      setMaxQuantity(formData.maxQuantity || '');
      setAvailableQuantity(formData.availableQuantity || '');
      setQtyStep(formData.qtyStep || '');
      setListQtyCount(formData.listQtyCount || '');
      setTrackInventory(formData.trackInventory ? 'yes' : 'no');

      // ✅ Check BOTH locations for tax_ids
      let hasTaxId = false;

      console.log('🔍 Starting VAT check logic...');

      // Function to check if an array contains tax ID 6
      const checkTaxIdsArray = (
        taxIdsArray: any[],
        source: string,
      ): boolean => {
        if (!Array.isArray(taxIdsArray) || taxIdsArray.length === 0) {
          console.log(`  ✗ ${source} is empty or not an array`);
          return false;
        }

        console.log(`  ✓ ${source} has ${taxIdsArray.length} items`);

        const found = taxIdsArray.some((id: any) => {
          const idString = String(id).trim();
          const idNumber = Number(id);

          console.log(`    - Checking ${source} ID:`, {
            original: id,
            asString: idString,
            asNumber: idNumber,
            matchesString: idString === '6',
            matchesNumber: idNumber === 6,
          });

          return idString === '6' || idNumber === 6;
        });

        console.log(`  → ${source} contains tax ID 6:`, found);
        return found;
      };

      // Check formData.tax_ids first
      if (formData.tax_ids && Array.isArray(formData.tax_ids)) {
        console.log('  📦 Checking formData.tax_ids...');
        hasTaxId = checkTaxIdsArray(formData.tax_ids, 'formData.tax_ids');
      }

      // If not found, check apiResponse.product_data.tax_ids
      if (!hasTaxId && formData.apiResponse?.product_data?.tax_ids) {
        console.log('  📦 Checking apiResponse.product_data.tax_ids...');
        hasTaxId = checkTaxIdsArray(
          formData.apiResponse.product_data.tax_ids,
          'apiResponse.product_data.tax_ids',
        );
      }

      console.log('='.repeat(80));
      console.log('✅ FINAL VAT CHECKBOX STATE:', hasTaxId);
      console.log('='.repeat(80));

      setVatChecked(hasTaxId);

      // ✅ Mark initial load as complete
      initialLoadDone.current = true;
    }
  }, []); // ✅ Empty dependency array - only run once on mount

  // Add a separate effect to log vatChecked state changes
  useEffect(() => {
    console.log('🎯 VAT Checkbox State Changed:', vatChecked);
  }, [vatChecked]);

  // Update form data when values change
  const handleProductCodeChange = (text: string) => {
    setProductCode(text);
    updateFormData({
      productCode: text,
      product_code: text,
    });
  };

  const handleQualityStockChange = (text: string) => {
    setQualityStock(text);
    updateFormData({
      quantity: text,
      amount: text,
    });
  };

  const handleMinQuantityChange = (text: string) => {
    setMinQuantity(text);
    updateFormData({
      minQuantity: text,
      min_qty: text,
    });
  };

  const handleMaxQuantityChange = (text: string) => {
    setMaxQuantity(text);
    updateFormData({
      maxQuantity: text,
      max_qty: text,
    });
  };

  const handleQtyStepChange = (text: string) => {
    setQtyStep(text);
    updateFormData({
      qtyStep: text,
      qty_step: text,
    });
  };

  const handleListQtyCountChange = (text: string) => {
    setListQtyCount(text);
    updateFormData({
      listQtyCount: text,
      list_qty_count: text,
    });
  };

  const handleAvailableQuantityChange = (text: string) => {
    setAvailableQuantity(text);
    updateFormData({availableQuantity: text});
  };

  const handleTrackInventoryChange = (value: string) => {
    setTrackInventory(value);
    updateFormData({
      trackInventory: value === 'yes',
      tracking: value === 'yes' ? 'B' : 'N',
    });
  };

  // ✅ Handle VAT checkbox with correct tax_ids format
  const handleVatChange = (checked: boolean) => {
    console.log('🔄 VAT checkbox changed:', {
      checked,
      willSetTaxIds: checked ? [6] : [],
    });

    setVatChecked(checked);

    // ✅ Update formData with correct format for API
    // When checked: tax_ids = [6]
    // When unchecked: tax_ids = []
    updateFormData({
      taxType: checked ? 'VAT' : '',
      tax_ids: checked ? [6] : [],
    });

    console.log('✅ FormData updated with tax_ids:', checked ? [6] : []);
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
      prev.map(item => (item.id === id ? {...item, [field]: value} : item)),
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
      prev.map(d => (d.id === id ? {...d, discountType: value} : d)),
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
    {value: 'Percentage', label: 'Percentage (%)'},
    {value: 'Absolute', label: 'Absolute (€)'},
  ];

  console.log('🎨 InventoryStep render - vatChecked:', vatChecked);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text="Inventory"
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
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
              <Typography
                customTextStyles={{
                  color: ColorPalette.GREY_TEXT_200,
                  paddingVertical: getScreenHeight(0.1),
                }}
                variant={TypographyVariant.LSMALL_MEDIUM}>
                Quantity of the product currently in stock.
              </Typography>
            }
            placement="right"
            containerStyle={{
              width: getScreenWidth(60),
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
            label="Quantity step (Optional)"
            value={qtyStep}
            onChangeText={handleQtyStepChange}
            keyboardType="numeric"
            required={false}
          />
          <AnimatedTextInput
            label="List quantity count (Optional)"
            value={listQtyCount}
            onChangeText={handleListQtyCountChange}
            keyboardType="numeric"
            required={false}
          />
        </View>
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
            onPress={() => {
              console.log('👆 Checkbox tapped! Current state:', vatChecked);
              handleVatChange(!vatChecked);
            }}>
            <View
              style={[
                styles.checkbox,
                vatChecked && {
                  backgroundColor: ColorPalette.PURPLE_300,
                },
              ]}>
              {vatChecked && (
                <View style={styles.checkmark}>
                  <CheckIcon size={24} checkColor={ColorPalette.White} />
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
