import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {getFigmaDimension} from '../../../../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: getFigmaDimension(12),
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
  },
  selectContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getFigmaDimension(12),
    paddingVertical: getFigmaDimension(16),
    borderWidth: 1,
    borderColor: ColorPalette.GREY_100,
    borderRadius: getFigmaDimension(8),
  },
  sectionTwo: {
    display: 'flex',
    backgroundColor: ColorPalette.White,
    gap: getFigmaDimension(16),
    paddingVertical: getFigmaDimension(12),
    paddingHorizontal: getFigmaDimension(16),
  },
  sectionTwoHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  descContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: getFigmaDimension(4),
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: getFigmaDimension(8),
    paddingVertical: getFigmaDimension(6),
    paddingHorizontal: getFigmaDimension(12),
    borderColor: ColorPalette.SearchBack,
  },
  toolbarIcons: {
    display: 'flex',
    flexDirection: 'row',
    gap: getFigmaDimension(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStyle: {
    backgroundColor: ColorPalette.SearchBack,
    paddingVertical: getFigmaDimension(6),
    paddingHorizontal: getFigmaDimension(8),
    borderRadius: getFigmaDimension(8),
  },
  textAreaContainer: {
    borderRadius: getFigmaDimension(8),
    borderWidth: 1,
    borderColor: ColorPalette.SearchBack,
    paddingHorizontal: getFigmaDimension(12),
    paddingVertical: getFigmaDimension(8),
    minHeight: getFigmaDimension(160),
  },
  textAreaContainerFocused: {
    borderColor: ColorPalette.Primary,
  },
  textArea: {
    flex: 1,
    minHeight: getFigmaDimension(100),
    fontFamily: 'Inter-Regular',
    fontSize: getFigmaDimension(14),
    color: ColorPalette.GREY_TEXT_500,
    padding: 0,
  },
  boldText: {
    fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  activeFormatButton: {
    backgroundColor: ColorPalette.Primary + '10',
    borderRadius: getFigmaDimension(4),
    padding: getFigmaDimension(2),
  },
});
