//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Calender from '../assets/icons/calender.svg';
import Colors from '../styles/Colors';
import {GeneralServiceStyles} from '../styles/StyleSheet/generalServiceAgreementStyles';
import {personalBusinessStyle} from '../styles/StyleSheet/personalBusinessStyle';
import {signUpStyle} from '../styles/StyleSheet/signUpStyle';
import DatePickerComponent from './DatePickerComponent';
import TextInputComponent from './TextInputComponent';

// create a component
const SpouseInformationComponent = ({
  spouseFirstNameError,
  onSpouseFirstNameChange,
  spouseFirstName,
  spouseFirstNameLabel,
  spouseLastNameError,
  spouseLastName,
  onSpouseLastNameChange,
  spouseLastNameLabel,
  spouseEmailError,
  spouseEmail,
  onspouseEmailChange,
  spouseEmailLabel,
  spousePhoneError,
  spousePhone,
  onSpousePhoneChange,
  spousePhoneLabel,
  spouseBirthError,
  spouseBirth,
  onSpouseBirthChange,
  spouseBirthLabel,
  date,
  onPressOpen,
  onPressOpenPicker,
  onCancel,
  onConfirm,
  isOpen
}: {
  spouseFirstNameError: string;
  spouseFirstName:string,
  onSpouseFirstNameChange: (spouseFirstName:string) => void;
  spouseFirstNameLabel:string,
  spouseLastNameError:string,
  spouseLastName:string,
  onSpouseLastNameChange:(spouseLastName:string)=>void,
  spouseEmailError:string,
  spouseLastNameLabel:string,
  spouseEmail:string,
  onspouseEmailChange:(spouseEmail:string)=>void,
  spouseEmailLabel:string,
  spousePhoneError:string,
  spousePhone:string,
  onSpousePhoneChange:(spousePhone:string)=>void,
  spousePhoneLabel:string,
  spouseBirthError:string,
  spouseBirth:string,
  onSpouseBirthChange:(spouseBirth:string)=>void,
  spouseBirthLabel:string,
  date:any,
  onPressOpen:()=>void,
  onPressOpenPicker:()=>void,
  onCancel:()=>void,
  onConfirm:(date: any)=>void,
  isOpen:boolean
}) => {
  return (
    <View style={styles.container}>
        <Text  style={{
              color: Colors.greenGradient[0],
              fontSize: moderateScale(15),
              fontFamily: 'Lato-Bold',
              marginTop:moderateScale(10),
            }}>Spouse's Information</Text>
      <TextInputComponent
        editable={true}
        error={spouseFirstNameError}
        inputStyles={[personalBusinessStyle.textInputStyle,{marginTop:moderateScale(10)}]}
        onChangeText={onSpouseFirstNameChange}
        inputValue={spouseFirstName}
        placeHolderTitle={spouseFirstNameLabel ? spouseFirstNameLabel : 'First Name'}
      />
      <TextInputComponent
        editable={true}
        error={spouseLastNameError}
        inputStyles={[personalBusinessStyle.textInputStyle,{marginTop:moderateScale(10)}]}
        onChangeText={onSpouseLastNameChange}
        inputValue={spouseLastName}
        placeHolderTitle={spouseLastNameLabel ? spouseLastNameLabel : 'Last Name'}
      />
      <TextInputComponent
        editable={true}
        error={spouseEmailError}
        inputStyles={[personalBusinessStyle.textInputStyle,{marginTop:moderateScale(10)}]}
        onChangeText={onspouseEmailChange}
        inputValue={spouseEmail}
        placeHolderTitle={spouseEmailLabel ? spouseEmailLabel : 'Email'}
      />
      <TextInputComponent
        editable={true}
        error={spousePhoneError}
        inputStyles={[personalBusinessStyle.textInputStyle,{marginTop:moderateScale(10)}]}
        onChangeText={onSpousePhoneChange}
        inputValue={spousePhone}
        placeHolderTitle={spousePhoneLabel ? spousePhoneLabel : 'Mobile Number'}
      />
      <TextInputComponent
        editable={true}
        error={spouseBirthError}
        inputStyles={[personalBusinessStyle.textInputStyle,{marginTop:moderateScale(10)}]}
        onChangeText={onSpouseBirthChange}
        inputValue={spouseBirth}
        placeHolderTitle={spouseBirthLabel ? spouseBirthLabel : 'Date Of Birth'}
      />
      <View style={GeneralServiceStyles.datePickerContainer}>
        <View style={[signUpStyle.dateOfBirth,{ marginVertical: moderateScale(10),}]}>
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
          onPressOpen={onPressOpenPicker}
          onCancel={onCancel}
          onConfirm={(date: any) => onConfirm(date)}
          open={isOpen}
          date={date}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: Colors.transparent,
  },
});

//make this component available to the app
export default SpouseInformationComponent;
