import {Dimensions, Platform, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../Colors';
const OS = Platform.OS === 'ios' ? 'Raleway-Bold' : 'raleway.bold';

export const forgotPasswordStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.extraLightBlue,
  },
  mainContainer: {flex: 1, backgroundColor: Colors.extraLightBlue,},
  screenLogoStyle: {
    alignSelf: 'center',
    width: '100%',
    height: '30%',
    resizeMode: 'stretch',
  },
  inputContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
  },
  title: {
    textAlign: 'center',
    color: Colors.darkGray,
    fontFamily: OS,
    fontSize: moderateScale(22),
  },
  recoveryText: {
    color: Colors.darkGray,
    fontSize: moderateScale(14),
    fontFamily: 'Lato-Light',
    textAlign: 'center',
    marginTop: moderateScale(10),
  },
  inputStyle: {
    marginTop: moderateScale(20),
  },
  buttonStyle: {
    fontFamily: 'Lato-Heavy',
  },
  textInputStyle: {
    paddingVertical: moderateScale(10),
  },
});
