import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {BorderRadius, Spacing} from '../../../config/globalStyles';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.White,
    borderRadius: BorderRadius.Medium,
    padding: Spacing.Medium,
    marginBottom: Spacing.Medium,
    shadowColor: 'rgba(16, 24, 40, 0.08)',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 1,
    shadowRadius: BorderRadius.Medium,
    elevation: 3,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.Medium,
    paddingBottom: Spacing.Medium,
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.SearchBack,
    paddingVertical: getScreenHeight(0.75),
  },
  roleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.Small,
  },
  nameText: {
    color: ColorPalette.GREY_TEXT_500,
  },
  editButton: {
    padding: Spacing.XSmall,
  },
  detailsSection: {
    gap: Spacing.Small,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    color: ColorPalette.GREY_TEXT_100,
    flex: 1,
  },
  valueText: {
    color: ColorPalette.GREY_TEXT_500,
    flex: 1,
    textAlign: 'right',
  },
});
