/**
 * @format
 */

import {
  NavigationContainer,
  DefaultTheme,
  ExtendedTheme,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Swiper from '../screens/Swiper';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import DashBoard from '../screens/DashBoard';
import ForgotPassword from '../screens/ForgotPassword';
import CustomCamera from '../screens/CustomCamera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResendEmail from '../screens/ResendEmail';
import ConfirmPassword from '../screens/ConfirmPassword';
import ConfirmChangedPassword from '../screens/ConfirmChangedPassword'
import DrawerNavigator from './drawer-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pageActions from '../store/actions/SignUp'

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const [route, setRoute] = useState<string>();
 
  const light: ExtendedTheme = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(216, 11, 140)',
      secondary: 'rgb(0, 174, 239)',
      tertiary: 'rgb(34, 31, 114)',
      danger: 'rgb(208, 2, 27)',
      background: 'rgb(239, 238, 244)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(0, 0, 0)',
      subtext: 'rgb(102, 102, 102)',
      separator: 'rgb(194, 194, 195)',
      highlight: 'rgb(199, 198, 203)',
    },
  };

  const initialRoute = () => {
    AsyncStorage.getItem('isUserSignedUp').then(value => {
      console.log('isUserSignedUp',value);
      if (value !== null) {
        setRoute('true');
      } else {
        setRoute('false');
      }
    });
  };

  useEffect(() => {
    initialRoute();
  }, [route]);

  const PrivateStack = createNativeStackNavigator()
  const PrivateStackNavigator=()=>{
   return <PrivateStack.Navigator initialRouteName='Swiper'>
    <PrivateStack.Screen
      name="Swiper"
      component={Swiper}
      options={{headerShown: false, gestureEnabled: false}}
    />
    <PrivateStack.Screen
      name="SignUp"
      component={SignUp}
      options={{headerShown: false, gestureEnabled: false}}
    />
    <PrivateStack.Screen
      name="SignIn"
      component={SignIn}
      options={{headerShown: false, gestureEnabled: false}}
    />
     <PrivateStack.Screen
     name="DashBoard"
     component={DrawerNavigator}
      options={{headerShown: false, gestureEnabled: false}}
    />
    <PrivateStack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{headerShown: false, gestureEnabled: false}}
    />
    <PrivateStack.Screen
      name="CustomCamera"
      component={CustomCamera}
      options={{headerShown: false, gestureEnabled: false}}
    />
    <PrivateStack.Screen
      name="ResendEmail"
      component={ResendEmail}
      options={{headerShown: false, gestureEnabled: false}}
    />
    <PrivateStack.Screen
      name="ConfirmPassword"
      component={ConfirmPassword}
      options={{headerShown: false, gestureEnabled: false}}
    />
    <PrivateStack.Screen
      name="ConfirmChangedPassword"
      component={ConfirmChangedPassword}
      options={{headerShown: false, gestureEnabled: false}}
    />
  </PrivateStack.Navigator>
  }

  return (
    <NavigationContainer theme={light}>
      <Stack.Navigator>
      {route === 'true' ? (
        <Stack.Screen
        name="DashBoard"
        component={DrawerNavigator}
        options={{ headerShown:false}}
      />
      ) : ( 
        <Stack.Screen
        name="PublicStack"
        component={PrivateStackNavigator}
        options={{ headerShown:false}}
      />
      )} 
      </Stack.Navigator>
     </NavigationContainer>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userImage: state.signUpPage.userImage,
    firstName: state.signUpInfo.firstName,
    lastName: state.signUpInfo.lastName,
    password: state.signUpInfo.password,
    email: state.signUpInfo.email,

    status: state.signUpInfo.status,
  };
};

const ActionCreators = Object.assign({}, pageActions);
const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StackNavigator);

// export default StackNavigator;
