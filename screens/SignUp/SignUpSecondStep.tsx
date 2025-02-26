import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ToastAndroid,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import CustomDropDown from '../../components/CustomDropDown';
import TextInputComponent from '../../components/TextInputComponent';
import Colors from '../../styles/Colors';
import {Strings} from '../../styles/Strings';
import {cities, countries, data, states} from '../../hooks/mock';
import {signUpStyle} from '../../styles/StyleSheet/signUpStyle';
import ProgressComponent from '../../components/SignUpProgress';
import ButtonComponent from '../../components/ButtonComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as pageActions from '../../store/actions/SignUp';
import {BASE_URL} from '../../hooks/links';
import {dropDownStyles} from '../../styles/StyleSheet/dropDownStyle';
import {swiperComponentStyle} from '../../styles/StyleSheet/swiperComponentStyle';
import BackIcon from '../../assets/icons/back_icon.svg';
import {CommonActions} from '@react-navigation/native';
import {MethodToCreateAccount} from '../../ApiServices';
import mime from "mime";

const SignUpSecondStep = ({
  navigation,
  route,
  actions,
  fname,
}: {
  navigation: any;
  route: any;
  actions: any;
  fname: string;
}) => {
  const {userPersonalInfo} = route.params;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [stateLoader, setStateLoader] = React.useState<boolean>(false);
  const [firstAddress, setFirstAddress] = React.useState<string>('');
  const [firstAddressError, setFirstAddressError] = React.useState<string>('');
  const [countryCategory, setCountryCategory] = React.useState('');
  const [countryDropDown, setCountryDropDown] = React.useState(false);
  const [stateCategory, setStateCategory] = React.useState('');
  const [stateDropDown, setStateDropDown] = React.useState(false);
  const [cityCategory, setCityCategory] = React.useState('');
  const [secondAddress, setSecondAddress] = React.useState<string>('');
  const [city, setCity] = React.useState<string>('');
  const [county, setCounty] = React.useState<string>('');
  const [selectedCountryId, setSelectedCountryId] = React.useState<string>('');
  const [selectedStateId, setSelectedStateId] = React.useState<string>('');
  const [countryError, setcountryError] = React.useState<string>('');
  const [stateError, setStateError] = React.useState<string>('');
  const [cityError, setCityError] = React.useState<string>('');
  const [countyError, setCountyError] = React.useState<string>('');
  const [zipCode, setZipCode] = React.useState<string>('');
  const [zipCodeError, setZipCodeError] = React.useState<string>('');
  const [isArray, setIsArray] = React.useState<boolean>(false);
  const [selectCountries, setSelectCountries] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState<number>();
  const [selectStates, setSelectStates] = React.useState<any>([]);
  const [secondAddressError, setSecondAddressError] =
    React.useState<string>('');

  /**
   * Method to reset field error.
   */
  const resetErrors = () => {
    setFirstAddressError('');
    setSecondAddressError('');
  };

  // const showToastWithGravityAndOffset = () => {
  //   ToastAndroid.showWithGravityAndOffset(
  //     'Signed up successfully',
  //     ToastAndroid.LONG,
  //     ToastAndroid.BOTTOM,
  //     25,
  //     50,
  //   );
  // };

  const validateFields = () => {
    let zipCodeReg = /\d{5}([ \-]\d{4})?/g;
    resetErrors();
    if (firstAddress == '') {
      setFirstAddressError('Please enter the first address.');
    } else if (city === '') {
      setCityError('Please enter city name.');
    } else if (zipCode === '') {
      setZipCodeError('Please enter zip code.');
    } else if (!zipCodeReg.test(zipCode)) {
      setZipCodeError('Please enter valid zip code.');
    } else if (countryCategory === '') {
      setcountryError('Please select your country name.');
    } else if (county === '') {
      setCountyError('Please enter your county name.');
    } else if (stateCategory === '') {
      setStateError('Please select your state name.');
    } else {
      signup();
    }
  };

  const getCountries = () => {
    setStateLoader(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch(BASE_URL + '/countries', {
      method: 'GET',
      headers: myHeaders,
    })
      .then(response => {
        switch (response.status) {
          case 200:
            return response.json();
          case 401:
            Alert.alert('Unauthorized');
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
        setSelectCountries(json.countries);
        setStateLoader(false);
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  const getStates = () => {
    setStateLoader(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch(BASE_URL + `/states/findByCountry/${selectedCountryId}`, {
      method: 'GET',
      headers: myHeaders,
    })
      .then(response => {
        switch (response.status) {
          case 200:
            return response.json();
          case 401:
            Alert.alert('Unauthorized');
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
        setSelectStates(json.states);
        setStateLoader(false);
      })
      .catch(err => {
        console.log('error', err);
      });
  };

  useEffect(() => {
    getCountries();
  }, []);
  useEffect(() => {
    if (selectedCountryId !== '') {
      return getStates();
    }
  }, [selectedCountryId]);

  /**
   * Method to create new account.
   */
  const signup = () => {
    let state = {
      id: selectedStateId || '',
      name: stateCategory || '',
    };
    let country = {
      id: selectedCountryId || '',
      name: countryCategory || '',
    };
    let userAddress = {
      aline1: firstAddress || '',
      aline2: secondAddress || '',
      city: city || '',
      state: state || null,
      county: county,
      country: country || null,
      postalCode: zipCode || ''
    };
    const newImageUri =  "file://" + userPersonalInfo?.image?.uri?.split("file:/").join("");
    let profileImage={
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop()
    }
    setLoading(true);
    var formdata = new FormData();
    formdata.append('fname', userPersonalInfo.fname || '');
    formdata.append('lname', userPersonalInfo.lname || '');
    formdata.append('password', userPersonalInfo.password || '');
    formdata.append('email', userPersonalInfo.email?.toLowerCase?.() || '');
    formdata.append('tel', userPersonalInfo.tel || '');
    formdata.append('mob', userPersonalInfo.mob || '');
    formdata.append("profile",  profileImage || '')
    // formdata.append('profile', userPersonalInfo.image || '');
    formdata.append('address', JSON.stringify(userAddress));
    formdata.append('gender', userPersonalInfo.gender || '');
    console.log("form data", JSON.stringify(formdata))
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('http://bfg.essitco.net/user/signup', requestOptions)
      .then(response => {
        switch (response.status) {
          case 201:
            return response.json();
          case 422:
            Alert.alert('User Already Exist');
            throw 'ALREADY ACCOUNT';
          case 500:
            Alert.alert('Internal Server Error');
            throw 'INTERNAL SERVER ERROR';
          default:
            Alert.alert('Error');
            throw 'ERROR';
        }
      })
      .then(json => {
        console.log('response', json)
        setLoading(false);
        actions.setImageUri('');
        AsyncStorage.setItem('fromSignUp', 'NO');
        navigation.replace('ConfirmSignUp', {
          userInfo: json,
        });
      })
      .catch(error => {
        setLoading(false);
        console.error('err')
        console.log('error', error);
      });
    // MethodToCreateAccount(
    //   userPersonalInfo.fname,
    //   userPersonalInfo.lname,
    //   userPersonalInfo.password,
    //   userPersonalInfo.email?.toLowerCase?.(),
    //   userPersonalInfo.tel,
    //   userPersonalInfo.mob,
    //   userPersonalInfo.image,
    //   JSON.stringify(userAddress),
    //   userPersonalInfo.gender,
    // )
    //   .then(response => {
    //     console.log('signUp', response);
    //   })
    //   .catch(error => {
    //     console.log('signUpError', error);
    //   });
  };

  const onPressBack = () => {
    navigation.pop();
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={signUpStyle.container}>
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            onPressBack();
          }}
          style={swiperComponentStyle.backIcon}>
          <BackIcon width={moderateScale(25)} height={moderateScale(25)} />
        </TouchableOpacity>
        {loading && (
          <ActivityIndicator
            color={Colors.greenGradient[1]}
            size={'large'}
            style={signUpStyle.loader}
          />
        )}
        <ProgressComponent isSecond={true} />
        <Text style={signUpStyle.createAccountStyle}>
          {Strings.SignUp.address}
        </Text>
        <TextInputComponent
          errorStyle={dropDownStyles.textInputFieldError}
          error={firstAddressError}
          onChangeText={text => {
            setFirstAddress(text);
            setFirstAddressError('');
          }}
          inputValue={firstAddress}
          placeHolderTitle={Strings.Input.streetAddress}
        />
        <TextInputComponent
          errorStyle={dropDownStyles.textInputFieldError}
          inputStyles={{
            marginTop: moderateScale(5),
            marginBottom: moderateScale(15),
          }}
          error={secondAddressError}
          onChangeText={text => {
            setSecondAddress(text);
          }}
          inputValue={secondAddress}
          placeHolderTitle={Strings.Input.secondstreettreetAddress}
        />
        <TextInputComponent
          errorStyle={[
            dropDownStyles.textInputFieldError,
            {bottom: moderateScale(-7)},
          ]}
          inputStyles={{marginVertical: moderateScale(5)}}
          error={cityError}
          onChangeText={text => {
            setCity(text);
            setCityError('');
          }}
          inputValue={city}
          placeHolderTitle={Strings.Input.city}
        />
        <TextInputComponent
          errorStyle={dropDownStyles.textInputFieldError}
          error={zipCodeError}
          onChangeText={(text: any) => {
            setZipCodeError('');
            setZipCode(text);
          }}
          inputValue={zipCode}
          placeHolderTitle={Strings.Input.zipCode}
        />
        <View style={[signUpStyle.addressDropDown, signUpStyle.countryStyles]}>
          <CustomDropDown
            error={countryError}
            isRequired={true}
            stateLoading={stateLoader}
            isCountry={true}
            onClose={() => setCountryDropDown(false)}
            setVisible={() => setCountryDropDown(true)}
            category={countryCategory}
            setInVisible={(item: any) => {
              setSelectedCountryId(item._id),
                setCountryDropDown(false),
                setCountryCategory(item.name);
              setcountryError('');
            }}
            modalVisible={countryDropDown}
            onPress={() => {
              setCountryDropDown(!countryDropDown);
            }}
            dropDownData={selectCountries}
            label="Country*"
            selectedIndex={(index: number) => {
              setSelectedIndex(index);
            }}
          />
        </View>
        <TextInputComponent
          errorStyle={[
            dropDownStyles.textInputFieldError,
            {bottom: moderateScale(-7)},
          ]}
          inputStyles={{marginVertical: moderateScale(5)}}
          error={countyError}
          onChangeText={text => {
            setCounty(text);
            setCountyError('');
          }}
          inputValue={county}
          placeHolderTitle={Strings.Input.county}
        />
        <View
          style={[
            signUpStyle.addressDropDown,
            {paddingHorizontal: moderateScale(0)},
          ]}>
          <CustomDropDown
            error={stateError}
            isRequired={true}
            isCountry={true}
            stateLoading={stateLoader}
            onClose={() => setStateDropDown(false)}
            setVisible={() => setStateDropDown(true)}
            category={stateCategory}
            setInVisible={(item: any) => {
              setSelectedStateId(item._id),
                setStateDropDown(false),
                setStateCategory(item.name);
            }}
            modalVisible={stateDropDown}
            onPress={() => {
              setStateDropDown(!stateDropDown), setStateError('');
            }}
            dropDownData={selectStates}
            label="State*"
            selectedIndex={(index: number) => {
              setSelectedIndex(index);
            }}
          />
        </View>
        <View style={{height: moderateScale(30)}} />
        <ButtonComponent
          buttonStyle={{marginTop: moderateScale(20)}}
          isTitle={true}
          isGradient={true}
          onPress={() => {
            validateFields();
          }}
          title={Strings.Input.signUp}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userImage: state.signUpPage.userImage,
    status: state.signUpInfo.status,
    fname: state.createAccount.fname,
    lname: state.createAccount.lname,
    email: state.createAccount.email,
    password: state.createAccount.password,
    gender: state.createAccount.gender,
  };
};

const ActionCreators = Object.assign({}, pageActions);
const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpSecondStep);
