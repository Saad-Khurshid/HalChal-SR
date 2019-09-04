/* eslint-disable prettier/prettier */
import React,{useState,useEffect} from 'react';
import {
    StyleSheet,
    View,
    Alert,
    Dimensions,
    Text,
  } from 'react-native';
import { Button, Header,Input, Divider } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import { apiEndpoints } from './../api/apiEndpoints';

const SignInScreen = ({navigation}) => {

    const [cnic,setCnic] = useState('');
    const [password,setPassword] = useState('');

    ///////////////////////async storage methods /////////////////////////////////////
    var getUserCnicFromStorage = async () => {
        try {
            console.log('checking user cnic');
            const userCnic = await AsyncStorage.getItem('@cnic');
            if (userCnic) {
                //setCnic(userCnic);
                console.log(userCnic)
                navigation.navigate('HomeScreen',{cnic:userCnic});
            }
        } catch (e) {
            alertUser('Error', 'Can not get data from storage');
        }
    };
    var saveUserCnicInStorage = async () => {
        try {
          await AsyncStorage.setItem('@cnic', cnic);
        } catch (e) {
        }
      };
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
            alertUser('Error','CNIC should be 13 digits.' );
            return false;
        }
    };
    var isValidPassword = () => {
        if (password) {
            return true;
          } 
        else {
            alertUser('Error','Enter Password' );
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
    ////////////////////internet connectivity check method ////////////////////////////////
    var isDeviceOnline = async () => {
        const NetInfoState = await NetInfo.fetch();
        const { isConnected } = NetInfoState;

        if (isConnected === false) {
            alertUser('Error', 'You do not seem to be connected to the internet. Please check your connection settings and try again.');
        }
        return isConnected;
    };
  
    ////////////////////////////////handleSignIn/////////////////////////////////////////////
    var handleSignIn = async () => {

        const baseUrl = apiEndpoints.farmerSignIn.url;
        const constructedUrl = `${baseUrl}?cnic=${cnic}&pwd=${password}`;
        console.log(constructedUrl);
        if (isValidCNIC() === true && isValidPassword() === true) {
            /**
             * Here we first confirm that the user is connected to the internet and
             * that a network request can be made for user login.
             */
            return NetInfo.fetch().then(NetInfoState => {
            console.log('Connection type', NetInfoState);
            console.log('Is connected?', NetInfoState.isConnected);
            if (NetInfoState.isConnected === false) {
                alertUser('Error','Please check your internet connectivity.' );                    
            }
            else {
                console.log('Connected to internet');
                return fetch(constructedUrl)
                .then(response => response.json())
                .then(data => {
                    console.log({ data });
                    if (data.success === 0) {
                        alertUser('Error', data.message );
                    } 
                    else {
                        const phoneNumber = data.farmer[0].phone;
                        Alert.alert('Success', data.message, [
                            {
                            text: 'OK',
                            onPress: () => {
                                saveUserCnicInStorage(cnic).then(() => {
                                navigation.navigate('PhoneNumberVerification',{phoneNumber:phoneNumber, cnic:cnic});
                            });
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
  //////////////////////////////////////render/////////////////////////////////////////////////
    return (
        <View>
            <Header
                placement="left"
                leftComponent={{ icon: 'chevron-left', color: '#fff' }}
                centerComponent={{ text: 'SignIn Screen', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Enter CNIC & Password</Text>
            </View>
            <Input style = {styles.textInput}
                placeholder='CNIC'
                rightIcon={{ type: 'antdesign', name: 'idcard' }}
                value={cnic}
                onChangeText={value => setCnic(value.replace(/\D/g, ''))}
            />
            <Text style={{alignSelf: 'flex-end', fontSize:15, color:'#c0ccda', margin:15}}>e.g. 1730155712337</Text>
            <Input style = {styles.textInput}
                placeholder='Password'
                rightIcon={{ type: 'foundation', name: 'key' }}
                value={password}
                secureTextEntry
                onChangeText={value => setPassword(value)}
            />
            <View style={{marginTop:25}}/>
            <Button
                title="SIGN IN"
                icon={{
                    name: "login",
                    type:"antdesign",
                    size: 25,
                    color: "white"
                }}
                rightComponent
                onPress={handleSignIn}
            />
            <Divider  style = {{paddingHorizontal:10}}/>
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
textAlign: 'left',
},

});

export default SignInScreen;
