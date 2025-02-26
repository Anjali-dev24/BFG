import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import VectorIcon from '../assets/icons/Vector.svg';
import Colors from '../styles/Colors';
import TakePhotoIconWhite from '../assets/icons/takePhotoIconWhite.svg';
import {moderateScale} from 'react-native-size-matters';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setImageUri} from '../store/actions/SignUp';
import * as pageActions from '../store/actions/SignUp';
import * as ImagePicker from 'react-native-image-picker';
import customeCamera from '../styles/StyleSheet/customCamera'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SEARCH_IMAGE_SUBMITTED = 'Search Image Submitted';
export const SEARCH_IMAGE_STARTED = 'Search Image Started';
export const CUSTOM_CAMERA_SCREEN = 'Search Image';

interface UserDetails {
  userImage: string;
  actions: any;
  navigation: any;
  isFocused: any;
}

const CustomCamera = ({navigation, actions, userImage}: UserDetails) => {
  const [torch, setTorch] = React.useState<boolean>(false);
  const [imgUri, setImgUri] = React.useState<any>();
  const [showActLoader, setShowActLoader] = React.useState<boolean>(false);
  const [isClicked, setIsClicked] = React.useState<boolean>(false);
  let isIos = Platform.OS === 'ios';

  React.useMemo(() => {
    if (!isIos) {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Okay',
        buttonNegative: 'never ask again',
      }).then(data => {
        if (data === 'never_ask_again') {
          navigation.pop();
        } else if (data == 'denied') navigation.pop();
        else takePicture();
      });
    } else {
      check(PERMISSIONS.IOS.CAMERA)
        .then(result => {
          if (result == RESULTS.DENIED || result == RESULTS.UNAVAILABLE) {
            navigation.pop();
          } else {
            takePicture();
          }
        })
        .catch(err => {
          if (err) navigation.pop();
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
      actions.setImageUri(imgUri);
      navigation.pop();
    }
  }, [imgUri]);

  const toggleTorch = () => setTorch(prev => !prev);
  const goBack = () => {
    navigation.goBack();
  };

  const takePicture = async () => {
    await ImagePicker.launchCamera({
      mediaType: 'photo',
      maxWidth: moderateScale(1700),
      maxHeight: moderateScale(500),
      quality: 0.5,
    })
      .then(image => {
        AsyncStorage.setItem('uploadFromCamera', JSON.stringify(image?.assets?.[0]))
        console.log('uploadedImage', image?.assets?.[0])
        if(image && image.assets){
        setImgUri(image.assets[0].uri);
        actions.setImageUri(image.assets[0].uri)
       
        }
       if(image.didCancel){
         navigation.pop()
       }
      })
      .catch(err => {
        Alert.alert(err)
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
        <TouchableOpacity style={customeCamera.shutter} onPress={() => takePicture()}>
          <TakePhotoIconWhite
            width={moderateScale(60)}
            height={moderateScale(60)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userImage: state.signUpPage.userImage,
  };
};

const ActionCreators = Object.assign({}, pageActions);
const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomCamera);


