import React, {Component, ReactElement, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ViewStyle,
  TextStyle,
} from 'react-native';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import Colors from '../../styles/Colors';
import {inputStyle} from '../../styles/StyleSheet/inputStyle';
import ButtonComponent from '../ButtonComponent';

const EmailComponent = ({
  data,
  defaultVal,
  setParentState,
  parentsData,
  name,
  styles,
  editable,
  maxLength,
  multiline,
  secureTextEntry,
  inputStyles,
  inputValue,
  placeHolderTitle,
  KeyboardType,
  onBlur,
  error,
  errorStyle,
  isRequired,
  onEyePress,
  iconElement,
  errorState,
  setErrorState,
  isNextPress,
  setIsNextPress,
  item,
  updatedValue
}: {
  data: any;
  defaultVal: any;
  setParentState: any;
  parentsData: any;
  name: any;
  styles?: ViewStyle;
  editable?: boolean;
  maxLength?: number;
  multiline?: boolean;
  secureTextEntry?: boolean;
  inputStyles?: TextStyle;
  inputValue?: string | undefined;
  placeHolderTitle?: string;
  KeyboardType?: any;
  onBlur?: () => void;
  error?: string | undefined;
  errorStyle?: TextStyle;
  isRequired?: boolean;
  onEyePress?: () => void;
  iconElement?: ReactElement;
  errorState: any[];
  setErrorState: React.Dispatch<React.SetStateAction<{}>>;
  isNextPress: boolean;
  setIsNextPress: React.Dispatch<React.SetStateAction<boolean>>;
  item:any;
  updatedValue:string
}) => {
  const [email, setEmail] = useState(data?.value || defaultVal || '');
  const [errorMsg, seterror] = useState('');

  const validator = () => {
    if (isNextPress && !email) {
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
  //   item.updatedName=email
  //   setParentState?.({...parentsData, [name]: email});
  //   setIsNextPress?.(false);
  //   seterror('');
  // }, [email]);


  useUpdateEffect(()=>{
    item.updatedName=email
    setParentState?.({...parentsData, [name]: email});
    setIsNextPress?.(false);
    seterror('');
  },[email])

  // useEffect(()=>{
  //   setErrorState?.({...errorState, [name]: true});
  // },[])
  
  return (
    <View style={styles}>
      <TextInput
        editable={editable}
        maxLength={maxLength}
        multiline={multiline}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        contextMenuHidden={true}
        style={[inputStyle.input, inputStyles]}
        onChangeText={(text: string) => setEmail(text)}
        value={updatedValue ||email}
        placeholder={placeHolderTitle}
        keyboardType={KeyboardType}
        placeholderTextColor={Colors.darkGray}
        onBlur={onBlur}
      />
      {errorMsg !== '' && (
        <Text style={[inputStyle.inputErrorLabelStyle, errorStyle]}>
          {errorMsg}
        </Text>
      )}
      {isRequired && (
        <ButtonComponent
          textStyle={inputStyle.inputText}
          buttonStyle={inputStyle.eyeIconStyle}
          isGradient={false}
          onPress={onEyePress}
          iconElement={iconElement}
        />
      )}
    </View>
  );
};


export default EmailComponent;
