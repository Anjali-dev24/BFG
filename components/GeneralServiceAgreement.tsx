import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../styles/Colors';
import {Strings} from '../styles/Strings';
import {GeneralServiceStyles} from '../styles/StyleSheet/generalServiceAgreementStyles';
import {personalBusinessStyle} from '../styles/StyleSheet/personalBusinessStyle';
import TermsOfService from './TermsOfService';
import TextInputComponent from './TextInputComponent';
import CheckBox from '../assets/icons/CheckBox.svg';
import UnCheck from '../assets/icons/unCheck.svg';
import {signUpStyle} from '../styles/StyleSheet/signUpStyle';
import {dropDownStyles} from '../styles/StyleSheet/dropDownStyle';
import CustomDropDown from './CustomDropDown';
import moment from 'moment';

const GeneralServiceAgreement = ({
  stateLoader,
  generalData,
  companyNameLabel,
  companyNameError,
  companyName,
  onCompanyNameChange,
  firstNameLabel,
  firstNameError,
  onFirstNameChange,
  firstName,
  secondNameLabel,
  secondNameError,
  onSecondNameChange,
  secondName,
  countyLabel,
  countyError,
  onCountyChange,
  county,
  cityLabel,
  cityError,
  onCityChange,
  city,
  postCodeLabel,
  postCodeError,
  onPostCodeChange,
  postCode,
  personalEmailLabel,
  personalEmailError,
  onPersonalEmailChange,
  personalEmail,
  phoneLabel,
  phoneError,
  onPhoneChange,
  phone,
  businessEmailLabel,
  businessEmailError,
  onBusinessEmailChange,
  businessEmail,
  businessPhoneLabel,
  businessPhoneError,
  onBusinessPhoneChange,
  businessPhone,
  lastNameLabel,
  lastNameError,
  onLastNameChange,
  lastName,
  emailAddressLabel,
  emailAddressError,
  onEmailAddressChange,
  emailAddress,
  isPressed,
  onPressedAgree,
  termsError,
  firstAddress,
  firstAddressError,
  firstAddressLabel,
  onFirstAddressChange,
  isAgreement,
  editable,
  businessNameError,
  onBusinessNameChange,
  businessName,
  businessNameLabel,
  onCountryChange,
  country,
  countryLabel,
  onStateChange,
  state,
  stateLabel,
  onTitleChange,
  title,
  titleLabel,
  isBusineesEmail,
  isBusineesPhone,
  onCloseEntity,
  entityData,
  setVisibleEntity,
  entityCategory,
  setEntityInVisible,
  isEntityDropDownVisible,
  onEntityPress,
  entity,
  onPreparationTitle,
  preparationData,
  setVisiblePreparation,
  preparationCategory,
  setPreparationInVisible,
  isPreparationDropDownVisible,
  onPreparationPress,
  preparation,
  partyEmailError,
  partyEmail,
  partyEmailLabel,
  onPartyEmailChange,
  partySignError,
  partySign,
  partySignLabel,
  onPartySignChange,
  firstAuthorizedNameError,
  firstAuthorizedName,
  firstAuthorizedNameLabel,
  onFirstAuthorizedNameChange,
  lastAuthorizedNameError,
  lastAuthorizedName,
  lastAuthorizedNameLabel,
  onLastAuthorizedNameChange,
  partyTitleError,
  partyTitleLabel,
  setVisiblePartyTitle,
  partyTitleCategory,
  setPartyTitleInVisible,
  isPartyTitleDropDownVisible,
  onPartyTitleChange,
  partyTitle,
}: {
  stateLoader: boolean;
  generalData: any;
  companyNameLabel: string;
  companyNameError: string;
  companyName: string;
  onCompanyNameChange: (companyName: string) => void;
  firstNameLabel: string;
  firstNameError: string;
  onFirstNameChange: (firstName: string) => void;
  firstName: string;
  secondNameLabel: string;
  secondNameError: string;
  onSecondNameChange: (firstName: string) => void;
  secondName: string;
  countyLabel: string;
  countyError: string;
  onCountyChange: (county: string) => void;
  county: string;
  cityLabel: string;
  cityError: string;
  onCityChange: (city: string) => void;
  city: string;
  postCodeLabel: string;
  postCodeError: string;
  onPostCodeChange: (postCode: string) => void;
  postCode: string;
  personalEmailLabel: string;
  personalEmailError: string;
  onPersonalEmailChange: (personalEmail: string) => void;
  personalEmail: string;
  phoneLabel: string;
  phoneError: string;
  onPhoneChange: (phone: string) => void;
  phone: string;
  businessEmailLabel: string;
  businessEmailError: string;
  onBusinessEmailChange: (businessEmail: string) => void;
  businessEmail: string;
  businessPhoneLabel: string;
  businessPhoneError: string;
  onBusinessPhoneChange: (businessPhone: string) => void;
  businessPhone: string;
  lastNameLabel: string;
  lastNameError: string;
  onLastNameChange: (lastName: string) => void;
  lastName: string;
  emailAddressLabel: string;
  emailAddressError: string;
  onEmailAddressChange: (emailAddress: string) => void;
  emailAddress: string;
  isPressed: boolean;
  onPressedAgree: () => void;
  termsError: string;
  firstAddress: string;
  firstAddressError: string;
  firstAddressLabel: string;
  onFirstAddressChange: (firstAddress: string) => void;
  isAgreement?: boolean;
  editable?: boolean;
  businessNameError: string;
  onBusinessNameChange: () => void;
  businessName: string;
  businessNameLabel: string;
  onCountryChange: () => void;
  country: string;
  countryLabel: string;
  onStateChange: () => void;
  state: string;
  stateLabel: string;
  onTitleChange: () => void;
  title: string;
  titleLabel: string;
  isBusineesEmail: boolean;
  isBusineesPhone: boolean;
  onCloseEntity: () => void;
  entityData: any;
  setVisibleEntity: () => void;
  entityCategory: any;
  setEntityInVisible: (item: any) => void;
  isEntityDropDownVisible: boolean;
  onEntityPress: () => void;
  entity: string;
  onPreparationTitle: () => void;
  preparationData: any;
  setVisiblePreparation: () => void;
  preparationCategory: any;
  setPreparationInVisible: (item: any) => void;
  isPreparationDropDownVisible: boolean;
  onPreparationPress: () => void;
  preparation: string;
  partyEmailError: string;
  partyEmail: string;
  partyEmailLabel: string;
  onPartyEmailChange: (partyEmail: string) => void;
  partySignError: string;
  partySign: string;
  partySignLabel: string;
  onPartySignChange: (partySign: string) => void;
  firstAuthorizedNameError: string;
  firstAuthorizedName: string;
  firstAuthorizedNameLabel: string;
  onFirstAuthorizedNameChange: (firstAuthorizedName: string) => void;
  lastAuthorizedNameError: string;
  lastAuthorizedName: string;
  lastAuthorizedNameLabel: string;
  onLastAuthorizedNameChange: (lastAuthorizedName: string) => void;
  partyTitleError: string;
  partyTitleLabel: any;
  setVisiblePartyTitle: () => void;
  partyTitleCategory: string;
  setPartyTitleInVisible: (item: any) => void;
  isPartyTitleDropDownVisible: boolean;
  onPartyTitleChange: () => void;
  partyTitle: string;
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const date = moment().format('MM-DD-YYYY');

  const methodToShowInput = (
    item: any,
    companyNameLabel: string,
    companyNameError: string,
    companyName: string,
    onCompanyNameChange: (companyName: string) => void,
    firstNameLabel: string,
    firstNameError: string,
    onFirstNameChange: (firstName: string) => void,
    firstName: string,
    secondNameLabel: string,
    secondNameError: string,
    onSecondNameChange: (firstName: string) => void,
    secondName: string,
    countyLabel: string,
    countyError: string,
    onCountyChange: (county: string) => void,
    county: string,
    cityLabel: string,
    cityError: string,
    onCityChange: (city: string) => void,
    city: string,
    postCodeLabel: string,
    postCodeError: string,
    onPostCodeChange: (postCode: string) => void,
    postCode: string,
    personalEmailLabel: string,
    personalEmailError: string,
    onPersonalEmailChange: (personalEmail: string) => void,
    personalEmail: string,
    phoneLabel: string,
    phoneError: string,
    onPhoneChange: (phone: string) => void,
    phone: string,
    businessEmailLabel: string,
    businessEmailError: string,
    onBusinessEmailChange: (businessEmail: string) => void,
    businessEmail: string,
    businessPhoneLabel: string,
    businessPhoneError: string,
    onBusinessPhoneChange: (businessPhone: string) => void,
    businessPhone: string,
    lastNameLabel: string,
    lastNameError: string,
    onLastNameChange: (lastName: string) => void,
    lastName: string,
    emailAddressLabel: string,
    emailAddressError: string,
    onEmailAddressChange: (emailAddress: string) => void,
    emailAddress: string,
    isPressed: boolean,
    onPressedAgree: () => void,
    termsError: string,
    firstAddress: string,
    firstAddressError: string,
    firstAddressLabel: string,
    onFirstAddressChange: (firstAddress: string) => void,
    isAgreement?: boolean,
    editable?: boolean,
    businessNameError: string,
    onBusinessNameChange: () => void,
    businessName: string,
    businessNameLabel: string,
    onCountryChange: () => void,
    country: string,
    countryLabel: string,
    onStateChange: () => void,
    state: string,
    stateLabel: string,
    onTitleChange: () => void,
    title: string,
    titleLabel: string,
    isBusineesEmail: boolean,
    isBusineesPhone: boolean,
  ) => {
    switch (item.value) {
      case 'businessName':
        return (
          <TextInputComponent
            errorStyle={dropDownStyles.textInputFieldError}
            editable={editable}
            error={businessNameError}
            inputStyles={[
              personalBusinessStyle.textDisableInputStyle,
              {marginBottom: moderateScale(10)},
            ]}
            onChangeText={onBusinessNameChange}
            inputValue={businessName}
            placeHolderTitle={
              businessNameLabel ? businessNameLabel : item.label
            }
          />
        );
        break;
      case 'companyName':
        return (
          companyName !== '' && (
            
            <View>
              {item.title !== undefined && (
                <Text
                  style={[
                    personalBusinessStyle.labelStyle,
                    {marginBottom: moderateScale(5)},
                  ]}>
                  {item.title}
                </Text>
              )}
              <TextInputComponent
                errorStyle={dropDownStyles.textInputFieldError}
                editable={editable}
                error={companyNameError}
                inputStyles={[
                  personalBusinessStyle.textDisableInputStyle,
                  {marginBottom: moderateScale(10)},
                ]}
                onChangeText={onCompanyNameChange}
                inputValue={companyName}
                placeHolderTitle={
                  companyNameLabel ? companyNameLabel : item.label
                }
              />
            </View>
          )
        );
        break;
      case 'firstAddress':
        return (
          firstAddressLabel !== '' && (
            <TextInputComponent
              errorStyle={dropDownStyles.textInputFieldError}
              editable={editable}
              error={firstAddressError}
              inputStyles={personalBusinessStyle.textDisableInputStyle}
              onChangeText={onFirstAddressChange}
              inputValue={firstAddress}
              placeHolderTitle={
                firstAddressLabel ? firstAddressLabel : item.label
              }
            />
          )
        );
        break;
      case 'secondAddress':
        return (
          secondNameLabel !== '' && (
            <TextInputComponent
              errorStyle={dropDownStyles.textInputFieldError}
              editable={editable}
              error={secondNameError}
              inputStyles={personalBusinessStyle.inputStyle}
              onChangeText={onSecondNameChange}
              inputValue={secondName}
              placeHolderTitle={secondNameLabel ? secondNameLabel : item.label}
            />
          )
        );
        break;
      case 'county':
        return (
          county !== '' && (
            <TextInputComponent
              errorStyle={dropDownStyles.textInputFieldError}
              editable={editable}
              error={countyError}
              inputStyles={personalBusinessStyle.textDisableInputStyle}
              onChangeText={onCountyChange}
              inputValue={county}
              placeHolderTitle={countyLabel ? countyLabel : item.label}
            />
          )
        );
        break;
      case 'city':
        return (
          city !== '' && (
            <TextInputComponent
              errorStyle={dropDownStyles.textInputFieldError}
              editable={editable}
              error={cityError}
              inputStyles={personalBusinessStyle.inputStyle}
              onChangeText={onCityChange}
              inputValue={city}
              placeHolderTitle={cityLabel ? cityLabel : item.label}
            />
          )
        );
        break;
      case 'postCode':
        return (
          <View>
            {postCode !== '' && (
              <TextInputComponent
                errorStyle={dropDownStyles.textInputFieldError}
                editable={editable}
                error={postCodeError}
                inputStyles={personalBusinessStyle.textDisableInputStyle}
                onChangeText={onPostCodeChange}
                inputValue={postCode}
                placeHolderTitle={postCodeLabel ? postCodeLabel : item.label}
              />
            )}
            <View style={GeneralServiceStyles.termsOfServicesStyle}>
              <TermsOfService />
            </View>
          </View>
        );
        break;
      case 'PersonalEmail':
        return (
          personalEmailLabel !== '' && (
            <View>
              {item.title !== undefined && (
                <Text
                  style={[
                    personalBusinessStyle.labelStyle,
                    {marginBottom: moderateScale(5)},
                  ]}>
                  {item.title}
                </Text>
              )}
            
            <TextInputComponent
              errorStyle={dropDownStyles.textInputFieldError}
              editable={editable}
              error={personalEmailError}
              inputStyles={[
                personalBusinessStyle.textDisableInputStyle,
                {marginBottom: moderateScale(10)},
              ]}
              onChangeText={onPersonalEmailChange}
              inputValue={personalEmail}
              placeHolderTitle={
                personalEmailLabel ? personalEmailLabel : item.label
              }
            />
            </View>
          )
        );
        break;
      case 'phone':
        return (
          phoneLabel !== '' && (
            <View>
              {item.title !== undefined && (
                <Text
                  style={[
                    personalBusinessStyle.labelStyle,
                    {marginBottom: moderateScale(5)},
                  ]}>
                  {item.title}
                </Text>
              )}
            
            <TextInputComponent
              errorStyle={dropDownStyles.textInputFieldError}
              editable={editable}
              error={phoneError}
              inputStyles={[
                personalBusinessStyle.textDisableInputStyle,
                {marginBottom: moderateScale(10)},
              ]}
              onChangeText={onPhoneChange}
              inputValue={phone}
              placeHolderTitle={phoneLabel ? phoneLabel : item.label}
            />
            </View>
          )
        );
        break;
      case 'President':
        return (
          title !== '' && (
            <View>
            {item.title !== undefined && (
              <Text
                style={[
                  personalBusinessStyle.labelStyle,
                  {marginBottom: moderateScale(5)},
                ]}>
                {item.title}
              </Text>
            )}
            <TextInputComponent
              errorStyle={dropDownStyles.textInputFieldError}
              editable={editable}
              error={''}
              inputStyles={[
                personalBusinessStyle.textDisableInputStyle,
                {marginBottom: moderateScale(10)},
              ]}
              onChangeText={onTitleChange}
              inputValue={title}
              placeHolderTitle={titleLabel ? titleLabel : item.label}
            />
            </View>
          )
        );
        break;

      case 'firstName':
        return (
          <TextInputComponent
            errorStyle={dropDownStyles.textInputFieldError}
            editable={editable}
            error={firstNameError}
            inputStyles={personalBusinessStyle.textDisableInputStyle}
            onChangeText={onFirstNameChange}
            inputValue={firstName}
            placeHolderTitle={firstNameLabel ? firstNameLabel : item.label}
          />
        );
      case 'country':
        return (
          country !== '' && (
            <TextInputComponent
              errorStyle={dropDownStyles.textInputFieldError}
              editable={editable}
              error={''}
              inputStyles={[
                personalBusinessStyle.textDisableInputStyle,
                {marginBottom: moderateScale(10)},
              ]}
              onChangeText={onCountryChange}
              inputValue={country}
              placeHolderTitle={countryLabel ? countryLabel : item.label}
            />
          )
        );
        break;
      case 'businessEmail':
        // <View style={{marginVertical: moderateScale(10)}}>
        return (
          businessEmail !== '' && (
            <View>
            {item.title !== undefined && (
              <Text
                style={[
                  personalBusinessStyle.labelStyle,
                  {marginBottom: moderateScale(5)},
                ]}>
                {item.title}
              </Text>
            )}
            <TextInputComponent
              errorStyle={dropDownStyles.textInputFieldError}
              editable={editable}
              error={businessEmailError}
              inputStyles={personalBusinessStyle.textDisableInputStyle}
              onChangeText={onBusinessEmailChange}
              inputValue={businessEmail}
              placeHolderTitle={
                businessEmailLabel ? businessEmailLabel : item.label
              }
            />
            </View>
          )
        );
        // </View>
        break;
      case 'businessPhone':
        <View>
          <TextInputComponent
            errorStyle={dropDownStyles.textInputFieldError}
            editable={editable}
            error={businessPhoneError}
            inputStyles={personalBusinessStyle.textDisableInputStyle}
            onChangeText={onBusinessPhoneChange}
            inputValue={businessPhone}
            placeHolderTitle={
              businessPhoneLabel ? businessPhoneLabel : item.label
            }
          />
        </View>;
        break;
      case 'state':
        return (
          state !== '' && (
            <View>
            {item.title !== undefined && (
              <Text
                style={[
                  personalBusinessStyle.labelStyle,
                  {marginBottom: moderateScale(5)},
                ]}>
                {item.title}
              </Text>
            )}
            <TextInputComponent
              errorStyle={dropDownStyles.textInputFieldError}
              editable={editable}
              error={''}
              inputStyles={[
                personalBusinessStyle.textDisableInputStyle,
                {marginBottom: moderateScale(10)},
              ]}
              onChangeText={onStateChange}
              inputValue={state}
              placeHolderTitle={stateLabel ? stateLabel : item.label}
            />
            </View>
          )
        );
        break;
      // case 'firstName':
      //   return (
      //     <TextInputComponent
      //       errorStyle={dropDownStyles.textInputFieldError}
      //       editable={editable}
      //       error={firstNameError}
      //       inputStyles={personalBusinessStyle.textDisableInputStyle}
      //       onChangeText={onFirstNameChange}
      //       inputValue={firstName}
      //       placeHolderTitle={firstNameLabel ? firstNameLabel : item.label}
      //     />
      //   );
      //   break;
      case 'lastName':
        return (
          <TextInputComponent
            errorStyle={dropDownStyles.textInputFieldError}
            editable={editable}
            error={lastNameError}
            inputStyles={personalBusinessStyle.inputStyle}
            onChangeText={onLastNameChange}
            inputValue={lastName}
            placeHolderTitle={lastNameLabel ? lastNameLabel : item.label}
          />
        );
        break;
      case 'emailAddress':
        return (
          <View>
            <TextInputComponent
              errorStyle={dropDownStyles.textInputFieldError}
              editable={editable}
              error={emailAddressError}
              inputStyles={personalBusinessStyle.textDisableInputStyle}
              onChangeText={onEmailAddressChange}
              inputValue={emailAddress}
              placeHolderTitle={
                emailAddressLabel ? emailAddressLabel : item.label
              }
            />
            <Image
              style={personalBusinessStyle.signatureImage}
              source={require('../assets/download.png')}
            />
          </View>
        );
        break;
      case 'party-email':
        return (
          partyEmailLabel !== '' && (
            <View>
            {item.title !== undefined && (
              <Text
                style={[
                  personalBusinessStyle.labelStyle,
                  {marginBottom: moderateScale(5)},
                ]}>
                {item.title}
              </Text>
            )}
            <TextInputComponent
              editable={editable}
              error={partyEmailError}
              inputStyles={[
                personalBusinessStyle.textDisableInputStyle,
                {marginBottom: moderateScale(10)},
              ]}
              onChangeText={onPartyEmailChange}
              inputValue={partyEmail}
              placeHolderTitle={partyEmailLabel ? partyEmailLabel : item.label}
            />
            </View>
          )
        );
        break;
      case 'party-title':
        return (
          partyTitleLabel !== '' && (
            <View>
            {item.title !== undefined && (
              <Text
                style={[
                  personalBusinessStyle.labelStyle,
                  {marginBottom: moderateScale(5)},
                ]}>
                {item.title}
              </Text>
            )}
            <TextInputComponent
              editable={editable}
              error={partyTitleError}
              inputStyles={[
                personalBusinessStyle.textDisableInputStyle,
                {marginBottom: moderateScale(10)},
              ]}
              onChangeText={onPartyTitleChange}
              inputValue={partyTitle}
              placeHolderTitle={partyTitleLabel ? partyTitleLabel : item.label}
            />
            </View>
          )
        );
        break;
      case 'party-sign':
        return (
          <TextInputComponent
            editable={editable}
            error={partySignError}
            inputStyles={[
              personalBusinessStyle.textDisableInputStyle,
              {marginBottom: moderateScale(10)},
            ]}
            onChangeText={onPartySignChange}
            inputValue={partySign}
            placeHolderTitle={partySignLabel ? partySignLabel : item.label}
          />
        );
        break;
      case 'firstAuthorizedName':
        return (
          firstAuthorizedNameLabel !== '' && (
            <View>
            {item.title !== undefined && (
              <Text
                style={[
                  personalBusinessStyle.labelStyle,
                  {marginBottom: moderateScale(5)},
                ]}>
                {item.title}
              </Text>
            )}
            <TextInputComponent
              editable={editable}
              error={firstAuthorizedNameError}
              inputStyles={[
                personalBusinessStyle.textDisableInputStyle,
                {marginBottom: moderateScale(10)},
              ]}
              onChangeText={onFirstAuthorizedNameChange}
              inputValue={firstAuthorizedName}
              placeHolderTitle={
                firstAuthorizedNameLabel ? firstAuthorizedNameLabel : item.label
              }
            />
            </View>
          )
        );
        break;
      case 'entity':
        return (
          entityCategory !== '' && (
            <View>
            {item.title !== undefined && (
              <Text
                style={[
                  personalBusinessStyle.labelStyle,
                  {marginBottom: moderateScale(5)},
                ]}>
                {item.title}
              </Text>
            )}
            <TextInputComponent
              editable={editable}
              error={firstAuthorizedNameError}
              inputStyles={[
                personalBusinessStyle.textDisableInputStyle,
                {marginBottom: moderateScale(10)},
              ]}
              onChangeText={onFirstAuthorizedNameChange}
              inputValue={entityCategory}
              placeHolderTitle={item.label}
            />
            </View>
          )
        );
        break;
      case 'year':
        return (
          preparationCategory !== '' && (
            <View style={GeneralServiceStyles.datePickerContainer}>
              {item.title !== undefined && (
              <Text
                style={[
                  personalBusinessStyle.labelStyle,
                  {marginBottom: moderateScale(5)},
                ]}>
                {item.title}
              </Text>
            )}
              <View
                style={[
                  signUpStyle.dateOfBirth,
                  {backgroundColor: Colors.disableGrayColor},
                ]}>
                <Text style={signUpStyle.dateOfBirthText}>
                  {preparationCategory}
                </Text>
              </View>
            </View>
          )
        );
        break;

      case 'lastAuthorizedName':
        return (
          lastAuthorizedNameLabel !== '' && (
            <View>
            {item.title !== undefined && (
              <Text
                style={[
                  personalBusinessStyle.labelStyle,
                  {marginBottom: moderateScale(5)},
                ]}>
                {item.title}
              </Text>
            )}
            <TextInputComponent
              editable={editable}
              error={lastAuthorizedNameError}
              inputStyles={[
                personalBusinessStyle.textDisableInputStyle,
                {marginBottom: moderateScale(10)},
              ]}
              onChangeText={onLastAuthorizedNameChange}
              inputValue={lastAuthorizedName}
              placeHolderTitle={
                lastAuthorizedNameLabel ? lastAuthorizedNameLabel : item.label
              }
            />
            </View>
          )
        );
        break;
      default:
        break;
    }
  };

  const methodToRenderComp = (item: any) => {
    switch (item.type) {
      case 'date-picker':
        return (
          <View style={GeneralServiceStyles.datePickerContainer}>
            <View
              style={[
                signUpStyle.dateOfBirth,
                {backgroundColor: Colors.disableGrayColor},
              ]}>
              <Text style={signUpStyle.dateOfBirthText}>{date}</Text>
            </View>
          </View>
        );
        break;
      case 'heading':
        return (
          <Text
            style={[
              personalBusinessStyle.generalAgreementHeadings,
              {
                marginVertical: moderateScale(0),
                marginBottom: moderateScale(15),
              },
            ]}>
            {item.label}
          </Text>
        );
        break;
        case 'company':
          return companyName !== '' && <Text
          style={[
            personalBusinessStyle.generalAgreementHeadings,
            {
              marginVertical: moderateScale(0),
              marginBottom: moderateScale(15),
            },
          ]}>
          {item.label}
        </Text>
        case 'representative':
          return  <View>
            {item.title !== undefined && (
              <Text
                style={[
                  personalBusinessStyle.labelStyle,
                  {marginBottom: moderateScale(5)},
                ]}>
                {item.title}
              </Text>
            )}
          {methodToShowInput(
            item,
            companyNameLabel,
            companyNameError,
            companyName,
            onCompanyNameChange,
            firstNameLabel,
            firstNameError,
            onFirstNameChange,
            firstName,
            secondNameLabel,
            secondNameError,
            onSecondNameChange,
            secondName,
            countyLabel,
            countyError,
            onCountyChange,
            county,
            cityLabel,
            cityError,
            onCityChange,
            city,
            postCodeLabel,
            postCodeError,
            onPostCodeChange,
            postCode,
            personalEmailLabel,
            personalEmailError,
            onPersonalEmailChange,
            personalEmail,
            phoneLabel,
            phoneError,
            onPhoneChange,
            phone,
            businessEmailLabel,
            businessEmailError,
            onBusinessEmailChange,
            businessEmail,
            businessPhoneLabel,
            businessPhoneError,
            onBusinessPhoneChange,
            businessPhone,
            lastNameLabel,
            lastNameError,
            onLastNameChange,
            lastName,
            emailAddressLabel,
            emailAddressError,
            onEmailAddressChange,
            emailAddress,
            isPressed,
            onPressedAgree,
            termsError,
            firstAddress,
            firstAddressError,
            firstAddressLabel,
            onFirstAddressChange,
            isAgreement,
            editable,
            businessNameError,
            onBusinessNameChange,
            businessName,
            businessNameLabel,
            onCountryChange,
            country,
            countryLabel,
            onStateChange,
            state,
            stateLabel,
            onTitleChange,
            title,
            titleLabel,
            isBusineesEmail,
            isBusineesPhone,
          )}
        </View>
      case 'non-editable':
        return (
          <View>
            {methodToShowInput(
              item,
              companyNameLabel,
              companyNameError,
              companyName,
              onCompanyNameChange,
              firstNameLabel,
              firstNameError,
              onFirstNameChange,
              firstName,
              secondNameLabel,
              secondNameError,
              onSecondNameChange,
              secondName,
              countyLabel,
              countyError,
              onCountyChange,
              county,
              cityLabel,
              cityError,
              onCityChange,
              city,
              postCodeLabel,
              postCodeError,
              onPostCodeChange,
              postCode,
              personalEmailLabel,
              personalEmailError,
              onPersonalEmailChange,
              personalEmail,
              phoneLabel,
              phoneError,
              onPhoneChange,
              phone,
              businessEmailLabel,
              businessEmailError,
              onBusinessEmailChange,
              businessEmail,
              businessPhoneLabel,
              businessPhoneError,
              onBusinessPhoneChange,
              businessPhone,
              lastNameLabel,
              lastNameError,
              onLastNameChange,
              lastName,
              emailAddressLabel,
              emailAddressError,
              onEmailAddressChange,
              emailAddress,
              isPressed,
              onPressedAgree,
              termsError,
              firstAddress,
              firstAddressError,
              firstAddressLabel,
              onFirstAddressChange,
              isAgreement,
              editable,
              businessNameError,
              onBusinessNameChange,
              businessName,
              businessNameLabel,
              onCountryChange,
              country,
              countryLabel,
              onStateChange,
              state,
              stateLabel,
              onTitleChange,
              title,
              titleLabel,
              isBusineesEmail,
              isBusineesPhone,
            )}
          </View>
        );
        break;
      case 'businessEmail':
        if (businessEmailLabel) {
          return (
            <View>
              <Text
                style={[
                  personalBusinessStyle.labelStyle,
                  {marginBottom: moderateScale(5)},
                ]}>
                {item.label}
              </Text>
              <TextInputComponent
                errorStyle={dropDownStyles.textInputFieldError}
                editable={editable}
                error={businessEmailError}
                inputStyles={[
                  personalBusinessStyle.textDisableInputStyle,
                  // {marginBottom: moderateScale(10)},
                ]}
                onChangeText={onBusinessEmailChange}
                inputValue={businessEmail}
                placeHolderTitle={
                  businessEmailLabel ? businessEmailLabel : item.label
                }
              />
            </View>
          );
        }

        break;
      case 'businessPhone':
        if (businessPhoneLabel) {
          return (
            <View>
              <Text
                style={[
                  personalBusinessStyle.labelStyle,
                  {marginBottom: moderateScale(5)},
                ]}>
                {item.label}
              </Text>
              <TextInputComponent
                errorStyle={dropDownStyles.textInputFieldError}
                editable={editable}
                error={businessPhoneError}
                inputStyles={[
                  personalBusinessStyle.textDisableInputStyle,
                  {marginBottom: moderateScale(10)},
                ]}
                onChangeText={onBusinessPhoneChange}
                inputValue={businessPhone}
                placeHolderTitle={
                  businessPhoneLabel ? businessPhoneLabel : item.label
                }
              />
            </View>
          );
        }

        break;

      // case 'non-editable-signature':
      //   return (
      //     <View>
      //       <Image source={{}} />
      //     </View>
      //   );
      //   break;
      default:
        break;
    }
  };

  return generalData.map((item: any, index: number) => {
    return (
      <View key={item.id} style={{paddingHorizontal: moderateScale(18)}}>
        {item.children.map((subItem: any, childrenIndex: number) => {
          console.log('subItem', subItem);
          return (
            <View key={childrenIndex}>
              {/* {subItem.title !== undefined && (
                <Text
                  style={[
                    personalBusinessStyle.labelStyle,
                    {marginBottom: moderateScale(5)},
                  ]}>
                  {subItem.title}
                </Text>
              )} */}
              {methodToRenderComp(subItem)}
              {subItem.children.map((childItem: any) => {
                return methodToRenderComp(childItem);
              })}
            </View>
          );
        })}
      </View>
    );
  });
};

export default GeneralServiceAgreement;
