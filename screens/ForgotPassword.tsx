import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import ButtonComponent from '../components/ButtonComponent';
import TextInputComponent from '../components/TextInputComponent';
import {Strings} from '../styles/Strings';
import Regex from '../hooks/regex';
import {forgotPasswordStyle} from '../styles/StyleSheet/forgotPasswordStyle';
import {signInStyle} from '../styles/StyleSheet/signInStyle';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../styles/Colors';
import * as pageActions from '../store/actions/SignUp';
import {bindActionCreators} from 'redux';
import {BASE_URL} from '../hooks/links';

const ForgotPassword = ({
  navigation,
  actions,
}: {
  navigation: any;
  actions: any;
}) => {
  // const{ userDetails}= props
  const [userEmail, setUserEmail] = React.useState('');
  const [userEmailError, setUserEmailError] = React.useState('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const resetErrors = () => {
    setUserEmailError('');
  };

  const validateFields = () => {
    resetErrors();
    if (userEmail == '') {
      Alert.alert('Please enter all the keys.');
    } else if (userEmail === '') {
      setUserEmailError('Please enter email id.');
    } else if (!Regex.emailRegex.test(userEmail) && userEmail != '') {
      setUserEmailError('Please enter a valid email id.');
    } else {
      sendEmail();
    }
  };

  const sendEmail = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch(BASE_URL + '/user/forgotPassword', {
      method: 'POST',
      body: JSON.stringify({
        email: userEmail?.toLowerCase(),
      }),
      headers: myHeaders,
    })
      .then(response => response.json())
      .then(json => {
        setLoading(false);
        if (json.success === true) {
          let user = {
            email: `${encodeURIComponent(json.email)}`,
            token: `${encodeURIComponent(json.token)}`,
            expireAt: json.expiry,
          };
          actions.setUserDetails(user);
          navigation.navigate('ResendEmail', {userEmail: userEmail});
        } else {
          Alert.alert(json.message);
        }
      })
      .catch(error => {
        console.log('err' + JSON.stringify(error));
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.extraLightBlue}}>
      {/* <View style={forgotPasswordStyle.mainContainer}> */}
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
          <View style={{width: '100%', height: '100%'}}>
            <Image
              style={[
                signInStyle.signInLogoStyle,
                {width: '100%', height: '100%'},
              ]}
              source={require('../assets/bfg.png')}
            />
          </View>

          <Text style={forgotPasswordStyle.title}>
            {Strings.ForgotPassword.title}
          </Text>
          <Text style={forgotPasswordStyle.recoveryText}>
            {Strings.ForgotPassword.recovery}
          </Text>
          <View style={forgotPasswordStyle.inputContainer}>
            <TextInputComponent
              error={userEmailError}
              inputStyles={forgotPasswordStyle.textInputStyle}
              styles={forgotPasswordStyle.inputStyle}
              onChangeText={text => {
                setUserEmail(text.replace(/\s+/g,''));
                setUserEmailError('');
              }}
              inputValue={userEmail}
              placeHolderTitle={Strings.Input.email}
            />
            <ButtonComponent
              isTitle={true}
              // navigation.navigate('ResendEmail')
              onPress={() => validateFields()}
              textStyle={forgotPasswordStyle.buttonStyle}
              isGradient={true}
              title={Strings.ForgotPassword.send}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userDetails: state.forgotPassword.userdetails,
  };
};

const ActionCreators = Object.assign({}, pageActions);
const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
