import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {styles} from './StatusModal.styles';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../UserComponents/Button';
import CloseIcon from '../../../assets/icons/CloseIcon';
import {StatusModalProps, Option} from './StatusModal.types';

const INITIAL_OPTIONS: Option[] = [
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
}) => {
  const [options, setOptions] = useState<Option[]>(INITIAL_OPTIONS);

  useEffect(() => {
    setOptions(prevOptions =>
      prevOptions.map(option => ({
        ...option,
        isSelected: option.value === initialStatus,
      })),
    );
  }, [initialStatus]);

  const handleOptionPress = useCallback((selectedValue: OrderStatus) => {
    setOptions(prevOptions =>
      prevOptions.map(option => ({
        ...option,
        isSelected: option.value === selectedValue,
      })),
    );
  }, []);

  const handleSubmit = useCallback(() => {
    const selectedOption = options.find(option => option.isSelected);
    if (selectedOption) {
      onSubmit(selectedOption.value);
      onClose();
    }
  }, [options, onSubmit, onClose]);

  return (
    <Modal
      isVisible={isVisible}
      animationType="slide"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      coverScreen
      avoidKeyboard
      style={styles.modal}
      onBackdropPress={onClose}
      swipeDirection="down"
      backdropOpacity={0.5}
      backdropColor={ColorPalette.OPACITY_24}
      onSwipeComplete={onClose}>
      <View style={[styles.modalContainer]}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Typography
                variant={TypographyVariant.H5_BOLD}
                text="Choose Options"
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

          <ScrollView
            style={styles.sectionContainer}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            {options.map(option => (
              <TouchableOpacity
                key={option.value}
                style={[styles.optionContainer, styles.accessibilityContainer]}
                onPress={() => handleOptionPress(option.value)}
                activeOpacity={0.7}
                accessibilityRole="radio"
                accessibilityState={{checked: option.isSelected}}>
                <View
                  style={[
                    styles.radioButton,
                    option.isSelected && styles.radioButtonSelected,
                  ]}>
                  {option.isSelected && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
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
      </View>
    </Modal>
  );
};
