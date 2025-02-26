import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Colors from '../styles/Colors';
import {signInStyle} from '../styles/StyleSheet/signInStyle';
import {resetPasswordStyle} from '../styles/StyleSheet/ResetPasswordStyle';
import {Strings} from '../styles/Strings';
import TextInputComponent from '../components/TextInputComponent';
import ButtonComponent from '../components/ButtonComponent';
import * as pageActions from '../store/actions/SignUp';
import EyeIcon from '../assets/icons/eye.svg';
import {moderateScale} from 'react-native-size-matters';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BASE_URL} from '../hooks/links';
import {dropDownStyles} from '../styles/StyleSheet/dropDownStyle';

const ConfirmPassword = ({
  navigation,
  userDetails,
}: {
  navigation: any;
  userDetails: any;
}) => {
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);
  const [visiblePassword, setVisiblePassword] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const methodToCheckPassword = () => {
    if (password == '') {
      setPasswordError('Please enter new password.');
    } else if (confirmPassword == '') {
      setConfirmPasswordError('Please enter same password again.');
    } else if (password != confirmPassword) {
      setConfirmPasswordError('Please enter same password');
    } else if (
      (password !== '' && password.length < 8) ||
      (password !== '' && password.length > 15)
    ) {
      setPasswordError('Please enter more than 8 and less then 15 digits.');
    } else if (
      (confirmPassword !== '' && confirmPassword.length < 8) ||
      (confirmPassword !== '' && confirmPassword.length > 15)
    ) {
      setConfirmPasswordError(
        'Please enter more than 8 and less then 15 digits.',
      );
    } else {
      methodToresetPassword();
      // navigation.navigate('ConfirmChangedPassword')
    }
  };

  const methodToresetPassword = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let url = new URL(BASE_URL + '/user/reset-password/');
    url.searchParams.append('token', userDetails.token);
    url.searchParams.append('email', userDetails.email);
    fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify({
        password: password,
      }),
      headers: myHeaders,
    })
      .then(response => response.json())
      .then(json => {
        setLoading(false);
        if (json.success === true) {
          navigation.navigate('ConfirmChangedPassword');
        } else {
          Alert.alert(json.message);
        }
      })
      .catch(error => {
        console.log('err' + JSON.stringify(error));
      });
  };

  return (
    <View style={resetPasswordStyle.container}>
      {loading && (
        <ActivityIndicator
          color={Colors.greenGradient[1]}
          size={'large'}
          style={{
            flex: 1,
            backgroundColor: Colors.blackWithOpacity,
            position: 'absolute',
            left: moderateScale(0),
            right: moderateScale(0),
            top: moderateScale(0),
            bottom: moderateScale(0),
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
        />
      )}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={signInStyle.container}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{width: '100%', height: '65%'}}>
            <Image
              style={[
                signInStyle.signInLogoStyle,
                {width: '100%', height: '100%'},
              ]}
              source={require('../assets/bfg.png')}
            />
          </View>
          <Text style={resetPasswordStyle.resetPasswordText}>
            {Strings.ResetPassword.reset}
          </Text>
          <Text style={resetPasswordStyle.enterPasswordText}>
            {Strings.ResetPassword.enterPassword}
          </Text>
          <View style={resetPasswordStyle.passwordInputStyle}>
            <TextInputComponent
              errorStyle={dropDownStyles.textInputFieldError}
              error={passwordError}
              onEyePress={() => setIsVisible(!isVisible)}
              secureTextEntry={isVisible ? false : true}
              isRequired={true}
              onChangeText={text => {
                setPassword(text.replace(/\s/g, ''));
                setPasswordError('');
              }}
              inputValue={password}
              placeHolderTitle={Strings.Input.newPassword}
              iconElement={
                !isVisible ? (
                  <EyeIcon
                    width={moderateScale(25)}
                    height={moderateScale(25)}
                  />
                ) : (
                  <View style={signInStyle.eyeIconContainer}>
                    <Image
                      style={signInStyle.eyeEnable}
                      source={require('../assets/eye_enable.png')}
                    />
                  </View>
                )
              }
            />
            <TextInputComponent
              errorStyle={dropDownStyles.textInputFieldError}
              error={confirmPasswordError}
              onEyePress={() => setVisiblePassword(!visiblePassword)}
              secureTextEntry={visiblePassword ? false : true}
              isRequired={true}
              onChangeText={text => {
                setConfirmPasswordError('');
                setConfirmPassword(text.replace(/\s/g, ''));
              }}
              inputValue={confirmPassword}
              placeHolderTitle={Strings.Input.confirmPassword}
              iconElement={
                !visiblePassword ? (
                  <EyeIcon
                    width={moderateScale(25)}
                    height={moderateScale(25)}
                  />
                ) : (
                  <View style={signInStyle.eyeIconContainer}>
                    <Image
                      style={signInStyle.eyeEnable}
                      source={require('../assets/eye_enable.png')}
                    />
                  </View>
                )
              }
            />
          </View>
          <ButtonComponent
            isTitle={true}
            isGradient={true}
            onPress={() => {
              methodToCheckPassword();
            }}
            title={Strings.ResetPassword.changePassword}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userDetails: state.forgotPassword.userDetails,
  };
};

const ActionCreators = Object.assign({}, pageActions);
const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPassword);
