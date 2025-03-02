import React, {useCallback, useEffect, useState} from 'react';
import {
  Modal as RNModal,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckIcon from '../../../assets/icons/CheckIcon';
import CloseIcon from '../../../assets/icons/CloseIcon';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../UserComponents/Button';
import {SearchBox} from '../../UserComponents/SearchBox/SearchBox';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {styles} from './StatusModal.styles';
import {Option, StatusModalProps} from './StatusModal.types';

const DEFAULT_OPTIONS: Option[] = [
  {value: 'All', label: 'All', isSelected: false},
  {value: 'Pending', label: 'Pending', isSelected: false},
  {value: 'Accepted', label: 'Accepted', isSelected: false},
  {value: 'Shipped', label: 'Shipped', isSelected: false},
  {value: 'Delivered', label: 'Delivered', isSelected: false},
  {value: 'Cancelled', label: 'Cancelled', isSelected: false},
  {value: 'Returned', label: 'Returned', isSelected: false},
  {value: 'Exchanged', label: 'Exchanged', isSelected: false},
];

export const StatusModal: React.FC<StatusModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  initialStatus,
  options = DEFAULT_OPTIONS,
  title = 'Choose Options',
  showSearch = true,
  searchPlaceholder = 'Search orders, products',
  selectionType = 'radio',
  checkboxProps = {
    size: 24,
    backgroundColor: '#9101CF',
    checkColor: 'white',
  },
}) => {
  const [searchText, setSearchText] = useState('');
  const [modalOptions, setModalOptions] = useState<Option[]>(options);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  useEffect(() => {
    if (options && isVisible) {
      let updatedOptions;

      if (selectionType === 'radio') {
        // For radio buttons: only one can be selected
        updatedOptions = options.map(option => ({
          ...option,
          isSelected: option.value === initialStatus,
        }));
      } else {
        // For checkboxes: support for multiple selections
        // If initialStatus is a string, treat it as a single selection
        // If it's an array, support multiple selections
        const initialStatusArray = Array.isArray(initialStatus)
          ? initialStatus
          : initialStatus
          ? [initialStatus]
          : [];

        updatedOptions = options.map(option => ({
          ...option,
          isSelected: initialStatusArray.includes(option.value),
        }));
      }

      setModalOptions(updatedOptions);
      setFilteredOptions(updatedOptions);
      setSearchText(''); // Reset search text when modal opens
    }
  }, [options, initialStatus, isVisible, selectionType]);

  // Filter options based on search text
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredOptions(modalOptions);
    } else {
      const filtered = modalOptions.filter(option =>
        option.label.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredOptions(filtered);
    }
  }, [searchText, modalOptions]);

  const handleOptionPress = useCallback(
    (selectedValue: string) => {
      if (selectionType === 'radio') {
        // Radio button behavior: only one option can be selected
        setModalOptions(prevOptions =>
          prevOptions.map(option => ({
            ...option,
            isSelected: option.value === selectedValue,
          })),
        );

        // Update filtered options to reflect the selection
        setFilteredOptions(prevFiltered =>
          prevFiltered.map(option => ({
            ...option,
            isSelected: option.value === selectedValue,
          })),
        );
      } else {
        // Checkbox behavior: multiple options can be selected
        setModalOptions(prevOptions =>
          prevOptions.map(option => ({
            ...option,
            isSelected:
              option.value === selectedValue
                ? !option.isSelected
                : option.isSelected,
          })),
        );

        // Update filtered options to reflect the selection
        setFilteredOptions(prevFiltered =>
          prevFiltered.map(option => ({
            ...option,
            isSelected:
              option.value === selectedValue
                ? !option.isSelected
                : option.isSelected,
          })),
        );
      }
    },
    [selectionType],
  );

  const handleSubmit = useCallback(() => {
    if (selectionType === 'radio') {
      // For radio buttons: return a single selected value
      const selectedOption = modalOptions.find(option => option.isSelected);
      if (selectedOption) {
        onSubmit(selectedOption.value);
      }
    } else {
      // For checkboxes: return an array of selected values
      const selectedValues = modalOptions
        .filter(option => option.isSelected)
        .map(option => option.value);

      onSubmit(selectedValues);
    }
    onClose();
  }, [modalOptions, onSubmit, onClose, selectionType]);

  const handleBackdropPress = useCallback(() => {
    onClose();
  }, [onClose]);

  // Render appropriate selection control (radio button or checkbox)
  const renderSelectionControl = useCallback(
    (option: Option) => {
      if (selectionType === 'checkbox') {
        return option.isSelected ? (
          <CheckIcon
            size={checkboxProps.size}
            backgroundColor={checkboxProps.backgroundColor}
            checkColor={checkboxProps.checkColor}
          />
        ) : (
          <View
            style={[
              styles.checkbox,
              option.isSelected && styles.checkboxSelected,
            ]}
          />
        );
      } else {
        // Default radio button
        return (
          <View
            style={[
              styles.radioButton,
              option.isSelected && styles.radioButtonSelected,
            ]}>
            {option.isSelected && <View style={styles.radioButtonInner} />}
          </View>
        );
      }
    },
    [selectionType, checkboxProps],
  );

  return (
    <RNModal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.24)',
          justifyContent: 'flex-end',
        }}
        activeOpacity={1}
        onPress={handleBackdropPress}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={e => e.stopPropagation()}>
            <View style={styles.contentContainer}>
              <View style={styles.header}>
                <View style={styles.headerContent}>
                  <Typography
                    variant={TypographyVariant.H5_BOLD}
                    text={title}
                    customTextStyles={styles.heading}
                  />
                </View>
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.closeButton}
                  accessibilityLabel="Close modal">
                  <CloseIcon />
                </TouchableOpacity>
              </View>

              {showSearch && (
                <View style={styles.searchContainer}>
                  <SearchBox
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder={searchPlaceholder}
                  />
                </View>
              )}

              <ScrollView
                style={styles.sectionContainer}
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}>
                {filteredOptions.map(option => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionContainer,
                      styles.accessibilityContainer,
                    ]}
                    onPress={() => handleOptionPress(option.value)}
                    activeOpacity={0.7}
                    accessibilityRole={
                      selectionType === 'checkbox' ? 'checkbox' : 'radio'
                    }
                    accessibilityState={{checked: option.isSelected}}>
                    {renderSelectionControl(option)}
                    <Typography
                      variant={TypographyVariant.PMEDIUM_BOLD}
                      text={option.label}
                      customTextStyles={[
                        styles.optionLabel,
                        option.isSelected
                          ? styles.optionLabelSelected
                          : styles.optionLabelUnselected,
                      ]}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={styles.footer}>
                <Button
                  text="SUBMIT"
                  onPress={handleSubmit}
                  variant={ButtonVariant.PRIMARY}
                  state={ButtonState.DEFAULT}
                  size={ButtonSize.MEDIUM}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </RNModal>
  );
};
