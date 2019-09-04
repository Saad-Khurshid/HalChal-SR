/* eslint-disable prettier/prettier */

import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import { Button, Header, Image } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';


const FirstMainScreen = ({ navigation }) => {
  /////////////////////////////hooks//////////////////////////////////////////
  const [ cnic, setCnic ] = useState('');
  //useEffect( getUserCnicFromStorage , []);
  //useEffect( () => {
    //getUserCnicFromStorage();
  //});
  useLayoutEffect(() => {
      getUserCnicFromStorage();
  }, []);
  /////////////////////////////////async storage methods /////////////////////////////
  var getUserCnicFromStorage = async () => {
    try {
      console.log('checking user cnic');
      const userCnic = await AsyncStorage.getItem('@cnic');
      if (userCnic) {
        setCnic(userCnic);
        console.log(userCnic);
        navigation.navigate('HomeScreen', { cnic: userCnic});
      }
      else {
        console.log('no cnic');
      }
    } catch (e) {
      alertUser('error', e.message);
    }
  };
  var alertUser = (type, content) => {
    Alert.alert(type, content, [
      {
        text: 'OK',
        onPress: () => console.log('OK Button pressed')
      }
    ]);
  };
//////////////////////////////////////render/////////////////////////////////////////////////

  return (
    <View>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => console.log('I m here') }}
        centerComponent={{ text: 'Hal Chal Recipient', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <Image
        style={styles.image}
        resizeMode="cover"
        source={require('../images/agritech.png')}
      />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>HAL CHAL SERVICES</Text>
      </View>
      <View style={styles.sectionContainer} >
        <Button
          title="Sign In"
          icon={{
            name: "login",
            type: "antdesign",
            size: 25,
            color: "white"
          }}
          iconRight
          onPress={() => navigation.navigate('SignIn')}
        />
        <View style={{ marginTop: 20 }} />
        <Button
          title="Sign Up"
          icon={{
            name: "person-add",
            type: "materialicons",
            size: 25,
            color: "white"
          }}
          iconRight
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
      <View style={{ marginTop: 20 }} />
      <View style={styles.section2Container}>
        <Text>Or call us at Agri HelpLine</Text>
        <Text>0800 29000</Text>
        <Text>0800 15000</Text>
        <View style={{ marginTop: 30 }} />
        <View style={{ flexDirection: "row" }} >
          <Image
            style={styles.logoimage}
            resizeMode="cover"
            source={require('../images/gvtPunjab.png')}
          />
          <Image
            style={styles.logoimage}
            resizeMode="cover"
            source={require('../images/agriPunjab.png')}
          />
        </View>
      </View>
      <View style={{ marginTop: 20 }} />
      <View style={styles.highlight}>
        <Text>Govt of Punjab</Text>
        <Text>Agricultural Department</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    marginLeft: 32,
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
  },
  halchalServices: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,

  },
  logoimage: {
    width: 100,
    height: 100
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  section2Container: {
    justifyContent: "center",
    alignItems: 'center'
  },
  highlight: {
    fontWeight: '700',
    justifyContent: "center",
    alignItems: 'center'
  }
});

export default FirstMainScreen;