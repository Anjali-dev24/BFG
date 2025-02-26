import {Platform, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../Colors';
const OS =Platform.OS === 'ios' ? 'Raleway-Bold': 'raleway.bold'

const ResendEmailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.extraLightBlue,
  },
  logoImage:{
    width:moderateScale(176),
    height:moderateScale(67),
    alignSelf:"center",
    resizeMode:"contain"
  },
  wallPapper:{
    width: '100%',
    height: moderateScale(300),
    resizeMode:"stretch",
    marginTop:moderateScale(15)
  },
  message:{
    color:Colors.black,
    fontSize:moderateScale(22),
    fontFamily:OS,
    textAlign:"center",
    marginTop:moderateScale(15)
  },
  buttonContainer:{
  },
  waitingText:{
    color:Colors.black,
    textAlign:"center",
    fontSize:moderateScale(14),
  },
  bottomContainer:{
    backgroundColor:Colors.transparent,
    height:moderateScale(200),
    justifyContent:"space-around",
    position:"absolute",
    bottom:moderateScale(0),
    left:moderateScale(0),
    right:moderateScale(0),
  }
});

export default ResendEmailStyles
