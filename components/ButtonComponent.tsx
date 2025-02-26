import React, {ReactElement} from 'react';
import {View, TouchableOpacity, Text, ViewStyle, TextStyle} from 'react-native';
import {buttonComponentStyle} from '../styles/StyleSheet/buttonComponentStyle';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../styles/Colors';

function ButtonComponent({
  title,
  onPress,
  buttonStyle,
  textStyle,
  isGradient,
  iconElement,
  padding,
  disabled,
  isTitle,
}: {
  title?: string;
  onPress?: () => void | undefined;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  isGradient?: boolean;
  iconElement?: ReactElement;
  padding?: ViewStyle;
  disabled?: boolean;
  isTitle?: boolean;
}) {
  const renderButtonColor = () => {
    if (disabled) {
      return [Colors.gray, Colors.gray];
    } else if (isGradient) {
      return Colors.greenGradient;
    } else {
      return [Colors.transparent, Colors.transparent];
    }
  };
  return (
    <LinearGradient
      colors={renderButtonColor()}
      style={[buttonComponentStyle.container, buttonStyle]}>
      <TouchableOpacity
        disabled={disabled}
        style={[buttonComponentStyle.buttonContainer, padding]}
        onPress={onPress}>
        {iconElement}
        {isTitle && (
          <Text style={[buttonComponentStyle.buttonTitleStyle, textStyle]}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default ButtonComponent;
