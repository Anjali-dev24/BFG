import React, {createRef, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../styles/Colors';
import SignatureStyles from '../styles/StyleSheet/signatureStyles';
import RNFetchBlob from 'rn-fetch-blob';
// import * as fs from 'fs'
const SignatureComponent = ({
  onDrag,
  isClear,
  resetSign,
}: {
  onDrag: (...args: any) => void;
  isClear: boolean;
  resetSign: () => void;
}) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [filePath, setFilePath] = useState<any>();
  const [fileCode, setFileCode] = useState<string>('');
  const sign: any = createRef();

  const saveSign = () => {
    sign?.current?.saveImage();
  };

  const resetSignature = () => {
    sign.current.resetImage();
    setIsButtonPressed(true);
    resetSign;
  };

  const getUri = () => {
    let uri = 'file://' + filePath;
    return uri;
  };

  const _onSaveEvent = (result: any) => {
    setFilePath(result.pathName);
    setFileCode('data:iamge/png;charset=utf-8;base64,' + result.encoded);
  };

  return (
    // <View style={{flex: 1, height: moderateScale(300)}}>
      <View style={SignatureStyles.container}>
        <SignatureCapture
          saveImageFileInExtStorage={true}
          minStrokeWidth={4}
          maxStrokeWidth={4}
          style={SignatureStyles.signature}
          ref={sign}
          onSaveEvent={_onSaveEvent}
          onDragEvent={(...args) => {
            saveSign();
            onDrag(...args);
          }}
          showNativeButtons={false}
          showTitleLabel={false}
          viewMode={'portrait'}
        />
        <TouchableHighlight
          style={SignatureStyles.resetButtonStyle}
          onPress={() => {
            resetSignature();
          }}>
          <Text style={{color: Colors.darkGray}}>Reset</Text>
        </TouchableHighlight>
      </View>
  );
};
export default SignatureComponent;
