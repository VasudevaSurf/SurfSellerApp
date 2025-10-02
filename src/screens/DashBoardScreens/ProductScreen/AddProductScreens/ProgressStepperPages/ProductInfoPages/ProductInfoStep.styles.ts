import { StyleSheet } from 'react-native';
import { ColorPalette } from '../../../../../../config/colorPalette';
import {
  getScreenWidth,
  getScreenHeight,
} from '../../../../../../helpers/screenSize';
import { BorderRadius } from '../../../../../../config/globalStyles';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: getScreenHeight(1.2),
    marginBottom: getScreenHeight(2),
    backgroundColor: ColorPalette.SearchBack,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: getScreenHeight(1.5),
    backgroundColor: ColorPalette.White,
    gap: getScreenWidth(4),
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    gap: getScreenWidth(1),
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: getScreenWidth(4),
  },
  sectionTitle: {
    color: ColorPalette.GREY_TEXT_500,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: getScreenWidth(4),
  },
  selectContainer: {
    paddingHorizontal: getScreenWidth(4),
    borderWidth: 1,
    borderColor: ColorPalette.GREY_100,
    borderRadius: BorderRadius.XSmall,
    marginHorizontal: getScreenWidth(4),
    paddingVertical: getScreenWidth(4),
  },
  selectBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: getScreenWidth(3),
    // paddingVertical: getScreenHeight(2),
    // borderWidth: 1,
    // borderColor: ColorPalette.GREY_100,
    // borderRadius: BorderRadius.XSmall,
  },
  sectionTwo: {
    display: 'flex',
    backgroundColor: ColorPalette.White,
    gap: getScreenWidth(4),
    paddingVertical: getScreenHeight(1.5),
    paddingHorizontal: getScreenWidth(4),
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
    gap: getScreenWidth(1),
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: BorderRadius.XSmall,
    paddingVertical: getScreenHeight(0.75),
    paddingHorizontal: getScreenWidth(3),
    borderColor: ColorPalette.SearchBack,
  },
  toolbarIcons: {
    display: 'flex',
    flexDirection: 'row',
    gap: getScreenWidth(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbarIconsScrollView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerStyle: {
    backgroundColor: ColorPalette.SearchBack,
    paddingVertical: getScreenHeight(0.8),
    paddingHorizontal: getScreenWidth(2),
    borderRadius: BorderRadius.XSmall,
  },
  textAreaContainer: {
    paddingHorizontal: getScreenWidth(0.2),
  
  },
  textAreaContainerFocused: {
    borderColor: ColorPalette.Primary,
  },
  // textArea: {
  //   flex: 1,
  //   minHeight: getScreenHeight(12.5),
  //   fontFamily: 'Inter-Regular',
  //   fontSize: getScreenWidth(3.5), // Responsive font size
  //   color: ColorPalette.GREY_TEXT_500,
  //   padding: 0,
  // },
  textArea: {
  // flex: 1,
  // minHeight: getScreenHeight(12.5),
  // fontFamily: 'Inter-Regular',
  // fontSize: getScreenWidth(3.5),
  color: ColorPalette.GREY_TEXT_500,
  // paddingTop: getScreenHeight(2), // <-- add top padding
  // paddingHorizontal: getScreenWidth(0.5),
  textAlignVertical: 'top', // keep text starting from top
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
    borderRadius: getScreenWidth(1),
    padding: getScreenWidth(0.5),
  },
  formatButton: {
    height: getScreenWidth(7),
    width: getScreenWidth(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusMain: {
    borderRadius: getScreenWidth(6.1),
    alignSelf: 'flex-start',
  },
  sliderComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: getScreenWidth(4),
  },
});
