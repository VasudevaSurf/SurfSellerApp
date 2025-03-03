import {StyleSheet} from 'react-native';
import {getScreenWidth, getScreenHeight} from '../../../helpers/screenSize';
import {ColorPalette} from '../../../config/colorPalette';
import {BorderRadius, Spacing} from '../../../config/globalStyles';

export const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  scrollContent: {
    gap: getScreenWidth(4),
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: Spacing.Small,
    paddingHorizontal: Spacing.Medium,
    backgroundColor: ColorPalette.White,
    gap: Spacing.Small,
    marginTop: getScreenHeight(2),
  },
  imageContainer: {
    width: getScreenWidth(15),
    height: getScreenWidth(15),
    borderRadius: BorderRadius.XSmall,
    overflow: 'hidden',
  },
  orderImage: {
    width: '100%',
    height: '100%',
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: Spacing.Zero,
  },
  profileName: {
    color: ColorPalette.GREY_TEXT_500,
  },
  profileCaption: {
    color: ColorPalette.GREY_TEXT_300,
  },
  salesContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: Spacing.XSmall,
    paddingVertical: Spacing.Small,
    paddingHorizontal: Spacing.Medium,
    backgroundColor: ColorPalette.White,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  twoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: Spacing.XSmall,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingHorizontal: Spacing.XSmall,
    paddingVertical: Spacing.XSmall,
    borderRadius: BorderRadius.Small,
    borderColor: ColorPalette.SearchBack,
  },
  iconBack: {
    display: 'flex',
    borderRadius: BorderRadius.XSmall,
    padding: Spacing.XSmall,
    backgroundColor: ColorPalette.SmallIconBack,
  },
  iconBackOne: {
    display: 'flex',
    borderRadius: BorderRadius.XSmall,
    padding: Spacing.XSmall,
    backgroundColor: ColorPalette.SmallIconBack2,
  },
  salesTwo: {
    display: 'flex',
    flexDirection: 'column',
  },
  countValue: {
    color: ColorPalette.GREY_TEXT_500,
  },
  countCaption: {
    color: ColorPalette.GREY_TEXT_300,
  },
  profileOptionsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  customButton: {
    borderWidth: 1,
    borderColor: ColorPalette.GREY_200,
  },
  customText: {
    color: ColorPalette.GREY_TEXT_100,
  },
});
