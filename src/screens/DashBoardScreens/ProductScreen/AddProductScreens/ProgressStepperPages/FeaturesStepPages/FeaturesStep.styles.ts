import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {
  getScreenWidth,
  getScreenHeight,
} from '../../../../../../helpers/screenSize';
import {BorderRadius, Spacing} from '../../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginBottom: getScreenHeight(2), // Converted from getFigmaDimension(16)
    backgroundColor: ColorPalette.SearchBack,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: getScreenHeight(1.5), // Converted from getFigmaDimension(12)
    backgroundColor: ColorPalette.White,
    gap: getScreenWidth(4), // Converted from getFigmaDimension(16)
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    gap: getScreenWidth(1), // Converted from getFigmaDimension(4)
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: getScreenWidth(4), // Converted from getFigmaDimension(16)
  },
  sectionTitle: {
    color: ColorPalette.GREY_TEXT_500,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenWidth(4), // Converted from getFigmaDimension(16)
    paddingHorizontal: getScreenWidth(4), // Converted from getFigmaDimension(16)
  },
  inputContainerOne: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenWidth(4), // Converted from getFigmaDimension(16)
  },
  selectContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getScreenWidth(3), // Converted from getFigmaDimension(12)
    paddingVertical: getScreenHeight(2.25), // Converted from getFigmaDimension(18)
    borderWidth: 1,
    borderColor: ColorPalette.GREY_100,
    borderRadius: BorderRadius.XSmall, // Using the enum instead of getFigmaDimension(8)
  },
});
