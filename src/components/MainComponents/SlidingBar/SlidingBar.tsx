import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {slidingBarStyles} from './SlidingBar.styles';
import {SlidingBarOption, SlidingBarProps} from './SlidingBar.types';

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
        {options.map((option: SlidingBarOption, index: number) => (
          <TouchableOpacity
            key={option.id}
            style={[
              slidingBarStyles.option,
              {backgroundColor: ColorPalette.SearchBack},
              selectedOption.id === option.id &&
                slidingBarStyles.selectedOption,
              customOptionStyle,
              selectedOption.id === option.id && customSelectedStyle,
            ]}
            onPress={() => onOptionSelect(option)}
            activeOpacity={0.7}>
            <Typography
              variant={TypographyVariant.LMEDIUM_REGULAR}
              text={option.label}
              customTextStyles={[
                slidingBarStyles.optionText,
                selectedOption.id === option.id &&
                  slidingBarStyles.selectedOptionText,
              ]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
