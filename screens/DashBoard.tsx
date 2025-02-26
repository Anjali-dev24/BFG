import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ForwordIcon from '../assets/icons/forwordIcon.svg';
import Forword from '../assets/icons/polygon_forword.svg';
import HeaderComponent from '../components/HeaderComponent';
import {BASE_URL} from '../hooks/links';
import * as pageActions from '../store/actions/SignUp';
import Colors from '../styles/Colors';
import {dashBoardStyle} from '../styles/StyleSheet/dashBoardStyle';

const DashBoardScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [projectList, setProjectList] = useState<any>();
  const [selectedProjectId, setSelectedProjectId] = useState<any>();
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const flatListRef = useRef<FlatList>();
  const [projectStatus, setProjectStatus] = useState<string>('');
  const [totalQuestions, setTotalQuestions] = useState<string>('');

  useEffect(() => {}, []);
  useFocusEffect(() => {
    setTimeout(() => {
      renderAnotherList
    }, 100);
    
  });

  useEffect(() => {
    AsyncStorage.getItem('prevRoute').then(prevScreen => {
      if (prevScreen !== null) {
        AsyncStorage.setItem('Exit', 'true');
        navigation.navigate(prevScreen);
      }
    });
  }, []);

  const renderAnotherList = (
    subItems: any,
    selectedProjectId: string,
    taskGroups: any,
  ) => {
    const methodToStyleStatusText = (item:any) => {
      if (getTotalTasks(item) < '1') {
        return Colors.red;
      } else if (getTotalTasks(item) >= '1') {
        return Colors.yellow;
      } else if (getTotalTasks(item) === item.form.fields.length) {
        return Colors.greenGradient[0];
      }
    };

    const getTotalTasks = (tasks: any) => {
      let updatedItems = tasks?.form?.fields?.filter(
        (item: any) => item.updatedName,
      );
      return updatedItems.length
    };

    return (
      <FlatList
        style={{flexGrow: 0}}
        data={subItems}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('QuestionsForm', {
                  taskGroups: taskGroups,
                  questionData: item,
                  selectedProjectId: selectedProjectId,
                });
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: moderateScale(5),
                width: '80%',
                alignSelf: 'center',
              }}>
              <Text style={styles.subTitle}>{item.task}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: moderateScale(70),
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: methodToStyleStatusText(item),
                    fontSize: moderateScale(14),
                    fontFamily: 'Lato-Bold',
                  }}>{`${getTotalTasks(item)}/${
                  item.form.fields.length
                }`}</Text>
                <ForwordIcon />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const renderTasksList = (subItems: any, selectedProjectId: string) => {
    return (
      <FlatList
        style={{flexGrow: 0}}
        data={subItems}
        renderItem={({item, index}) => {
          return renderAnotherList(item.tasks, selectedProjectId, item);
        }}
      />
    );
  };

  const getProjectList = () => {
    setLoading(true);
    Promise.all([
      AsyncStorage.getItem('accessToken'),
      AsyncStorage.getItem('userSavedInformation'),
    ]).then(([tokiee, user]) => {
      let data = JSON.parse(user || '{}');
      if (data !== null) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${tokiee}`);
        fetch(BASE_URL + `/project/by-user-id/${data._id}`, {
          method: 'GET',
          headers: myHeaders,
        })
          .then(response => {
            switch (response.status) {
              case 200:
                return response.json();
              case 401:
                console.error('err');
                throw 'TOKEN EXPIRED';
              case 500:
                Alert.alert('Internal Server Error');
                throw 'INTERNAL SERVER ERROR';
              default:
                Alert.alert('ErrorDash');
                throw 'ERROR';
            }
          })
          .then(json => {
            setLoading(false);
            setProjectList(json?.data);
          })
          .catch(error => {
            console.log('err' + JSON.stringify(error));
          });
      }
    });
  };

  useEffect(() => {
    getProjectList();
  }, []);

  useFocusEffect(() => {
    console.log('projectUpdatedList', JSON.stringify(projectList));
  });

  return (
    <View style={dashBoardStyle.container}>
      {loading && (
        <ActivityIndicator
          color={Colors.greenGradient[1]}
          size={'large'}
          style={dashBoardStyle.loader}
        />
      )}
      <HeaderComponent
        ReactElement={
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.removeItem('prevRoute');
              AsyncStorage.removeItem('Exit');
              navigation.navigate('Services');
            }}
            style={dashBoardStyle.addProject}>
            <Image
              style={dashBoardStyle.addProjectImage}
              source={require('../assets/addProject.png')}
            />
            <Text style={{color: Colors.black, fontSize: moderateScale(10)}}>
              Add Project
            </Text>
          </TouchableOpacity>
        }
        title="Home"
        onPress={() => navigation.openDrawer()}
      />
      <View style={{flex: 1, paddingBottom: moderateScale(10)}}>
        <FlatList
          style={{flexGrow: 0}}
          data={projectList}
          ref={flatListRef}
          renderItem={({item, index}) => {
            return (
              <View focusable key={index}>
                <TouchableOpacity
                  onPress={() => {
                    if (selectedProjectId !== item._id) {
                      setSelectedProjectId(item._id);
                      setSelectedIndex(index);
                    } else {
                      setSelectedProjectId(null);
                      setSelectedIndex(index);
                    }
                    let indexSel = (projectList as Array<any>).findIndex(
                      item => selectedProjectId === item._id,
                    );
                    if (index > 0) {
                      flatListRef?.current?.scrollToIndex({
                        animated: true,
                        index: index - 1,
                      });
                    } else {
                      flatListRef?.current?.scrollToIndex({
                        animated: true,
                        index: index,
                      });
                    }
                  }}
                  style={dashBoardStyle.mainContainer}>
                  <View style={dashBoardStyle.projectContainer}>
                    <View
                      style={[
                        selectedProjectId === item._id
                          ? {
                              transform: [{rotate: '90deg'}],
                              height: moderateScale(20),
                              justifyContent: 'flex-end',
                              marginRight: moderateScale(10),
                            }
                          : {
                              width: moderateScale(18),
                              marginRight: moderateScale(10),
                            },
                      ]}>
                      <Forword
                        width={moderateScale(15)}
                        height={moderateScale(15)}
                      />
                    </View>
                    <View>
                      <Text style={dashBoardStyle.projectTitle}>
                        {item.service.name} - {item.projectNumber}
                      </Text>
                      <Text style={dashBoardStyle.statusStyle}>
                        Status:- {item.status}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {selectedProjectId === item._id &&
                  renderTasksList(item.taskGroups, item._id)}
              </View>
            );
          }}
        />
      </View>
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

const mapStateToProps = (state: any) => {
  return {
    status: state.signUpInfo.status,
  };
};

const ActionCreators = Object.assign({}, pageActions);
const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(ActionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardScreen);
