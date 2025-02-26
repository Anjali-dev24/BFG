import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {moderateScale} from 'react-native-size-matters';
import TakePhotoIconWhite from '../assets/icons/takePhotoIconWhite.svg';
import VectorIcon from '../assets/icons/Vector.svg';
import useUpdateEffect from '../hooks/useUpdateEffect';
import Colors from '../styles/Colors';
import customeCamera from '../styles/StyleSheet/customCamera';

export const SEARCH_IMAGE_SUBMITTED = 'Search Image Submitted';
export const SEARCH_IMAGE_STARTED = 'Search Image Started';
export const CUSTOM_CAMERA_SCREEN = 'Search Image';

const CustomCamera = ({
  switchBack,
  data,
  defaultVal,
  setParentState,
  parentsData,
  name,
  item,
  updatedValue,
  navigationToCamera,
  documentName,
}: {
  switchBack: () => void;
  data: any;
  defaultVal: any;
  setParentState: any;
  parentsData: any;
  name: any;
  item: any;
  updatedValue: any;
  navigationToCamera: () => void;
  documentName: any;
}) => {
  const [torch, setTorch] = React.useState<boolean>(false);
  const [imgUri, setImgUri] = React.useState<any>();
  const [showActLoader, setShowActLoader] = React.useState<boolean>(false);
  const [documentFile, setDocumentFile] = React.useState(
    data?.value || defaultVal || undefined,
  );
  let isIos = Platform.OS === 'ios';

  useUpdateEffect(() => {
    item.updatedName = documentFile;
    setParentState?.({...parentsData, [name]: documentFile});
  }, [documentFile]);

  React.useMemo(() => {
    if (!isIos) {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Okay',
        buttonNegative: 'never ask again',
      }).then(data => {
        if (data === 'never_ask_again') {
          switchBack;
        } else if (data == 'denied') switchBack;
        else takePicture();
      });
    } else {
      check(PERMISSIONS.IOS.CAMERA)
        .then(result => {
          if (result == RESULTS.DENIED || result == RESULTS.UNAVAILABLE) {
            switchBack;
          } else {
            takePicture();
          }
        })
        .catch(err => {
          if (err) switchBack;
        });
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setShowActLoader(true);
      StatusBar.setHidden(false);
      setTimeout(() => {
        setShowActLoader(false);
      }, 150);
    }, []),
  );

  React.useEffect(() => {
    if (imgUri) {
      //   actions.setImageUri(imgUri);
      switchBack;
    }
  }, [imgUri]);

  const toggleTorch = () => setTorch(prev => !prev);
  const goBack = () => {
    switchBack;
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
          setImgUri(image.assets[0].uri);
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

  if (imgUri) return <ActivityIndicator color={Colors.extraLightBlue} />;

  return (
    <View style={customeCamera.container}>
      {showActLoader && (
        <ActivityIndicator
          color={'transparent'}
          style={customeCamera.activityLoader}
        />
      )}
      <View style={customeCamera.header}>
        <View style={customeCamera.galleryContainer}>
          <TouchableOpacity onPress={toggleTorch}>
            <VectorIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={customeCamera.footer}>
        <TouchableOpacity
          style={customeCamera.shutter}
          onPress={() => takePicture()}>
          <TakePhotoIconWhite
            width={moderateScale(60)}
            height={moderateScale(60)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomCamera;
