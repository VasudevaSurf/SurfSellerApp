import React from 'react';
import {TextInput, View} from 'react-native';
import SearchIcon from '../../../assets/icons/SearchIcon';
import {ColorPalette} from '../../../config/colorPalette';
import {styles} from './SearchBox.styles';
import {SearchBoxProps} from './SearchBox.types';

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Search products...',
  value,
  onChangeText,
  testID,
  customContainerStyle,
  customInputStyle,
}) => {
  return (
    <View style={[styles.container, customContainerStyle]} testID={testID}>
      <SearchIcon
        size={20}
        color={ColorPalette.SearchI}
        style={styles.searchIcon}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={ColorPalette.searchIcon}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, customInputStyle]}
      />
    </View>
  );
};
