import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import ExitIcon from '../assets/icons/exitIcon.svg';
import {entityData, role} from '../hooks/mock';
import Colors from '../styles/Colors';
import {Strings} from '../styles/Strings';
import {businessFormStyle} from '../styles/StyleSheet/businessFormStyle';
import {GeneralServiceStyles} from '../styles/StyleSheet/generalServiceAgreementStyles';
import {modalStyle} from '../styles/StyleSheet/modalStyle';
import servicesStyle from '../styles/StyleSheet/servicesStyle';
import {signUpStyle} from '../styles/StyleSheet/signUpStyle';
import ButtonComponent from './ButtonComponent';
import AddressForm from './DynamicFormComponents/AddressForm';
import CustomDropDownComponent from './DynamicFormComponents/DropDown';
import EmailComponent from './DynamicFormComponents/EmailComponent';
import Signatures from './DynamicFormComponents/SignatureComponent';
import TextInputComp from './DynamicFormComponents/TextInput';
import YearComponent from './DynamicFormComponents/YearComponent';

const CustomModal = ({
  modalVisible,
  onRequestClose,
  onClose,
  agreementTitle,
  onPressBack,
  onPressSave,
  servicesFields,
  errorState,
  setErrorState,
  isNextPress,
  setIsNextPress,
  modalState,
  setModalState,
}: {
  modalVisible: boolean;
  onRequestClose: () => void;
  onClose: () => void;
  agreementTitle: string;
  onPressBack: () => void;
  onPressSave: () => void;
  servicesFields: any;
  errorState: any[];
  setErrorState: React.Dispatch<React.SetStateAction<{}>>;
  isNextPress: boolean;
  setIsNextPress: React.Dispatch<React.SetStateAction<boolean>>;
  modalState: any;
  setModalState: any;
}) => {
  const [lastYears, setlastYears] = useState({});
  const currentDate = moment().format('MM-DD-YYYY');
  // let lastYears: any[] = [];

  const preparationYears = () => {
    let startYear = 1997;
    var currentYear = new Date().getFullYear(),
      years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    // lastYears = years;
    setlastYears(years);
    return lastYears;
  };

  useEffect(() => {
    preparationYears();
  }, []);

  const renderItem = (item: any, index: number) => {
    switch (item?.['option-type']) {
      case 'enum':
        switch (item.options) {
          case 'party-title':
            return role;
            break;
          case 'party-title':
            return role;
            break;
          
          default:
            break;
        }
        case 'business-entity-type':
            return entityData;
            break;
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
    hasError: boolean,
  ) => {
    switch (fieldItem?.type) {
      case 'date':
        return (
          <View style={GeneralServiceStyles.datePickerContainer}>
            <Text
              style={{
                paddingHorizontal: moderateScale(20),
                color: Colors.black,
              }}>
              {fieldItem.label}
            </Text>
            <View
              style={[
                signUpStyle.dateOfBirth,
                {
                  padding: moderateScale(12),
                  marginHorizontal: moderateScale(15),
                  marginVertical: moderateScale(10),
                },
              ]}>
              <Text style={signUpStyle.dateOfBirthText}>{currentDate}</Text>
            </View>
          </View>
        );
      case 'text':
        return (
          <TextInputComp
            hasError={hasError}
            item={fieldItem}
            errorState={errorState}
            setErrorState={setErrorState}
            isNextPress={isNextPress}
            setIsNextPress={setIsNextPress}
            inputStyles={{
              marginBottom: moderateScale(1),
              marginTop: moderateScale(3),
            }}
            placeHolderTitle={fieldItem.placeholder}
            {...fieldItem}
            setParentState={setParentState}
            parentsData={parentState}
          />
        );
      case 'form':
        return (
          <View>
            <Text
              style={{
                paddingHorizontal: moderateScale(20),
                color: Colors.black,
                marginTop: moderateScale(10),
              }}>
              {fieldItem.label}
            </Text>
            <AddressForm
              errorState={errorState}
              setErrorState={setErrorState}
              isNextPress={isNextPress}
              setIsNextPress={setIsNextPress}
              {...fieldItem}
              setParentState={setParentState}
              parentsData={parentState}
            />
          </View>
        );
      // case 'date':
      //   return (
      //     <DatePickerView
      //       {...fieldItem}
      //       setParentState={setParentState}
      //       parentsData={parentState}
      //     />
      //   );
      case 'dropdown':
        return (
          <CustomDropDownComponent
            errorState={errorState}
            setErrorState={setErrorState}
            label={fieldItem.placeholder}
            isNextPress={isNextPress}
            setIsNextPress={setIsNextPress}
            isRequired={true}
            dropDownData={renderItem(fieldItem, index)}
            // label=""
            {...fieldItem}
            setParentState={setParentState}
            parentsData={parentState}
          />
        );
      case 'email':
        return (
          <EmailComponent
            errorState={errorState}
            setErrorState={setErrorState}
            isNextPress={isNextPress}
            setIsNextPress={setIsNextPress}
            inputStyles={{marginVertical: moderateScale(1)}}
            placeHolderTitle={fieldItem.placeholder}
            {...fieldItem}
            setParentState={setParentState}
            parentsData={parentState}
          />
        );
      case 'signature-image':
        return (
          <View style={{paddingHorizontal: moderateScale(15)}}>
            <Signatures
              isNextPress={isNextPress}
              setIsNextPress={setIsNextPress}
              errorState={errorState}
              setErrorState={setErrorState}
              onDrag={() => {
                true;
              }}
              {...fieldItem}
              setParentState={setParentState}
              parentsData={parentState}
            />
          </View>
        );
      case 'year':
        return (
          <YearComponent
            errorState={errorState}
            setErrorState={setErrorState}
            isNextPress={isNextPress}
            setIsNextPress={setIsNextPress}
            isCountry={true}
            isRequired={true}
            dropDownData={lastYears}
            label=""
            {...fieldItem}
            setParentState={setParentState}
            parentsData={parentState}
          />
        );
      default:
        return (
          <Text style={{color: 'red'}}>
            Invalid Field Type "{fieldItem?.type}".
          </Text>
        );
    }
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <ScrollView nestedScrollEnabled={true} style={modalStyle.customModal}>
          <TouchableOpacity style={modalStyle.exitIcon} onPress={onClose}>
            <ExitIcon width={moderateScale(20)} height={moderateScale(20)} />
          </TouchableOpacity>
          <View style={modalStyle.modalView}>
            <Image
              style={[
                businessFormStyle.logoStyle,
                {marginBottom: moderateScale(0)},
              ]}
              source={require('../assets/logo.png')}
            />
            <Text style={modalStyle.modalText}>{agreementTitle}</Text>
            <View
              style={[servicesStyle.border, {marginTop: moderateScale(20)}]}
            />
          </View>
          {servicesFields.map((item: any, index: number) => {
            return (
              <View>
                {getFormField(
                  item,
                  modalState,
                  setModalState,
                  index,
                  errorState,
                  setErrorState,
                  isNextPress,
                  setIsNextPress,
                  item.hasError,
                )}
              </View>
            );
          })}
          <View
            style={[
              businessFormStyle.bottomContainer,
              {padding: moderateScale(20)},
            ]}>
            <ButtonComponent
              buttonStyle={businessFormStyle.bottomButton}
              isGradient={true}
              isTitle={true}
              title={'ACCEPT'}
              onPress={onPressSave}
            />
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default CustomModal;
