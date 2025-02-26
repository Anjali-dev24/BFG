import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Strings} from '../styles/Strings';
import {GeneralServiceStyles} from '../styles/StyleSheet/generalServiceAgreementStyles';
import CheckBox from '../assets/icons/CheckBox.svg';
import UnCheck from '../assets/icons/unCheck.svg';

const AgreeStatementComponent = ({
  onPress,
  isPressed,
  statement,
}: {
  onPress: () => void;
  isPressed: boolean;
  statement: string;
}) => {
  return (
    <View style={GeneralServiceStyles.checkBoxContainer}>
      <TouchableOpacity onPress={onPress}>
        {isPressed ? (
          <CheckBox width={moderateScale(18)} height={moderateScale(18)} />
        ) : (
          <UnCheck width={moderateScale(18)} height={moderateScale(18)} />
        )}
      </TouchableOpacity>
      <Text style={GeneralServiceStyles.agreeStatementStyle}>
        {statement}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default AgreeStatementComponent;
