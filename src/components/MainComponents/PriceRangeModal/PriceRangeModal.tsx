import React, {useState, useEffect} from 'react';
import {Modal as RNModal, TouchableOpacity, View} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
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
import {styles} from './PriceRangeModal.styles';
import {PriceRangeModalProps} from './PriceRangeModal.types';

export const PriceRangeModal: React.FC<PriceRangeModalProps> = ({
  isVisible,
  onClose,
  onApply,
  initialMinPrice = 0,
  initialMaxPrice = 1000,
  minValue = 0,
  maxValue = 1000,
  currency = '€',
  headerText = 'Filter Product',
  containerStyle,
  backdropOpacity = 0.5,
  backdropColor = 'rgba(0,0,0,0.24)',
  step = 1,
}) => {
  const [priceRange, setPriceRange] = useState([
    initialMinPrice,
    initialMaxPrice,
  ]);

  useEffect(() => {
    setPriceRange([initialMinPrice, initialMaxPrice]);
  }, [initialMinPrice, initialMaxPrice, isVisible]);

  const handleSliderChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handleApply = () => {
    onApply(priceRange[0], priceRange[1]);
    onClose();
  };

  const handleCancel = () => {
    setPriceRange([initialMinPrice, initialMaxPrice]);
    onClose();
  };

  const formatPrice = (price: number): string => {
    return `${currency}${price}`;
  };

  const renderCustomMarker = () => {
    return <View style={styles.thumb} />;
  };

  const renderCustomTrack = () => {
    return <View style={styles.track} />;
  };

  const renderSelectedTrack = () => {
    return <View style={[styles.track, styles.selectedTrack]} />;
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
                variant={TypographyVariant.PMEDIUM_REGULAR}
                text={headerText}
                customTextStyles={[
                  styles.headerText,
                  {color: ColorPalette.GREY_TEXT_500},
                ]}
              />
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <CloseIcon color={ColorPalette.GREY_TEXT_400} size={24} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Price Range Section */}
            <View style={styles.priceRangeContainer}>
              <Typography
                variant={TypographyVariant.LMEDIUM_MEDIUM}
                text="Filter Using the Price Range"
                customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
              />
            </View>

            {/* Min/Max Price Labels */}
            <View style={styles.priceLabelsContainer}>
              <Typography
                variant={TypographyVariant.LMEDIUM_REGULAR}
                text={formatPrice(minValue)}
                customTextStyles={styles.priceLabel}
              />
              <Typography
                variant={TypographyVariant.LMEDIUM_REGULAR}
                text={formatPrice(maxValue)}
                customTextStyles={styles.priceLabel}
              />
            </View>

            {/* Multi Slider */}
            <View style={styles.sliderContainer}>
              <MultiSlider
                values={priceRange}
                sliderLength={280}
                onValuesChange={handleSliderChange}
                min={minValue}
                max={maxValue}
                step={step}
                allowOverlap={false}
                snapped={true}
                minMarkerOverlapDistance={40}
                customMarker={renderCustomMarker}
                customTrack={renderCustomTrack}
                selectedStyle={styles.selectedTrack}
                unselectedStyle={styles.track}
                containerStyle={styles.slider}
                trackStyle={styles.track}
                markerStyle={styles.thumb}
                pressedMarkerStyle={[styles.thumb, {transform: [{scale: 1.2}]}]}
              />
            </View>

            {/* Selected Price Values */}
            <View style={styles.selectedPricesContainer}>
              <View style={styles.selectedPriceItem}>
                <Typography
                  variant={TypographyVariant.LSMALL_REGULAR}
                  text="Min Price"
                  customTextStyles={styles.selectedPriceLabel}
                />
                <Typography
                  variant={TypographyVariant.LMEDIUM_BOLD}
                  text={formatPrice(priceRange[0])}
                  customTextStyles={styles.selectedPriceValue}
                />
              </View>
              <View style={styles.separator} />
              <View style={styles.selectedPriceItem}>
                <Typography
                  variant={TypographyVariant.LSMALL_REGULAR}
                  text="Max Price"
                  customTextStyles={styles.selectedPriceLabel}
                />
                <Typography
                  variant={TypographyVariant.LMEDIUM_BOLD}
                  text={formatPrice(priceRange[1])}
                  customTextStyles={styles.selectedPriceValue}
                />
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Button
              text="Cancel"
              onPress={handleCancel}
              variant={ButtonVariant.PRIMARY}
              state={ButtonState.DEFAULT}
              type={ButtonType.OUTLINED}
              size={ButtonSize.MEDIUM}
              customStyles={[styles.button, styles.cancelButton]}
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
