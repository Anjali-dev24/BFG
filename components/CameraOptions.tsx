import React from 'react';
import {View, Modal} from 'react-native';
import {Strings} from '../styles/Strings';
import {modalStyle} from '../styles/StyleSheet/modalStyle';
import ButtonComponent from './ButtonComponent';
import ExitIcon from '../assets/icons/exitIcon.svg';
import {moderateScale} from 'react-native-size-matters';

const CameraOptions = ({
  modalVisible,
  modalClosePress,
  onPressGallary,
  onPressCamera,
  onCrossPress,
}: {
  modalVisible: boolean;
  modalClosePress: () => void;
  onPressGallary: () => void;
  onPressCamera: () => void;
  onCrossPress: () => void;
}) => {
  return (
    <Modal
      style={modalStyle.container}
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={modalClosePress}>
      <View style={modalStyle.centeredView}>
        <ButtonComponent
          isTitle={false}
          onPress={onCrossPress}
          buttonStyle={modalStyle.crossButton}
          isGradient={false}
          iconElement={
            <ExitIcon width={moderateScale(15)} height={moderateScale(15)} />
          }
        />
        <ButtonComponent
          isTitle={true}
          buttonStyle={modalStyle.gallaryButton}
          onPress={onPressGallary}
          title={Strings.CameraModal.gallary}
        />
        <ButtonComponent
          isTitle={true}
          buttonStyle={modalStyle.gallaryButton}
          onPress={onPressCamera}
          title={Strings.CameraModal.camera}
        />
      </View>
    </Modal>
  );
};

export default CameraOptions;
