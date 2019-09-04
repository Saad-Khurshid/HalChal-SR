/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Picker,
  KeyboardAvoidingView,
  Text,
  Alert,
  ScrollView,
  Dimensions
} from 'react-native';
import { Button, Header, Input, Divider } from 'react-native-elements';
import Tehsils from '../data/tehsilsofPunjab.js';
import Districts from '../data/districtsofPunjab.json';
import NetInfo from '@react-native-community/netinfo';
import { apiEndpoints } from './../api/apiEndpoints';
import Geolocation from '@react-native-community/geolocation';

const SignUpScreen = ({ navigation }) => {
  const [district, setDistrict] = useState('District');
  const [tehsil, setTehsil] = useState('Tehsil');
  const [cnic, setCnic] = useState('');
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [land, setLand] = useState('');
  const [gis_location_lat, setLat] = useState(0);
  const [gis_location_lng, setLng] = useState(0);
  const [errormessage, setErrormessage] = useState('');

  //////////////validation methods//////////////////////////////////////////////////////
  var isValidCNIC = () => {
    /**
     * Provide validation parameters for the CNIC here
     * For now, it only checks that the ID string has a length of 13 numeric characters
     * Also, make sure the error message is updated to reflect the requirements of
     * the CNIC.
     */
    if (cnic && cnic.length === 13) {
      console.log(
        `Performing basic validation on the provided CNIC. CNIC ${cnic} has 13 digits and should be sent to the server for further validation.`
      );
      return true;
    } else {
      alertUser('Error', 'CNIC should be 13 digits.');
      return false;
    }
  };
  var checkifPasswordsMatch = () => {
    if (password === confirmPassword) {
      return true;
    }
    else {
      setErrormessage(
        'Please make sure both passwords are same and try again. The credentials provided are invalid.'
      );
      alertUser('Error', errormessage);
      return false;
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
  ///////////////////////getting coordinates methods /////////////////////////////////////
  var findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        const latitude = JSON.stringify(position.coords.latitude);
        const longitude = JSON.stringify(position.coords.longitude);
        setLat(latitude);
        setLng(longitude);
        console.log(position);
      },
      error => Alert.alert(error.message),
      { timeout: 20000, maximumAge: 10000 }
    );
  };
  useEffect(() => {
    findCoordinates();
  }, []);
  //findCoordinates();
  ///////////////////////handling signup methods /////////////////////////////////////
  var handleSignUp = async () => {

    const baseUrl = apiEndpoints.farmerSignUp.url;
    const constructedUrl = `${baseUrl}?cnic=${cnic}&name=${name}&fatherName=${fatherName}&address=${address}&phone=${phone}&land=${land}&tehsil=${tehsil}&district=${district}&lat=${gis_location_lat}&lng=${gis_location_lng}&pass=${password}`;
    console.log(constructedUrl);
    if (isValidCNIC() === true && checkifPasswordsMatch() === true) {
      /**
       * Here we first confirm that the user is connected to the internet and
       * that a network request can be made for user login.
       */
      return NetInfo.fetch().then(NetInfoState => {
        console.log('Connection type', NetInfoState);
        console.log('Is connected?', NetInfoState.isConnected);
        if (NetInfoState.isConnected === false) {
          Alert.alert('Error', 'Please check your internet connectivity.', [
            {
              text: 'OK',
              onPress: () => console.log('OK Button pressed')
            }
          ])

        } else {
          console.log('Connected to internet');
          return fetch(constructedUrl)
            .then(response => response.json())
            .then(data => {
              console.log({ data });
              if (data.success === 0) {

                Alert.alert('Error', data.message, [
                  {
                    text: 'OK',
                    onPress: () => console.log('OK Button pressed')
                  }
                ])

              } else {
                Alert.alert('Success', data.message, [
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.navigate('FirstScreen');
                    }
                  }
                ])
                console.log('Reg successful');

              }
            });
        }
      });
    }
  };


  ///////////////////////render /////////////////////////////////////
  return (
    <View>

      <Header
        placement="left"
        leftComponent={{ icon: 'chevron-left', color: '#fff' }}
        centerComponent={{ text: 'SignUp Screen', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" enabled>
          <Input style={styles.textInput}
            placeholder='CNIC'
            rightIcon={{ type: 'antdesign', name: 'idcard' }}
            value={cnic}
            onChangeText={value => setCnic(value.replace(/\D/g, ''))}
          />
          <Text style={{ alignSelf: 'flex-end', fontSize: 15, color: '#c0ccda', marginLeft: 15 }}>e.g. 1730155712337</Text>
          <Input style={styles.textInput}
            placeholder='Name'
            value={name}
            onChangeText={value => setName(value)}
          />
          <Input style={styles.textInput}
            placeholder='Father Name'
            value={fatherName}
            onChangeText={value => setFatherName(value)}
          />
          <Input style={styles.textInput}
            placeholder='Phone Number'
            rightIcon={{ type: 'Entypo', name: 'phone' }}
            value={phone}
            onChangeText={value => setPhone(value.replace(/\D/g, ''))}
          />
          <Text style={{ alignSelf: 'flex-end', fontSize: 15, color: '#c0ccda', marginLeft: 15 }}>e.g. 03001234567</Text>
          <Input style={styles.textInput}
            placeholder='Create Password'
            rightIcon={{ type: 'feather', name: 'lock' }}
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <Input style={styles.textInput}
            placeholder='Confirm Password'
            value={confirmPassword}
            onChangeText={value => setConfirmPassword(value)}
          />
          <Picker
            selectedValue={district}
            onValueChange={(itemValue) =>
              setDistrict(itemValue)
            }>
            {Districts.map((dist) => {
              return <Picker.Item key={dist.name} label={dist.name} value={dist.name} />
            })}
          </Picker>
          <Divider style={{ paddingHorizontal: 10 }} />
          <Picker
            selectedValue={tehsil}
            onValueChange={(itemValue) =>
              setTehsil(itemValue)
            }>
            {Tehsils[district].map((t) => {
              return <Picker.Item key={t} label={t} value={t} />
            })}
          </Picker>
          <Divider style={{ paddingHorizontal: 10 }} />
          <Input style={styles.textInput}
            placeholder='Address'
            rightIcon={{ type: 'entypo', name: 'address' }}
            value={address}
            onChangeText={value => setAddress(value)}
          />
          <Input style={styles.textInput}
            placeholder='Total Land Holding (Acre)'
            rightIcon={{ type: 'materialicons', name: 'nature-people' }}
            value={land}
            onChangeText={value => setLand(value.replace(/\D/g, ''))}
          />


          <View style={{ marginTop: 20 }} />
          <Button
            title="SUBMIT FOR REGISTRATION"
            icon={{
              name: "person-add",
              type: "materialicons",
              size: 25,
              color: "white"
            }}
            iconRight
            onPress={handleSignUp}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>

  );
};

///////////////////////styles /////////////////////////////////////
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
});

export default SignUpScreen;
