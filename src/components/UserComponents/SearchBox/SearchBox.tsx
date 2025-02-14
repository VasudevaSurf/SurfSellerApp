import React from 'react';
import {View, TextInput} from 'react-native';
import {SearchBoxProps} from './SearchBox.types';
import {styles} from './SearchBox.styles';
import {ColorPalette} from '../../../config/colorPalette';
import SearchIcon from '../../../assets/icons/SearchIcon';

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
