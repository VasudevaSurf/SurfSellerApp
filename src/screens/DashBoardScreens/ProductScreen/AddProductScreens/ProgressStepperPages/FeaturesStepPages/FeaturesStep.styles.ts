import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {getFigmaDimension} from '../../../../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginBottom: getFigmaDimension(16),
    backgroundColor: ColorPalette.SearchBack,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: getFigmaDimension(12),
    backgroundColor: ColorPalette.White,
    gap: getFigmaDimension(16),
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    gap: getFigmaDimension(4),
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: getFigmaDimension(16),
  },
  sectionTitle: {
    color: ColorPalette.GREY_TEXT_500,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getFigmaDimension(16),
    paddingHorizontal: getFigmaDimension(16),
  },
  inputContainerOne: {
    display: 'flex',
    flexDirection: 'column',
    gap: getFigmaDimension(16),
  },
  selectContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getFigmaDimension(12),
    paddingVertical: getFigmaDimension(18),
    borderWidth: 1,
    borderColor: ColorPalette.GREY_100,
    borderRadius: getFigmaDimension(8),
  },
});
