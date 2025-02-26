import {
  GoogleSignin,
  NativeModuleError,
} from '@react-native-google-signin/google-signin';
import React, {useEffect} from 'react';
import {
  Alert,
  Button,
  Image,
  LogBox,
  Modal,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {LoginManager} from 'react-native-fbsdk';
import {moderateScale} from 'react-native-size-matters';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import EyeIcon from '../../assets/icons/eye.svg';
import VectorIcon from '../../assets/icons/Vector.svg';
import ButtonComponent from '../../components/ButtonComponent';
import CameraOptions from '../../components/CameraOptions';
import CustomDropDown from '../../components/CustomDropDown';
import LoginMethods from '../../components/LoginMethods';
import ProgressComponent from '../../components/SignUpProgress';
import TextInputComponent from '../../components/TextInputComponent';
import WebViewComponent from '../../components/WebViewComponent';
import * as Regex from '../../hooks/regex';
import {
  handleGallerySelection,
  handleCameraSelection,
} from '../../libs/CameraUtils';
import * as pageActions from '../../store/actions/SignUp';
import {Strings} from '../../styles/Strings';
import {signUpStyle} from '../../styles/StyleSheet/signUpStyle';
import Calender from '../../assets/icons/calender.svg';
import {data} from '../../hooks/mock';
import Colors from '../../styles/Colors';
import DatePickerComponent from '../../components/DatePickerComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import {dropDownStyles} from '../../styles/StyleSheet/dropDownStyle';
let isIos = Platform.OS === 'ios';

const AccessToken = require('react-native').NativeModules.FBAccessToken;

interface AccessTokenMap {
  accessToken: string;
  userID: string;
  accessTokenSource?: string;
  navigation: any;
  userImage: string;
  actions: any;
  userInfo: any;
  setuserInfo: any;
  status: any;
  route: any;
}

const SignUp: React.FC<AccessTokenMap> = ({
  accessToken,
  userID,
  navigation,
  userImage,
  actions,
  route,
}) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [categoryError, setCategoryError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState<
    string | undefined
  >();
  const [mobileNumber, setMobileNumber] = React.useState<any>();
  const [telephoneNumber, setTelephoneNumber] = React.useState<any>();
  const [mobileNumberError, setMobileNumberError] = React.useState('');
  const [telephoneNumberError, setTelephoneNumberError] = React.useState('');
  const [userInformationrmation, setuserInformation] = React.useState<any>();
  const [error, setError] = React.useState<any>();
  const [currentUser, setCurrentUser] = React.useState<any>();
  const [genderError, setGenderError] = React.useState<string>('');
  const [isVisible, setIsVisible] = React.useState(false);
  const [userToken, setUserToken] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isDropDownVisible, setIsDropDownVisible] = React.useState(false);
  const [isFacebookModalVisible, setIsFacebookModalVisible] =
    React.useState(false);
  const [isGoogleModalVisible, setIsGoogleModalVisible] = React.useState(false);
  const [imgUri, setImgUri] = React.useState<string>();
  const [date, setDate] = React.useState(new Date());
  const [dateError, setDateError] = React.useState('');

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isGenderSelected, setIsGenderSelected] =
    React.useState<boolean>(false);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>();

  const [socialSecurityNumberError, setSocialSecurityNumberError] =
    React.useState('');
  const [socialSecurityNumber, setSocialSecurityNumber] = React.useState('');

  const PROFILE_IMAGE_SIZE = 150;
  const _configureGoogleSignIn = () => {
    GoogleSignin.configure({
      offlineAccess: false,
      profileImageSize: PROFILE_IMAGE_SIZE,
    });
  };

  const resetFields = () => {
    actions.setImageUri('');
    setFirstName('');
    setLastName('');
    setEmail(''), setPassword(''), setMobileNumber('');
    setTelephoneNumber(''), setCategory('');
  };

  useEffect(() => {
    // AsyncStorage.removeItem('IsPressed')
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('fromLogin').then(prevScreen => {
        if (prevScreen !== null && prevScreen === 'YES') {
          resetFields();
        }
      });
    });
    // setUserToken(accessToken);
    setuserInformation(userID);
    _configureGoogleSignIn();
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  /**
   * Method to social login with google in application.
   */
  const _signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInformation = await GoogleSignin.signIn();
      const currentUser = await GoogleSignin.isSignedIn();
      setuserInformation(userInformation);
      setCurrentUser(currentUser);
      setError(undefined);

      if (currentUser) {
        let user;
        navigation.navigate('DashBoard', {user: userInformation});
      }
    } catch (error) {
      const typedError = error as NativeModuleError;
      setError(typedError);
    }
    renderGetCurrentUser();
  };

  /**
   * Method to get present user information in google login.
   * @returns
   */
  const renderGetCurrentUser = () => {
    return (
      <Button
        onPress={async () => {
          const userInformation = await GoogleSignin.getCurrentUser();
          Alert.alert(
            'current user',
            userInformation ? JSON.stringify(userInformation.user) : 'null',
          );
        }}
        title="get current user"
      />
    );
  };

  /**
   * Method to get current user token in facebook login.
   * @returns
   */
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

  /**
   * Method to choose profile picture from gallery.
   */
  const getGalleryImageAndPerformScan = () => {
    setModalVisible(false);
    handleGallerySelection()
      .then((imageUri: any) => {
        setImgUri(imageUri);
      })
      .catch(error => setImgUri(''));
  };

  const openCamera = () => {
    handleCameraSelection()
      .then((imageUri: any) => {
        console.log('cameraImage', imageUri?.uri);
        setImgUri(imageUri);
      })
      .catch(error => Alert.alert('err'));
  };

  const getCameraImage = () => {
    setModalVisible(false);
    if (!isIos) {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Okay',
        buttonNegative: 'never ask again',
      }).then(data => {
        if (data === 'never_ask_again') {
          navigation.pop();
        } else if (data == 'denied') navigation.pop();
        else {
          openCamera();
        }
      });
    } else {
      check(PERMISSIONS.IOS.CAMERA)
        .then(result => {
          if (result == RESULTS.DENIED || result == RESULTS.UNAVAILABLE) {
            navigation.pop();
          } else {
            openCamera();
          }
        })
        .catch(err => {
          if (err) navigation.pop();
        });
    }
  };

  /**
   * Method to social login with facebook.
   */
  const faceBookLogin = () => {
    getCurrentAccessToken();
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result: any) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          navigation.navigate('DashBoard');
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

  /**
   * Method to reset field error.
   */
  const resetErrors = () => {
    setEmailError('');
  };

  /**
   * Mathod to check field's input correct or not.
   */
  const validateFields = () => {
    let firstNameRegex = /[^a-zA-Z0-9_/]*$/;
    let phone = /^[0-9\(\)-]+$/;
    let information = {
      fname: firstName,
      lname: lastName,
      email: email,
      password: password ? password : '',
      tel: telephoneNumber,
      mob: mobileNumber,
      image: imgUri,
      gender: category,
    };
    resetErrors();
    if (firstName == '') {
      setFirstNameError('Please enter your first name.');
    } else if (
      (firstName != '' && firstName.length < 2) ||
      firstName.length > 15
    ) {
      setFirstNameError('Please enter upto 2-15 characters.');
    } else if (!firstNameRegex.test(firstName) && firstName != '') {
      setFirstNameError('Please enter a valid first name');
    } else if (lastName === '') {
      setLastNameError('Please enter your last name.');
    } else if (email === '') {
      setEmailError('Please enter email id.');
    } else if (!Regex.default.emailRegex.test(email) && email != '') {
      setEmailError('Please enter a valid email id.');
    } else if (password === '') {
      setPasswordError('Please enter password.');
    } else if (
      (password !== '' && password.length < 8) ||
      (password !== '' && password.length > 15)
    ) {
      setPasswordError(
        'Please enter a password with min 8 and max 15 characters.',
      );
    } else if (mobileNumber === undefined || mobileNumber === '') {
      setMobileNumberError('Please enter a mobile number.');
    } else if (
      isNaN(mobileNumber) &&
      !phone.test(mobileNumber) &&
      (mobileNumber !== undefined || mobileNumber === '')
    ) {
      setMobileNumberError('Please enter a valid mobile number.');
    } else if (
      (mobileNumber && mobileNumber.length < 10) ||
      (mobileNumber && mobileNumber.length > 15)
    ) {
      setMobileNumberError(
        'Please enter minimum 10 and maximum 15 digit mobile number.',
      );
    } else if (
      isNaN(telephoneNumber) &&
      !phone.test(telephoneNumber) &&
      telephoneNumber !== undefined
    ) {
      setTelephoneNumberError('Please enter valid telephone number');
    } else if (category === '') {
      setGenderError('Please select your gender.');
    } else {
      AsyncStorage.removeItem('fromLogin');
      navigation.navigate('SignUpSecondStep', {userPersonalInfo: information});
    }
  };

  // useFocusEffect(() => {
  //   console.log('userImage', imgUri);
  // });

  /**
   * Method to render image whether selected from gallery or with camera.
   * @returns
   */
  const mthodToShowImage = () => {
    console.log('userImage', imgUri);
    if (imgUri?.uri === undefined) {
      return <VectorIcon />;
    } else {
      return (
        <Image
          style={signUpStyle.pickerImageStyle}
          source={{
            uri: imgUri?.uri,
          }}
        />
      );
    }
  };

  const onMessage = (e: any) => {
    let {data} = e.nativeEvent;
    try {
      let token = JSON.parse(data)?.user?.access_token;
      AsyncStorage.setItem('linkedinLoginSuccess', token);
      setIsModalVisible(false);
      // AsyncStorage.setItem('isUserSignedIn', 'true');
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

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={signUpStyle.container}>
      <SafeAreaView style={{flex: 1}}>
        <ProgressComponent isSecond={false} />
        <Text style={signUpStyle.createAccountStyle}>
          {Strings.SignUp.createAccount}
        </Text>

        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={signUpStyle.imagePicker}>
          {mthodToShowImage()}
        </TouchableOpacity>
        <TextInputComponent
          errorStyle={dropDownStyles.textInputFieldError}
          error={firstNameError}
          onChangeText={text => {
            setFirstName(text.replace(/[^a-zA-Z0-9_/]*$/g, ''));
            setFirstNameError('');
          }}
          inputValue={firstName}
          placeHolderTitle={Strings.Input.userName}
        />
        <TextInputComponent
          error={lastNameError}
          errorStyle={dropDownStyles.textInputFieldError}
          onChangeText={text => {
            setLastName(text.replace(/[^a-zA-Z0-9_/]*$/g, ''));
            setLastNameError('');
          }}
          inputValue={lastName}
          placeHolderTitle={Strings.Input.lastName}
        />
        <TextInputComponent
          error={emailError}
          errorStyle={dropDownStyles.textInputFieldError}
          onChangeText={text => {
            setEmailError('');
            setEmail(text.replace(/\s+/g, ''));
          }}
          inputValue={email}
          placeHolderTitle={Strings.Input.email}
        />
        <TextInputComponent
          maxLength={12}
          inputStyles={{paddingRight: moderateScale(55)}}
          error={passwordError}
          errorStyle={dropDownStyles.textInputFieldError}
          onEyePress={() => setIsVisible(!isVisible)}
          secureTextEntry={isVisible ? false : true}
          isRequired={true}
          onChangeText={text => {
            setPassword(text.replace(/\s/g, ''));
            setPasswordError('');
          }}
          inputValue={password}
          placeHolderTitle={Strings.Input.password}
          iconElement={
            !isVisible ? (
              <EyeIcon width={moderateScale(25)} height={moderateScale(25)} />
            ) : (
              <View style={signUpStyle.eyeIconContainer}>
                <Image
                  style={signUpStyle.eyeEnable}
                  source={require('../../assets/eye_enable.png')}
                />
              </View>
            )
          }
        />
        <TextInputComponent
          errorStyle={dropDownStyles.textInputFieldError}
          error={mobileNumberError}
          onChangeText={text => {
            setMobileNumber(text.replace(/\s/g, ''));
            setMobileNumberError('');
          }}
          inputValue={mobileNumber}
          placeHolderTitle={Strings.Input.mobileNumber}
        />

        <TextInputComponent
          errorStyle={dropDownStyles.textInputFieldError}
          error={telephoneNumberError}
          onChangeText={text => {
            setTelephoneNumber(text.replace(/\s/g, ''));
            setTelephoneNumberError('');
          }}
          inputValue={telephoneNumber}
          placeHolderTitle={Strings.Input.telephoneNumber}
        />

        <View
          style={[signUpStyle.dropDown, {paddingHorizontal: moderateScale(0)}]}>
          <CustomDropDown
            error={genderError}
            isRequired={true}
            onClose={() => setIsDropDownVisible(false)}
            dropDownData={data}
            setVisible={() => setIsDropDownVisible(true)}
            category={category}
            setInVisible={(item: any) => {
              setIsDropDownVisible(false), setCategory(item.value);
            }}
            modalVisible={isDropDownVisible}
            onPress={() => {
              setGenderError(''), setIsDropDownVisible(!isDropDownVisible);
            }}
            label="Gender*"
            selectedIndex={(index: number) => {
              setSelectedIndex(index);
            }}
          />
          <Text style={signUpStyle.dateErrorStyle}>{dateError}</Text>
        </View>
        <ButtonComponent
          isTitle={true}
          isGradient={true}
          onPress={() => {
            validateFields();
          }}
          title={Strings.Swiper.swipeTitle}
        />
        <LoginMethods
          onPressLinkedin={() => setIsModalVisible(true)}
          onPressFacebook={() => {
            faceBookLogin();
            // setIsFacebookModalVisible(true);
          }}
          onPressGoogle={() => {
            setIsGoogleModalVisible(true);
          }}
          onSuccess={() => navigation.navigate('Login')}
        />
        <View style={[signUpStyle.signInOptionContainer]}>
          <Text style={signUpStyle.alreadyAccountText}>
            {Strings.SignUp.alreadyAccount}
          </Text>

          <ButtonComponent
            isTitle={true}
            textStyle={signUpStyle.signInTextStyle}
            buttonStyle={signUpStyle.signInButton}
            onPress={() => {
              AsyncStorage.setItem('fromSignUp', 'YES');
              navigation.navigate('SignIn');
            }}
            title={Strings.SignUp.signIn}
          />
        </View>
        {modalVisible && (
          <CameraOptions
            onPressGallary={() => {
              getGalleryImageAndPerformScan();
            }}
            onPressCamera={() => {
              getCameraImage(), setModalVisible(false);
            }}
            onCrossPress={() => setModalVisible(false)}
            modalVisible={modalVisible}
            modalClosePress={() => {
              setModalVisible(false);
            }}
          />
        )}
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
        {/* {isFacebookModalVisible && (
          <WebViewComponent
            URI="https://bfg.essitco.net/facebook"
            modalVisible={isFacebookModalVisible}
            modalClosePress={() => {
              setIsFacebookModalVisible(false);
            }}
          />
        )} */}
        {isGoogleModalVisible && (
          <WebViewComponent
            URI="http://bfg.essitco.net/google"
            modalVisible={isGoogleModalVisible}
            modalClosePress={() => {
              setIsGoogleModalVisible(false);
            }}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userImage: state.signUpPage.userImage,
    firstName: state.signUpInfo.firstName,
    lastName: state.signUpInfo.lastName,
    password: state.signUpInfo.password,
    email: state.signUpInfo.email,

    status: state.signUpInfo.status,
  };
};

const ActionCreators = Object.assign({}, pageActions);
const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
