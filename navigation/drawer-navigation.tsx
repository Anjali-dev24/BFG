import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerComponent';
import {DrawerActions} from '@react-navigation/native';
import DashBoard from '../screens/DashBoard';
import {View, Text} from 'react-native';
import MenuIcon from '../assets/icons/MenuIcon.svg';
import {headerComponentStyle} from '../styles/StyleSheet/headerComponentStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {moderateScale} from 'react-native-size-matters';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Notification from '../screens/Notification';
import {drawerStyle} from '../styles/StyleSheet/drawerStyle';
import {useState} from 'react';

const Drawer = createDrawerNavigator();

const Header = ({onPress, title}:{onPress:()=>void, title:string}) => {
  return (
    <View style={drawerStyle.headerStyle}>
      <TouchableOpacity onPress={onPress}>
        <MenuIcon width={moderateScale(25)} height={moderateScale(25)} />
      </TouchableOpacity>
      <Text style={headerComponentStyle.title}>{title}</Text>
    </View>
  );
};

function DrawerNavigator({navigation}:{navigation:any}) {
  const [isSelected, setIsSelected] = useState<number>();
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <CustomDrawerContent
          onEditProfile={() => {}}
          isSelected={isSelected}
          onPress={(item: any, index: number) => {
            navigation.navigate(item.screen), setIsSelected(index);
          }}
        />
      )}>
      <Drawer.Screen
        name="Home"
        component={DashBoard}
        options={{
          headerShown:false,
        }}
      />
      <Drawer.Screen
        name="Notification"
        component={Notification}
        options={{
          header: () => (
            <Header
              title={'Notification'}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
          headerLeftContainerStyle: {
            position: 'absolute',
            zIndex: 1,
            backgroundColor: 'red',
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
