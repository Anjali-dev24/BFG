import React, {ReactElement} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import MenuIcon from '../assets/icons/MenuIcon.svg';
import {drawerStyle} from '../styles/StyleSheet/drawerStyle';
import {headerComponentStyle} from '../styles/StyleSheet/headerComponentStyle';

const HeaderComponent = ({
  title,
  onPress,
  ReactElement
}: {
  title: string;
  onPress: () => void;
  ReactElement?:ReactElement
}) => {
  return (
    <View style={ReactElement?drawerStyle.header: drawerStyle.headerStyle}>
      <TouchableOpacity
        style={!ReactElement?headerComponentStyle.menuButton:null}
        onPress={onPress}>
        <MenuIcon width={moderateScale(25)} height={moderateScale(25)} />
      </TouchableOpacity>
      <Text style={ReactElement?drawerStyle.headerTitle:headerComponentStyle.title}>{title}</Text>
      {ReactElement}
    </View>
  );
};

export default HeaderComponent;
