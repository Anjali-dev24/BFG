import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {moderateScale} from 'react-native-size-matters';
import CloseIcon from '../../assets/icons/exitIcon.svg';
import Polygon from '../../assets/icons/Polygon.svg';
import {BASE_URL} from '../../hooks/links';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import {dropDownStyles} from '../../styles/StyleSheet/dropDownStyle';
import { inputStyle } from '../../styles/StyleSheet/inputStyle';
import {personalBusinessStyle} from '../../styles/StyleSheet/personalBusinessStyle';

const OS = Platform.OS === 'ios';
const CountryDropDown = ({
  label,
  modalVisible,
  onPress,
  setVisible,
  setInVisible,
  dropDownData,
  category,
  onClose,
  isCountry,
  //   selectedIndex,
  stateLoading,
  error,
  isRequired,
  setParentState,
  parentsData,
  name,
  errorState,
  setErrorState,
  isNextPress,
  setIsNextPress,
  item,
  updatedValue
}: {
  label: string;
  modalVisible: boolean;
  onPress: (item: any) => void;
  setVisible: () => void;
  setInVisible: (item?: any) => void;
  dropDownData: any;
  category: string;
  onClose: () => void;
  isCountry?: boolean;
  //   selectedIndex: (index: number) => void;
  stateLoading?: boolean;
  error?: string;
  isRequired?: boolean;
  setParentState: any;
  parentsData: any;
  name: any;
  errorState: any[];
  setErrorState: React.Dispatch<React.SetStateAction<{}>>;
  isNextPress: boolean;
  setIsNextPress: React.Dispatch<React.SetStateAction<boolean>>;
  item:any;
  updatedValue:any
}) => {
  const [dropDownState, setDropDownState] = useState<{
    name?: any;
    id?: string;
  } | null>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [selectCountries, setSelectCountries] = React.useState<any[]>([]);
  const [stateLoader, setStateLoader] = React.useState<boolean>(false);
  const [selectedCountryId, setSelectedCountryId] = React.useState<string>('');
  const [errorMsg, seterror] = useState('');

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

  useEffect(() => {
    getCountries();
  }, []);

  const validator = () => {
    if (isNextPress && !dropDownState?.id) {
      setErrorState?.({...errorState, [name]: true, });
      setIsNextPress?.(false);
      seterror('This field is required.');
      // return
    }
    // setErrorState({...errorState, [name]:false})
    // console.log('country', isNextPress, errorMsg);
  };

  useEffect(() => {
    validator();
  }, [isNextPress]);

  // useEffect(() => {
    // item.updatedName=dropDownState
    // setParentState?.({...parentsData, [name]: dropDownState});
    // setIsNextPress?.(false);
    // seterror('');
  //   console.log('selectedCountryId', selectedCountryId);
  //   AsyncStorage.setItem('selectedCountryId', selectedCountryId);
  // }, [dropDownState]);

  useUpdateEffect(()=>{
    item.updatedName=dropDownState
    setParentState?.({...parentsData, [name]: dropDownState});
    setIsNextPress?.(false);
    seterror('');
    AsyncStorage.setItem('selectedCountryId', selectedCountryId);
  },[dropDownState])

  // useEffect(()=>{
  //   setErrorState?.({...errorState, [name]: true});
  // },[])

  const onCountrySelect = (item: any, index: number) => {
    setIsOpen(!isOpen),
      setSelectedIndex(index),
      setSelectedCountryId(item._id),
      setDropDownState({name: item.name, id: item._id});
  };
  return (
    <View>
    <View
      style={[
        personalBusinessStyle.generalAddressDropDown,
        {
          marginTop: moderateScale(10),
          // marginBottom:moderateScale(10),
          marginHorizontal: moderateScale(14),
        },
      ]}>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={[dropDownStyles.container, {padding: moderateScale(13)}]}>
        <Text style={dropDownStyles.categoryStyle}>
          {updatedValue?.name || dropDownState?.id || 'Country'}
        </Text>
        <Polygon />
        {isOpen ? (
          <Animated.View
            style={[dropDownStyles.over, {opacity: new Animated.Value(0)}]}
            onStartShouldSetResponder={() => true}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isOpen}
              onRequestClose={() => {
                setIsOpen(false);
              }}>
              <View
                style={
                  isCountry
                    ? dropDownStyles.countryStyle
                    : dropDownStyles.othersStyle
                }>
                <TouchableOpacity
                  style={dropDownStyles.closeIconStyle}
                  onPress={() => setIsOpen(false)}>
                  <CloseIcon
                    width={moderateScale(15)}
                    height={moderateScale(15)}
                  />
                </TouchableOpacity>
                {stateLoading ? (
                  <ActivityIndicator
                    style={dropDownStyles.activityIndicatorStyle}
                  />
                ) : (
                  <FlatList
                    windowSize={2}
                    maxToRenderPerBatch={10}
                    ListFooterComponent={
                      isCountry ? (
                        <View style={{height: moderateScale(40)}} />
                      ) : null
                    }
                    style={dropDownStyles.flatListStyle}
                    data={selectCountries}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          style={{marginVertical: moderateScale(10)}}
                          onPress={() => {
                            onCountrySelect(item, index);
                            // setcountryError('');
                          }}>
                          <Text style={dropDownStyles.flatListItemStyle}>
                            {item && item.name ? item.name : item.value}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                )}
              </View>
            </Modal>
          </Animated.View>
        ) : null}
      </TouchableOpacity>
      </View>
      {errorMsg !== '' && (
        <Text style={[inputStyle.dropDownErrorStyle,{marginBottom:moderateScale(5)}]}>{errorMsg}</Text>
      )}
    </View>
  );
};

export default CountryDropDown;
