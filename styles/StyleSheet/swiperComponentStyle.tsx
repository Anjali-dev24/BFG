import {Dimensions, Platform, StyleSheet} from 'react-native';
import { moderateScale } from "react-native-size-matters";
import Colors from "../Colors";
const OS =Platform.OS === 'ios' ? 'Raleway-Bold': 'raleway.bold'

export const swiperComponentStyle = StyleSheet.create({
    solutionSlide: {
      flex: 1,
      backgroundColor: Colors.extraLightBlue,
    },
    buttonPadding:{
      padding:moderateScale(0),
    },
    skipButtonContainer:{
      backgroundColor:Colors.transparent
    },
    bottomSwipeButtons:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: moderateScale(0),
      left: moderateScale(0),
      right: moderateScale(0),
      backgroundColor:Colors.transparent
    },
    skipButtonText:{
     color:Colors.darkGray
    },
    backIcon:{
      backgroundColor: Colors.transparent,
      paddingHorizontal:moderateScale(15),
    },
    safetyText: {
      color: Colors.black,
      fontSize: moderateScale(25),
      fontWeight: 'bold',
      textAlign: 'center',
      position: 'absolute',
      bottom: '15%',
    },
    textContainer: {
      position: 'absolute',
      top: moderateScale(15),
      alignItems: 'center',
    },
    taxesTitle: {
      color: Colors.black,
      fontSize: moderateScale(25),
      fontFamily:OS
    },
    suggestion: {
      textAlign: 'center',
      color: Colors.black,
      fontFamily:"Lato-Light",
      width: moderateScale(250),
    },
    next: {
      position: 'absolute',
      bottom: moderateScale(10),
      right: moderateScale(10),
      paddingLeft:moderateScale(15),
      paddingRight:moderateScale(15)
    },
    taxesSlide: {
      flex: 1,
      backgroundColor: Colors.extraLightBlue,
    },
    documentSlide: {
      flex: 1,
      backgroundColor: Colors.extraLightBlue,
    },
    textStyle: {
      color: Colors.black,
    },
    imageContainer: {
      width: '100%',
      height: '80%',
    },
    safetyImageContainer: {
      width: '100%',
      height: '70%',
      position: 'absolute',
      top: moderateScale(0),
    },
    sliderTitle: {
      position: 'absolute',
      bottom: '0%',
      textAlign: 'center',
    },
    ListingImage: {
      width: '100%',
      height: '83%',
      position: 'absolute',
      top: '5%',
      resizeMode:"stretch",
    },
    safetyImage:{
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0%',
      resizeMode:"stretch"
    },
    accountingImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'stretch',
      marginTop:moderateScale(30)
    },
    disableDot: {
      backgroundColor: Colors.transparent,
      width: moderateScale(8),
      height: moderateScale(8),
      borderRadius: moderateScale(4),
      marginLeft: moderateScale(3),
      marginRight: moderateScale(3),
      marginTop: moderateScale(3),
      marginBottom: moderateScale(13),
      borderColor: Colors.greenGradient[0],
      borderWidth: 1,
    },
    activeDot: {
      backgroundColor: Colors.greenGradient[0],
      width: moderateScale(35),
      height: moderateScale(8),
      borderRadius: moderateScale(4),
      marginLeft: moderateScale(3),
      marginRight: moderateScale(3),
      marginTop: moderateScale(3),
      marginBottom: moderateScale(13),
    },
    skipButtontext: {
      color: Colors.black,
      fontFamily:"Lato-Heavy"
    },
  });