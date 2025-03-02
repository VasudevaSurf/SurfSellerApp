import {StyleSheet} from 'react-native';
import {BorderRadius, Spacing} from '../../../config/globalStyles';
import {ColorPalette} from '../../../config/colorPalette';
import {getFigmaDimension, getScreenWidth} from '../../../helpers/screenSize';

export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.Medium,
    paddingVertical: Spacing.Small,
    backgroundColor: ColorPalette.White,
    width: '100%',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getFigmaDimension(4),
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getFigmaDimension(16),
  },
  profileImage: {
    width: getScreenWidth(8),
    height: getScreenWidth(8),
    borderRadius: BorderRadius.Full,
  },
  iconButton: {
    padding: Spacing.XXSmall,
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: Spacing.XSmall,
    alignItems: 'center',
    justifyContent: 'center',
    gap: getFigmaDimension(2),
  },
  leftIconContainer: {
    paddingVertical: getFigmaDimension(6),
    paddingHorizontal: getFigmaDimension(8),
  },
  badgeWrapper: {
    alignSelf: 'flex-start',
    marginTop: getFigmaDimension(2),
  },
  badgeContainer: {
    backgroundColor: ColorPalette.Green_200,
    paddingVertical: getFigmaDimension(2),
    paddingHorizontal: getFigmaDimension(6),
    minWidth: 0,
    alignSelf: 'flex-start',
  },
});
