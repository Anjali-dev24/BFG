import {Dimensions, Platform, StyleSheet} from 'react-native';
import { moderateScale } from "react-native-size-matters";
import Colors from "../Colors";
const OS =Platform.OS === 'ios' ? 'Raleway-Bold': 'raleway.bold'

export const swiperButtonComponentStyle = StyleSheet.create({
    container: {
      backgroundColor: Colors.greenGradient[0],
      paddingVertical: 10,
      borderRadius: 8,
      paddingHorizontal: 20,
    },
    buttonTextStyle: {
      color: '#fff',
    },
  });