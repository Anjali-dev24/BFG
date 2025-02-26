import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import Colors from '../styles/Colors';
import {Strings} from '../styles/Strings';
import * as pageActions from '../store/actions/SignUp';
import ResendEmailStyles from '../styles/StyleSheet/resendEmailStyle';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import {BASE_URL} from '../hooks/links';
import {arrayItems} from '../hooks/mock';

const ResendEmail = ({
  navigation,
  userDetails,
  route,
  actions,
}: {
  navigation: any;
  userDetails: any;
  route: any;
  actions: any;
}) => {
  const {userEmail} = route.params;
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(30);
  const [loading, setLoading] = React.useState<boolean>(false);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(0);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [seconds]);

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
        setSeconds(30);
        setLoading(false);
        if (json.success === true) {
          let user = {
            email: `${json.email}`,
            token: `${json.token}`,
            expireAt: json.expiry,
          };
          actions.setUserDetails(user);
        } else {
          Alert.alert(json.message);
        }
      })
      .catch(error => {
        console.log('err' + JSON.stringify(error));
      });
  };

  return (
    <View style={ResendEmailStyles.container}>
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
      <View style={ResendEmailStyles.bottomContainer}>
        <ButtonComponent
          isTitle={true}
          disabled={seconds === 0 ? false : true}
          isGradient={true}
          buttonStyle={ResendEmailStyles.buttonContainer}
          onPress={() => {
            sendEmail();
          }}
          title={Strings.ResendEmail.resendEmail}
        />
        <ButtonComponent
          isTitle={true}
          isGradient={true}
          buttonStyle={{
            position: 'absolute',
            bottom: moderateScale(50),
            left: moderateScale(0),
            right: moderateScale(0),
          }}
          onPress={() => {
            navigation.navigate('ConfirmPassword');
          }}
          title={'CHANGE PASSWORD'}
        />
        <Text style={ResendEmailStyles.waitingText}>
          Wait{' '}
          <Text style={{color: Colors.blue}}>
            {minutes === 0 && seconds === 0 ? null : (
              <Text> {seconds > 0 ? seconds : '0'}</Text>
            )}{' '}
            Seconds
          </Text>{' '}
          Before Sending It
        </Text>
      </View>
      <SafeAreaView>
        <Image
          style={ResendEmailStyles.logoImage}
          source={require('../assets/logo.png')}
        />
        <Image
          style={ResendEmailStyles.wallPapper}
          source={require('../assets/resend_wallpapper.png')}
        />
        <Text style={ResendEmailStyles.message}>
          {Strings.ResendEmail.message}
        </Text>
      </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResendEmail);
