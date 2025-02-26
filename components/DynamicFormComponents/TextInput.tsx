import React, {Component, ReactElement, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ViewStyle,
  TextStyle,
  Alert,
} from 'react-native';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import Colors from '../../styles/Colors';
import {inputStyle} from '../../styles/StyleSheet/inputStyle';
import ButtonComponent from '../ButtonComponent';

const TextInputComp = ({
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
  errMessage,
  item,
  hasError,
  updatedValue,
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
  errMessage: string;
  item: any;
  hasError: any;
  updatedValue: string;
}) => {
  const [inputState, setInputState] = useState(data?.value || defaultVal || '');
  const [errorMsg, seterror] = useState('');

  const validator = () => {
    if (isNextPress && !inputState) {
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
  //   item.updatedName=inputState
  //   setParentState?.({...parentsData, [name]: inputState});
  //   setIsNextPress?.(false);
  //   seterror('');
  // }, [inputState]);

  useUpdateEffect(() => {
    item.updatedName = inputState;
    setParentState?.({...parentsData, [name]: inputState});
    setIsNextPress?.(false);
    seterror('');
  }, [inputState]);

  return (
    <View style={styles}>
      <TextInput
        onChangeText={(text: string) => setInputState(text)}
        value={inputState ? inputState : updatedValue}
        style={[inputStyle.input, inputStyles]}
        placeholderTextColor={Colors.darkGray}
        editable={editable}
        maxLength={maxLength}
        multiline={multiline}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        contextMenuHidden={true}
        placeholder={placeHolderTitle}
        keyboardType={KeyboardType}
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

export default TextInputComp;
