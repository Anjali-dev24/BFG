import {Dimensions, Platform, StyleSheet} from 'react-native';
import { moderateScale } from "react-native-size-matters";
import Colors from "../Colors";
const OS =Platform.OS === 'ios' ? 'Raleway-Bold': 'raleway.bold'

export const appContainerStyle = StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: Colors.extraLightBlue,
      paddingTop:moderateScale(20)
    },
  });