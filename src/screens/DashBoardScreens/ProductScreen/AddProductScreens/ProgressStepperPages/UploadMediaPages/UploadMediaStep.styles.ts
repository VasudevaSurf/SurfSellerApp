import {StyleSheet} from 'react-native';
import {
  getScreenWidth,
  getScreenHeight,
} from '../../../../../../helpers/screenSize';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {BorderRadius} from '../../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: getScreenHeight(2.5),
    marginBottom: getScreenHeight(2),
    backgroundColor: ColorPalette.SearchBack,
  },
  mainHeader: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
    gap: getScreenWidth(4),
    backgroundColor: ColorPalette.White,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: getScreenWidth(1),
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: getScreenWidth(4),
    alignItems: 'center',
    justifyContent: 'center',
    gap: getScreenWidth(3),
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: ColorPalette.SearchBack,
    borderRadius: BorderRadius.XSmall,
  },
  uploadBox: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: getScreenWidth(4),
  },
  tipsContainer: {
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
  },
  mainTips: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ColorPalette.White,
    padding: getScreenWidth(4),
    gap: getScreenWidth(4),
    borderRadius: BorderRadius.Small,
  },
  tipMatter: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenHeight(2.5),
  },
  tipRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: getScreenWidth(2),
  },
  tipIcon: {
    height: getScreenWidth(10),
    width: getScreenWidth(10),
    resizeMode: 'contain',
  },
  uploadProgress: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: ColorPalette.White,
    padding: getScreenWidth(3),
    gap: getScreenWidth(3),
  },
  mainProgress: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenWidth(1),
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
    gap: getScreenWidth(1.5),
  },
  sampleImage: {
    width: getScreenWidth(15),
    height: getScreenWidth(15),
  },
  progressLine: {
    backgroundColor: ColorPalette.ProgressLine,
    borderRadius: BorderRadius.XSmall,
    height: getScreenHeight(1),
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
    gap: getScreenWidth(3),
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
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
