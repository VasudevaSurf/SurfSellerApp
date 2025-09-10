import React, {useEffect, useState} from 'react';
import {
  Modal as RNModal,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import CloseIcon from '../../../assets/icons/CloseIcon';
import InfoIcon from '../../../assets/icons/InfoIcon2'; // Import the new InfoIcon
import {ColorPalette} from '../../../config/colorPalette';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../UserComponents/Button';
import AnimatedTextInput from '../../UserComponents/TextInput/TextInput';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import Dropdown from '../DropdownModal/Dropdown';
import {styles} from './FilterOrdersModal.styles';
import {
  FilterOrdersModalProps,
  OrderFilters,
  OrderStatusOption,
} from './FilterOrdersModal.types';
import {getScreenHeight} from '../../../helpers/screenSize';

const ORDER_STATUS_OPTIONS: OrderStatusOption[] = [
  {value: 'all', label: 'All Orders'},
  {value: 'Pending', label: 'Pending'},
  {value: 'Processing', label: 'Processing'},
  {value: 'Accepted', label: 'Accepted'},
  {value: 'Shipped', label: 'Shipped'},
  {value: 'Delivered', label: 'Delivered'},
  {value: 'Completed', label: 'Completed'},
  {value: 'Cancelled', label: 'Cancelled'},
  {value: 'Returned', label: 'Returned'},
  {value: 'Exchanged', label: 'Exchanged'},
  {value: 'Failed', label: 'Failed'},
  {value: 'Declined', label: 'Declined'},
];

export const FilterOrdersModal: React.FC<FilterOrdersModalProps> = ({
  isVisible,
  onClose,
  onApply,
  initialFilters = {},
  containerStyle,
  backdropOpacity = 0.5,
  backdropColor = 'rgba(0,0,0,0.24)',
}) => {
  const [filters, setFilters] = useState<OrderFilters>(initialFilters);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  useEffect(() => {
    if (isVisible) {
      setFilters(initialFilters);
    }
  }, [isVisible, initialFilters]);

  const handleInputChange = (field: keyof OrderFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters: OrderFilters = {
      customerName: '',
      email: '',
      phoneNumber: '',
      minOrderValue: '',
      maxOrderValue: '',
      orderStatus: 'all',
    };
    setFilters(clearedFilters);
  };

  const hasActiveFilters = () => {
    return (
      filters.customerName ||
      filters.email ||
      filters.phoneNumber ||
      filters.minOrderValue ||
      filters.maxOrderValue ||
      (filters.orderStatus && filters.orderStatus !== 'all')
    );
  };

  return (
    <RNModal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: backdropColor,
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onPress={onClose}
          activeOpacity={1}
        />
        <View style={[styles.modalContainer, containerStyle]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Typography
                variant={TypographyVariant.H5_BOLD}
                text="Filter Orders"
                customTextStyles={styles.headerText}
              />
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <CloseIcon color={ColorPalette.GREY_TEXT_400} size={24} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.content}
            contentContainerStyle={{gap: getScreenHeight(1.5)}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {/* Filter by Name, Email, or Phone Number Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Typography
                  variant={TypographyVariant.LMEDIUM_BOLD}
                  text="Filter by Name, Email, or Phone Number"
                  customTextStyles={styles.sectionTitle}
                />
                <InfoIcon size={20} color={ColorPalette.GREY_TEXT_400} />
              </View>

              <View style={styles.inputGroup}>
                <View
                  style={[
                    styles.textInputContainer,
                    focusedInput === 'customerName' && styles.textInputFocused,
                  ]}>
                  <AnimatedTextInput
                    label="Customer name"
                    value={filters.customerName || ''}
                    onChangeText={text =>
                      handleInputChange('customerName', text)
                    }
                    onFocus={() => setFocusedInput('customerName')}
                    onBlur={() => setFocusedInput(null)}
                    customLabelColorFocused={ColorPalette.PURPLE_300}
                    customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
                    customFocusedBorderColor={ColorPalette.PURPLE_300}
                    customTextColor={ColorPalette.GREY_TEXT_500}
                    validationEnabled={false}
                  />
                </View>

                <View
                  style={[
                    styles.textInputContainer,
                    focusedInput === 'email' && styles.textInputFocused,
                  ]}>
                  <AnimatedTextInput
                    label="Email id"
                    value={filters.email || ''}
                    onChangeText={text => handleInputChange('email', text)}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    keyboardType="email-address"
                    type="email"
                    customLabelColorFocused={ColorPalette.PURPLE_300}
                    customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
                    customFocusedBorderColor={ColorPalette.PURPLE_300}
                    customTextColor={ColorPalette.GREY_TEXT_500}
                    validationEnabled={false}
                  />
                </View>

                <View
                  style={[
                    styles.textInputContainer,
                    focusedInput === 'phoneNumber' && styles.textInputFocused,
                  ]}>
                  <AnimatedTextInput
                    label="Phone number"
                    value={filters.phoneNumber || ''}
                    onChangeText={text =>
                      handleInputChange('phoneNumber', text)
                    }
                    onFocus={() => setFocusedInput('phoneNumber')}
                    onBlur={() => setFocusedInput(null)}
                    keyboardType="phone-pad"
                    type="phone"
                    customLabelColorFocused={ColorPalette.PURPLE_300}
                    customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
                    customFocusedBorderColor={ColorPalette.PURPLE_300}
                    customTextColor={ColorPalette.GREY_TEXT_500}
                    validationEnabled={false}
                  />
                </View>
              </View>
            </View>

            {/* Filter by Total Order Value Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Typography
                  variant={TypographyVariant.LMEDIUM_BOLD}
                  text="Filter by Total Order Value (€)"
                  customTextStyles={styles.sectionTitle}
                />
                <InfoIcon size={20} color={ColorPalette.GREY_TEXT_400} />
              </View>

              <View style={styles.rangeContainer}>
                <View style={styles.rangeInput}>
                  <View
                    style={[
                      styles.rangeInputContainer,
                      focusedInput === 'minOrderValue' &&
                        styles.rangeInputFocused,
                    ]}>
                    <AnimatedTextInput
                      label="From (€)"
                      value={filters.minOrderValue || ''}
                      onChangeText={text =>
                        handleInputChange('minOrderValue', text)
                      }
                      onFocus={() => setFocusedInput('minOrderValue')}
                      placeholder="0"
                      keyboardType="number-pad"
                      customLabelColorFocused={ColorPalette.PURPLE_300}
                      customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
                      customBorderColor="transparent"
                      customFocusedBorderColor="transparent"
                      customBorderWidth={0}
                      customFocusedBorderWidth={0}
                      customTextColor={ColorPalette.GREY_TEXT_500}
                      validationEnabled={false}
                    />
                  </View>
                </View>

                <View style={styles.rangeInput}>
                  <View
                    style={[
                      styles.rangeInputContainer,
                      focusedInput === 'maxOrderValue' &&
                        styles.rangeInputFocused,
                    ]}>
                    <AnimatedTextInput
                      label="To (€)"
                      value={filters.maxOrderValue || ''}
                      onChangeText={text =>
                        handleInputChange('maxOrderValue', text)
                      }
                      onFocus={() => setFocusedInput('maxOrderValue')}
                      onBlur={() => setFocusedInput(null)}
                      placeholder="1000"
                      keyboardType="number-pad"
                      customLabelColorFocused={ColorPalette.PURPLE_300}
                      customLabelColorUnfocused={ColorPalette.GREY_TEXT_00}
                      customBorderColor="transparent"
                      customFocusedBorderColor="transparent"
                      customBorderWidth={0}
                      customFocusedBorderWidth={0}
                      customTextColor={ColorPalette.GREY_TEXT_500}
                      validationEnabled={false}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Filter by Order Status Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Typography
                  variant={TypographyVariant.LMEDIUM_BOLD}
                  text="Filter by Order Status"
                  customTextStyles={styles.sectionTitle}
                />
                <InfoIcon size={20} color={ColorPalette.GREY_TEXT_400} />
              </View>

              <View style={styles.dropdownContainer}>
                <Dropdown
                  options={ORDER_STATUS_OPTIONS}
                  selectedValue={filters.orderStatus || 'all'}
                  onSelect={value => handleInputChange('orderStatus', value)}
                  placeholder="Select order status"
                  showSearch={false}
                  selectionType="radio"
                  containerStyle={{zIndex: 1000}}
                />
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <Button
              text="Cancel"
              onPress={handleClear}
              variant={ButtonVariant.PRIMARY}
              state={
                hasActiveFilters() ? ButtonState.DEFAULT : ButtonState.DISABLED
              }
              type={ButtonType.OUTLINED}
              size={ButtonSize.MEDIUM}
              customStyles={[styles.button, styles.clearButton]}
              disabled={!hasActiveFilters()}
            />
            <Button
              text="Apply"
              onPress={handleApply}
              variant={ButtonVariant.PRIMARY}
              state={ButtonState.DEFAULT}
              size={ButtonSize.MEDIUM}
              customStyles={styles.button}
            />
          </View>
        </View>
      </View>
    </RNModal>
  );
};
