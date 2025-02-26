import {Dimensions, Platform, StyleSheet} from 'react-native';
import { moderateScale } from "react-native-size-matters";
import Colors from "../Colors";
const OS =Platform.OS === 'ios' ? 'Raleway-Bold': 'raleway.bold'

export const confirmChangedPasswordStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.extraLightBlue,
    },
    logoImage:{
        width:moderateScale(176),
        height:moderateScale(67),
        alignSelf:"center",
        resizeMode:"contain"
    },
    successMessage:{
        color:Colors.black,
        fontSize:moderateScale(20),
        fontFamily:OS,
        textAlign:"center",
        marginTop:moderateScale(20)
    },
    loginAgain:{
        color:Colors.black,
        fontSize:moderateScale(14),
        fontFamily:"Lato-Light",
        textAlign:"center",
        marginTop:moderateScale(20)
    },
    changedPasswordImage:{
        width:"100%",
        height:"60%",
        resizeMode:"stretch"
    }
  })