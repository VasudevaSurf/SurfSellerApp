import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import CloseIcon from '../../../assets/icons/CloseIcon';
import {styles} from './AddModal.styles';
import {Button, ButtonVariant} from '../../UserComponents/Button';

interface AddModalProps {
  isVisible: boolean;
  onClose: () => void;
  onUploadCsv: () => void;
  onAddManually: () => void;
}

export const AddModal: React.FC<AddModalProps> = ({
  isVisible,
  onClose,
  onUploadCsv,
  onAddManually,
}) => {
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
      backdropColor="#0000003D"
      onSwipeComplete={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <CloseIcon color={ColorPalette.BorderPrimary} size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Button
            text="Upload CSV file"
            onPress={onUploadCsv}
            variant={ButtonVariant.PRIMARY}
          />
          <Button
            text="Add product Manually"
            onPress={onAddManually}
            variant={ButtonVariant.SECONDARY}
            customTextStyles={styles.customButton}
          />
        </View>
      </View>
    </Modal>
  );
};
