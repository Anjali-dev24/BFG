import {Dimensions, Platform, StyleSheet} from 'react-native';
import { moderateScale } from "react-native-size-matters";
import Colors from "../Colors";
const OS =Platform.OS === 'ios' ? 'Raleway-Bold': 'raleway.bold'

export const buttonComponentStyle = StyleSheet.create({
    container: {
      backgroundColor: 'green',
      margin: moderateScale(15),
      borderRadius: moderateScale(5),
    },
    buttonTitleStyle: {
      color: Colors.white,
      textAlign: 'center',
      fontSize: moderateScale(14),
      fontFamily:"Lato-Heavy"
    },
    buttonContainer: {
      padding: moderateScale(10),
      borderRadius: moderateScale(5),
    },
  });