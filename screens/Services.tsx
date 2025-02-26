import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Alert,
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  DevSettings,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import ButtonComponent from '../components/ButtonComponent';
import FlatListComponent from '../components/FlatListComponent';
import {BASE_URL} from '../hooks/links';
import Colors from '../styles/Colors';
import {Strings} from '../styles/Strings';
import {
  default as ServicesStyle,
  default as servicesStyle,
} from '../styles/StyleSheet/servicesStyle';

const Services = ({navigation, route}: {navigation: any; route: any}) => {
  const {token} = route.params;
  const [multiSelectItems, setMultiSelectItems] = useState<any>([]);
  const [singleSelectItems, setSingleSelectItems] = useState<any>([]);
  const [selectedServices, setSelectedServices] = useState<any>([]);
  const [selectedServicesId, setSelectedServicesId] = useState<any>([]);
  var selectedItems: any = [];
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isPersonal, setIsPersonal] = React.useState<boolean>(false);
  const [isBusiness, setIsBusiness] = React.useState<boolean>(false);
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    AsyncStorage.getItem('prevRoute').then(prevScreen => {
      if (prevScreen !== null) {
        AsyncStorage.setItem('Exit', 'true')
        navigation.navigate(prevScreen);
      }
    });
  }, []);

  const getUserFilledData = () => {
    setLoading(true);
    Promise.all([
      AsyncStorage.getItem('accessToken'),
      AsyncStorage.getItem('userSavedInformation'),
    ]).then(([tokiee, user]) => {
      let data = JSON.parse(user || '{}');
      if (data !== null) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token ? token : tokiee}`);
        fetch(BASE_URL + `/forms-data/by-user-id/${data._id}`, {
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
                Alert.alert('ErrorService');
                throw 'ERROR';
            }
          })
          .then(json => {
            setLoading(false);
            if (json.data !== null) {
              // AsyncStorage.setItem(
              //   'userBusinessContactInformation',
              //   JSON.stringify(json.data.details),
              // );
              AsyncStorage.setItem('SavedFormDataId', json.data._id);
            }
          })
          .catch(error => {
            console.log('err' + JSON.stringify(error));
          });
      }
    });
  };

  useEffect(() => {
    getUserFilledData();
  }, []);

  /**
   * Method to fetch services data from server.
   */
  async function methodToFetchServicesData() {
    setLoading(true);
    AsyncStorage.getItem('accessToken').then(tokiee => {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token ? token : tokiee}`);
      fetch(BASE_URL + '/services', {
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
          setLoading(false);
          methodToSplitItems(json.services);
        })
        .catch(error => {
          console.log('err' + JSON.stringify(error));
        });
    });
  }

  useEffect(() => {
    methodToFetchServicesData();
  }, []);

  /**
   * Method to split services in two different categories.
   */
  const methodToSplitItems = (res: any) => {
    let tempMultiItems = [];
    let tempSignleItems = [];
    for (let i = 0; i < res.length; i++) {
      if (res[i].multiSelectable) {
        tempMultiItems.push(res[i]);
        // setPrice(res[i].price)
        // setCurrencySymbol(res[i].currencySymbol)
      } else {
        tempSignleItems.push(res[i]);
      }
    }
    setMultiSelectItems(tempMultiItems);
    setSingleSelectItems(tempSignleItems);
  };

  const renderServicesFields = () => {
    let {hasPersonal, hasBusiness} = selectedServices.reduce(
      (prevValue: any, service: any) => {
        return {
          hasPersonal:
            prevValue.hasPersonal || service?.types?.includes('Personal'),
          hasBusiness:
            prevValue.hasBusiness || service?.types?.includes('Business'),
        };
      },
      {hasPersonal: false, hasBusiness: false},
    );
    setIsPersonal(hasPersonal), setIsBusiness(hasBusiness);
  };

  useEffect(() => {
    renderServicesFields();
  }, [multiSelectItems]);

  const methodToGetSelectedServices = (array: any) => {
    let newServices = array.filter((item: any) => {
      return item.isSelected === true;
    });
    setSelectedServices(newServices);
    AsyncStorage.setItem('selectedTax', JSON.stringify(newServices));
    if (newServices.length === 0) {
      setIsSelected(false);
    } else {
      setIsSelected(true);
    }
    return AsyncStorage.setItem(
      'selectedservices',
      JSON.stringify(newServices),
    );
  };

  /**
   * Method to select multiple service.
   * @param index
   * @param selectedItem
   */
  const MethodToSelectMultipleServices = (index: number, selectedItem: any) => {
    setSelectedIndex(index);
    let duplicateItems = Array.from(multiSelectItems);
    let updatedItems: any = duplicateItems[index];
    updatedItems.isSelected = !updatedItems.isSelected;
    duplicateItems[index] = updatedItems;
    setMultiSelectItems(duplicateItems);
    AsyncStorage.setItem('SelectedKeys', JSON.stringify(duplicateItems))
    methodToGetSelectedServices(duplicateItems);
  };

  

  /**
   * method to navigate another screen.
   * @returns
   */
  const handleNavigation = () => {
    let currentRoute = 'OrderForm';
    AsyncStorage.setItem('isPersonalService', JSON.stringify(isPersonal));
    AsyncStorage.setItem('isBusinessService', JSON.stringify(isBusiness));
    return (
      AsyncStorage.setItem('prevRoute', currentRoute),
      renderServicesFields(),
      navigation.navigate('OrderForm')
    );
  };

  return (
    <SafeAreaView style={ServicesStyle.container}>
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
        style={ServicesStyle.logoStyle}
        source={require('../assets/logo.png')}
      />
      <Text style={servicesStyle.headLine}>{Strings.services.headLine}</Text>
      <View style={servicesStyle.border} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[servicesStyle.mainContainer, {width: '100%'}]}>
        <FlatListComponent
          isServices={true}
          onPress={(index: number, item: any) => {
            MethodToSelectMultipleServices(item, index);
          }}
          array={multiSelectItems}
          style={{marginVertical: moderateScale(5)}}
        />
      </ScrollView>
      <ButtonComponent
        disabled={isSelected ? false : true}
        onPress={() => {
          if (isSelected) {
            handleNavigation();
          }
        }}
        isGradient={true}
        buttonStyle={servicesStyle.bottomButton}
        isTitle={true}
        title={Strings.Swiper.swipeTitle}
      />
    </SafeAreaView>
  );
};

export default Services;
