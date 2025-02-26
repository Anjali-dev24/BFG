import React from 'react';
import {
  ActivityIndicator, FlatList, Modal, Platform, Text, TouchableOpacity, View
} from 'react-native';
import Animated from 'react-native-reanimated';
import { moderateScale } from 'react-native-size-matters';
import CloseIcon from '../assets/icons/exitIcon.svg';
import Polygon from '../assets/icons/Polygon.svg';
import { dropDownStyles } from '../styles/StyleSheet/dropDownStyle';

const OS = Platform.OS === 'ios';
const CustomDropDown = ({
  label,
  modalVisible,
  onPress,
  setVisible,
  setInVisible,
  dropDownData,
  category,
  onClose,
  isCountry,
  selectedIndex,
  stateLoading,
  error,
  isRequired,
}: {
  label: string;
  modalVisible: boolean;
  onPress: (item: any) => void;
  setVisible: () => void;
  setInVisible: (item?: any) => void;
  dropDownData: any;
  category: string;
  onClose: () => void;
  isCountry?: boolean;
  selectedIndex: (index: number) => void;
  stateLoading?: boolean;
  error?: string;
  isRequired?: boolean;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={dropDownStyles.container}>
      <Text style={dropDownStyles.categoryStyle}>
        {category !== '' ? category : label}
      </Text>
      <Polygon />
      {modalVisible ? (
        <Animated.View
          style={[dropDownStyles.over, {opacity: new Animated.Value(0)}]}
          onStartShouldSetResponder={() => true}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={setInVisible}>
            <View
              style={
                isCountry
                  ? dropDownStyles.countryStyle
                  : dropDownStyles.othersStyle
              }>
              <TouchableOpacity
                style={dropDownStyles.closeIconStyle}
                onPress={onClose}>
                <CloseIcon
                  width={moderateScale(15)}
                  height={moderateScale(15)}
                />
              </TouchableOpacity>
              {stateLoading ? (
                <ActivityIndicator
                  style={dropDownStyles.activityIndicatorStyle}
                />
              ) : (
                renderItems(
                  setInVisible,
                  dropDownData,
                  onClose,
                  selectedIndex,
                  isCountry,
                )
              )}
            </View>
          </Modal>
        </Animated.View>
      ) : null}
      {isRequired && <Text style={dropDownStyles.errorTextStyle}>{error}</Text>}
    </TouchableOpacity>
  );
};

const renderItems = (
  setInVisible: (item: any) => void,
  dropDownData: any,
  onClose: () => void,
  selectedIndex: (index: number) => void,
  isCountry?: boolean,
) => {
  return (
    <FlatList
      windowSize={2}
      maxToRenderPerBatch={10}
      ListFooterComponent={
        isCountry ? <View style={{height: moderateScale(40)}} /> : null
      }
      style={dropDownStyles.flatListStyle}
      data={dropDownData}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={{marginVertical: moderateScale(10)}}
            onPress={() => {
              setInVisible(item), selectedIndex(index);
            }}>
            <Text style={dropDownStyles.flatListItemStyle}>
              {item && item.name ? item.name : item.value}
            </Text>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default CustomDropDown;
