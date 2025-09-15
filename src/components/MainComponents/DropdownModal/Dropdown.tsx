import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import CheckIcon from '../../../assets/icons/CheckIcon';
import {ColorPalette} from '../../../config/colorPalette';
import {BorderRadius} from '../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {SearchBox} from '../../UserComponents/SearchBox/SearchBox';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Color mapping for the color indicators
const COLOR_MAP = {
  Chartreuse: '#7FFF00',
  Amber: '#FFBF00',
  Periwinkle: '#CCCCFF',
  TurquoiseBlue: '#40E0D0',
  Turquoise: '#40E0D0',
  Lavender: '#E6E6FA',
  Coral: '#FF7F50',
  Indigo: '#4B0082',
  Celeste: '#B2FFFF',
  Ochre: '#CC7722',
};

const Dropdown = ({
  options = [],
  selectedValue = null,
  onSelect,
  placeholder = 'Select an option',
  showSearch = true,
  searchPlaceholder = 'Search',
  selectionType = 'radio', // 'radio' or 'checkbox'
  label = '',
  onDropdownToggle,
  disabled = false,
  zIndex = 1,
  containerStyle = {},
  showColorIndicator = false, // New prop to control color indicator display
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [dropdownLayout, setDropdownLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const triggerRef = useRef(null);

  // Update filtered options when search text or options change
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredOptions(filtered);
    }
  }, [searchText, options]);

  // Notify parent component about dropdown state change
  useEffect(() => {
    if (onDropdownToggle) {
      onDropdownToggle(isOpen);
    }
  }, [isOpen, onDropdownToggle]);

  // Handle item selection
  const handleSelect = value => {
    if (selectionType === 'radio') {
      onSelect(value);
      closeDropdown();
    } else if (selectionType === 'checkbox') {
      // For checkbox, we handle array of values
      if (Array.isArray(selectedValue)) {
        const isSelected = selectedValue.includes(value);
        const newSelection = isSelected
          ? selectedValue.filter(item => item !== value)
          : [...selectedValue, value];
        onSelect(newSelection);
      } else {
        onSelect([value]); // Initialize array with selected value
      }
    }
  };

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    if (disabled) return;

    if (!isOpen) {
      // Measure the dropdown trigger component position
      triggerRef.current.measure((x, y, width, height, pageX, pageY) => {
        setDropdownLayout({
          x: pageX,
          y: pageY,
          width,
          height,
        });

        setIsOpen(true);
        setSearchText(''); // Clear search when opening
      });
    } else {
      closeDropdown();
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Get display text for selected value(s)
  const getSelectedLabel = () => {
    // Handle checkbox selection case
    if (selectionType === 'checkbox') {
      if (
        !selectedValue ||
        !Array.isArray(selectedValue) ||
        selectedValue.length === 0
      ) {
        return placeholder;
      }

      if (selectedValue.length === 1) {
        const selectedOption = options.find(
          option => option.value === selectedValue[0],
        );
        return selectedOption
          ? selectedOption.label
          : `${selectedValue.length} selected`;
      }

      return `${selectedValue.length} selected`;
    }

    // Handle radio selection case
    if (selectionType === 'radio') {
      if (!selectedValue) return placeholder;

      const selectedOption = options.find(
        option => option.value === selectedValue,
      );
      return selectedOption ? selectedOption.label : placeholder;
    }

    return placeholder;
  };

  // Get color for selected value (for trigger display)
  const getSelectedColor = () => {
    if (!showColorIndicator || !selectedValue) return null;

    if (selectionType === 'radio') {
      const selectedOption = options.find(
        option => option.value === selectedValue,
      );
      return selectedOption ? COLOR_MAP[selectedOption.value] : null;
    }

    return null; // No color indicator for multi-select
  };

  // Render option item for FlatList
  const renderItem = ({item}) => {
    const isSelected =
      selectionType === 'radio'
        ? item.value === selectedValue
        : Array.isArray(selectedValue) && selectedValue.includes(item.value);

    // Determine if this item should show color indicator
    const showThisColorIndicator = showColorIndicator && COLOR_MAP[item.value];

    return (
      <TouchableOpacity
        style={styles.optionItem}
        onPress={() => handleSelect(item.value)}
        activeOpacity={0.7}>
        {selectionType === 'radio' ? (
          // Radio button style
          <View
            style={[
              styles.radioButton,
              isSelected && styles.radioButtonSelected,
            ]}>
            {isSelected && <View style={styles.radioButtonInner} />}
          </View>
        ) : (
          // Checkbox style
          <View
            style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
            {isSelected && (
              <CheckIcon
                size={14}
                backgroundColor="transparent"
                checkColor={ColorPalette.White}
              />
            )}
          </View>
        )}
        <Typography
          text={item.label}
          customTextStyles={styles.optionText}
          variant={TypographyVariant.PMEDIUM_REGULAR}
        />

        {/* Color indicator circle - only shown for color dropdown */}
        {showThisColorIndicator && (
          <View
            style={[
              styles.colorIndicator,
              {backgroundColor: COLOR_MAP[item.value]},
            ]}
          />
        )}
      </TouchableOpacity>
    );
  };

  // Calculate position for dropdown
  const calculatePosition = () => {
    // Space below the dropdown trigger
    const spaceBelow = SCREEN_HEIGHT - dropdownLayout.y - dropdownLayout.height;

    // Determine max height for dropdown content
    const maxHeight = Math.min(
      getScreenHeight(40), // Maximum height allowed (about 350px)
      spaceBelow > getScreenHeight(20)
        ? spaceBelow - getScreenHeight(1)
        : SCREEN_HEIGHT * 0.6,
    );

    // Determine if dropdown should appear above or below the trigger
    let top, bottom;
    if (
      spaceBelow < getScreenHeight(20) &&
      dropdownLayout.y > getScreenHeight(30)
    ) {
      // Position above
      bottom = SCREEN_HEIGHT - dropdownLayout.y + getScreenHeight(0.5);
      return {
        maxHeight,
        position: 'absolute',
        bottom,
        left: dropdownLayout.x,
        width: dropdownLayout.width,
      };
    } else {
      // Position below
      top = dropdownLayout.y + dropdownLayout.height + getScreenHeight(0.5);
      return {
        maxHeight,
        position: 'absolute',
        top,
        left: dropdownLayout.x,
        width: dropdownLayout.width,
      };
    }
  };

  return (
    <View style={[{zIndex}, containerStyle]}>
      {/* Label */}
      {label ? (
        <Typography
          text={label}
          customTextStyles={styles.label}
          variant={TypographyVariant.PSMALL_REGULAR}
        />
      ) : null}

      {/* Selected value display */}
      <TouchableOpacity
        ref={triggerRef}
        style={[
          styles.dropdownTrigger,
          isOpen && styles.dropdownTriggerActive,
          disabled && styles.dropdownTriggerDisabled,
        ]}
        onPress={toggleDropdown}
        accessible={true}
        accessibilityLabel={placeholder}
        accessibilityHint={`Tap to select ${placeholder.toLowerCase()}`}>
        <Typography
          customTextStyles={[
            styles.triggerText,
            selectedValue &&
            (selectionType === 'radio' ||
              (selectionType === 'checkbox' &&
                Array.isArray(selectedValue) &&
                selectedValue.length > 0))
              ? styles.triggerTextSelected
              : null,
            disabled && styles.triggerTextDisabled,
          ]}
          text={getSelectedLabel()}
          variant={TypographyVariant.PSMALL_REGULAR}
        />

        <View style={styles.triggerRightContent}>
          {/* Show color indicator in trigger if selected and showColorIndicator is true */}
          {showColorIndicator && getSelectedColor() && (
            <View
              style={[
                styles.triggerColorIndicator,
                {backgroundColor: getSelectedColor()},
              ]}
            />
          )}

          <ArrowDownIcon
            style={{transform: [{rotate: isOpen ? '180deg' : '0deg'}]}}
            color={
              disabled ? ColorPalette.GREY_200 : ColorPalette.GREY_TEXT_100
            }
          />
        </View>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={closeDropdown}>
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
              <Animated.View
                style={[styles.dropdownContent, calculatePosition()]}>
                {/* Using SearchBox component instead of custom search implementation */}
                {showSearch && (
                  <View style={styles.searchContainer}>
                    <SearchBox
                      placeholder={searchPlaceholder}
                      value={searchText}
                      onChangeText={setSearchText}
                      testID="dropdown-search"
                      customContainerStyle={styles.searchBoxContainer}
                    />
                  </View>
                )}

                {/* Options list */}
                {filteredOptions.length > 0 ? (
                  <FlatList
                    data={filteredOptions}
                    renderItem={renderItem}
                    keyExtractor={item => item.value.toString()}
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={styles.optionsList}
                    keyboardShouldPersistTaps="handled"
                    initialNumToRender={10}
                    maxToRenderPerBatch={20}
                    windowSize={10}
                  />
                ) : (
                  <View style={styles.noResults}>
                    <Typography
                      text="No options found"
                      variant={TypographyVariant.PSMALL_REGULAR}
                      customTextStyles={styles.noResultsText}
                    />
                  </View>
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: getScreenHeight(0.5),
    color: ColorPalette.GREY_TEXT_100,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: getScreenHeight(1.5),
    borderWidth: 1,
    borderColor: ColorPalette.GREY_100,
    borderRadius: BorderRadius.XSmall,
    backgroundColor: ColorPalette.White,
    paddingVertical: getScreenHeight(2.5), // previously 2
  },
  dropdownTriggerActive: {
    borderColor: ColorPalette.GREY_TEXT_400,
  },
  dropdownTriggerDisabled: {
    backgroundColor: ColorPalette.GREY_100,
    borderColor: ColorPalette.GREY_100,
  },
  triggerText: {
    color: ColorPalette.GREY_TEXT_100,
  },
  triggerTextSelected: {
    color: ColorPalette.GREY_TEXT_500,
  },
  triggerTextDisabled: {
    color: ColorPalette.GREY_200,
  },
  triggerRightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  triggerColorIndicator: {
    width: getScreenWidth(5),
    height: getScreenWidth(5),
    borderRadius: BorderRadius.Full,
    marginRight: getScreenWidth(2),
    borderWidth: 1,
    borderColor: ColorPalette.GREY_100,
  },
  modalOverlay: {
    flex: 1,
  },
  dropdownContent: {
    backgroundColor: ColorPalette.White,
    borderWidth: 1,
    borderColor: ColorPalette.GREY_100,
    borderRadius: BorderRadius.XSmall,
    overflow: 'hidden',
    shadowColor: ColorPalette.Black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: getScreenHeight(2),
    paddingHorizontal: getScreenWidth(2),
  },
  searchContainer: {
    marginBottom: getScreenHeight(0.8),
  },
  searchBoxContainer: {
    backgroundColor: ColorPalette.SearchBack,
  },
  optionsList: {
    paddingBottom: getScreenHeight(0.4),
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: getScreenHeight(1.2),
  },
  radioButton: {
    width: getScreenWidth(6),
    height: getScreenWidth(6),
    borderRadius: BorderRadius.Full,
    borderWidth: 2,
    borderColor: ColorPalette.GREY_200,
    marginRight: getScreenWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: ColorPalette.PURPLE_300,
  },
  radioButtonInner: {
    width: getScreenWidth(2.5),
    height: getScreenWidth(2.5),
    borderRadius: BorderRadius.Full,
    backgroundColor: ColorPalette.PURPLE_300,
  },
  checkbox: {
    width: getScreenWidth(6),
    height: getScreenWidth(6),
    borderRadius: BorderRadius.XXSmall,
    borderWidth: 2,
    borderColor: ColorPalette.GREY_200,
    marginRight: getScreenWidth(2.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: ColorPalette.PURPLE_300,
    borderColor: ColorPalette.PURPLE_300,
  },
  optionText: {
    color: ColorPalette.GREY_TEXT_500,
    flex: 1,
  },
  colorIndicator: {
    width: getScreenWidth(4),
    height: getScreenWidth(4),
    borderRadius: BorderRadius.Full,
    marginLeft: getScreenWidth(2),
    borderWidth: 1,
    borderColor: ColorPalette.GREY_100,
  },
  noResults: {
    padding: getScreenHeight(2),
    alignItems: 'center',
  },
  noResultsText: {
    color: ColorPalette.GREY_TEXT_100,
  },
});

export default Dropdown;
