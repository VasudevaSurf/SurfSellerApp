// src/screens/DashBoardScreens/AccountScreen/AccountOptionScreens/PersonalInfo/DescriptionTab.tsx

import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {Badge} from '../../../../../../components/UserComponents/Badges/Badge';
import {BadgeVariant} from '../../../../../../components/UserComponents/Badges/Badge.types';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../../../../../components/UserComponents/Button';
import ArrowDownIcon from '../../../../../../assets/icons/ArrowDownIcon';
import TextSymbolIcon from '../../../../../../assets/icons/NewProductIcons/TextSymbolIcon';
import UnderlineIcon from '../../../../../../assets/icons/NewProductIcons/UnderlineIcon';
import PencilUnderlineIcon from '../../../../../../assets/icons/NewProductIcons/PencilUnderlineIcon';
import UnderlineTextIcon from '../../../../../../assets/icons/NewProductIcons/UnderlineTextIcon';
import AlignTextLeftIcon from '../../../../../../assets/icons/NewProductIcons/AlignTextLeftIcon';
import AlignTextCenterIcon from '../../../../../../assets/icons/NewProductIcons/AlignTextCenterIcon';
import AlignTextRightIcon from '../../../../../../assets/icons/NewProductIcons/AlignTextRightIcon';
import {styles} from '../PerosanlInfo.styles';
import {getScreenHeight} from '../../../../../../helpers/screenSize';
import {updateProfile} from '../../../../../../redux/slices/profileSlice';
import {RootState, AppDispatch} from '../../../../../../redux/store';
import Svg, {Circle, Path} from 'react-native-svg';

const InfoIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Circle
      cx="9.99984"
      cy="9.99996"
      r="8.33333"
      stroke="#4A4A4A"
      strokeWidth="1.5"
    />
    <Path
      d="M9.99325 12.5H10.0007"
      stroke="#4A4A4A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 10L10 6.66667"
      stroke="#4A4A4A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface DescriptionTabProps {
  companyDescription: string;
  setCompanyDescription: (text: string) => void;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({
  companyDescription,
  setCompanyDescription,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const [localDescription, setLocalDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [textAlignment, setTextAlignment] = useState<
    'left' | 'center' | 'right'
  >('left');
  const [textFormat, setTextFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  useEffect(() => {
    if (companyDescription && !isEditing) {
      setLocalDescription(companyDescription);
    }
  }, [companyDescription]);

  const toggleTextFormat = (format: 'bold' | 'italic' | 'underline') => {
    setTextFormat(prev => ({
      ...prev,
      [format]: !prev[format],
    }));
  };

  const handleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
    setTextAlignment(alignment);
  };

  const handleSave = async () => {
    if (!userData?.user_id) {
      Alert.alert('Error', 'User not found. Please login again.');
      return;
    }

    try {
      await dispatch(
        updateProfile({
          userId: userData.user_id,
          profileData: {
            company_description: localDescription,
          },
        }),
      ).unwrap();

      setCompanyDescription(localDescription);
      setIsEditing(false);
      Alert.alert('Success', 'Company description updated successfully');
    } catch (error: any) {
      Alert.alert(
        'Update Failed',
        error.message || 'Failed to update description',
      );
    }
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={[
        styles.scrollContent,
        {paddingTop: getScreenHeight(2)},
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      <View style={styles.mainContainerTwo}>
        <View style={styles.taxCheckContainer}>
          <View style={{flexDirection: 'row', gap: 5, marginBottom: 16}}>
            <Typography
              text="Description"
              variant={TypographyVariant.LMEDIUM_EXTRABOLD}
              customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
            />
            <InfoIcon />
          </View>

          {/* Toolbar */}
          <View style={styles.toolbar}>
            <Badge
              text="Paragraph"
              variant={BadgeVariant.FILLED}
              rightIcon={ArrowDownIcon}
              onPress={e => {
                e.stopPropagation();
              }}
              textVariant={TypographyVariant.LSMALL_REGULAR}
              customContainerStyle={styles.containerStyle}
              customTextColor={ColorPalette.GREY_TEXT_400}
              iconSize={16}
            />

            <View style={styles.toolbarIcons}>
              <TouchableOpacity
                onPress={() => toggleTextFormat('bold')}
                style={[textFormat.bold && styles.activeFormatButton]}>
                <Typography
                  variant={TypographyVariant.LMEDIUM_EXTRASEMIBOLD}
                  text="B"
                  customTextStyles={{
                    color: textFormat.bold
                      ? ColorPalette.Primary
                      : ColorPalette.GREY_TEXT_400,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleTextFormat('italic')}
                style={[textFormat.italic && styles.activeFormatButton]}>
                <TextSymbolIcon
                  style={undefined}
                  size={18}
                  color={
                    textFormat.italic
                      ? ColorPalette.Primary
                      : ColorPalette.GREY_TEXT_400
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleTextFormat('underline')}
                style={[textFormat.underline && styles.activeFormatButton]}>
                <UnderlineIcon
                  style={undefined}
                  size={18}
                  color={
                    textFormat.underline
                      ? ColorPalette.Primary
                      : ColorPalette.GREY_TEXT_400
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <PencilUnderlineIcon style={undefined} size={18} />
              </TouchableOpacity>
              <TouchableOpacity>
                <UnderlineTextIcon style={undefined} size={18} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAlignmentChange('left')}
                style={[textAlignment === 'left' && styles.activeFormatButton]}>
                <AlignTextLeftIcon
                  style={undefined}
                  size={18}
                  color={
                    textAlignment === 'left'
                      ? ColorPalette.Primary
                      : ColorPalette.GREY_TEXT_400
                  }
                  strokeWidth={1.5}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAlignmentChange('center')}
                style={[
                  textAlignment === 'center' && styles.activeFormatButton,
                ]}>
                <AlignTextCenterIcon
                  style={undefined}
                  size={18}
                  color={
                    textAlignment === 'center'
                      ? ColorPalette.Primary
                      : ColorPalette.GREY_TEXT_400
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAlignmentChange('right')}
                style={[
                  textAlignment === 'right' && styles.activeFormatButton,
                ]}>
                <AlignTextRightIcon
                  style={undefined}
                  size={18}
                  color={
                    textAlignment === 'right'
                      ? ColorPalette.Primary
                      : ColorPalette.GREY_TEXT_400
                  }
                  strokeWidth={1.5}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Text Area */}
          <View
            style={[
              styles.textAreaContainer,
              isEditing && styles.textAreaContainerFocused,
            ]}>
            <TextInput
              style={[
                styles.textArea,
                {textAlign: textAlignment},
                textFormat.bold && styles.boldText,
                textFormat.italic && styles.italicText,
                textFormat.underline && styles.underlineText,
              ]}
              placeholder="Enter company description..."
              placeholderTextColor={ColorPalette.PlaceholderText}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
              value={localDescription}
              onChangeText={text => {
                setLocalDescription(text);
                if (!isEditing) setIsEditing(true);
              }}
              onFocus={() => setIsEditing(true)}
              onBlur={() => {}}
            />
          </View>

          {/* Save Button */}
          <View style={{marginTop: getScreenHeight(2)}}>
            <Button
              text="SAVE CHANGES"
              variant={ButtonVariant.PRIMARY}
              state={ButtonState.DEFAULT}
              size={ButtonSize.MEDIUM}
              onPress={handleSave}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DescriptionTab;
