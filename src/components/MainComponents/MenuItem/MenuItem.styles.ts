import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenWidth} from '../../../helpers/screenSize';
import {BorderRadius, Spacing} from '../../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.Small,
    paddingHorizontal: Spacing.Medium,
    backgroundColor: ColorPalette.White,
  },
  bottomBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: ColorPalette.GREY_200,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.XSmall,
  },
  leftIconContainer: {
    paddingVertical: Spacing.XXSmall,
    paddingHorizontal: Spacing.XSmall,
  },
  rightIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  subtitleText: {
    color: ColorPalette.GREY_TEXT_200,
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
