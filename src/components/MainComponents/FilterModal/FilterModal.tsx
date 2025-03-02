import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import CheckIcon from '../../../assets/icons/CheckIcon';
import CloseIcon from '../../../assets/icons/CloseIcon';
import {ColorPalette} from '../../../config/colorPalette';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../UserComponents/Button';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {styles} from './FilterModal.styles';
import {FilterModalProps, FilterSection} from './FilterModal.types';

export const FilterModal: React.FC<FilterModalProps> = ({
  isVisible,
  onClose,
  onApply,
  sections,
}) => {
  const [filterSections, setFilterSections] =
    useState<FilterSection[]>(sections);

  const handleOptionPress = (sectionId: string, optionId: string) => {
    setFilterSections(prevSections =>
      prevSections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            options: section.options.map(option => ({
              ...option,
              isSelected:
                option.id === optionId ? !option.isSelected : option.isSelected,
            })),
          };
        }
        return section;
      }),
    );
  };

  const handleReset = () => {
    setFilterSections(prevSections =>
      prevSections.map(section => ({
        ...section,
        options: section.options.map(option => ({
          ...option,
          isSelected: false,
        })),
      })),
    );
  };

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
      onModalHide={onClose}
      swipeDirection="down"
      backdropOpacity={0.5}
      backdropColor={ColorPalette.OPACITY_24}
      onSwipeComplete={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Typography
                variant={TypographyVariant.H5_BOLD}
                text="Apply Filters"
                customTextStyles={styles.title}
              />
              <Typography
                variant={TypographyVariant.LSMALL_REGULAR}
                text="Filter by Status"
                customTextStyles={styles.subtitle}
              />
            </View>
            <TouchableOpacity onPress={onClose}>
              <CloseIcon color={ColorPalette.GREY_TEXT_400} size={24} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {filterSections.map(section => (
              <View key={section.id} style={styles.sectionContainer}>
                {section.options.map(option => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    key={option.id}
                    style={styles.optionContainer}
                    onPress={() => handleOptionPress(section.id, option.id)}>
                    {option.isSelected ? (
                      <CheckIcon size={24} />
                    ) : (
                      <View style={styles.uncheckedBox} />
                    )}
                    <Typography
                      variant={
                        option.isSelected
                          ? TypographyVariant.PMEDIUM_MEDIUM
                          : TypographyVariant.PMEDIUM_REGULAR
                      }
                      text={option.label}
                      customTextStyles={[
                        styles.optionLabel,
                        {
                          color: option.isSelected
                            ? ColorPalette.GREY_TEXT_500
                            : ColorPalette.GREY_TEXT_300,
                        },
                      ]}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <Button
              text="RESET FILTERS"
              onPress={handleReset}
              variant={ButtonVariant.PRIMARY}
              state={ButtonState.DEFAULT}
              type={ButtonType.OUTLINED}
              size={ButtonSize.MEDIUM}
              customStyles={styles.customButton}
            />
            <Button
              text="VIEW RESULTS"
              onPress={() => {
                onApply(filterSections);
                onClose();
              }}
              variant={ButtonVariant.PRIMARY}
              state={ButtonState.DEFAULT}
              size={ButtonSize.MEDIUM}
              customStyles={styles.customButtonTwo}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
