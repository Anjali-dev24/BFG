//import liraries
import React, {Component, createRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import {moderateScale} from 'react-native-size-matters';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import Colors from '../../styles/Colors';
import {inputStyle} from '../../styles/StyleSheet/inputStyle';
import SignatureStyles from '../../styles/StyleSheet/signatureStyles';

// create a component
const Signatures = ({
  setParentState,
  parentsData,
  name,
  onDrag,
  errorState,
  setErrorState,
  isNextPress,
  setIsNextPress,
  item,
  updatedValue,
}: {
  setParentState: any;
  parentsData: any;
  name: any;
  onDrag: (...args: any) => void;
  errorState: any[];
  setErrorState: React.Dispatch<React.SetStateAction<{}>>;
  isNextPress: boolean;
  setIsNextPress: React.Dispatch<React.SetStateAction<boolean>>;
  item:any;
  updatedValue:any
}) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [filePath, setFilePath] = useState<any>();
  const [fileCode, setFileCode] = useState<string>('');
  const sign: any = createRef();

  const [errorMsg, seterror] = useState('');

  const validator = () => {
    if (isNextPress && !filePath) {
      setErrorState?.({...errorState, [name]: true});
      setIsNextPress?.(false);
      seterror('This field is required.');
      // return
    }
    // setErrorState({...errorState, [name]:false})
    // console.log('nextPress', isNextPress, errorMsg);
  };

  useEffect(() => {
    validator();
  }, [isNextPress]);

  const saveSign = () => {
    sign?.current?.saveImage();
  };

  const resetSignature = () => {
    setFilePath('');
    sign.current.resetImage();
    setIsButtonPressed(true);
    // resetSign;
  };

  const getUri = () => {
    let uri = 'file://' + filePath;
    return uri;
  };

  const _onSaveEvent = (result: any) => {
    setFilePath(result.pathName);
    setFileCode('data:iamge/png;charset=utf-8;base64,' + result.encoded);
  };

  // useEffect(() => {
  //   setParentState?.({...parentsData, [name]: filePath});
  //   setIsNextPress?.(false);
  //   seterror('');
  // }, [filePath]);

  useUpdateEffect(()=>{
    // item.updatedName=filePath
    setParentState?.({...parentsData, [name]: filePath});
    setIsNextPress?.(false);
    seterror('');
  },[filePath])

  // useEffect(()=>{
  //   setErrorState?.({...errorState, [name]: true});
  // },[])
  return (
    <View>
      <View
        style={[
          SignatureStyles.container,
          {
            marginTop: moderateScale(10),
            zIndex: 2,
            marginBottom:
              errorMsg !== '' ? moderateScale(0) : moderateScale(10),
          },
        ]}>
        {!filePath && (
          <Text
            style={{
              position: 'absolute',
              zIndex: 1,
              top: moderateScale(5),
              left: moderateScale(15),
              fontWeight:'300',
              color:Colors.gray
            }}>
            Draw signatures here
          </Text>
        )}
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
        <TouchableOpacity
          style={SignatureStyles.resetButtonStyle}
          onPress={() => {
            resetSignature();
          }}>
          <Text style={{color: Colors.darkGray}}>Reset</Text>
        </TouchableOpacity>
      </View>
      {errorMsg !== '' && (
        <Text
          style={[
            inputStyle.inputErrorLabelStyle,
            {
              marginBottom: moderateScale(10),
              paddingHorizontal: moderateScale(0),
            },
          ]}>
          {errorMsg}
        </Text>
      )}
    </View>
  );
};

export default Signatures;
