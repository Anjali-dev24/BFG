import {Dimensions, Platform, StyleSheet} from 'react-native';
import { moderateScale } from "react-native-size-matters";
import Colors from "../Colors";
const OS =Platform.OS === 'ios' ? 'Raleway-Bold': 'raleway.bold'

export const modalStyle = StyleSheet.create({
  container:{
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(22),
    width:"90%",
    height:"30%",
    backgroundColor:Colors.white,
    borderRadius:moderateScale(12),
    alignSelf:"center",
    elevation:6,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position:"absolute",
    bottom:"30%",
  },
  crossButton:{
    backgroundColor:Colors.transparent,
    position:"absolute",
    right:moderateScale(0),
    top:moderateScale(0)
  },
  gallaryButton:{
    width:"70%"
  }
  })