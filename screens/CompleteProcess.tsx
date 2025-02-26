import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import ButtonComponent from '../components/ButtonComponent';
import Colors from '../styles/Colors';
import {businessFormStyle} from '../styles/StyleSheet/businessFormStyle';
const OS = Platform.OS === 'ios' ? 'Raleway-Bold' : 'raleway.bold';

const CompleteProcess = ({navigation}:{navigation:any}) => {
    
    const onLogoutPress = () => {
      let keys = [
        'isUserSignedIn',
        'selectedservices',
        'generalAgreementInfo',
        'userSavedInformation',
        'isUserSignedIn',
        'accessToken',
        'linkedinLoginSuccess',
        'route',
        'prevRoute',
        'userBusinessContactInformation'
      ];
      AsyncStorage.multiRemove(keys);
      navigation.dispatch({
        ...CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'SignIn',
              state: {
                routes: [
                  {
                    name: 'SignIn',
                  },
                ],
              },
            },
          ],
        }),
      });
    };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.header_Process}
          source={require('../assets/header_process.png')}
        />
        <View style={styles.logoImage}>
          <Image
            style={[
              businessFormStyle.logoStyle,
              {marginBottom: moderateScale(0)},
            ]}
            source={require('../assets/logo.png')}
          />
        </View>
        
      </View>
      <Text style={styles.title}>
          We will calculate your Refund or tax Due amount and the processing
          fee, and will get back to you shortly.
        </Text>
      <View style={{flex: 0.6, marginTop:moderateScale(19)}}>
        <Image
          style={styles.processImage}
          source={require('../assets/processComplete.png')}
        />
      </View>
      <ButtonComponent
        buttonStyle={businessFormStyle.bottomProcessButton}
        isGradient={true}
        isTitle={true}
        title={'BACK TO LOGIN'}
        onPress={() => {onLogoutPress()}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.extraLightBlue,
  },
  header_Process: {
    resizeMode: 'stretch',
    width: '100%'
  },
  imageContainer: {
    width: '100%',
    flex: 0.2,
  },
  logoImage: {
    position: 'absolute',
    top: moderateScale(0),
    bottom: moderateScale(0),
    left: moderateScale(0),
    right: moderateScale(0),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.black,
    fontSize: moderateScale(15),
    fontFamily: OS,
    textAlign: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  processContainer: {
  },
  processImage: {
    resizeMode: 'stretch',
    marginTop: moderateScale(20),
    height:"100%"
  },
});

export default CompleteProcess;
