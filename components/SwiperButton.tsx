import React from 'react';
import {Text, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../styles/Colors';
import {swiperButtonComponentStyle} from '../styles/StyleSheet/swiperButtonComponentStyle';

const MyComponent = ({
  buttonText,
  onPress,
  buttonStyle,
  textStyle,
}: {
  buttonText: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}) => {
  return (
    <LinearGradient
      colors={Colors.greenGradient}
      style={swiperButtonComponentStyle.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[swiperButtonComponentStyle.container, buttonStyle]}>
        <Text style={[swiperButtonComponentStyle.buttonTextStyle, textStyle]}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default MyComponent;
