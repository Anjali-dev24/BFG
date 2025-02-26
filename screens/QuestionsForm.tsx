import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {result} from 'lodash';
import moment from 'moment';
import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import ButtonComponent from '../components/ButtonComponent';
import AddressForm from '../components/DynamicFormComponents/AddressForm';
import CustomDropDownComponent from '../components/DynamicFormComponents/DropDown';
import EmailComponent from '../components/DynamicFormComponents/EmailComponent';
import Signatures from '../components/DynamicFormComponents/SignatureComponent';
import TextInputComp from '../components/DynamicFormComponents/TextInput';
import UploadDocumentComponent from '../components/DynamicFormComponents/UploadDocuments';
import YearComponent from '../components/DynamicFormComponents/YearComponent';
import {BASE_URL} from '../hooks/links';
import {entityData, role} from '../hooks/mock';
import useUpdateEffect from '../hooks/useUpdateEffect';
import Colors from '../styles/Colors';
import {Strings} from '../styles/Strings';
import {businessFormStyle} from '../styles/StyleSheet/businessFormStyle';
import {dashBoardStyle} from '../styles/StyleSheet/dashBoardStyle';
import {GeneralServiceStyles} from '../styles/StyleSheet/generalServiceAgreementStyles';
import {inputStyle} from '../styles/StyleSheet/inputStyle';
import {modalStyle} from '../styles/StyleSheet/modalStyle';
import servicesStyle from '../styles/StyleSheet/servicesStyle';
import {signUpStyle} from '../styles/StyleSheet/signUpStyle';
import {captureRef} from 'react-native-view-shot';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import CustomCamera from '../components/CustomCamera';

const QuestionsForm = ({navigation, route}: {navigation: any; route: any}) => {
  const {taskGroups, questionData, selectedProjectId} = route.params;
  const [lastYears, setlastYears] = useState({});
  const currentDate = moment().format('MM-DD-YYYY');
  const [errorState, setErrorState] = useState({});
  const [isNextPress, setIsNextPress] = useState<boolean>(false);
  const [state, setState] = useState();
  const [document, setDocument] = useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const viewRef = useRef();

  const preparationYears = () => {
    let startYear = 1997;
    var currentYear = new Date().getFullYear(),
      years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    setlastYears(years);
    return lastYears;
  };

  useEffect(() => {
    preparationYears();
  }, []);

  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('done');
      } else {
        console.log('denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadImage = async () => {
    try {
      console.log('pressed');
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });
      if (Platform.OS === 'android') {
        await getPermissionAndroid();
      }
      console.log('savedImage', uri);
      const image = CameraRoll.save(uri, 'photo');
      if (fieldItem.updatedName) {
        console.log('image', uri);

        // Alert.alert(
        //   '',
        //   'Image saved successfully.',
        //   [{text: 'OK', onPress: () => {}}],
        //   {cancelable: false},
        // );
      }
    } catch (error) {
      console.log('error');
    }
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

  const uploadImage = () => {
    Promise.all([
      AsyncStorage.getItem('userSavedInformation'),
      AsyncStorage.getItem('accessToken'),
      AsyncStorage.getItem('uploadedImage'),
    ]).then(([user, token, uploadedDoc]) => {
      let parseData = JSON.parse(user || '{}');
      let parseDoc = JSON.parse(uploadedDoc || '{}');
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);

      var formdata = new FormData();
      formdata.append('file', parseDoc);
      formdata.append('userId', parseData._id);
      formdata.append('type', 'Signature/Client');

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch('http://bfg.essitco.net/uploads/upload', requestOptions)
        .then(response => response.text())
        .then(result => {
          setLoading(false);
          console.log('result', result);
        })
        .catch(error => {
          setLoading(false);
          console.log('error', error);
        });
    });
  };

  useEffect(() => {
    AsyncStorage.getItem('uploadFromCamera').then(document => {
      let parseDocument = JSON.parse(document || '{}');
      setDocument(parseDocument);
    });
  }, []);

  const getFormField = (
    fieldItem: any,
    parentState: any,
    setParentState: any,
    index: number,
    errorState: any,
    setErrorState: React.Dispatch<React.SetStateAction<{}>>,
    isNextPress: boolean,
    setIsNextPress: React.Dispatch<React.SetStateAction<boolean>>,
    hasError: boolean,
  ) => {
    
    switch (fieldItem?.type) {
      case 'date':
        return (
          <View>
            <UploadDocumentComponent
              documentName={document?.fileName}
              navigationToCamera={() => navigation.navigate('CustomCamera')}
              updatedValue={fieldItem.updatedName}
              item={fieldItem}
              {...fieldItem}
              setParentState={setParentState}
              parentsData={parentState}
              switchBack={() => navigation.pop()}
            />
          </View>
          // <View style={GeneralServiceStyles.datePickerContainer}>
          //   <Text
          //     style={{
          //       paddingHorizontal: moderateScale(20),
          //       color: Colors.black,
          //     }}>
          //     {fieldItem.label}
          //   </Text>
          //   <View
          //     style={[
          //       signUpStyle.dateOfBirth,
          //       {
          //         padding: moderateScale(12),
          //         marginHorizontal: moderateScale(15),
          //         marginVertical: moderateScale(10),
          //       },
          //     ]}>
          //     <Text style={signUpStyle.dateOfBirthText}>{currentDate}</Text>
          //   </View>
          // </View>
        );
      case 'text':
        return (
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
            inputStyles={{
              marginVertical: moderateScale(1),
              paddingHorizontal: moderateScale(13),
            }}
            placeHolderTitle={fieldItem.placeholder}
            {...fieldItem}
            setParentState={setParentState}
            parentsData={parentState}
          />
        );
      case 'signature-image':
        return (
          <View>
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
              ref={viewRef}
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
                  fontSize: moderateScale(30),
                }}>
                {`${' '}${fieldItem.updatedName || ''}${'\n '}${' '}`}
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

  const updateProjectList = () => {
    downloadImage();
    setLoading(true);
    Promise.all([
      AsyncStorage.getItem('accessToken'),
      AsyncStorage.getItem('userSavedInformation'),
    ]).then(([tokiee, user]) => {
      let data = JSON.parse(user || '{}');
      if (data !== null) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${tokiee}`);
        fetch(BASE_URL + `/project/${selectedProjectId}`, {
          method: 'PUT',
          headers: myHeaders,
          body: JSON.stringify({
            taskGroups: taskGroups,
          }),
        })
          .then(response => {
            setLoading(false);
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
            uploadImage();
            AsyncStorage.setItem('questionData', JSON.stringify(state));
            navigation.pop();
          })
          .catch(error => {
            console.log('err' + JSON.stringify(error));
          });
      }
    });
  };

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          color={Colors.greenGradient[1]}
          size={'large'}
          style={dashBoardStyle.loader}
        />
      )}
      <ScrollView>
        <View style={modalStyle.modalView}>
          <Image
            style={[
              businessFormStyle.logoStyle,
              {marginBottom: moderateScale(0)},
            ]}
            source={require('../assets/logo.png')}
          />
          <Text style={[modalStyle.modalText, {paddingTop: moderateScale(0)}]}>
            {'Questions'}
          </Text>
          <View
            style={[servicesStyle.border, {marginTop: moderateScale(15)}]}
          />
        </View>
        {questionData?.form?.fields.map((item: any, index: number) => {
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
              )}
            </View>
          );
        })}
        <View style={{height: moderateScale(150)}} />
      </ScrollView>
      <View style={[businessFormStyle.bottomAbsoluteContainer]}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
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
          title={'SUBMIT'}
          onPress={() => {
            // navigation.pop()
            // methodToStoreQuestionsData();
            updateProjectList();
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

export default QuestionsForm;
