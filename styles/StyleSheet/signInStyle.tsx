import {Dimensions, Platform, StyleSheet} from 'react-native';
import { moderateScale } from "react-native-size-matters";
import Colors from "../Colors";
const OS =Platform.OS === 'ios' ? 'Raleway-Bold': 'raleway.bold'

export const signInStyle = StyleSheet.create({
    container: {
        paddingBottom:'80%',
        backgroundColor: Colors.extraLightBlue,
      },
      signInLogoStyle: {
        alignSelf: 'center',
        width: "100%",
        height: "50%",
        resizeMode:"stretch"
      },
    rememberMeContainer:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      marginHorizontal:moderateScale(18),
      marginVertical:moderateScale(20)
    },
    rememberMe:{
      flexDirection:"row",
      alignItems:"center"
    },
    rememberMeText:{
      marginLeft:moderateScale(10),
      fontFamily:"Lato-Medium",
      color:Colors.gray
    },
    passwordRecoveryText:{
      fontFamily:"Lato-Medium",
      color:Colors.gray
    },
    eyeEnable:{
        position:"absolute",
        right:moderateScale(0),
        bottom:moderateScale(0),
        backgroundColor:Colors.transparent,
        width:moderateScale(25),
        height:moderateScale(25),
      },
      createAccountStyle: {
        fontSize: moderateScale(22),
        color: Colors.darkGray,
        textAlign: 'center',
        marginTop: moderateScale(10),
        fontFamily: OS
      },
      signInOptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
      },
      signInButton: {
        backgroundColor: Colors.transparent,
        margin: moderateScale(0),
      },
      signInTextStyle: {
        color: Colors.blue,
        textDecorationLine:"underline",
        fontFamily:"Lato-Medium"
      },
      alreadyAccountText: {
        color: Colors.black,
        fontFamily:"Lato-Medium"
      },
      eyeIconContainer:{width:moderateScale(30), height:moderateScale(30)}
  })