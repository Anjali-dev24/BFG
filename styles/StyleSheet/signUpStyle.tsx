import {Dimensions, Platform, StyleSheet} from 'react-native';
import { moderateScale } from "react-native-size-matters";
import Colors from "../Colors";
const OS =Platform.OS === 'ios' ? 'Raleway-Bold': 'raleway.bold'

export const signUpStyle = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingBottom:moderateScale(10),
      backgroundColor: Colors.extraLightBlue,
    },
    onCloseStyle:{width:moderateScale(40), height:moderateScale(40), borderRadius:moderateScale(40)/2},
    signInLogoStyle: {
      alignSelf: 'center',
      width: "100%",
      height: "60%",
      resizeMode:"stretch"
    },
    signUpLogoStyle: {
      alignSelf: 'center',
      width: "100%",
      height: "35%",
      resizeMode:"stretch"
    },
    ribbenImage: {
      resizeMode: 'stretch',
      width: '100%',
      height: '60%',
    },
    ribbenImageContainer: {
      backgroundColor: Colors.transparent,
      position: 'absolute',
      index: 1,
      width: '100%',
      height: moderateScale(350),
      top: moderateScale(-50),
    },
    createAccountStyle: {
      fontSize: moderateScale(22),
      color: Colors.darkGray,
      textAlign: 'center',
      marginTop: moderateScale(10),
      fontFamily: OS
    },
    otherOpions: {
      borderColor: Colors.lightGray,
      borderWidth: moderateScale(0.5),
      width: Dimensions.get('window').width / 4.5,
      height: moderateScale(0),
    },
    optionsStyle: {
      paddingHorizontal: moderateScale(10),
      color: Colors.black,
      fontFamily:"Lato-Bold"
    },
    optionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: moderateScale(10),
      marginBottom: moderateScale(20),
    },
    otherOptionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: moderateScale(10),
    },
    googleIcon: {
      marginHorizontal: moderateScale(10),
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
    FacebookButton: {
      backgroundColor: Colors.transparent,
      margin: moderateScale(-6),
    },
    alreadyAccountText: {
      color: Colors.black,
      fontFamily:"Lato-Medium"
    },
    imagePicker: {
      width: moderateScale(80),
      height: moderateScale(80),
      borderRadius: moderateScale(80) / 2,
      borderColor: Colors.lightGray,
      borderWidth: moderateScale(1),
      alignSelf: 'center',
      marginTop: moderateScale(10),
      alignItems:"center",
      justifyContent:"center"
    },
    pickerImageStyle:{
      width: moderateScale(80),
      height: moderateScale(80),
      borderRadius: moderateScale(80) / 2,
      resizeMode:"contain",
    },
    selectedImage:{
      width: moderateScale(80),
      height: moderateScale(80),
      borderRadius: moderateScale(80) / 2,
    },
    eyeEnable:{
        position:"absolute",
        right:moderateScale(0),
        bottom:moderateScale(0),
        backgroundColor:Colors.transparent,
        width:moderateScale(25),
        height:moderateScale(25)
      },
      indicatorStyle:{
              
        width: moderateScale(33),
        height: moderateScale(33),
        borderRadius: moderateScale(33) / 2,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:moderateScale(1)
      },
      eyeIconContainer:{width:moderateScale(30), height:moderateScale(30)},
      progressContainer:{
        flexDirection:"row",
        alignItems:"center",
         justifyContent: 'space-between',
         width:"45%",
         alignSelf:"center"
      },
      borderStyle:{
        borderColor:Colors.greenGradient[1],
        borderWidth:moderateScale(1),
        position:"absolute",
        zIndex:0,
        width:"100%",
        right:moderateScale(0)
      },
      calenderStyle:{
        position:"absolute",
        top:moderateScale(-30),
      },
      dateOfBirth:{
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.gray,
        borderWidth: moderateScale(1),
        padding: moderateScale(16),
        margin: moderateScale(15),
        borderRadius: moderateScale(5),
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
      },
      dropDown:{
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.gray,
        borderWidth: moderateScale(1),
        paddingHorizontal: moderateScale(15),
        margin: moderateScale(15),
        borderRadius: moderateScale(5),
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
        height:'5%',
        paddingBottom:moderateScale(20)
      },
      dateOfBirthText:{color: Colors.gray, fontSize: moderateScale(12)}
  });