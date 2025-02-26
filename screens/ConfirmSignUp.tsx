import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import ButtonComponent from '../components/ButtonComponent';
import Colors from '../styles/Colors';
import {Strings} from '../styles/Strings';
import {confirmChangedPasswordStyle} from '../styles/StyleSheet/confirmChangedPasswordStyle';

const ConfirmSignUp = ({navigation}: {navigation: any}) => {
  const methodToNavigate = () => {
    AsyncStorage.setItem('fromSignUp', 'NO');
    navigation.replace('SignIn');
  };

  return (
    <View style={confirmChangedPasswordStyle.container}>
      <SafeAreaView />
      <Image
        style={confirmChangedPasswordStyle.logoImage}
        source={require('../assets/logo.png')}
      />
      <Text style={confirmChangedPasswordStyle.successMessage}>
        {Strings.ConfirmChangedPassword.successSignUpMessage}
      </Text>
      <Image
        style={confirmChangedPasswordStyle.changedPasswordImage}
        source={require('../assets/Changepassword.png')}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: moderateScale(40),
        }}>
        <Text style={{color: Colors.black, fontSize: moderateScale(15)}}>
          Click
        </Text>
        <TouchableOpacity
          onPress={() => {
            methodToNavigate();
          }}
          style={{paddingHorizontal: moderateScale(5)}}>
          <Text
            style={{
              color: Colors.greenGradient[1],
              fontSize: moderateScale(15),
              textDecorationLine: 'underline',
              fontFamily: 'Lato-Bold',
            }}>
            HERE
          </Text>
        </TouchableOpacity>
        <Text style={{color: Colors.black, fontSize: moderateScale(15)}}>
          to login
        </Text>
      </View>
    </View>
  );
};

export default ConfirmSignUp;
