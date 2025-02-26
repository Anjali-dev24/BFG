import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import ButtonComponent from '../components/ButtonComponent';
import AddressForm from '../components/DynamicFormComponents/AddressForm';
import DatePickerView from '../components/DynamicFormComponents/DatePicker';
import CustomDropDownComponent from '../components/DynamicFormComponents/DropDown';
import EmailComponent from '../components/DynamicFormComponents/EmailComponent';
import Signatures from '../components/DynamicFormComponents/SignatureComponent';
import TextInputComp from '../components/DynamicFormComponents/TextInput';
import YearComponent from '../components/DynamicFormComponents/YearComponent';
import {countries, entityData, role, states} from '../hooks/mock';
import {orderForm} from '../hooks/orderForm';
import Colors from '../styles/Colors';
import {Strings} from '../styles/Strings';
import {businessFormStyle} from '../styles/StyleSheet/businessFormStyle';
import {GeneralServiceStyles} from '../styles/StyleSheet/generalServiceAgreementStyles';
import {signUpStyle} from '../styles/StyleSheet/signUpStyle';
import {differenceBy} from 'lodash';
import {BASE_URL} from '../hooks/links';
import { inputStyle } from '../styles/StyleSheet/inputStyle';
import { useFocusEffect } from '@react-navigation/native';

const currentDate = moment().format('MM-DD-YYYY');

let lastYears: any[] = [];

const preparationYears = () => {
  let startYear = 1997;
  var currentYear = new Date().getFullYear(),
    years = [];
  startYear = startYear || 1980;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  lastYears = years;
  return lastYears;
};

const renderItem = (item: any, index: number) => {
  switch (item?.['option-type']) {
    case 'enum':
      switch (item.options) {
        case 'party-title':
          return role;
          break;
        case 'party-title':
          return role;
          break;
        default:
          break;
      }
      case 'business-entity-type':
        return entityData;
        break;
    default:
      break;
  }
};

const method=()=>{
  let arrayItems=[]
  // let filterItems= item
}

const getFormField = (
  fieldItem: any,
  parentState: any,
  setParentState: any,
  index: number,
  errorState: any[],
  setErrorState: React.Dispatch<React.SetStateAction<{}>>,
  isNextPress: boolean,
  setIsNextPress: React.Dispatch<React.SetStateAction<boolean>>,
  hasError: boolean,
  signature:any,
  setSignature:any
) => {
  
  switch (fieldItem?.type) {
    case 'date':
      return (
        <View style={GeneralServiceStyles.datePickerContainer}>
          <Text
            style={{paddingHorizontal: moderateScale(20), color: Colors.black}}>
            {fieldItem.label}
          </Text>
          <View
            style={[
              signUpStyle.dateOfBirth,
              {
                padding: moderateScale(12),
                marginHorizontal: moderateScale(15),
                marginVertical: moderateScale(10),
              },
            ]}>
            <Text style={signUpStyle.dateOfBirthText}>{currentDate}</Text>
          </View>
        </View>
      );
    case 'text':
      return (
        <TextInputComp
          hasError={hasError}
          item={fieldItem}
          errorState={errorState}
          setErrorState={setErrorState}
          isNextPress={isNextPress}
          setIsNextPress={setIsNextPress}
          inputStyles={{
            marginBottom: moderateScale(1),
            marginTop: moderateScale(3),
          }}
          placeHolderTitle={fieldItem.placeholder}
          {...fieldItem}
          setParentState={setParentState}
          parentsData={parentState}
        />
      );
    case 'form':
      return (
        <View>
          <Text
            style={{
              paddingHorizontal: moderateScale(20),
              color: Colors.black,
              marginTop: moderateScale(10),
            }}>
            {fieldItem.label}
          </Text>
          <AddressForm
          item={fieldItem}
          errorState={errorState}
            setErrorState={setErrorState}
            isNextPress={isNextPress}
            setIsNextPress={setIsNextPress}
            {...fieldItem}
            setParentState={setParentState}
            parentsData={parentState}
          />
        </View>
      );
    // case 'date':
    //   return (
    //     <DatePickerView
    //       {...fieldItem}
    //       setParentState={setParentState}
    //       parentsData={parentState}
    //     />
    //   );
    case 'dropdown':
      return (
        <CustomDropDownComponent
        updatedValue={fieldItem.updatedName}
            item={fieldItem}
          errorState={errorState}
          setErrorState={setErrorState}
          label={fieldItem.placeholder}
          isNextPress={isNextPress}
          setIsNextPress={setIsNextPress}
          isRequired={true}
          dropDownData={renderItem(fieldItem, index)}
          // label=""
          {...fieldItem}
          setParentState={setParentState}
          parentsData={parentState}
        />
      );
    case 'email':
      return (
        <EmailComponent
        updatedValue={fieldItem.updatedName}
            item={fieldItem}
          errorState={errorState}
          setErrorState={setErrorState}
          isNextPress={isNextPress}
          setIsNextPress={setIsNextPress}
          inputStyles={{marginVertical: moderateScale(1)}}
          placeHolderTitle={fieldItem.placeholder}
          {...fieldItem}
          setParentState={setParentState}
          parentsData={parentState}
        />
      );
    case 'signature-image':
      return (
        <View >
            <TextInputComp
            updatedValue={fieldItem.updatedName}
            hasError={hasError}
            item={fieldItem}
            errorState={errorState}
            setErrorState={setErrorState}
            isNextPress={isNextPress}
            setIsNextPress={setIsNextPress}
            inputStyles={{
              marginBottom: moderateScale(1),
              marginTop: moderateScale(3),
              paddingHorizontal: moderateScale(13),
            }}
            placeHolderTitle={fieldItem.placeholder}
            {...fieldItem}
            setParentState={setParentState}
            parentsData={parentState}
          />
            <View
              style={{
                padding: moderateScale(20),
                borderColor: Colors.black,
                borderWidth: moderateScale(0.5),
                margin: moderateScale(15),
                backgroundColor: Colors.white,
              }}>
              <Text
                style={{
                  color: Colors.black,
                  fontFamily: 'Hathaway Demo',
                  fontSize: moderateScale(30)
                }}>
                {`${' '}${fieldItem.updatedName || ''}${' '}`}
              </Text>
            </View>
            </View>
      );
    case 'year':
      return (
        <YearComponent
        updatedValue={fieldItem.updatedName}
            item={fieldItem}
          errorState={errorState}
          setErrorState={setErrorState}
          isNextPress={isNextPress}
          setIsNextPress={setIsNextPress}
          isCountry={true}
          isRequired={true}
          dropDownData={lastYears}
          label=""
          {...fieldItem}
          setParentState={setParentState}
          parentsData={parentState}
        />
      );
    default:
      return (
        <Text style={{color: 'red'}}>
          Invalid Field Type "{fieldItem?.type}".
        </Text>
      );
  }
};

const Dynamic = ({navigation}: {navigation: any}) => {
  const [state, setState] = useState({});
  const [errorState, setErrorState] = useState({});
  const [isNextPress, setIsNextPress] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(true);
  const [loader, setLoader] = useState<boolean>(false);
  const [isBack, setIsBack] = useState<boolean>(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedServicesId, setSelectedServicesId] = useState<any>([]);
  // const [loading, setLoading] = React.useState<boolean>(false);
  const [servicesFields, setServicesFields] = useState<any>([]);
  const [signature, setSignature] = useState('');

  const onPressBack = () => {
    // methodToSaveUserData();
    if (isBack) {
      Alert.alert(
        'You will be jump to the initial screen and data will be removed.',
        'Would you like to go back?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.pop()},
        ],
      );
    } else {
      navigation.pop();
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('Exit').then(isBack => {
      if (isBack !== null) {
        setIsBack(true);
      }
    });
    let error = JSON.stringify(errorState);
    if (error.match(/(:\s*true)/g)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [errorState]);

  const next = () => {
    navigation.navigate('ServicesTerms');
  };

  useEffect(() => {
    preparationYears();
  }, [lastYears]);

  // useEffect(() => {
  //   console.log('hi')
  //   AsyncStorage.getItem('selectedservices').then(services => {
  //     let service: never[] = JSON.parse(services!);
  //     if (Array.isArray(service) && service.length) {
  //       setSelectedServices(service);
  //      let ids= service.filter((service: any) => service.isSelected)
  //       .map((service: any) => service._id);
  //       setSelectedServicesId(ids)
  //     }
  //   });
  //   console.log('service',selectedServices )
  // }, []);

  const validateFields = () => {
    // console.log('state', state)
    setLoader(true);
    let nextRoute = 'ServicesTerms';
    AsyncStorage.setItem(
      'userBusinessContactInformation',
      JSON.stringify(state),
    );
    AsyncStorage.removeItem('Exit');
    
    setTimeout(() => {
      setLoader(false);
    }, 100);

    // if (error) {
      AsyncStorage.setItem('prevRoute', nextRoute);
      setTimeout(() => {
        setLoader(false);
      }, 100);
      navigation.navigate('ServicesTerms');
    // }
  };

  const getDynamicForm = () => {
 Promise.all([
  AsyncStorage.getItem('accessToken'),
  AsyncStorage.getItem('selectedservices')
 ]).then(([token, services])=>{
  setLoader(true);
  let service: never[] = JSON.parse(services!);
  if (Array.isArray(service) && service.length) {
    // setSelectedServices(service);
   let ids= service.filter((service: any) => service.isSelected)
    .map((service: any) => service._id);
    setSelectedServicesId(ids)
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);
  let url = new URL(BASE_URL + `/form/get-common-form/`);
  url.searchParams.append('services', JSON.stringify(ids));
  fetch(url.toString(), {
    method: 'GET',
    headers: myHeaders,
  })
    .then(response => {
      setLoader(false)
      switch (response.status) {
        case 200:
          return response.json();
        case 404:
          Alert.alert('');
          throw 'INVALID USER';
        case 422:
          Alert.alert('');
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
      // console.log('resslogin', json.data.fields);
      setServicesFields(json.data.fields)
    })
    .catch(error => {
      console.error('orderFormError' + error);
    });
  }
 })
  };


  const methodToCheckValidations=()=>{
    setIsNextPress(true);
    let filteredItems=servicesFields.filter((updatedItem:any)=>updatedItem.updatedName)
    console.log('parseDocument', filteredItems.length , '=', servicesFields.length);
    if(filteredItems.length === servicesFields.length-1){
      validateFields()
    }
  }

  useEffect(() => {
    getDynamicForm();
  }, []);

  // const methodToRenderFields = () => {
  //   let servicesId = selectedServices
  //       .filter((service: any) => service.isSelected)
  //       .map((service: any) => service._id),
  //     _fields: any[] = [];
  //   orderForm.fields.forEach((field: any) => {
  //     if (
  //       field?.['for-all-services'] === false &&
  //       servicesId.some((id: any) =>
  //         field?.include?.some(
  //           (serviceId: any) =>
  //             id?.toString?.() === serviceId?.$oid?.toString?.(),
  //         ),
  //       )
  //     ) {
  //       _fields.push(field);
  //     } else if (field?.['for-all-services'] === true) {
  //       let diff: any[] = differenceBy(
  //         servicesId,
  //         field?.exclude?.map((id: any) => id?.toString?.()),
  //       );
  //       if (diff?.length) _fields.push(field);
  //     }
  //   });
  //   setServicesFields(_fields);
  // };

  return (
    <View style={styles.container}>
      {loader && (
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
      <ScrollView>
        <Image
          style={businessFormStyle.logoStyle}
          source={require('../assets/logo.png')}
        />
        <Text style={businessFormStyle.titleStyle}>Order Form</Text>
        <View style={businessFormStyle.border} />
        <View style={businessFormStyle.mainContainer}>
          {servicesFields?.map((item: any, index: number) => {
            return (
              <View>
                {getFormField(
                  item,
                  state,
                  setState,
                  index,
                  errorState,
                  setErrorState,
                  isNextPress,
                  setIsNextPress,
                  item.hasError,
                  signature,
                  setSignature
                )}
              </View>
            );
          })}
        </View>
        <View style={{height: moderateScale(100)}} />
      </ScrollView>
      <View style={[businessFormStyle.bottomAbsoluteContainer]}>
        <TouchableOpacity
          onPress={() => {
            onPressBack();
          }}
          style={businessFormStyle.imageContainer}>
          <Image
            style={businessFormStyle.imageStyle}
            source={require('../assets/back.png')}
          />
          <Text style={businessFormStyle.backText}>
            {Strings.businessForm.back}
          </Text>
        </TouchableOpacity>
        <ButtonComponent
          buttonStyle={businessFormStyle.bottomButton}
          isGradient={true}
          isTitle={true}
          title={'ACCEPT'}
          onPress={() => {
            methodToCheckValidations();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.extraLightBlue,
  },
});

export default Dynamic;
