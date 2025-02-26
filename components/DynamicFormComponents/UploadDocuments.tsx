import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../../styles/Colors';
import DocumentPicker, {isInProgress, types} from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {handleGallerySelection} from '../../libs/CameraUtils';
import CameraOptions from '../CameraOptions';
import {useFocusEffect} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';


const UploadDocumentComponent = ({
  data,
  defaultVal,
  setParentState,
  parentsData,
  name,
  item,
  updatedValue,
  navigationToCamera,
  documentName,
  switchBack,
}: // isClicked,
{
  data: any;
  defaultVal: any;
  setParentState: any;
  parentsData: any;
  name: any;
  item: any;
  updatedValue: any;
  navigationToCamera: () => void;
  documentName: any;
  switchBack:()=>void
  // isClicked: boolean;
}) => {
  const [result, setResult] = React.useState<
    Array<any> | any | undefined | null
  >();
  // const [imgUri, setImgUri] = React.useState<any>();
  const [documentFile, setDocumentFile] = React.useState(
    data?.value || defaultVal || undefined,
  );
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isPicked, setIsPicked] = React.useState(false);
  let isIos = Platform.OS === 'ios';


  useEffect(() => {
    AsyncStorage.setItem('uploadedImage', JSON.stringify(documentFile));
  }, [result]);

  useFocusEffect(() => {
    console.log('documentName ||', isPicked);
  });

  // useEffect(() => {
  //   console.log('file', documentFile);
  //   setParentState?.({...parentsData, [name]: documentFile});
  // }, [documentFile]);

  useUpdateEffect(() => {
    item.updatedName = documentFile;
    setParentState?.({...parentsData, [name]: documentFile});
  }, [documentFile]);

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const methodToUploadDocument = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: [types.pdf, types.doc, types.docx, types.plainText, types.images],
      });
      setResult([pickerResult]);
      setDocumentFile(pickerResult);
    } catch (e) {
      handleError(e);
    }
  };

  const takePicture = async () => {
    await ImagePicker.launchCamera({
      mediaType: 'photo',
      maxWidth: moderateScale(1700),
      maxHeight: moderateScale(500),
      quality: 0.5,
    })
      .then(image => {
        AsyncStorage.setItem(
          'uploadFromCamera',
          JSON.stringify(image?.assets?.[0]),
        );
        console.log('uploadedImage', image?.assets?.[0]);
        if (image && image.assets) {
          setResult([image && image.assets]);
          setDocumentFile(image && image.assets[0]);
          // actions.setImageUri(image.assets[0].uri)
        }
        if (image.didCancel) {
          switchBack;
        }
      })
      .catch(err => {
        Alert.alert(err);
      });
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.uploadContainer}>
          <Text style={styles.text}>Choose file</Text>
        </TouchableOpacity>
            <Text style={styles.SelectedFileName}>{updatedValue?.name || updatedValue?.fileName}</Text>
      </View>
      {modalVisible && (
        <CameraOptions
          onPressGallary={() => {
            methodToUploadDocument(), setModalVisible(false);
          }}
          onPressCamera={() => {
            takePicture(), setModalVisible(false);
          }}
          onCrossPress={() => setModalVisible(false)}
          modalVisible={modalVisible}
          modalClosePress={() => {
            setModalVisible(false);
          }}
        />
      )}
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.extraLightBlue,
    borderColor: Colors.black,
    borderWidth: moderateScale(0.5),
    marginHorizontal: moderateScale(15),
    marginVertical: moderateScale(12),
    borderRadius: moderateScale(6),
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: moderateScale(10),
  },
  uploadContainer: {
    backgroundColor: Colors.greenGradient[1],
    alignSelf: 'center',
    padding: moderateScale(5),
    borderRadius: moderateScale(5),
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
    fontSize: moderateScale(10),
  },
  SelectedFileName: {
    color: Colors.black,
    fontSize: moderateScale(10),
    marginLeft: moderateScale(5),
    width: '70%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.blackWithOpacity,

    // alignItems: "center",
  },
  modalView: {
    marginHorizontal: moderateScale(10),
    backgroundColor: 'white',
    borderTopStartRadius: moderateScale(20),
    borderTopEndRadius: moderateScale(20),
    height: moderateScale(130),
    justifyContent: 'space-evenly',
    paddingHorizontal: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: moderateScale(10),
  },
  button: {
    // borderRadius: 20,
    // padding: 10,
    // elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: Colors.transparent,
  },
  textStyle: {
    color: Colors.black,
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default UploadDocumentComponent;
