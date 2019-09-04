/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {  Header, } from 'react-native-elements';
//import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
//import { apiEndpoints } from './../api/apiEndpoints';

const HomeScreen = ({ navigation }) => {
  const cnic = navigation.getParam('cnic', 'NO CNIC in HOME');

  ///////////////////////////////////methods///////////////////////////////////////////
  var bookRide = () => {
    console.log('home cnic', cnic);
    console.log('pressed');
    navigation.navigate('pickUpLocation', { cnic });
  };
  var logOut = async () => {
    try {
      console.log('logging out');
      AsyncStorage.clear();
      console.log('logged out');
      navigation.navigate('FirstScreen');
    } catch (e) {
      alertUser('can not logout: ', e);
    }
  };
  ///////////////////////async storage methods /////////////////////////////////////
  var getUserCnicFromStorage = async () => {
    try {
      console.log('checking user cnic');
      const userCnic = await AsyncStorage.getItem('@cnic');
      if (userCnic) {
        setCnic(userCnic);
        console.log(userCnic);
      }
    } catch (e) {
      //alertUser('Error', 'Can not get data from storage');
    }
  };
  var removeUserCNIC = async () => {

  };
  var alertUser = (type, content) => {
    Alert.alert(type, content, [
      {
        text: 'OK',
        onPress: () => console.log('OK Button pressed')
      }
    ]);
  };


  ////////////////////////////////////////render////////////////////////////////////////////////

  return (
    <View>
      <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Home', style: { color: '#fff' } }}
        rightComponent={{ icon: 'log-out', type: 'entypo', color: '#fff', onPress: logOut }}
      />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>WELCOME TO {'\n'} HALCHAL SERVICES</Text>
      </View>
      <TouchableOpacity
        onPress={bookRide}
        style={styles.btnContainer}
      >
        <Text style={styles.btnText}>Book Your Ride</Text>

      </TouchableOpacity>
      <TouchableOpacity
        onPress={logOut}
        style={styles.btnContainer}
      >
        <Text style={styles.btnText}>Back To Login</Text>

      </TouchableOpacity>
    </View>
  );
};
////////////////////////////styles//////////////////////////////////
const styles = StyleSheet.create({
  textInput: {
    height: 50,
    width: Dimensions.get('window').width - 100,
    padding: 10,
    margin: 15,
    borderRadius: 6,
    borderColor: '#c0ccda',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#757d86',
    fontWeight: 'normal',
    letterSpacing: 5
  },
  headingContainer: {
    marginTop: 25,
    marginBottom: 30,
    height: 80,
    padding: 10,
    alignSelf: 'stretch',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ba1ec',
  },
  heading: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 3,
  },
  btnContainer: {
    marginTop: 45,
    height: 70,
    width: 250,
    padding: 20,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#4184d0',
  },
  btnText: {
    height: 50,
    padding: 10,
    margin: 15,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;