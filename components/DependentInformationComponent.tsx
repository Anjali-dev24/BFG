//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {relationArray} from '../hooks/mock';
import Colors from '../styles/Colors';
import {personalBusinessStyle} from '../styles/StyleSheet/personalBusinessStyle';
import DoubleRadioButton from './DoubleRadioButton';
import TextInputComponent from './TextInputComponent';
import RadioDisableButton from '../assets/icons/radioDisable.svg';
import RadioEnableButton from '../assets/icons/radioEnable.svg';
import {GeneralServiceStyles} from '../styles/StyleSheet/generalServiceAgreementStyles';
import {signUpStyle} from '../styles/StyleSheet/signUpStyle';
import Calender from '../assets/icons/calender.svg';
import DatePickerComponent from './DatePickerComponent';

// create a component
const DependentInformationComponent = ({
  dependentFirstNameError,
  onDependentFirstNameChange,
  dependentFirstName,
  dependentFirstNameLabel,
  dependentLastNameError,
  dependentLastName,
  onDependentLastNameChange,
  dependentLastNameLabel,
  onPressDisableRadioButton,
  onPressEnableRadioButton,
  relation,
  date,
  onPressOpen,
  onPressOpenPicker,
  onCancel,
  onConfirm,
  isOpen,
  socialCodeError,
  socialCode,
  onSocialCodeChange,
  socialCodeLabel,
  selectedRelation,
  selectedIndex
}: {
  dependentFirstName: string;
  dependentFirstNameError: string;
  onDependentFirstNameChange: (dependentFirstName: string) => void;
  dependentFirstNameLabel: string;
  dependentLastNameError: string;
  dependentLastName: string;
  onDependentLastNameChange: (dependentLastName: string) => void;
  spouseEmailError: string;
  dependentLastNameLabel: string;
  onPressDisableRadioButton: (index: number) => void;
  onPressEnableRadioButton: (index: number) => void;
  relation: any;
  date: any;
  onPressOpen: () => void;
  onPressOpenPicker: () => void;
  onCancel: () => void;
  onConfirm: (date: any) => void;
  isOpen: boolean;
  socialCodeError: string;
  socialCode: string;
  onSocialCodeChange: (socialCode: string) => void;
  socialCodeLabel: string;
  selectedRelation: boolean;
  selectedIndex:number
}) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: Colors.black,
          fontSize: moderateScale(12),
          marginTop: moderateScale(10),
        }}>
        Dependent 1
      </Text>
      <TextInputComponent
        editable={true}
        error={dependentFirstNameError}
        inputStyles={[
          personalBusinessStyle.textInputStyle,
          {marginTop: moderateScale(10)},
        ]}
        onChangeText={onDependentFirstNameChange}
        inputValue={dependentFirstName}
        placeHolderTitle={
          dependentFirstNameLabel ? dependentFirstNameLabel : 'First Name'
        }
      />
      <TextInputComponent
        editable={true}
        error={dependentFirstNameError}
        inputStyles={[
          personalBusinessStyle.textInputStyle,
          {marginTop: moderateScale(10)},
        ]}
        onChangeText={onDependentFirstNameChange}
        inputValue={dependentLastName}
        placeHolderTitle={
          dependentLastNameLabel ? dependentLastNameLabel : 'Last Name'
        }
      />
      <Text
        style={{
          color: Colors.black,
          fontSize: moderateScale(12),
          marginTop: moderateScale(10),
        }}>
        Relationship to the dependent
      </Text>
      {relation.map((item: any, index: number) => {
        return (
          <View style={{flexDirection: 'row', alignItems:"center", marginTop: moderateScale(10),}}>
            <TouchableOpacity onPress={() => onPressDisableRadioButton(index)}>
              {selectedRelation && selectedIndex===index ? (
                <RadioEnableButton
                  width={moderateScale(20)}
                  height={moderateScale(20)}
                />
              ) : (
                <RadioDisableButton
                  width={moderateScale(20)}
                  height={moderateScale(20)}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.black,
                fontSize: moderateScale(12),
                marginLeft: moderateScale(10),
              }}>
              {item.title}
            </Text>
          </View>
        );
      })}
      <View style={GeneralServiceStyles.datePickerContainer}>
        <View
          style={[
            signUpStyle.dateOfBirth,
            {marginVertical: moderateScale(10)},
          ]}>
          <Text style={signUpStyle.dateOfBirthText}>
            {date.toLocaleDateString('en-US', {
              year: 'long',
              month: 'numeric',
              day: 'numeric',
            })}
          </Text>
          <TouchableOpacity onPress={onPressOpen}>
            <Calender width={moderateScale(18)} height={moderateScale(18)} />
          </TouchableOpacity>
        </View>
        <DatePickerComponent
          onPressOpen={onPressOpen}
          onCancel={onCancel}
          onConfirm={(date: any) => onConfirm(date)}
          open={isOpen}
          date={date}
        />
      </View>
      <Text
        style={{
          color: Colors.black,
          fontSize: moderateScale(12),
          marginTop: moderateScale(10),
        }}>
        Social Security Number
      </Text>
      <Text
        style={{
          color: Colors.gray,
          fontSize: moderateScale(10),
          marginTop: moderateScale(10),
        }}>
        Enter this info only if this dependent was not listed in your previous
        year's tax return.
      </Text>
      <TextInputComponent
        editable={true}
        error={socialCodeError}
        inputStyles={[
          personalBusinessStyle.textInputStyle,
          {marginTop: moderateScale(10)},
        ]}
        onChangeText={onSocialCodeChange}
        inputValue={socialCode}
        placeHolderTitle={socialCodeLabel ? socialCodeLabel : ''}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
});

//make this component available to the app
export default DependentInformationComponent;
