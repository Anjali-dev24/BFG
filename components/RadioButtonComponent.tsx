import React from 'react';
import { TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import RadioDisableButton from '../assets/icons/radioDisable.svg';
import RadioEnableButton from '../assets/icons/radioEnable.svg';

const RadioButton = ({
  isPressed,
  isOnPressed,
}: {
  isPressed: boolean;
  isOnPressed: () => void;
}) => {
  return (
    <TouchableOpacity onPress={isOnPressed}>
      {!isPressed ? (
        <RadioDisableButton
          width={moderateScale(20)}
          height={moderateScale(20)}
        />
      ) : (
        <RadioEnableButton
          width={moderateScale(20)}
          height={moderateScale(20)}
        />
      )}
    </TouchableOpacity>
  );
};

export default RadioButton;
