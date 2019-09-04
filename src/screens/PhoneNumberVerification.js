/* eslint-disable prettier/prettier */

import React,{useState,useEffect} from 'react';
import {
    StyleSheet,
    View,
    Alert,
    Text,
    Dimensions,
  } from 'react-native';
import { Button, Header,Input, Divider } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import { apiEndpoints } from './../api/apiEndpoints';

const PhoneNumberVerification = ({navigation}) => {
    const [phone,setPhone] = useState('');
    const [wantsUpdate,setWantsUpdate] = useState(false);
    const phoneNumber = navigation.getParam('phoneNumber');
    const cnic = navigation.getParam('cnic');

    ////////////////////////////////handleUpdate Number/////////////////////////////////////////////
    var handleUpdateNumber = async () => {

        const baseUrl = apiEndpoints.updateFarmerNumber.url;
        const constructedUrl = `${baseUrl}?cnic=${cnic}&phone=${phone}`;
        console.log(constructedUrl);
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
                    Alert.alert('Success', data.message, [
                        {
                        text: 'OK',
                        onPress: () => {
                            navigation.navigate('HomeScreen', {cnic});
                        }
                        }
                    ]);
                }
            });
        }
        });
        
    };
    var alertUser = (type, content) => {
        Alert.alert(type, content, [
          {
            text: 'OK',
            onPress: () => console.log('OK Button pressed')
          }
        ]);
      };
    //////////////////////////////render///////////////////////////////
    if (wantsUpdate === false){
        return (
            <View style={styles.container}>
                <Header
                    placement="left"
                    leftComponent={{ icon: 'chevron-left', color: '#fff' }}
                    centerComponent={{ text: 'Verify Phone Number', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Phone Number Verification</Text>
                </View>
                <Text style={styles.number}>{phoneNumber}</Text>
                <Divider  style = {{paddingHorizontal:10}}/>
                <View style={styles.buttonsContainer}>
                    <Button
                        title="Verify"
                        icon={{
                            name: "done",
                            type:"materialicons",
                            size: 25,
                            color: "white"
                        }}
                        onPress = { () => {
                            navigation.navigate('HomeScreen');
                            }
                        }
                    />
                    <View style={{paddingHorizontal:30}}></View>
                    <Button 
                        title="Update"
                        icon={{
                            name: "update",
                            type:"materialcommunityicons",
                            size: 25,
                            color: "white"
                        }}
                        onPress = { () => {
                            setWantsUpdate(true);
                            }
                        }
                    />
                </View>
            </View>
        );
    }
    else {
        return (
            <View style={styles.container}>
                <Header
                    placement="left"
                    leftComponent={{ icon: 'chevron-left', color: '#fff' }}
                    centerComponent={{ text: 'Update Phone Number', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Enter Your New Number</Text>
                </View>
                <Input style = {styles.textInput}
                    placeholder='Phone Number'
                    rightIcon={{ type: 'Entypo', name: 'phone' }}
                    value={phone}
                    onChangeText={value => setPhone(value.replace(/\D/g, ''))}
                />         
                <Text style={{alignSelf: 'flex-end', fontSize:15, color:'#c0ccda', paddingLeft:15}}>e.g. 03001234567   </Text>       
                <View style={styles.buttonsContainer}>
                    <Button 
                        title="Back"
                        icon={{
                            name: "back",
                            type:"antdesign",
                            size: 25,
                            color: "white"
                        }}
                        onPress = { () => {
                            setWantsUpdate(false);
                            }
                        }
                    />
                    <View style={{paddingHorizontal:30}}></View>
                    <Button 
                        title="Update"
                        icon={{
                            name: "update",
                            type:"materialcommunityicons",
                            size: 25,
                            color: "white"
                        }}
                        onPress = { () => {
                            handleUpdateNumber();
                            }
                        }
                    />
                </View>
            </View>
        );
    }   
};
////////////////////////////styles//////////////////////////////////
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
      letterSpacing: 5,
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
    number:{
        paddingTop: 50,
        fontWeight: 'normal',
        fontSize: 18,
        textAlign: 'center',
        letterSpacing: 5,
    },
    buttonsContainer: {
       // flex:1,
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
    },
  });
  export default PhoneNumberVerification;
