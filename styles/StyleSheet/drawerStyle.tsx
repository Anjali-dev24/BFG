import {Dimensions, Platform, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../Colors';

const OS =Platform.OS === 'ios' ? 'Raleway-Bold': 'raleway.bold'

export const drawerStyle = StyleSheet.create({
    headerStyle:{
        flexDirection: 'row',
        paddingVertical: moderateScale(20),
        alignItems: 'center',
        backgroundColor: Colors.extraLightBlue,
        paddingHorizontal: moderateScale(15),
      },
  text:{
    fontSize:moderateScale(25),
    color:"#000",
    fontWeight:"700"
},
textProg:{
    fontSize:moderateScale(15),
    color:"#000"
},
menuContainer: {
    flex: 1,
    marginTop:moderateScale(15)
  },
  profileContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(25),
  },
  profileImage: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(35) / 2,
    borderColor: Colors.greenGradient[0],
    borderWidth: moderateScale(1),
    marginRight: moderateScale(10),
  },
  userName: {
    color: Colors.black,
    fontSize: moderateScale(12),
    fontFamily: 'Lato-Bold',
  },
  editProfile: {
    color: Colors.greenGradient[0],
    fontSize: moderateScale(12),
    fontFamily: 'Lato-Medium',
  },
  ListContainer: {},
  homeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(13),
    width: '100%',
    paddingHorizontal: moderateScale(25),
  },
  home: {
    fontSize: moderateScale(16),
    color: Colors.black,
    fontFamily: 'Lato-Bold',
    //   marginLeft:moderateScale(10)
  },
  logout: {
    fontSize: moderateScale(16),
    color: Colors.red,
  },
  homeIcon: {
    marginRight: moderateScale(10),
  },
  notificationCount: {
    backgroundColor: Colors.red,
    width: moderateScale(14),
    height: moderateScale(14),
    borderRadius: moderateScale(14) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: moderateScale(10),
  },
  count: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: moderateScale(10),
  },
})