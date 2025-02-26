import {Dimensions, Platform, StyleSheet} from 'react-native';
import { moderateScale } from "react-native-size-matters";
import Colors from "../Colors";
const OS =Platform.OS === 'ios' ? 'Raleway-Bold': 'raleway.bold'

export const slideComponentStyle = StyleSheet.create({
    container: {
      flex: 0.9,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.extraLightBlue,
      width: '100%',
      height:'70%'
    },
    textStyle: {
      color: Colors.white,
    },
    imageContainer: {
      width: '100%',
      height: '60%',
      paddingBottom: moderateScale(20),
    },
    image: {},
    titleStyle: {
      color: Colors.darkGray,
      fontFamily:OS,
      fontSize: moderateScale(25),
      padding: moderateScale(15),
    },
    accountingImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'stretch',
    },
  });