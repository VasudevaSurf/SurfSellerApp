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
    marginLeft: Spacing.XSmall,
  },
  leftIconContainer: {
    paddingVertical: getFigmaDimension(6),
    paddingHorizontal: getFigmaDimension(8),
  },
});
