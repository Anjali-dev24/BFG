import AsyncStorage from '@react-native-async-storage/async-storage';
import {isDate} from 'moment';
import React, {useEffect} from 'react';
import {
  FlatList,
  Linking,
  SafeAreaView,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {moderateScale} from 'react-native-size-matters';
import Check from '../assets/icons/check.svg';
import Colors from '../styles/Colors';
import {FlatListStyles} from '../styles/StyleSheet/flatListStyles';

const FlatListComponent = ({
  array,
  onPress,
  selectedIndex,
  style,
  isServices,
}: {
  array: any;
  onPress: (item: any, index: number) => void;
  selectedIndex?: number;
  style?: ViewStyle;
  isServices?: boolean;
}) => {
  useEffect(() => {
    AsyncStorage.getItem('SelectedKeys').then(subItem => {
      let parseData = JSON.parse(subItem || '[]');
      parseData.map((id: any, index:number) => {
        if (id[index].isSelected) {
          return <Check />;
        }
      });
    });
  });
  const checkIsMultiSelectEnable = (item: any, index: number) => {
    if (item.multiSelectable) {
      return item.isSelected === true ? <Check /> : null;
    } else {
      return selectedIndex === index ? <Check /> : null;
    }
  };
  return (
    <SafeAreaView style={FlatListStyles.container}>
      <FlatList
        scrollEnabled={false}
        data={array}
        renderItem={({item, index}) => {
          return (
            <View style={[FlatListStyles.flatlistData, style]}>
              <TouchableOpacity
                onPress={() => onPress(item, index)}
                style={FlatListStyles.checkBox}>
                {checkIsMultiSelectEnable(item, index)}
              </TouchableOpacity>
              <View>
                <Text style={FlatListStyles.serviceName}>{item.name}</Text>
                {isServices && (
                  <View
                    style={{
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontSize: moderateScale(10),
                      }}>
                      Basic price: {item.currencySymbol}99
                    </Text>
                    <TouchableOpacity
                      onPress={() => Linking.openURL(item.priceURL)}>
                      <Text
                        style={{
                          color: Colors.greenGradient[0],
                          fontSize: moderateScale(10),
                          fontFamily: 'Lato-Bold',
                          flexWrap: 'wrap',
                          width: moderateScale(250),
                        }}>
                        See full price
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default FlatListComponent;
