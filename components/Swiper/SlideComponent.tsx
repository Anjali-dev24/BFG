import React, {ReactElement} from 'react';
import {View, Text, TextStyle} from 'react-native';
import {slideComponentStyle} from '../../styles/StyleSheet/slideComponentStyle';

const SlideComponent = ({
  title,
  imageElement,
  sliderTitle,
  textElement,
  IsBottomTitlAvailable,
}: {
  title?: string;
  imageElement?: ReactElement;
  sliderTitle?: TextStyle;
  textElement?: ReactElement;
  IsBottomTitlAvailable?: boolean;
}) => {
  return (
    <View style={slideComponentStyle.container}>
      {textElement}
      {imageElement}

      {IsBottomTitlAvailable && (
        <Text style={[slideComponentStyle.titleStyle, sliderTitle]}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default SlideComponent;
