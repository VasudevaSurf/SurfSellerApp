import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {slidingBarStyles} from './SlidingBar.styles';
import {SlidingBarOption, SlidingBarProps} from './SlidingBar.types';
import {CustomSquircle} from '../CustomSquircleMain/CustomSquircle';

export const SlidingBar: React.FC<SlidingBarProps> = ({
  options,
  selectedOption,
  onOptionSelect,
  customContainerStyle,
  customOptionStyle,
  customSelectedStyle,
}) => {
  return (
    <View style={[slidingBarStyles.containerWrapper, customContainerStyle]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={slidingBarStyles.scrollContent}>
        {options.map((option: SlidingBarOption, index: number) => {
          const isSelected = selectedOption.id === option.id;
          const backgroundColor = isSelected
            ? ColorPalette.MainHeading
            : ColorPalette.SearchBack;

          return (
            <TouchableOpacity
              key={option.id}
              onPress={() => onOptionSelect(option)}
              activeOpacity={0.7}>
              <CustomSquircle
                style={[slidingBarStyles.option, customOptionStyle]}
                fillColor={backgroundColor}
                cornerRadius={10}
                cornerSmoothing={1.0}>
                <Typography
                  variant={TypographyVariant.LMEDIUM_REGULAR}
                  text={option.label}
                  customTextStyles={[
                    slidingBarStyles.optionText,
                    isSelected && slidingBarStyles.selectedOptionText,
                  ]}
                />
              </CustomSquircle>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
