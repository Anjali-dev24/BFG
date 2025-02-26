/**
 * @format
 */

import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import StackNavigator from './navigation/stack-navigator';
import {SafeAreaView, StatusBar} from 'react-native';
import {appContainerStyle} from './styles/StyleSheet/appContainerStyle';
import {Store} from './store/index';
import Colors from './styles/Colors';

interface Actions {
  actions: any;
}

const App: React.FC<Actions> = ({actions}) => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 800);
  });

  return (
    <Provider store={Store}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.extraLightBlue}
        barStyle={'dark-content'}
        showHideTransition={'slide'}
        hidden={false} />
      <SafeAreaView style={appContainerStyle.appContainer}>
        <StackNavigator />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
