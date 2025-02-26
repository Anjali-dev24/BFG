import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import ForwordIcon from '../assets/icons/forwordIcon.svg';
import Forword from '../assets/icons/polygon_forword.svg';
import HeaderComponent from '../components/HeaderComponent';
import Colors from '../styles/Colors';
import {dashBoardStyle} from '../styles/StyleSheet/dashBoardStyle';

const data = [
  {
    title: 'First Service',
    subItems: [
      {
        title: 'task 1',
      },
      {
        title: 'task 2',
      },
      {
        title: 'task 3',
      },
    ],
  },
  {
    title: 'Second Service',
    subItems: [
      {
        title: 'task 1',
      },
      {
        title: 'task 2',
      },
      {
        title: 'task 3',
      },
    ],
  },
];

const renderAnotherList = (subItems:any) => {
  return (
    <FlatList
      style={{flexGrow: 0}}
      data={subItems}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: moderateScale(15),
              paddingVertical: moderateScale(5),
              width: '100%',
            }}>
            <Text style={styles.subTitle}>{item.title}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '20%',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: Colors.greenGradient[1]}}>0/5</Text>
              <ForwordIcon />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const ProjectDetails = ({navigation, route}: {navigation: any; route: any}) => {
  const {projectTasks} = route.params;
  const [taskGroup, setTaskGroup] = useState<any>();
  const [selectedGroup, setSelectedGroup] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);


  
  useEffect(() => {
    AsyncStorage.getItem('taskGroups').then(task => {
      let taskList = JSON.parse(task || '[]');
      setTaskGroup(taskList);
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text
        style={{
          color: Colors.black,
          fontSize: moderateScale(16),
          fontFamily: 'Lato-Bold',
        }}>
        Services
      </Text>
      <View
        style={{
          borderBottomColor: Colors.gray,
          borderBottomWidth: moderateScale(0.5),
          marginVertical: moderateScale(10),
        }}
      />
      <FlatList
        style={{flexGrow: 0}}
        data={data}
        renderItem={({item, index}) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setSelectedGroup(true), setSelectedIndex(index);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.title}>{item.title}</Text>
                <View
                  style={[
                    selectedGroup && selectedIndex === index
                      ? {transform: [{rotate: '90deg'}], height: moderateScale(40), justifyContent:"flex-end"}
                      : {width: moderateScale(30)},
                  ]}>
                  <Forword
                    width={moderateScale(12)}
                    height={moderateScale(12)}
                  />
                </View>
              </TouchableOpacity>
              {selectedGroup &&
                selectedIndex === index &&
                renderAnotherList(item.subItems)}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.extraLightBlue,
    paddingHorizontal: moderateScale(15),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.extraLightBlue,
  },
  title: {
    fontSize: moderateScale(14),
    fontFamily: 'Lato-Bold',
    color: Colors.black,
    paddingVertical: moderateScale(10),
  },
  item: {
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  subTitle: {
    fontSize: moderateScale(14),
    fontFamily: 'Lato-Light',
    color: Colors.black,
  },
});

export default ProjectDetails;
