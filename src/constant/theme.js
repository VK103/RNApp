import { Platform, Dimensions, PixelRatio, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const mainScale = size => (SCREEN_WIDTH / guidelineBaseWidth) * size;
const verticalScale = size => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (mainScale(size) - size) * factor;

const IS_IPAD = SCREEN_HEIGHT / SCREEN_WIDTH < 1.6;
const scale = SCREEN_WIDTH / 320;

function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return DeviceInfo.isTablet()
      ? Math.round(PixelRatio.roundToNearestPixel(newSize)) / 2.1
      : Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return DeviceInfo.isTablet()
      ? Math.round(PixelRatio.roundToNearestPixel(newSize)) / 2
      : Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
}

export const color = {
  transparent: 'transparent',
  black: '#000000',
  white: '#FFFFFF',
  blue: '#006CFA',
  blue2: '#4776E5',
  lightBlue: '#eff1fa',
  darkBlue: '#1a283d',
  skyBlue: '#D1E4FB',
  gray: '#7B6F72',
  gray2: '#ADA4A5',
  extraLightgray: '#f1f1f1',
  backGroundGray: '#EFEFEF',
  backGroundGray2: '#F7F8F8',
  backGroundLogo: '#DBE7F6',
  themeDarkGray: '#B8B4B4',
  themeGray: '#C1C6D3',
  red: '#F24D50',
  lightRed: '#FFE2E3',
  green: '#18A261',
  themeOrnage: '#FF9C27',
  lightgray: 'lightgray',
  defaultGray: 'gray'
};

export const fontSize = {
  xxxxxsmall: normalize(6),
  xxxxsmall: normalize(7),
  xxxsmall: normalize(8),
  xxsmall: normalize(9),
  xsmall: normalize(10),
  minixxxx: normalize(11.2),
  minixxx: normalize(11.4),
  minixx: normalize(11.6),
  minix: normalize(11),
  mini: normalize(12),
  regularx: normalize(13),
  regular: normalize(14),
  small: normalize(15),
  smallx: normalize(16),
  medium: normalize(17),
  mediumx: normalize(18),
  large: normalize(20),
  xlarge: normalize(25),
  xxlarge: normalize(27),
  bigger: normalize(30),
  xbigger: normalize(35),
  xxbigger: normalize(40),
};

export const fontStyle = {
  italic: 'italic',
  normal: 'normal',
};

export const fontFamily = {
  RobotoBlack: 'Roboto-Black',
  RobotoBold: 'Roboto-Bold',
  RobotoItalic: 'Roboto-Italic',
  RobotoLight: 'Roboto-Light',
  RobotoMedium: 'Roboto-Medium',
  RobotoRegular: 'Roboto-Regular',
  RobotoThin: 'Roboto-Thin',
};

export const screen = {
  screen: Dimensions.get('window'),
  isiPAD: DeviceInfo.isTablet(),
  screenHeight: SCREEN_HEIGHT,
  screenWidth: SCREEN_WIDTH,
  fullScreenWidth: SCREEN_WIDTH,
  fullScreenHeight: SCREEN_HEIGHT,
  statusBarHeight: StatusBar.currentHeight,
  maxUIWidth: 500,
  wp,
  hp,
  moderateScale,
};

export const responsiveWidth = percentage => {
  return DeviceInfo.isTablet() ? wp(percentage) : wp(percentage);
};

export const responsiveHeight = percentage => {
  return hp(percentage);
};
