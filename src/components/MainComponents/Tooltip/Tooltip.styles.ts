import {StyleSheet} from 'react-native';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {BorderRadius} from '../../../config/globalStyles';

export const styles = StyleSheet.create({
    tooltipContainer: {
        position: 'absolute',
        borderRadius: BorderRadius.Small,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: BorderRadius.Small,
        paddingHorizontal: getScreenWidth(4.4),
        paddingVertical: getScreenHeight(2.2),
        zIndex: 1000,
        width:getScreenWidth(65)
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        zIndex: 1,
        gap: getScreenWidth(4)
    },
    content: {
        flex: 1,
    },
});