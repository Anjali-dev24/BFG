import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CheckBox from '../assets/icons/CheckBox.svg';
import UnCheck from '../assets/icons/unCheck.svg';
import ButtonComponent from '../components/ButtonComponent';
import GeneralServiceAgreement from '../components/GeneralServiceAgreement';
import { generalData } from '../hooks/generalAgreementTypeData';
import * as pageActions from '../store/actions/SignUp';
import Colors from '../styles/Colors';
import { Strings } from '../styles/Strings';
import { businessFormStyle } from '../styles/StyleSheet/businessFormStyle';
import { GeneralServiceStyles } from '../styles/StyleSheet/generalServiceAgreementStyles';
import { modalStyle } from '../styles/StyleSheet/modalStyle';
import servicesStyle from '../styles/StyleSheet/servicesStyle';
import { servicesTermsStyles } from '../styles/StyleSheet/servicesTermsStyles';

const ServicesTerms = ({route, navigation}: {route: any; navigation: any}) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [companyNameLabel, setCompanyNameLabel] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyNameError, setCompanyNameError] = useState('');
  const [isAgree, setIsAgree] = React.useState(false);
  const [isBusineesEmail, setIsBusineesEmail] = React.useState<boolean>(false);
  const [isBusineesPhone, setIsBusineesPhone] = React.useState<boolean>(false);
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [firstNameLabel, setFirstNameLabel] = useState('');
  const [firstAddress, setFirstAddress] = useState('');
  const [firstAddressError, setFirstAddressError] = useState('');
  const [firstAddressLabel, setFirstAddressLabel] = useState('');
  const [secondName, setSecondName] = useState('');
  const [secondNameError, setSecondNameError] = useState('');
  const [secondNameLabel, setSecondNameLabel] = useState('');
  const [county, setCounty] = useState('');
  const [countyError, setCountyError] = useState('');
  const [countyLabel, setCountyLabel] = useState('');
  const [city, setCity] = useState('');
  const [businessCountry, setBusinessCountry] = useState('');
  const [businessState, setBusinessState] = useState('');
  const [cityError, setCityError] = useState('');
  const [cityLabel, setCityLabel] = useState('');
  const [postCode, setPostCode] = useState('');
  const [postCodeError, setPostCodeError] = useState('');
  const [postCodeLabel, setPostCodeeLabel] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [personalEmailError, setPersonalEmailError] = useState('');
  const [personalEmailLabel, setPersonalEmailLabel] = useState('');
  const [phone, setPhone] = useState<any>();
  const [phoneError, setPhoneError] = useState('');
  const [phoneLabel, setPhoneLabel] = useState<any>();
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessEmailError, setBusinessEmailError] = useState('');
  const [businessEmailLabel, setBusinessEmailLabel] = useState('');
  const [businessPhone, setBusinessPhone] = useState<any>();
  const [businessPhoneError, setBusinessPhoneError] = useState('');
  const [businessPhoneLabel, setBusinessPhoneLabel] = useState('');
  const [lastName, setLastName] = useState('');
  const [termsError, setTermsError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [lastNameLabel, setLastNameLabel] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressError, setEmailAddressError] = useState('');
  const [emailAddressLabel, setEmailAddressLabel] = useState('');
  const [businessCity, setBusinessCity] = useState('');
  const [businessCityLabel, setBusinessCityLabel] = useState('');
  const [employees, setEmployees] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [firstAuthorizedName, setFirstAuthorizedName] = useState('');
  const [firstAuthorizedNameLabel, setFirstAuthorizedNameLabel] = useState('');
  const [secondAuthorizedNameLabel, setSecondAuthorizedNameLabel] =
    useState('');
  const [businessName, setBusinessName] = useState('');
  const [countryLabel, setCountryLabel] = useState('');
  const [country, setCountry] = useState('');
  const [stateLabel, setStateLabel] = useState('');
  const [state, setState] = useState('');
  const [titleLabel, setTitleLabel] = useState('');
  const [title, setTitle] = useState('');
  const [businessNameError, setBusinessNameError] = useState('');
  const [businessNameLabel, setBusinessNameLabel] = useState('');
  const [entityTitle, setEntityTitle] = useState('');
  const [servicesAgreement, setServicesAgreement] = useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [category, setCategory] = React.useState('');
  const [firstPartyName, setFirstPartyName] = React.useState<string>('');
  const [lastPartyName, setLastPartyName] = React.useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [personalMobile, setPersonalMobile] = useState<any>();
  const [phoneBusiness, setPhoneBusiness] = useState<any>();
  const [businessFirstAddress, setBusinessFirstAddress] = useState<string>();
  const [partyEmailLabel, setPartyEmailLabel] = React.useState('');
  const [partySignLabel, setPartySignLabel] = React.useState('');
  const [partyTitleLabel, setPartyTitleLabel] = React.useState('');
  const [entityCategory, setEntityCategory] = React.useState('');
  const [isBack, setIsBack] = useState<boolean>(false);
  const [preparationCategory, setPreparationCategory] = React.useState<any>();

  useEffect(() => {
    AsyncStorage.getItem('Exit').then(isBack => {
      if (isBack !== null) {
        setIsBack(true);
      }
    });
    setLoading(true);
    let currentRoute = 'ServicesTerms';
    AsyncStorage.setItem('prevRoute', currentRoute);
    Promise.all([
      AsyncStorage.getItem('userSavedInformation'),
      AsyncStorage.getItem('userBusinessContactInformation'),
    ]).then(([info, preFilled]) => {
      let data = JSON.parse(info!);
      if (data) {
        let newData = JSON.parse(preFilled!);
        console.log('userBusinessContactInformation', newData?.['tax-preparation-year'])
        if (newData) {
          setCompanyName(newData?.['business-name'] || '');
          setFirstName(newData?.pname || newData?.pname || ''),
            setFirstAddressLabel(newData?.['business-address']?.['ba-line1'] || ''),
            setBusinessCountry(
              newData?.['business-address']?.['ba-country']?.name || '',
            );
          setBusinessState(newData?.['business-address']?.['ba-state']?.name || '');
          setCountry(
            newData?.['business-address']?.['ba-country']?.name || countryLabel,
          ),
            setState(newData?.['business-address']?.['ba-state']?.name || stateLabel),
            setCounty(newData?.county || '');
          setFirstAuthorizedNameLabel(newData?.['res-party-name'] || '');
          setSecondAuthorizedNameLabel(newData?.authLname || '');
          setPartyEmailLabel(newData?.['res-party-email'] || '');
          setPartyTitleLabel(newData?.['res-party-title'] || '');
          setEntityCategory(newData?.entity || '');
          setCity(newData?.['business-address']?.['ba-city'] || ''),
            setPhone(newData?.pmob || ''),
            // setPostCode(newData?.['business-address']?.['ba-postal-code'] || '');
          setSelectedIndex(newData?.selectedIndex || '');
          setBusinessEmailLabel(newData?.bemail || '');
          setPersonalEmailLabel(
            newData?.email || newData?.partyEmail || data?.email || '',
          );
          setFirstPartyName(newData?.['res-party-name'] || '');
          setLastPartyName(newData?.authLname || '');
          setCategory(newData?.taxPaid || '');
          setTitle(newData?.partyTitle || '');
          setEntityTitle(newData?.entity || '');
          setPreparationCategory(newData?.['tax-preparation-year'] || '');
          setEmployees(newData?.totalEmployees || 0);
          setTotalAmount(newData?.totalAmount || '');
          setBusinessEmail(newData?.bemail || businessEmailLabel),
            setBusinessFirstAddress(
              newData?.['business-address']?.['ba-line1'] || '',
            ),
            // setSecondName(newData?.['business-address']?.['ba-line2'] || ''),
            setBusinessCity(
              newData?.['business-address']?.['ba-city'] || businessCityLabel,
            ),
            setPostCode(
              newData?.['business-address']?.['ba-postal-code'] || postCodeLabel,
            );
          setPhoneBusiness(newData?.bmob || '');
          setSecondNameLabel(newData?.['business-address']?.['ba-line2'] || ''),
            setPhoneLabel(newData?.pmob || data?.mob || ''),
            setBusinessPhoneLabel(
              newData.bmob ? newData.bmob : businessPhoneLabel,
            ),
            setPersonalMobile(newData?.pmob || data?.mob || '');
          setPostCodeeLabel(newData?.['business-address']?.['ba-postal-code'] || '');
          setLoading(false);
        }
      }
    });
    AsyncStorage.getItem('selectedservices').then(services => {
      let selectedServices = JSON.parse(services!);
      if (selectedServices !== [] && selectedServices !== null) {
        setSelectedServices(selectedServices);
      }
    });
  }, []);

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Submit successfully',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const validations = () => {
    let nextScreen = 'SelectedServicesPayment';
    if (!isAgree) {
      setTermsError('Do you agree with terms of service?');
    } else {
      AsyncStorage.removeItem('Exit')
      AsyncStorage.setItem('prevRoute', nextScreen);
      navigation.navigate('SelectedServicesPayment');
      setTimeout(() => {
        showToastWithGravityAndOffset();
      }, 100);
    }
  };

  const onPressBack = () => {
    if (isBack) {
      Alert.alert(
        'You will be jump to the initial screen and data will be removed.',
        'Would you like to go back?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => navigation.pop()},
        ],
      );
    } else {
      navigation.pop();
    }
  };

  // useEffect(() => {
  //   let serviceId = AllServicesTypes.filter((subItems: any) => {
  //     return subItems.id === selectedItem;
  //   });
  //   setServicesAgreement(serviceId);
  // }, [selectedItem]);

  const renderServices = () => {};

  useEffect(() => {
    renderServices();
  }, []);
  useEffect(() => {}, [servicesAgreement]);

  return (
    <View style={servicesTermsStyles.container}>
      {loading && (
        <ActivityIndicator
          color={Colors.greenGradient[1]}
          size={'large'}
          style={servicesTermsStyles.loader}
        />
      )}
      <ScrollView>
        <View>
          <Image
            style={[
              businessFormStyle.logoStyle,
              {marginBottom: moderateScale(0)},
            ]}
            source={require('../assets/logo.png')}
          />
          <Text style={modalStyle.modalText}>
            {Strings.ServicesTerms.agreeStatement}
          </Text>
          <View
            style={[servicesStyle.border, {marginTop: moderateScale(20)}]}
          />
        </View>
        <GeneralServiceAgreement
          partyEmailLabel={partyEmailLabel}
          onPartyEmailChange={() => {}}
          partySignLabel={partySignLabel}
          onPartySignChange={() => {}}
          firstAuthorizedName={firstAuthorizedName}
          firstAuthorizedNameLabel={firstAuthorizedNameLabel}
          onFirstAuthorizedNameChange={() => {}}
          lastAuthorizedNameLabel={secondAuthorizedNameLabel}
          onLastAuthorizedNameChange={() => {}}
          partyTitleLabel={partyTitleLabel}
          onPartyTitleChange={() => {}}
          entityCategory={entityCategory}
          preparationCategory={preparationCategory}
          isBusineesEmail={isBusineesEmail}
          isBusineesPhone={isBusineesPhone}
          onCountryChange={() => {}}
          country={country}
          countryLabel={countryLabel}
          onStateChange={() => {}}
          state={state}
          stateLabel={stateLabel}
          onTitleChange={() => {}}
          title={title}
          titleLabel={titleLabel}
          businessNameError={businessNameError}
          onBusinessNameChange={() => {}}
          businessName={businessName}
          businessNameLabel={businessNameLabel}
          generalData={generalData}
          editable={false}
          firstAddress={firstAddress}
          firstAddressLabel={firstAddressLabel}
          firstAddressError={firstAddressError}
          onFirstAddressChange={() => {}}
          termsError={termsError}
          isPressed={isAgree}
          onPressedAgree={() => {
            setIsAgree(!isAgree), setTermsError('');
          }}
          firstNameLabel={firstNameLabel}
          firstNameError={firstNameError}
          onFirstNameChange={() => {}}
          firstName={firstName}
          secondNameLabel={secondNameLabel}
          secondNameError={secondNameError}
          onSecondNameChange={() => {}}
          secondName={secondName}
          countyLabel={countyLabel}
          countyError={countyError}
          onCountyChange={() => {}}
          county={county}
          cityLabel={cityLabel}
          cityError={cityError}
          onCityChange={() => {}}
          city={city}
          postCodeLabel={postCodeLabel}
          postCodeError={postCodeError}
          onPostCodeChange={() => {}}
          postCode={postCode}
          personalEmailLabel={personalEmailLabel}
          personalEmailError={personalEmailError}
          onPersonalEmailChange={() => {}}
          personalEmail={personalEmail}
          phoneLabel={phoneLabel}
          phoneError={phoneError}
          onPhoneChange={() => {}}
          phone={phone}
          businessEmailLabel={businessEmailLabel}
          businessEmailError={businessEmailError}
          onBusinessEmailChange={() => {}}
          businessEmail={businessEmail}
          businessPhoneLabel={businessPhoneLabel}
          businessPhoneError={businessPhoneError}
          onBusinessPhoneChange={() => {}}
          businessPhone={businessPhone}
          lastNameLabel={lastNameLabel}
          lastNameError={lastNameError}
          onLastNameChange={() => {}}
          lastName={lastName}
          emailAddressLabel={emailAddressLabel}
          emailAddressError={emailAddressError}
          onEmailAddressChange={() => {}}
          emailAddress={emailAddress}
          companyNameLabel={companyNameLabel}
          companyNameError={companyNameError}
          companyName={companyName}
          onCompanyNameChange={() => {}}
          stateLoader={false}
          onCloseEntity={() => {}}
          entityData={undefined}
          setVisibleEntity={() => {}}
          setEntityInVisible={() => {}}
          isEntityDropDownVisible={false}
          onEntityPress={() => {}}
          entity={''}
          onPreparationTitle={() => {}}
          preparationData={undefined}
          setVisiblePreparation={() => {}}
          setPreparationInVisible={() => {}}
          isPreparationDropDownVisible={false}
          onPreparationPress={() => {}}
          preparation={''}
          partyEmailError={''}
          partyEmail={''}
          partySignError={''}
          partySign={''}
          firstAuthorizedNameError={''}
          lastAuthorizedNameError={''}
          lastAuthorizedName={''}
          partyTitleError={''}
          setVisiblePartyTitle={() => {}}
          partyTitleCategory={''}
          setPartyTitleInVisible={() => {}}
          isPartyTitleDropDownVisible={false}
          partyTitle={''}
        />
        <View style={GeneralServiceStyles.checkBoxContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsAgree(!isAgree), setTermsError('');
            }}>
            {isAgree ? (
              <CheckBox width={moderateScale(18)} height={moderateScale(18)} />
            ) : (
              <UnCheck width={moderateScale(18)} height={moderateScale(18)} />
            )}
          </TouchableOpacity>
          <Text style={GeneralServiceStyles.agreeStatementStyle}>
            {Strings.ServicesTerms.agreeStatement}
          </Text>
        </View>
        <Text style={GeneralServiceStyles.termsError}>{termsError}</Text>
        <View style={{height: moderateScale(100)}} />
      </ScrollView>
      <View style={[businessFormStyle.bottomAbsoluteContainer]}>
        <TouchableOpacity
          onPress={onPressBack}
          style={businessFormStyle.imageContainer}>
          <Image
            style={businessFormStyle.imageStyle}
            source={require('../assets/back.png')}
          />
          <Text style={businessFormStyle.backText}>
            {Strings.businessForm.back}
          </Text>
        </TouchableOpacity>
        <ButtonComponent
          disabled={isAgree ? false : true}
          buttonStyle={businessFormStyle.bottomButton}
          isGradient={true}
          isTitle={true}
          title={'ACCEPT'}
          onPress={() => {
            validations();
          }}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {};
};

const ActionCreators = Object.assign({}, pageActions);
const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesTerms);
