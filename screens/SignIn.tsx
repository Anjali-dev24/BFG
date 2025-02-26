import React, {useEffect, useMemo} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button,
  LogBox,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import ButtonComponent from '../components/ButtonComponent';
import TextInputComponent from '../components/TextInputComponent';
import {Strings} from '../styles/Strings';
import {signInStyle} from '../styles/StyleSheet/signInStyle';
import {moderateScale} from 'react-native-size-matters';
import EyeIcon from '../assets/icons/eye.svg';
import RadioButton from '../components/RadioButtonComponent';
import LoginMethods from '../components/LoginMethods';
import Regex from '../hooks/regex';
import moment from 'moment';
import {initBioMetric} from '../libs/BioMetricUtils';
import {
  GoogleSignin,
  NativeModuleError,
} from '@react-native-google-signin/google-signin';
import useUpdateEffect from '../hooks/useUpdateEffect';
import {LoginManager} from 'react-native-fbsdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import Colors from '../styles/Colors';
import {bindActionCreators} from 'redux';
import * as pageActions from '../store/actions/SignUp';
import WebViewComponent from '../components/WebViewComponent';
import {BASE_URL} from '../hooks/links';
import {dropDownStyles} from '../styles/StyleSheet/dropDownStyle';

interface AccessTokenMap {
  userID: string;
  navigation: any;
  actions: any;
  isPressed: boolean;
}

const SignIn: React.FC<AccessTokenMap> = ({
  userID,
  navigation,
  actions,
  // isPressed,
}) => {
  const [userEmail, setUserEmail] = React.useState('');
  const [userEmailError, setUserEmailError] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [userPasswordError, setUserPasswordError] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<any>();
  const [error, setError] = React.useState<any>();
  const [currentUser, setCurrentUser] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);
  const [isRemember, setIsRemember] = React.useState(false);

  const AccessToken = require('react-native').NativeModules.FBAccessToken;

 useEffect(()=>{
  AsyncStorage.getItem('IsPressed').then(remember => {
    let parseValue= JSON.parse(remember || 'false')
    setIsPressed(parseValue)
  })
 },[])

  const resetErrors = () => {
    setUserEmailError('');
  };

  const validateFields = () => {
    resetErrors();
    if (userEmail === '') {
      setUserEmailError('Please enter email id.');
    } else if (!Regex.emailRegex.test(userEmail) && userEmail != '') {
      setUserEmailError('Please enter a valid email id.');
    } else if (userPassword === '') {
      setUserPasswordError('Please enter a password.');
    } else if (
      (userPassword !== '' && userPassword.length < 8) ||
      userPassword.length > 15
    ) {
      setUserPasswordError(
        'Please enter a password with min 8 and max 12 characters.',
      );
    } else {
      login();
    }
  };
  const PROFILE_IMAGE_SIZE = 150;
  const _configureGoogleSignIn = () => {
    GoogleSignin.configure({
      offlineAccess: false,
      profileImageSize: PROFILE_IMAGE_SIZE,
    });
  };

  const checkBioMetric = () => {
    AsyncStorage.getItem('LOCAL_USER_CREDS').then(user => {
      if (user !== null) {
        initBioMetric(() => {
          var userData = JSON.parse(user!);
          if (userData.email && userData.password) {
            setUserEmail(userData.email);
            setUserPassword(userData.password);
            login(userData);
          }
        });
      }
    });
  };

  useEffect(() => {
    setUserInfo(userID);
    _configureGoogleSignIn();
    checkBioMetric();
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();
    return () => {};
  }, []);

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const currentUser = await GoogleSignin.isSignedIn();
      setUserInfo(userInfo);
      setCurrentUser(currentUser);
      setError(undefined);

      if (currentUser) {
        let user;
        navigation.navigate('DashBoard', {user: userInfo});
      }
    } catch (error) {
      const typedError = error as NativeModuleError;
      setError(typedError);
    }
    renderGetCurrentUser();
  };

  const renderGetCurrentUser = () => {
    return (
      <Button
        onPress={async () => {
          const userInfo = await GoogleSignin.getCurrentUser();
          Alert.alert(
            'current user',
            userInfo ? JSON.stringify(userInfo.user) : 'null',
          );
        }}
        title="get current user"
      />
    );
  };

  const getCurrentAccessToken = () => {
    return new Promise((resolve, reject) => {
      AccessToken.getCurrentAccessToken((tokenMap: any) => {
        if (tokenMap) {
          resolve(tokenMap);
        } else {
          resolve(null);
        }
      });
    });
  };

  const faceBookLogin = () => {
    getCurrentAccessToken();
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ]).then(
      function (result: any) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
        }
      },
      function (error: any) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const fetchUserLoginDetails = () => {
    AsyncStorage.getItem('REMEMBERLOGIN').then(value => {
      if (value !== null && value === 'YES') {
        AsyncStorage.getItem('LOCAL_USER_CREDS').then(data => {
          let user = JSON.parse(data || '{}');
          if (user.email && user.password) {
            setUserEmail(user.email);
            setUserPassword(user.password);
            pageActions.storeCredentials(true);
          }
        });
      }
    });
  };

  const checkUserToken = () => {
   
    AsyncStorage.getItem('accessToken')
      .then(token => {
       
        if (token != null) {
          fetchUserLoginDetails();
        }
      })
  };

  const getProjectList = (token: string) => {
    // setLoading(true);
    Promise.all([
      // AsyncStorage.getItem('accessToken'),
      AsyncStorage.getItem('userSavedInformation'),
    ]).then(([user]) => {
      let data = JSON.parse(user || '{}');
      if (data !== null) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);
        fetch(BASE_URL + `/project/by-user-id/${data._id}`, {
          method: 'GET',
          headers: myHeaders,
        })
          .then(response => {
            switch (response.status) {
              case 200:
                return response.json();
              case 401:
                console.error('err');
                throw 'TOKEN EXPIRED';
              case 500:
                Alert.alert('Internal Server Error');
                throw 'INTERNAL SERVER ERROR';
              default:
                Alert.alert('Error');
                throw 'ERROR';
            }
          })
          .then(json => {
            if (json?.data?.length) {
              AsyncStorage.setItem(
                'activeProjectsList',
                JSON.stringify(
                  json?.projects?.filter?.(
                    (project: any) => project.status !== 'Closed',
                  ),
                ),
              );
              AsyncStorage.setItem(
                'inActiveProjectsList',
                JSON.stringify(
                  json?.projects?.filter?.(
                    (project: any) => project.status === 'Closed',
                  ),
                ),
              );
              AsyncStorage.setItem('route', 'DashBoard');
              navigation.dispatch({
                ...CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'DashBoard',
                      state: {
                        routes: [
                          {
                            name: 'DashBoard',
                            params: {
                              token: token,
                            },
                          },
                        ],
                      },
                    },
                  ],
                }),
              });
            } else {
              AsyncStorage.setItem('route', 'Services');
              navigation.dispatch({
                ...CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'Services',
                      state: {
                        routes: [
                          {
                            name: 'Services',
                            params: {
                              token: token,
                            },
                          },
                        ],
                      },
                    },
                  ],
                }),
              });
            }
          })
          .catch(error => {
            console.log('err' + JSON.stringify(error));
          });
      }
    });
  };

  const login = (res?: any) => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch(BASE_URL + '/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username: res ? res.email.toLowerCase() : userEmail.toLowerCase(),
        password: res ? res.password : userPassword,
      }),
      headers: myHeaders,
    })
      .then(response => {
        switch (response.status) {
          case 201:
            return response.json();
          case 404:
            Alert.alert('Email id does not exist.');
            throw 'INVALID USER';
          case 422:
            Alert.alert('Incorrect email or password.');
            throw 'WRONG PASSWORD';
          case 500:
            Alert.alert('Internal Server Error');
            throw 'INTERNAL SERVER ERROR';
          default:
            Alert.alert('Error');
            throw 'ERROR';
        }
      })
      .then(json => {
        AsyncStorage.setItem('userSavedInformation', JSON.stringify(json.user));

        let user = {
          email: res ? res.email.toLowerCase() : userEmail,
          password: res ? res.password : userPassword,
          savetime: moment(),
          token: json.access_token,
        };
        setLoading(false);
        AsyncStorage.setItem('isUserSignedIn', 'true');
        AsyncStorage.setItem('accessToken', user.token).then(() => {
          getProjectList(user.token);
        });
        AsyncStorage.removeItem('prevRoute');
        AsyncStorage.setItem('LOCAL_USER_CREDS', JSON.stringify(user));
        if (isPressed) {
          AsyncStorage.setItem('REMEMBERLOGIN', 'YES');
        } else {
          AsyncStorage.setItem('REMEMBERLOGIN', 'NO');
        }
        checkUserToken();
      })
      .catch(error => {
        setLoading(false);
        console.error('err' + error);
      });
  };

  useEffect(() => {
   
    fetchUserLoginDetails();
  }, [isPressed]);

  const onMessage = (e: any) => {
    let {data} = e.nativeEvent;
    try {
      let token = JSON.parse(data)?.user?.access_token;
      AsyncStorage.setItem('linkedinLoginSuccess', token);
      setIsModalVisible(false);
      AsyncStorage.setItem('isUserSignedIn', 'true');
      navigation.dispatch({
        ...CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Services',
              state: {
                routes: [
                  {
                    name: 'Services',
                    params: {
                      userInfo: AsyncStorage.setItem(
                        'userInfo',
                        JSON.parse(data)?.user,
                      ),
                    },
                  },
                ],
              },
            },
          ],
        }),
      });
    } catch (e) {
      e;
    }
  };

  const methodToNavigate = () => {
    AsyncStorage.setItem('fromLogin', 'YES');
    AsyncStorage.getItem('fromSignUp').then(signUp => {
      if (signUp === null && signUp === 'NO') {
        navigation.pop(3);
      } else {
        navigation.pop();
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.extraLightBlue}}>
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
          <Image
            style={signInStyle.signInLogoStyle}
            source={require('../assets/bfg.png')}
          />
          <Text style={signInStyle.createAccountStyle}>
            {Strings.SignUp.welcome}
          </Text>
          <TextInputComponent
            errorStyle={dropDownStyles.textInputFieldError}
            error={userEmailError}
            onChangeText={text => {
              setUserEmailError('');
              setUserEmail(text.replace(/\s+/g, ''));
            }}
            inputValue={userEmail}
            placeHolderTitle={Strings.Input.email}
          />
          <TextInputComponent
            errorStyle={dropDownStyles.textInputFieldError}
            onEyePress={() => setIsVisible(!isVisible)}
            secureTextEntry={isVisible ? false : true}
            error={userPasswordError}
            isRequired={true}
            onChangeText={text => {
              setUserPassword(text.replace(/\s+/g, ''));
              setUserPasswordError('');
            }}
            inputValue={userPassword}
            placeHolderTitle={Strings.Input.password}
            iconElement={
              !isVisible ? (
                <EyeIcon width={moderateScale(25)} height={moderateScale(25)} />
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
          <ButtonComponent
            isTitle={true}
            isGradient={true}
            onPress={() => {
              validateFields();
            }}
            title={Strings.Input.signIn}
          />

          <View style={signInStyle.rememberMeContainer}>
            <View style={signInStyle.rememberMe}>
              <RadioButton
                isPressed={isPressed}
                isOnPressed={() => {
                  setIsPressed(!isPressed);
                  AsyncStorage.setItem('IsPressed', JSON.stringify(!isPressed));
                  // actions.storeCredentials(!isPressed);
                }}
              />
              <Text style={signInStyle.rememberMeText}>
                {Strings.SignIn.remember}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={signInStyle.passwordRecoveryText}>
                {Strings.SignIn.passwordRecovery}
              </Text>
            </TouchableOpacity>
          </View>
          <LoginMethods
            onPressFacebook={() => {
              faceBookLogin();
            }}
            onPressGoogle={() => {
              _signIn();
            }}
            onPressLinkedin={() => {
              setIsModalVisible(true);
            }}
          />
          <View
            style={[
              signInStyle.signInOptionContainer,
              {paddingTop: moderateScale(20)},
            ]}>
            <Text style={signInStyle.alreadyAccountText}>
              {Strings.SignUp.noAccount}
            </Text>
            <ButtonComponent
              isTitle={true}
              textStyle={signInStyle.signInTextStyle}
              buttonStyle={signInStyle.signInButton}
              onPress={() => {
                methodToNavigate();
              }}
              title={Strings.SignUp.signUp}
            />
          </View>
        </SafeAreaView>
      </ScrollView>

      {isModalVisible && (
        <WebViewComponent
          onMessage={onMessage}
          URI="http://bfg.essitco.net/linkedin"
          modalVisible={isModalVisible}
          modalClosePress={() => {
            setIsModalVisible(false);
          }}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    status: state.signUpInfo.status,
    isPressed: state.storedCred.isPressed,
  };
};

const ActionCreators = Object.assign({}, pageActions);
const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
// export default SignIn
