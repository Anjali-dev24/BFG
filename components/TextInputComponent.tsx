import React, {ReactElement} from 'react';
import {View, Text, TextInput, ViewStyle, TextStyle} from 'react-native';
import Colors from '../styles/Colors';
import {inputStyle} from '../styles/StyleSheet/inputStyle';

import ButtonComponent from './ButtonComponent';

const TextInputComponent = ({
  onChangeText,
  inputValue,
  placeHolderTitle,
  KeyboardType,
  isRequired,
  secureTextEntry,
  onEyePress,
  iconElement,
  styles,
  inputStyles,
  error,
  errorStyle,
  multiline,
  maxLength,
  editable,
  onBlur
}: {
  onChangeText?: (text: string) => void;
  inputValue?: string | undefined;
  placeHolderTitle?: string;
  KeyboardType?: any;
  isRequired?: boolean;
  secureTextEntry?: boolean;
  onEyePress?: () => void | undefined;
  iconElement?: ReactElement;
  styles?: ViewStyle;
  inputStyles?: TextStyle;
  error?: string | undefined;
  errorStyle?: TextStyle;
  multiline?: boolean;
  maxLength?: number;
  editable?: boolean;
  onBlur?:(text:any)=>void
}) => {
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
        onChangeText={onChangeText}
        value={inputValue}
        placeholder={placeHolderTitle}
        keyboardType={KeyboardType}
        placeholderTextColor={Colors.darkGray}
        onBlur={onBlur}
      />
      {error ? (
        <Text style={[inputStyle.inputErrorLabelStyle, errorStyle]}>
          {error}
        </Text>
      ) : null}
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

export default TextInputComponent;
