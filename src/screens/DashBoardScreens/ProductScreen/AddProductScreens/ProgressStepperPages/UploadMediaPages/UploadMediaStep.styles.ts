import {StyleSheet} from 'react-native';
import {getFigmaDimension} from '../../../../../../helpers/screenSize';
import {ColorPalette} from '../../../../../../config/colorPalette';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: getFigmaDimension(20),
    marginBottom: getFigmaDimension(16),
    backgroundColor: ColorPalette.SearchBack,
  },
  mainHeader: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: getFigmaDimension(12),
    paddingHorizontal: getFigmaDimension(16),
    gap: getFigmaDimension(16),
    backgroundColor: ColorPalette.White,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: getFigmaDimension(4),
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: getFigmaDimension(16),
    alignItems: 'center',
    justifyContent: 'center',
    gap: getFigmaDimension(12),
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: ColorPalette.SearchBack,
    borderRadius: getFigmaDimension(8),
  },
  uploadBox: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: getFigmaDimension(16),
  },
  buttonMain: {
    shadowColor: 'rgba(16, 24, 40, 0.08)',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 6,
  },
  tipsContainer: {
    paddingVertical: getFigmaDimension(12),
    paddingHorizontal: getFigmaDimension(16),
  },
  mainTips: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ColorPalette.White,
    padding: getFigmaDimension(16),
    gap: getFigmaDimension(16),
    borderRadius: getFigmaDimension(12),
  },
  tipMatter: {
    display: 'flex',
    flexDirection: 'column',
    gap: getFigmaDimension(20),
  },
  tipRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: getFigmaDimension(8),
  },
  tipIcon: {
    height: getFigmaDimension(40),
    width: getFigmaDimension(40),
    resizeMode: 'contain',
  },
  uploadProgress: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ColorPalette.White,
    padding: getFigmaDimension(12),
    gap: getFigmaDimension(12),
  },
  mainProgress: {
    display: 'flex',
    flexDirection: 'column',
    gap: getFigmaDimension(4),
  },
  progressHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageShowing: {
    display: 'flex',
    flexDirection: 'row',
    gap: getFigmaDimension(6),
  },
  sampleImage: {
    width: 60,
    height: 60,
  },
  progressLine: {
    backgroundColor: ColorPalette.ProgressLine,
    borderRadius: getFigmaDimension(8),
    height: getFigmaDimension(8),
  },
  progressPercent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  showCaseContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getFigmaDimension(12),
    paddingVertical: getFigmaDimension(12),
    paddingHorizontal: getFigmaDimension(16),
    backgroundColor: ColorPalette.White,
  },
  showCaseHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  customButton: {
    borderWidth: 1,
    borderColor: ColorPalette.PURPLE_300,
  },
  customText: {
    color: ColorPalette.GREY_TEXT_400,
  },
});
