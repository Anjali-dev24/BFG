import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import Colors from '../styles/Colors';
import {Strings} from '../styles/Strings';
import {confirmChangedPasswordStyle} from '../styles/StyleSheet/confirmChangedPasswordStyle';

const ConfirmChangedPassword = ({navigation}: {navigation: any}) => {
  const methodToNavigate = () => {
    return navigation.navigate('SignIn');
  };
  return (
    <View style={confirmChangedPasswordStyle.container}>
      <SafeAreaView />
      <Image
        style={confirmChangedPasswordStyle.logoImage}
        source={require('../assets/logo.png')}
      />
      <Text style={confirmChangedPasswordStyle.successMessage}>
        {Strings.ConfirmChangedPassword.successMessage}
      </Text>
      <Text style={confirmChangedPasswordStyle.loginAgain}>
        {Strings.ConfirmChangedPassword.loginAgain}
      </Text>
      <Image
        style={confirmChangedPasswordStyle.changedPasswordImage}
        source={require('../assets/Changepassword.png')}
      />

      <ButtonComponent
        isTitle={true}
        isGradient={true}
        onPress={() => {
          methodToNavigate();
        }}
        title={Strings.Input.signIn}
      />
    </View>
  );
};

export default ConfirmChangedPassword;
