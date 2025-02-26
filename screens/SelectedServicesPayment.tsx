import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Alert, Image, Text, ToastAndroid, View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ButtonComponent from '../components/ButtonComponent';
import { BASE_URL } from '../hooks/links';
import * as pageActions from '../store/actions/SignUp';
import Colors from '../styles/Colors';
import { Strings } from '../styles/Strings';
import { businessFormStyle } from '../styles/StyleSheet/businessFormStyle';
import { dashBoardStyle } from '../styles/StyleSheet/dashBoardStyle';

const SelectedServicesPayment = ({
  route,
  navigation,
  status,
}: {
  route: any;
  navigation: any;
  status: any;
}) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState<number>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isBack, setIsBack] = useState<boolean>(false);
  const [token, setToken] = React.useState<any>();

  useEffect(() => {
    AsyncStorage.getItem('Exit').then(isBack => {
      if (isBack !== null) {
        setIsBack(true);
      }
    });
    AsyncStorage.getItem('accessToken').then(token => {
      setToken(token);
    });
    AsyncStorage.getItem('selectedservices').then(services => {
      let selectedServices = JSON.parse(services!);
      if (selectedServices !== [] && selectedServices !== null) {
        setSelectedServices(selectedServices);
      }
    });
  }, []);

  const renderTotalAmount = () => {
    let sum = selectedServices.reduce((a: any, c: any) => {
      return a + 99;
    }, 0);
    setTotalAmount(sum);
  };

  useEffect(() => {
    renderTotalAmount();
  }, [selectedServices]);

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Payment has done successfully',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const getSavedFormData = (projectId: string) => {
    let nextScreen = 'ServicesTerms';
    setLoading(true);
    Promise.all([
      AsyncStorage.getItem('accessToken'),
      AsyncStorage.getItem('SavedFormDataId'),
      AsyncStorage.getItem('userBusinessContactInformation'),
      AsyncStorage.getItem('userSavedInformation'),
      // AsyncStorage.getItem('createdProjectId'),
    ]).then(([tokiee, SavedFormDataId, orderFormData, userInfo]) => {
      let userOrderData = JSON.parse(orderFormData || '{}');
      let userData = JSON.parse(userInfo || '{}');
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${tokiee}`);

      var raw = JSON.stringify({
        userId: userData._id,
        formId: '62faf76848c194bc13acca37',
        projectId: projectId,
        details: userOrderData,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(BASE_URL + '/forms-data', requestOptions)
        .then(response => {
          setLoading(false);
          switch (response.status) {
            case 201:
              return response.json();
            case 401:
              console.error('err');
              throw 'TOKEN EXPIRED';
            case 500:
              Alert.alert('Internal Server Error');
              throw 'INTERNAL SERVER ERROR';
            default:
              // Alert.alert('Error');
              throw 'ERROR';
          }
        })
        .then(result => { 
          setLoading(false);
          AsyncStorage.setItem('SavedFormDataId', result?.data?._id);
          AsyncStorage.setItem(
            'userBusinessContactInformation',
            JSON.stringify(result?.data?.details),
          );
        })
        .catch(error => console.log('error', error));
    });
  };

  const methodToCreateNewProject = () => {
    setLoading(true);
    let nextScreen = 'OrderForm';
    Promise.all([
      AsyncStorage.getItem('accessToken'),
      AsyncStorage.getItem('userSavedInformation'),
      AsyncStorage.getItem('selectedservices'),
      AsyncStorage.getItem('createdProjectId'),
    ]).then(([tokiee, userId, serviceId, projId]) => {
      let data = JSON.parse(userId || '');
      let id = JSON.parse(serviceId || '');
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token ? token : tokiee}`);
      let url = BASE_URL + '/project',
        options = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({
            userId: data._id,
            services: selectedServices
              .filter((service: any) => service.isSelected)
              .map((service: any) => service._id),
          }),
        };
      fetch(url, options)
        .then(response => {
          setLoading(false);
          switch (response.status) {
            case 201:
              return response.json();
            case 200:
              return response.json();
            case 401:
              console.error('err');
              throw 'TOKEN EXPIRED';
            case 422:
              console.error('Project already exists');
              throw 'PROJECT EXISTS';
            case 500:
              Alert.alert('Internal Server Error');
              throw 'INTERNAL SERVER ERROR';
            default:
              Alert.alert('ErrorProject');
              throw 'ERROR';
          }
        })
        .then(json => {
          let projectIds = json?.data?.map?.((proj: any) => proj._id);
          let tasks = json?.data?.map?.((proj: any) => proj.taskGroups);
          getSavedFormData(projectIds);
          AsyncStorage.removeItem('prevRoute');
          AsyncStorage.setItem('taskGroups', JSON.stringify(tasks));
          showToastWithGravityAndOffset();
          AsyncStorage.removeItem('prevRoute');
          AsyncStorage.setItem('route', 'DashBoard');
          AsyncStorage.removeItem('Exit')
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
        })
        .catch(error => {
          console.log('err' + JSON.stringify(error));
        });
    });
  };

  return (
    <View style={dashBoardStyle.container}>
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
      <Image
        style={businessFormStyle.logoStyle}
        source={require('../assets/logo.png')}
      />
      <Text style={businessFormStyle.titleStyle}>Billing Information</Text>
      <View style={businessFormStyle.border} />
      {selectedServices.map((item: any, index: number) => {
        return (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: moderateScale(8),
              paddingHorizontal: moderateScale(15),
            }}
            onPress={() => {}}>
            <Text style={{color: Colors.black}}>{item.name}</Text>
            <Text style={{color: Colors.black}}>
              {item.currencySymbol}
              99
            </Text>
          </TouchableOpacity>
        );
      })}
      <View
        style={{
          position: 'absolute',
          left: moderateScale(0),
          right: moderateScale(0),
          bottom: moderateScale(0),
        }}>
        {/* <Text style={{
            color: Colors.black,
            textAlign: 'center',
            // marginRight: moderateScale(20),
            marginTop: moderateScale(20),
            fontFamily:"Lato-Bold"
          }}>Price will increase after selected addition services.</Text> */}
        <View style={businessFormStyle.border} />
        <Text
          style={{
            color: Colors.black,
            textAlign: 'right',
            marginRight: moderateScale(20),
            marginTop: moderateScale(20),
          }}>
          Total: ${totalAmount}
        </Text>
        <View style={businessFormStyle.bottomPayment}>
          <TouchableOpacity
            onPress={() => {
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
            title={'PAY NOW'}
            onPress={() => {
              // setLoading(true)
              methodToCreateNewProject();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    status: state.signUpInfo.status,
  };
};

const ActionCreators = Object.assign({}, pageActions);
const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectedServicesPayment);
