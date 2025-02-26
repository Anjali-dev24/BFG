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
import {inputStyle} from '../../styles/StyleSheet/inputStyle';
import {personalBusinessStyle} from '../../styles/StyleSheet/personalBusinessStyle';

const OS = Platform.OS === 'ios';
const CustomDropDownComponent = ({
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
  const [dropDownState, setDropDownState] = useState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [errorMsg, seterror] = useState('');

  const validator = () => {
    if (isNextPress && !dropDownState) {
      setErrorState?.({...errorState, [name]: true});
      setIsNextPress?.(false);
      seterror('This field is required.');
      // return
    }
    // setErrorState({...errorState, [name]:false})
    // console.log('nextPress', isNextPress, errorMsg);
  };

  useEffect(() => {
    validator();
  }, [isNextPress]);

  // useEffect(() => {
  //   item.updatedName=dropDownState
  //   setParentState?.({...parentsData, [name]: dropDownState});
  //   setIsNextPress?.(false);
  //   seterror('');
  // }, [dropDownState]);

  useUpdateEffect(()=>{
    item.updatedName=dropDownState
    setParentState?.({...parentsData, [name]: dropDownState});
    setIsNextPress?.(false);
    seterror('');
  },[dropDownState])

  // useEffect(()=>{
  //   setErrorState?.({...errorState, [name]: true});
  // },[])
  return (
    <View>
      <View
        style={[
          personalBusinessStyle.generalAddressDropDown,
          {
            marginTop: moderateScale(10),
            marginBottom: errorMsg !== ''?moderateScale(0): moderateScale(10),
            marginHorizontal: moderateScale(14),
          },
        ]}>
        <TouchableOpacity
          onPress={() => setIsOpen(true)}
          style={[dropDownStyles.container, {padding: moderateScale(13)}]}>
          <Text style={dropDownStyles.categoryStyle}>
            {updatedValue ||dropDownState|| label}
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
                      data={dropDownData}
                      renderItem={({item, index}) => {
                        return (
                          <TouchableOpacity
                            style={{marginVertical: moderateScale(10)}}
                            onPress={() => {
                              setIsOpen(!isOpen),
                                setSelectedIndex(index),
                                setDropDownState(item.value);
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
        <Text style={[inputStyle.dropDownErrorStyle]}>{errorMsg}</Text>
      )}
    </View>
  );
};

const renderItems = (
  setInVisible: (item: any) => void,
  dropDownData: any,
  onClose: () => void,
  selectedIndex: (index: number) => void,
  isCountry?: boolean,
) => {
  return (
    <FlatList
      windowSize={2}
      maxToRenderPerBatch={10}
      ListFooterComponent={
        isCountry ? <View style={{height: moderateScale(40)}} /> : null
      }
      style={dropDownStyles.flatListStyle}
      data={dropDownData}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={{marginVertical: moderateScale(10)}}
            onPress={() => {
              setInVisible(item), selectedIndex(index);
            }}>
            <Text style={dropDownStyles.flatListItemStyle}>
              {item && item.name ? item.name : item.value}
            </Text>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default CustomDropDownComponent;
