import React from 'react';
import {View, Text, useWindowDimensions, Image} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {moderateScale} from 'react-native-size-matters';
import Colors from '../styles/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {drawerStyle} from '../styles/StyleSheet/drawerStyle';
import {drawerItems} from '../hooks/mock';
import {Strings} from '../styles/Strings';

function CustomDrawerContent({
  onEditProfile,
  onPress,
  isSelected,
}: {
  onPress: (item: any, index: number) => void;
  onEditProfile: () => void;
  isSelected: number | undefined;
}) {
  const width = useWindowDimensions().width * 0.3;

  return (
    <DrawerContentScrollView>
      <View style={drawerStyle.menuContainer}>
        <View style={drawerStyle.profileContainer}>
          <Image
            style={drawerStyle.profileImage}
            source={require('../assets/profile.png')}
          />
          <View>
            <Text style={drawerStyle.userName}>
              {Strings.drawerStrings.userName}
            </Text>
            <TouchableOpacity onPress={onEditProfile}>
              <Text style={drawerStyle.editProfile}>
                {Strings.drawerStrings.editProfile}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={drawerStyle.ListContainer}>
          {drawerItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.title}
                onPress={() => onPress(item, index)}
                style={[
                  drawerStyle.homeContainer,
                  isSelected === index && {
                    backgroundColor: Colors.extraLightGreen,
                  },
                ]}>
                {React.createElement(item.image, {
                  width: moderateScale(14),
                  height: moderateScale(14),
                  marginRight: moderateScale(10),
                })}
                <Text style={drawerStyle.home}>{item.title}</Text>
                {index === 1 && (
                  <View style={drawerStyle.notificationCount}>
                    <Text style={drawerStyle.count}>0</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
