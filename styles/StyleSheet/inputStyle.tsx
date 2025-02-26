import {Dimensions, Platform, StyleSheet} from 'react-native';
import { moderateScale } from "react-native-size-matters";
import Colors from "../Colors";
const OS =Platform.OS === 'ios' ? 'Raleway-Bold': 'raleway.bold'

export const inputStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
    },
    inputErrorLabelStyle:{backgroundColor: Colors.transparent,
    color: "red",
    fontSize: moderateScale(11),
    fontFamily:"Lato-Light",
    paddingHorizontal:moderateScale(18),
  },
    input: {
      color: Colors.darkGray,
      borderColor: Colors.darkGray,
      borderWidth: moderateScale(0.5),
      backgroundColor: Colors.extraLightGray,
      paddingVertical: moderateScale(12),
      paddingHorizontal: moderateScale(18),
      marginVertical: moderateScale(12),
      marginHorizontal:moderateScale(15),
      borderRadius: moderateScale(5),
      fontFamily:"Lato-Light"
    },
    eyeIconStyle:{
      position:"absolute",
      right:moderateScale(10),
      bottom:moderateScale(0),
      backgroundColor:Colors.transparent
    },
    eyeEnable:{
      position:"absolute",
      right:moderateScale(10),
      bottom:moderateScale(30),
      backgroundColor:Colors.transparent,
      width:moderateScale(25),
      height:moderateScale(25)
    },
    inputText:{
      color:Colors.gray
    }
  });