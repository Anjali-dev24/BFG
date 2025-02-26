import {Dimensions, Platform, StyleSheet} from 'react-native';
import { moderateScale } from "react-native-size-matters";
import Colors from "../Colors";
const OS =Platform.OS === 'ios' ? 'Raleway-Bold': 'raleway.bold'

export const resetPasswordStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.extraLightBlue,
    },
    bfgLogo:{
        alignSelf: 'center',
        width: "100%",
        height: "30%",
        resizeMode:"stretch"
    },
    resetPasswordText:{
        textAlign:"center",
        color:Colors.black,
        fontSize:moderateScale(22),
        fontFamily:OS,
        marginTop:moderateScale(15)
    },
    enterPasswordText:{
        textAlign:"center",
        color:Colors.black,
        fontSize:moderateScale(14),
        fontFamily:"Lato-Light",
        marginTop:moderateScale(10),
        marginBottom:moderateScale(15)
    },
    passwordInputStyle:{
        marginTop:moderateScale(20)
    }
  })