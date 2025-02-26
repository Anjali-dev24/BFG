import {Dimensions, Platform, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../Colors';
const OS = Platform.OS === 'ios' ? 'Raleway-Bold' : 'raleway.bold';

export const headerComponentStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: moderateScale(18),
  },
  menuIcon: {
    position: 'absolute',
    left: moderateScale(20),
    index: 1,
  },
  title: {
    textAlign: 'center',
    width: '100%',
    fontSize: moderateScale(22),
    fontFamily: OS,
    color: Colors.black,
  },
  menuButton: {
    position: 'absolute',
    paddingVertical: moderateScale(20),
    left: moderateScale(10),
    zIndex: 1,
  },
});
