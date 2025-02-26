import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationRouteContext} from '@react-navigation/native';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Modal, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';

const WebViewComponent = ({
  modalVisible,
  modalClosePress,
  URI,
  onMessage,
}: {
  modalVisible: boolean;
  modalClosePress: () => void;
  URI: string;
  onMessage: any;
}) => {
  const INJECTED_JAVASCRIPT = `
  window.document.onload = window.ReactNativeWebView.postMessage(window.document.body.innerText);
 `;

  const webviewRef = React.useRef(null);

  // const onMessage = (e:any) => {
  //   let { data } = e.nativeEvent
  //   try{
  //     let token=JSON.parse( data)?.user?.access_token
  //     AsyncStorage.setItem('linkedinLoginSuccess', token)
  //     modalVisible=false
  //     console.log('eeee',token)
  //   }catch(e){
  //     e
  //   }
  // };

  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  return (
    <Modal
      style={styles.container}
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={modalClosePress}>
      <View style={{height: 800}}>
        <WebView
          renderLoading={LoadingIndicatorView}
          ref={webviewRef}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          onMessage={onMessage}
          javaScriptEnabled={true}
          onNavigationStateChange={e => {}}
          source={{uri: URI}}
          style={{width: '100%', height: '100%'}}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default WebViewComponent;
