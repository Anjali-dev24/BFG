import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import RadioDisableButton from '../assets/icons/radioDisable.svg';
import RadioEnableButton from '../assets/icons/radioEnable.svg';
import RadioButtonStyles from '../styles/StyleSheet/radioButtonStyle';

type ArrayItems = {
  title: string;
};

const DoubleRadioButton = ({
  radioItems,
  selectedIndex,
  onPress,
  isPressed,
}: {
  radioItems: ArrayItems[];
  selectedIndex?: number;
  onPress: (index: number) => void;
  isPressed?: boolean;
}) => {
  return (
    <View style={RadioButtonStyles.container}>
      {radioItems.map((item, index) => {
        return (
          <View key={item.title} style={[RadioButtonStyles.mainContainer]}>
            <TouchableOpacity
              style={RadioButtonStyles.radioButtonStyle}
              onPress={() => onPress(index)}>
              {selectedIndex !== index ? (
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
            <Text style={RadioButtonStyles.textStyle}>{item.title}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default DoubleRadioButton;
