import {StyleSheet} from 'react-native';
import {BorderRadius, Spacing} from '../../../config/globalStyles';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenWidth} from '../../../helpers/screenSize';

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
    gap: Spacing.XXSmall,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.Medium,
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
    gap: Spacing.Zero,
  },
  leftIconContainer: {
    paddingVertical: Spacing.XXSmall,
    paddingHorizontal: Spacing.XXSmall,
  },
  badgeWrapper: {
    alignSelf: 'flex-start',
    marginTop: Spacing.Zero,
  },
  badgeContainer: {
    backgroundColor: ColorPalette.Green_200,
    paddingVertical: getScreenWidth(0.5),
    paddingHorizontal: Spacing.XXSmall,
    minWidth: 0,
    alignSelf: 'flex-start',
  },
});
