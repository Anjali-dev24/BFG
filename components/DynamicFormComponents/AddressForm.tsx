import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {BASE_URL} from '../../hooks/links';
import {countries, states} from '../../hooks/mock';
import {orderForm} from '../../hooks/orderForm';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import Colors from '../../styles/Colors';
import CountryDropDown from './CountryDropDown';
import CustomDropDownComponent from './DropDown';
import StateDropDown from './StateDropDown';
import TextInputComp from './TextInput';

const renderDropdown = (
  item: any,
  index: number,
  setParentState: any,
  parentState: any,
  errorState: any[],
  setErrorState: React.Dispatch<React.SetStateAction<{}>>,
  isNextPress: boolean,
  setIsNextPress: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  switch (item.name) {
    case 'ba-country':
      return (
        <CountryDropDown
        updatedValue={item?.updatedName}
        item={item}
          errorState={errorState}
          setErrorState={setErrorState}
          isNextPress={isNextPress}
          setIsNextPress={setIsNextPress}
          isCountry={true}
          isRequired={true}
          label={item.placeholder}
          {...item}
          setParentState={setParentState}
          parentsData={parentState}
        />
      );
      break;
    case 'ba-state':
      return (
        <StateDropDown
        updatedValue={item?.updatedName}
        item={item}
          errorState={errorState}
          setErrorState={setErrorState}
          isNextPress={isNextPress}
          setIsNextPress={setIsNextPress}
          isCountry={true}
          isRequired={true}
          label={item.placeholder}
          {...item}
          setParentState={setParentState}
          parentsData={parentState}
        />
      );
    default:
      break;
  }
};

const getFormField = (
  fieldItem: any,
  parentState: any,
  setParentState: any,
  index: number,
  errorState: any[],
  setErrorState: React.Dispatch<React.SetStateAction<{}>>,
  isNextPress: boolean,
  setIsNextPress: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  switch (fieldItem?.type) {
    case 'dropdown':
      return renderDropdown(
        fieldItem,
        index,
        setParentState,
        parentState,
        errorState,
        setErrorState,
        isNextPress,
        setIsNextPress,
      );
    case 'text':
      return (
        <TextInputComp
        updatedValue={fieldItem.updatedName}
          item={fieldItem}
          errorState={errorState}
          setErrorState={setErrorState}
          isNextPress={isNextPress}
          setIsNextPress={setIsNextPress}
          inputStyles={{
            marginVertical: moderateScale(0),
            marginTop: moderateScale(10),
            paddingHorizontal: moderateScale(13),
            marginBottom:
              fieldItem.placeholder === 'ZIP code'
                ? moderateScale(8)
                : moderateScale(0),
          }}
          placeHolderTitle={fieldItem.placeholder}
          {...fieldItem}
          setParentState={setParentState}
          parentsData={parentState}
        />
      );
    default:
      break;
  }
};
const AddressForm = ({
  setParentState,
  parentsData,
  name,
  errorState,
  setErrorState,
  isNextPress,
  setIsNextPress,
  item,
}: {
  setParentState: any;
  parentsData: any;
  name: any;
  errorState: any[];
  setErrorState: React.Dispatch<React.SetStateAction<{}>>;
  isNextPress: boolean;
  setIsNextPress: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
}) => {
  const [addressState, setAddressState] = useState({});
  const [errorMsg, seterror] = useState('');

  const validator = () => {
    if (isNextPress && !addressState) {
      setErrorState?.({...errorState, [name]: true});
      setIsNextPress?.(false);
      seterror('This field is required.');
      //   return
    }
    // setErrorState({...errorState, [name]:false})
    // console.log('nextPress', isNextPress, errorMsg);
  };

  useEffect(() => {
    validator();
  }, [isNextPress]);


  useUpdateEffect(()=>{
    item.updatedName = addressState;
    setParentState?.({...parentsData, [name]: addressState});
    setIsNextPress?.(false);
    seterror('');
  },[addressState])
  

  return (
    <View style={styles.container}>
      {item.children.map((addressFields: any, index: number) => {
          return getFormField(
            addressFields,
            addressState,
            setAddressState,
            index,
            errorState,
            setErrorState,
            isNextPress,
            setIsNextPress,
          );
      })}
      {/* {orderForm.fields.map((item: any, index: number) => {
        return item.children.map((addressFields: any) => {
          return getFormField(
            addressFields,
            addressState,
            setAddressState,
            index,
            errorState,
            setErrorState,
            isNextPress,
            setIsNextPress,
          );
        });
      })} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
  },
});

export default AddressForm;
