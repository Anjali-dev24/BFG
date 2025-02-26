import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../styles/Colors';

const Notification = () => {

    useEffect(()=>{
        AsyncStorage.getItem('questionData').then(data=>{
            let parseData = JSON.stringify(data)
        })
       
    },[])
    return (
        <View style={styles.container}>
            <Text>MyComponent</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.extraLightBlue,
    },
});

export default Notification;
