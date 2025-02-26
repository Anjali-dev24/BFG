import {Dimensions, Platform, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../Colors';

const OS =Platform.OS === 'ios' ? 'Raleway-Bold': 'raleway.bold'

export const dashBoardStyle = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.extraLightBlue,
    
  },
  mainContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems:"center",
  },
  text:{
    fontSize:moderateScale(25),
    color:"#000",
    fontWeight:"700"
},
textProg:{
    fontSize:moderateScale(15),
    color:"#000"
}
})